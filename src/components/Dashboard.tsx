import React, { useState, useMemo } from 'react';
import { branches, getAreaTotal, Branch, positionDateTexts } from '../data/MasterData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { TrendingUp, Activity, PieChart, Banknote, Briefcase, ArrowUpDown, ChevronUp, ChevronDown, Calendar, Scale } from 'lucide-react';

const formatCurrency = (value: number) => {
  const formatted = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value);
  return `Rp ${formatted} Jt`;
};

const StatCard = ({ title, value, icon: Icon, colorClass }: { title: string, value: number, icon: any, colorClass: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{formatCurrency(value)}</h3>
    </div>
    <div className={`p-3 rounded-lg ${colorClass}`}>
      <Icon size={24} />
    </div>
  </div>
);

export function Dashboard() {
  const [selectedBranchCode, setSelectedBranchCode] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Branch, direction: 'asc' | 'desc' } | null>(null);
  
  const [chartType, setChartType] = useState<'top' | 'bottom' | 'both'>('top');
  const [chartMetric, setChartMetric] = useState<keyof Branch>('cm');
  const [detailMetric, setDetailMetric] = useState<keyof Branch>('cm');
  
  const areaTotal = useMemo(() => getAreaTotal(), []);
  
  const filteredBranches = useMemo(() => {
    if (selectedBranchCode === 'all') return branches;
    if (selectedBranchCode.startsWith('class-')) {
      const cls = selectedBranchCode.replace('class-', '');
      return branches.filter(b => b.class === cls);
    }
    return branches.filter(b => b.code === selectedBranchCode);
  }, [selectedBranchCode]);

  const topN = selectedBranchCode === 'class-B.1' ? 2 : (selectedBranchCode.startsWith('class-') ? 3 : 5);

  const currentData: Branch = useMemo(() => {
    if (selectedBranchCode === 'all') return areaTotal;
    if (selectedBranchCode.startsWith('class-')) {
      const cls = selectedBranchCode.replace('class-', '');
      const clsBranches = branches.filter(b => b.class === cls);
      return clsBranches.reduce((acc, branch) => ({
        code: `class-${cls}`,
        class: cls,
        name: `Kelas ${cls}`,
        cm: acc.cm + branch.cm,
        nii: acc.nii + branch.nii,
        assetSpread: acc.assetSpread + branch.assetSpread,
        liabilitiesSpread: acc.liabilitiesSpread + branch.liabilitiesSpread,
        fbi: acc.fbi + branch.fbi,
      }), {
        code: `class-${cls}`,
        class: cls,
        name: `Kelas ${cls}`,
        cm: 0,
        nii: 0,
        assetSpread: 0,
        liabilitiesSpread: 0,
        fbi: 0,
      });
    }
    return branches.find(b => b.code === selectedBranchCode) || areaTotal;
  }, [selectedBranchCode, areaTotal]);

  const chartData = useMemo(() => {
    if (selectedBranchCode !== 'all' && !selectedBranchCode.startsWith('class-')) {
      return [
        { name: 'CM', value: currentData.cm, fill: '#003D79' },
        { name: 'NII', value: currentData.nii, fill: '#F2A900' },
        { name: 'Asset Spread', value: currentData.assetSpread, fill: '#10B981' },
        { name: 'Liab. Spread', value: currentData.liabilitiesSpread, fill: '#6366F1' },
        { name: 'FBI', value: currentData.fbi, fill: '#F43F5E' },
      ];
    }
    
    // If 'all' or class is selected, show top/bottom N branches by chartMetric
    let sorted = [...filteredBranches].sort((a, b) => (b[chartMetric] as number) - (a[chartMetric] as number));
    
    let result: any[] = [];
    if (chartType === 'top') {
      result = sorted.slice(0, topN).map(b => ({
        name: b.name.replace('Jakarta ', ''),
        [chartMetric]: b[chartMetric],
        fill: '#003D79'
      }));
    } else if (chartType === 'bottom') {
      // Bottom only filter: reverse to show lowest on the left, highest on the right
      result = sorted.slice(-topN).reverse().map(b => ({
        name: b.name.replace('Jakarta ', ''),
        [chartMetric]: b[chartMetric],
        fill: '#F43F5E'
      }));
    } else {
      const topData = sorted.slice(0, topN).map(b => ({
        name: b.name.replace('Jakarta ', ''),
        [chartMetric]: b[chartMetric],
        code: b.code,
        fill: '#003D79'
      }));
      // Both filter: don't reverse bottom, keep descending order so highest bottom is next to lowest top
      const bottomData = sorted.slice(-topN).map(b => ({
        name: b.name.replace('Jakarta ', ''),
        [chartMetric]: b[chartMetric],
        code: b.code,
        fill: '#F43F5E'
      }));
      
      const combined = [...topData];
      bottomData.forEach(b => {
        if (!combined.find(c => c.code === b.code)) {
          combined.push(b);
        }
      });
      result = combined;
    }
    
    return result;
  }, [currentData, selectedBranchCode, chartType, chartMetric, filteredBranches]);

  const sortedBranches = useMemo(() => {
    let sortableBranches = [...filteredBranches];
    if (sortConfig !== null) {
      sortableBranches.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableBranches;
  }, [filteredBranches, sortConfig]);

  const requestSort = (key: keyof Branch) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof Branch }) => {
    if (sortConfig?.key !== columnKey) {
      return <ArrowUpDown size={14} className="inline ml-1 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp size={14} className="inline ml-1 text-[#003D79]" />
    ) : (
      <ChevronDown size={14} className="inline ml-1 text-[#003D79]" />
    );
  };

  const getTableTitle = () => {
    if (selectedBranchCode === 'all') return 'Portofolio Konsolidasi';
    if (selectedBranchCode.startsWith('class-')) {
      return `Portofolio Kelas Cabang ${selectedBranchCode.replace('class-', '')}`;
    }
    const branch = branches.find(b => b.code === selectedBranchCode);
    if (branch) {
      return `Portofolio Cabang ${branch.code} - ${branch.name.replace('Jakarta ', '')}`;
    }
    return 'Portofolio Konsolidasi';
  };

  return (
    <div className="h-full bg-slate-50 overflow-y-auto">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#003D79]">Branch Profitability Analysis</h2>
            <p className="text-xs text-slate-500 italic mt-1">{positionDateTexts.bpa}</p>
          </div>
          
          <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-200 flex items-center">
            <span className="text-sm text-slate-500 px-3 font-medium">Filter Portofolio:</span>
            <select 
              className="bg-slate-50 border-none text-sm rounded-md py-2 px-4 outline-none focus:ring-2 focus:ring-[#003D79] cursor-pointer"
              value={selectedBranchCode}
              onChange={(e) => setSelectedBranchCode(e.target.value)}
            >
              <option value="all">Area Jakarta Tebet Supomo</option>
              <option value="class-B.1">Kelas B.1</option>
              <option value="class-B.2">Kelas B.2</option>
              <option value="class-B.3">Kelas B.3</option>
              <option value="class-B.4">Kelas B.4</option>
              <optgroup label="Cabang Kelas B.1">
                {branches.filter(b => b.class === 'B.1').map(b => (
                  <option key={b.code} value={b.code}>{b.code} - {b.name}</option>
                ))}
              </optgroup>
              <optgroup label="Cabang Kelas B.2">
                {branches.filter(b => b.class === 'B.2').map(b => (
                  <option key={b.code} value={b.code}>{b.code} - {b.name}</option>
                ))}
              </optgroup>
              <optgroup label="Cabang Kelas B.3">
                {branches.filter(b => b.class === 'B.3').map(b => (
                  <option key={b.code} value={b.code}>{b.code} - {b.name}</option>
                ))}
              </optgroup>
              <optgroup label="Cabang Kelas B.4">
                {branches.filter(b => b.class === 'B.4').map(b => (
                  <option key={b.code} value={b.code}>{b.code} - {b.name}</option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard 
            title="Contribution Margin (CM)" 
            value={currentData.cm} 
            icon={TrendingUp} 
            colorClass="bg-blue-100 text-[#003D79]" 
          />
          <StatCard 
            title="Net Interest Income (NII)" 
            value={currentData.nii} 
            icon={Banknote} 
            colorClass="bg-yellow-100 text-[#F2A900]" 
          />
          <StatCard 
            title="Asset Spread" 
            value={currentData.assetSpread} 
            icon={Activity} 
            colorClass="bg-emerald-100 text-emerald-600" 
          />
          <StatCard 
            title="Liabilities Spread" 
            value={currentData.liabilitiesSpread} 
            icon={Scale} 
            colorClass="bg-indigo-100 text-indigo-600" 
          />
          <StatCard 
            title="Fee-Based Income (FBI)" 
            value={currentData.fbi} 
            icon={Briefcase} 
            colorClass="bg-rose-100 text-rose-600" 
          />
        </div>

        {/* Charts & Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h3 className="text-lg font-bold text-slate-800">
                {selectedBranchCode === 'all' || selectedBranchCode.startsWith('class-')
                  ? `${chartType === 'top' ? `Top ${topN}` : chartType === 'bottom' ? `Bottom ${topN}` : `Top & Bottom ${topN}`} Cabang by ${chartMetric.toUpperCase()}` 
                  : `Komposisi ${getTableTitle()}`}
              </h3>
              
              {(selectedBranchCode === 'all' || selectedBranchCode.startsWith('class-')) && (
                <div className="flex gap-2">
                  <select 
                    className="bg-slate-50 border border-slate-200 text-sm rounded-md py-1 px-2 outline-none focus:ring-2 focus:ring-[#003D79]"
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value as 'top' | 'bottom' | 'both')}
                  >
                    <option value="top">Top {topN}</option>
                    <option value="bottom">Bottom {topN}</option>
                    <option value="both">Top & Bottom {topN}</option>
                  </select>
                  <select 
                    className="bg-slate-50 border border-slate-200 text-sm rounded-md py-1 px-2 outline-none focus:ring-2 focus:ring-[#003D79]"
                    value={chartMetric}
                    onChange={(e) => setChartMetric(e.target.value as keyof Branch)}
                  >
                    <option value="cm">CM</option>
                    <option value="nii">NII</option>
                    <option value="assetSpread">Asset Spread</option>
                    <option value="liabilitiesSpread">Liab. Spread</option>
                    <option value="fbi">FBI</option>
                  </select>
                </div>
              )}
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {selectedBranchCode === 'all' || selectedBranchCode.startsWith('class-') ? (
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748B', fontSize: 11 }} 
                      angle={-45} 
                      textAnchor="end" 
                      interval={0} 
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(val) => `Rp ${val} Jt`} />
                    <Tooltip 
                      cursor={{ fill: '#F1F5F9' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number) => [formatCurrency(value), undefined]}
                    />
                    <Bar dataKey={chartMetric} radius={[4, 4, 0, 0]}>
                      {chartData.map((entry: any, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                ) : (
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748B', fontSize: 11 }} 
                      angle={-45} 
                      textAnchor="end" 
                      interval={0} 
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(val) => `Rp ${val} Jt`} />
                    <Tooltip 
                      cursor={{ fill: '#F1F5F9' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number) => [formatCurrency(value), 'Nilai']}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry: any, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Details Table */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">
                Detail {getTableTitle()}
              </h3>
              {(selectedBranchCode === 'all' || selectedBranchCode.startsWith('class-')) && (
                <select 
                  className="bg-slate-50 border border-slate-200 text-xs rounded-md py-1 px-2 outline-none focus:ring-2 focus:ring-[#003D79]"
                  value={detailMetric}
                  onChange={(e) => setDetailMetric(e.target.value as keyof Branch)}
                >
                  <option value="cm">CM</option>
                  <option value="nii">NII</option>
                  <option value="assetSpread">Asset Spread</option>
                  <option value="liabilitiesSpread">Liab. Spread</option>
                  <option value="fbi">FBI</option>
                </select>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="space-y-4">
                {selectedBranchCode === 'all' || selectedBranchCode.startsWith('class-') ? (
                  // Show summary of classes or branches
                  (selectedBranchCode === 'all' ? ['B.1', 'B.2', 'B.3', 'B.4'] : filteredBranches.map(b => b.code)).map(item => {
                    const itemBranches = selectedBranchCode === 'all' ? branches.filter(b => b.class === item) : [branches.find(b => b.code === item)!];
                    const itemTotal = itemBranches.reduce((sum, b) => sum + (b[detailMetric] as number), 0);
                    
                    const metricLabels: Record<string, string> = {
                      cm: 'Total CM',
                      nii: 'Total NII',
                      assetSpread: 'Total Asset Spread',
                      liabilitiesSpread: 'Total Liab. Spread',
                      fbi: 'Total FBI'
                    };
                    
                    return (
                      <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div>
                          <p className="font-medium text-slate-800">{selectedBranchCode === 'all' ? `Kelas ${item}` : itemBranches[0].name}</p>
                          <p className="text-xs text-slate-500">{selectedBranchCode === 'all' ? `${itemBranches.length} Cabang` : item}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#003D79]">{formatCurrency(itemTotal)}</p>
                          <p className="text-xs text-slate-500">{metricLabels[detailMetric]}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  // Show specific branch details
                  <>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500">Kode Cabang</span>
                      <span className="font-medium text-slate-800">{currentData.code}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500">Kelas</span>
                      <span className="font-medium text-slate-800">{currentData.class}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500">Contribution Margin</span>
                      <span className="font-bold text-[#003D79]">{formatCurrency(currentData.cm)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500">Net Interest Income</span>
                      <span className="font-medium text-slate-800">{formatCurrency(currentData.nii)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500">Asset Spread</span>
                      <span className="font-medium text-slate-800">{formatCurrency(currentData.assetSpread)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500">Liabilities Spread</span>
                      <span className="font-medium text-slate-800">{formatCurrency(currentData.liabilitiesSpread)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-500">Fee-Based Income</span>
                      <span className="font-medium text-slate-800">{formatCurrency(currentData.fbi)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {(selectedBranchCode === 'all' || selectedBranchCode.startsWith('class-')) && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">
                    Total {selectedBranchCode === 'all' ? 'Area' : 'Kelas'} {detailMetric.toUpperCase()}
                  </span>
                  <span className="font-bold text-xl text-[#003D79]">
                    {formatCurrency(currentData[detailMetric] as number)}
                  </span>
                </div>
              </div>
            )}
          </div>
          
        </div>
        
        {/* Full Table for All Branches */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">{getTableTitle()}</h3>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors" onClick={() => requestSort('code')}>
                      <div className="flex items-center">Kode <SortIcon columnKey="code" /></div>
                    </th>
                    <th className="px-6 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors" onClick={() => requestSort('name')}>
                      <div className="flex items-center">Cabang <SortIcon columnKey="name" /></div>
                    </th>
                    <th className="px-6 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors" onClick={() => requestSort('class')}>
                      <div className="flex items-center">Kelas <SortIcon columnKey="class" /></div>
                    </th>
                    <th className="px-6 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors text-right" onClick={() => requestSort('cm')}>
                      <div className="flex items-center justify-end">CM <SortIcon columnKey="cm" /></div>
                    </th>
                    <th className="px-6 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors text-right" onClick={() => requestSort('nii')}>
                      <div className="flex items-center justify-end">NII <SortIcon columnKey="nii" /></div>
                    </th>
                    <th className="px-6 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors text-right" onClick={() => requestSort('assetSpread')}>
                      <div className="flex items-center justify-end">Asset Sprd <SortIcon columnKey="assetSpread" /></div>
                    </th>
                    <th className="px-6 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors text-right" onClick={() => requestSort('liabilitiesSpread')}>
                      <div className="flex items-center justify-end">Liab Sprd <SortIcon columnKey="liabilitiesSpread" /></div>
                    </th>
                    <th className="px-6 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors text-right" onClick={() => requestSort('fbi')}>
                      <div className="flex items-center justify-end">FBI <SortIcon columnKey="fbi" /></div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedBranches.map((branch) => (
                    <tr key={branch.code} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-slate-500">{branch.code}</td>
                      <td className="px-6 py-4 font-medium text-slate-800">{branch.name}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                          {branch.class}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-[#003D79]">{formatCurrency(branch.cm)}</td>
                      <td className="px-6 py-4 text-right text-slate-600">{formatCurrency(branch.nii)}</td>
                      <td className="px-6 py-4 text-right text-slate-600">{formatCurrency(branch.assetSpread)}</td>
                      <td className="px-6 py-4 text-right text-slate-600">{formatCurrency(branch.liabilitiesSpread)}</td>
                      <td className="px-6 py-4 text-right text-slate-600">{formatCurrency(branch.fbi)}</td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50/50 font-bold border-t-2 border-blue-100">
                    <td className="px-6 py-4 text-slate-800" colSpan={3}>TOTAL {selectedBranchCode === 'all' ? 'AREA JAKARTA TEBET SUPOMO' : (selectedBranchCode.startsWith('class-') ? `KELAS ${selectedBranchCode.replace('class-', '')}` : currentData.name.toUpperCase())}</td>
                    <td className="px-6 py-4 text-right text-[#003D79]">{formatCurrency(currentData.cm)}</td>
                    <td className="px-6 py-4 text-right text-slate-800">{formatCurrency(currentData.nii)}</td>
                    <td className="px-6 py-4 text-right text-slate-800">{formatCurrency(currentData.assetSpread)}</td>
                    <td className="px-6 py-4 text-right text-slate-800">{formatCurrency(currentData.liabilitiesSpread)}</td>
                    <td className="px-6 py-4 text-right text-slate-800">{formatCurrency(currentData.fbi)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

      </div>
    </div>
  );
}
