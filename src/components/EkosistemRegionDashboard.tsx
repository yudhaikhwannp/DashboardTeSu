import React, { useState, useMemo } from 'react';
import { 
  ArrowUpDown, 
  ChevronUp, 
  ChevronDown,
  Target,
  PieChart,
  Users,
  Briefcase,
  GitBranch,
  Store,
  Fuel,
  Building2,
  Building,
  Receipt
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ekosistemBranches, getEkosistemAreaTotal, EkosistemBranch, positionDateTexts } from '../data/MasterData';

export function EkosistemRegionDashboard() {
  const [selectedBranchCode, setSelectedBranchCode] = useState<string>('all');
  const [portfolio, setPortfolio] = useState<'bodBocSME' | 'bodBocCMC' | 'bodBocCB' | 'familyTree' | 'warungViral' | 'spbu' | 'kdkmp' | 'sppg' | 'billReminder'>('bodBocSME');
  
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const [chartMetric, setChartMetric] = useState<'today' | 'percentTarget'>('today');
  const [chartView, setChartView] = useState<'top' | 'bottom' | 'both'>('both');

  const areaTotal = useMemo(() => getEkosistemAreaTotal(), []);
  
  const themes = {
    bodBocSME: { label: 'BOD/BOC SME', active: 'bg-[#003D79] text-white border-[#003D79]', inactive: 'bg-white text-[#003D79] border-blue-200 hover:bg-blue-50', headerBg: 'bg-blue-50/50', text: 'text-[#003D79]' },
    bodBocCMC: { label: 'BOD/BOC CMC', active: 'bg-[#0ea5e9] text-white border-[#0ea5e9]', inactive: 'bg-white text-[#0ea5e9] border-sky-200 hover:bg-sky-50', headerBg: 'bg-sky-50/50', text: 'text-[#0ea5e9]' },
    bodBocCB: { label: 'BOD/BOC CB', active: 'bg-[#8b5cf6] text-white border-[#8b5cf6]', inactive: 'bg-white text-[#8b5cf6] border-violet-200 hover:bg-violet-50', headerBg: 'bg-violet-50/50', text: 'text-[#8b5cf6]' },
    familyTree: { label: 'Family Tree', active: 'bg-emerald-600 text-white border-emerald-600', inactive: 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50', headerBg: 'bg-emerald-50/50', text: 'text-emerald-600' },
    warungViral: { label: 'Warung Viral', active: 'bg-indigo-600 text-white border-indigo-600', inactive: 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50', headerBg: 'bg-indigo-50/50', text: 'text-indigo-600' },
    spbu: { label: 'SPBU', active: 'bg-rose-600 text-white border-rose-600', inactive: 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50', headerBg: 'bg-rose-50/50', text: 'text-rose-600' },
    kdkmp: { label: 'KDKMP', active: 'bg-cyan-600 text-white border-cyan-600', inactive: 'bg-white text-cyan-600 border-cyan-200 hover:bg-cyan-50', headerBg: 'bg-cyan-50/50', text: 'text-cyan-600' },
    sppg: { label: 'SPPG', active: 'bg-fuchsia-600 text-white border-fuchsia-600', inactive: 'bg-white text-fuchsia-600 border-fuchsia-200 hover:bg-fuchsia-50', headerBg: 'bg-fuchsia-50/50', text: 'text-fuchsia-600' },
    billReminder: { label: 'Bill Reminder', active: 'bg-orange-600 text-white border-orange-600', inactive: 'bg-white text-orange-600 border-orange-200 hover:bg-orange-50', headerBg: 'bg-orange-50/50', text: 'text-orange-600' },
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'bodBocSME': return Users;
      case 'bodBocCMC': return Users;
      case 'bodBocCB': return Users;
      case 'familyTree': return GitBranch;
      case 'warungViral': return Store;
      case 'spbu': return Fuel;
      case 'kdkmp': return Building2;
      case 'sppg': return Building;
      case 'billReminder': return Receipt;
      default: return Users;
    }
  };

  const filteredBranches = useMemo(() => {
    if (selectedBranchCode === 'all') return ekosistemBranches;
    if (selectedBranchCode.startsWith('class-')) {
      const cls = selectedBranchCode.replace('class-', '');
      return ekosistemBranches.filter(b => b.class === cls);
    }
    return ekosistemBranches.filter(b => b.code === selectedBranchCode);
  }, [selectedBranchCode]);

  const topN = selectedBranchCode === 'class-B.1' ? 2 : (selectedBranchCode.startsWith('class-') ? 3 : 5);

  const currentData = useMemo(() => {
    if (selectedBranchCode === 'all') return areaTotal;
    if (selectedBranchCode.startsWith('class-')) {
      const cls = selectedBranchCode.replace('class-', '');
      const clsBranches = ekosistemBranches.filter(b => b.class === cls);
      
      const total: EkosistemBranch = {
        code: `class-${cls}`,
        class: cls,
        name: `Kelas ${cls}`,
        ekosistem: {
          bodBocSME: { today: 0, target: 0, percentTarget: 0 },
          bodBocCMC: { today: 0, target: 0, percentTarget: 0 },
          bodBocCB: { today: 0, target: 0, percentTarget: 0 },
          familyTree: { today: 0, target: 0, percentTarget: 0 },
          warungViral: { today: 0, target: 0, percentTarget: 0 },
          spbu: { today: 0, target: 0, percentTarget: 0 },
          kdkmp: { today: 0, target: 0, percentTarget: 0 },
          sppg: { today: 0, target: 0, percentTarget: 0 },
          billReminder: { today: 0, target: 0, percentTarget: 0 },
        }
      };

      clsBranches.forEach(branch => {
        (['bodBocSME', 'bodBocCMC', 'bodBocCB', 'familyTree', 'warungViral', 'spbu', 'kdkmp', 'sppg', 'billReminder'] as const).forEach(type => {
          total.ekosistem[type].today += branch.ekosistem[type].today;
          total.ekosistem[type].target += branch.ekosistem[type].target;
        });
      });

      (['bodBocSME', 'bodBocCMC', 'bodBocCB', 'familyTree', 'warungViral', 'spbu', 'kdkmp', 'sppg', 'billReminder'] as const).forEach(type => {
        total.ekosistem[type].percentTarget = total.ekosistem[type].target > 0 ? (total.ekosistem[type].today / total.ekosistem[type].target) * 100 : 0;
      });

      return total;
    }
    return ekosistemBranches.find(b => b.code === selectedBranchCode) || areaTotal;
  }, [selectedBranchCode, areaTotal]);

  const chartData = useMemo(() => {
    if (selectedBranchCode !== 'all' && !selectedBranchCode.startsWith('class-')) {
      return [];
    }

    let sourceBranches = ekosistemBranches;
    if (selectedBranchCode !== 'all' && selectedBranchCode.startsWith('class-')) {
      const cls = selectedBranchCode.replace('class-', '');
      sourceBranches = ekosistemBranches.filter(b => b.class === cls);
    }

    let sorted = [...sourceBranches].sort((a, b) => {
      let aVal = a.ekosistem[portfolio][chartMetric as 'today' | 'percentTarget'];
      let bVal = b.ekosistem[portfolio][chartMetric as 'today' | 'percentTarget'];
      return bVal - aVal;
    });

    let result: any[] = [];
    
    if (chartView === 'top') {
      result = sorted.slice(0, topN).map(b => {
        return {
          name: b.name.replace('Jakarta ', ''),
          value: b.ekosistem[portfolio][chartMetric as 'today' | 'percentTarget'],
          fill: '#003D79'
        };
      });
    } else if (chartView === 'bottom') {
      result = sorted.slice(-topN).reverse().map(b => {
        return {
          name: b.name.replace('Jakarta ', ''),
          value: b.ekosistem[portfolio][chartMetric as 'today' | 'percentTarget'],
          fill: '#F43F5E'
        };
      });
    } else {
      const topData = sorted.slice(0, topN).map(b => {
        return {
          code: b.code,
          name: b.name.replace('Jakarta ', ''),
          value: b.ekosistem[portfolio][chartMetric as 'today' | 'percentTarget'],
          fill: '#003D79'
        };
      });
      const bottomData = sorted.slice(-topN).map(b => {
        return {
          code: b.code,
          name: b.name.replace('Jakarta ', ''),
          value: b.ekosistem[portfolio][chartMetric as 'today' | 'percentTarget'],
          fill: '#F43F5E'
        };
      });
      
      const combined = [...topData];
      bottomData.forEach(b => {
        if (!combined.find(c => c.code === b.code)) {
          combined.push(b);
        }
      });
      result = combined;
    }

    return result;
  }, [selectedBranchCode, portfolio, chartMetric, chartView]);

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
  };

  const formatPercent = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  };

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getTableTitle = () => {
    if (selectedBranchCode === 'all') return 'Portofolio Konsolidasi';
    if (selectedBranchCode.startsWith('class-')) {
      return `Portofolio Kelas Cabang ${selectedBranchCode.replace('class-', '')}`;
    }
    const branch = ekosistemBranches.find(b => b.code === selectedBranchCode);
    if (branch) {
      return `Portofolio Cabang ${branch.code} - ${branch.name.replace('Jakarta ', '')}`;
    }
    return 'Portofolio Konsolidasi';
  };

  const sortedBranches = useMemo(() => {
    let sortableItems = [...filteredBranches];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        const getNestedValue = (obj: any, path: string) => {
          return path.split('.').reduce((acc, part) => acc && acc[part], obj);
        };

        if (sortConfig.key === 'code' || sortConfig.key === 'name' || sortConfig.key === 'class') {
          aValue = a[sortConfig.key as keyof EkosistemBranch];
          bValue = b[sortConfig.key as keyof EkosistemBranch];
        } else {
          aValue = getNestedValue(a.ekosistem, sortConfig.key);
          bValue = getNestedValue(b.ekosistem, sortConfig.key);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredBranches, sortConfig]);

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortConfig?.key !== columnKey) {
      return <ArrowUpDown size={14} className="inline ml-1 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp size={14} className="inline ml-1 text-[#003D79]" />
    ) : (
      <ChevronDown size={14} className="inline ml-1 text-[#003D79]" />
    );
  };

  const StatCard = ({ title, value, icon: Icon, colorClass, isCurrency = false }: { title: string, value: number, icon: any, colorClass: string, isCurrency?: boolean }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{formatNumber(value)}</h3>
      </div>
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto bg-slate-50/50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#003D79]">Ekosistem Region</h1>
            <p className="text-xs text-slate-500 italic mt-1">{positionDateTexts.ekosistem}</p>
            <p className="text-slate-500 mt-1">Data Leading</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-500">Filter Portofolio:</span>
            <select 
              className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#003D79] font-medium"
              value={selectedBranchCode}
              onChange={(e) => setSelectedBranchCode(e.target.value)}
            >
              <option value="all">Area Jakarta Tebet Supomo</option>
              <optgroup label="Kelas Cabang">
                {Array.from(new Set(ekosistemBranches.map(b => b.class))).sort().map(cls => (
                  <option key={`class-${cls}`} value={`class-${cls}`}>Kelas {cls}</option>
                ))}
              </optgroup>
              <optgroup label="Daftar Cabang">
                {ekosistemBranches.map(branch => (
                  <option key={branch.code} value={branch.code}>
                    {branch.code} - {branch.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="space-y-6">
            {/* Portfolio Selector */}
            <div className="flex flex-wrap gap-2">
              {(Object.keys(themes) as Array<keyof typeof themes>).map((port) => (
                <button
                  key={port}
                  onClick={() => setPortfolio(port)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                    portfolio === port
                      ? themes[port].active
                      : themes[port].inactive
                  }`}
                >
                  {themes[port].label}
                </button>
              ))}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                title={`Realisasi Hari Ini (${themes[portfolio].label})`} 
                value={currentData.ekosistem[portfolio].today} 
                icon={getIcon(portfolio)} 
                colorClass={themes[portfolio].active.replace('border-', 'bg-').replace('text-white', 'text-slate-800')} 
              />
              <StatCard 
                title="Target April 26" 
                value={currentData.ekosistem[portfolio].target} 
                icon={Target} 
                colorClass="bg-slate-100 text-slate-600" 
              />
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-4 rounded-lg bg-indigo-100 text-indigo-600">
                  <PieChart size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">% Thd Target Apr 26</p>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {formatPercent(currentData.ekosistem[portfolio].percentTarget)}
                  </h3>
                </div>
              </div>
            </div>

            {/* Chart Section */}
            {(selectedBranchCode === 'all' || selectedBranchCode.startsWith('class-')) && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h3 className="text-lg font-bold text-slate-800">
                    {chartView === 'top' ? `Top ${topN}` : chartView === 'bottom' ? `Bottom ${topN}` : `Top & Bottom ${topN}`} Cabang
                  </h3>
                  
                  {/* Filters */}
                  <div className="flex flex-wrap gap-2">
                    <select 
                      className="bg-slate-50 border border-slate-200 text-sm rounded-md py-1 px-2 outline-none focus:ring-2 focus:ring-[#003D79]"
                      value={chartView}
                      onChange={(e) => setChartView(e.target.value as 'top' | 'bottom' | 'both')}
                    >
                      <option value="top">Top {topN}</option>
                      <option value="bottom">Bottom {topN}</option>
                      <option value="both">Top & Bottom {topN}</option>
                    </select>
                    
                    <select 
                      className="bg-slate-50 border border-slate-200 text-sm rounded-md py-1 px-2 outline-none focus:ring-2 focus:ring-[#003D79]"
                      value={chartMetric}
                      onChange={(e) => setChartMetric(e.target.value as 'today' | 'percentTarget')}
                    >
                      <option value="today">Realisasi Harian</option>
                      <option value="percentTarget">% Thd Target</option>
                    </select>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748B', fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        interval={0}
                        height={60}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748B', fontSize: 12 }}
                        tickFormatter={(value) => chartMetric === 'percentTarget' ? `${value}%` : (value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value)}
                      />
                      <Tooltip 
                        cursor={{ fill: '#F1F5F9' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => [
                          chartMetric === 'percentTarget' ? formatPercent(value) : formatNumber(value), 
                          chartMetric === 'percentTarget' ? '% Thd Target' : 'Realisasi Harian'
                        ]}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">
                  Detail {getTableTitle()} - Leading Ekosistem Region
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th rowSpan={2} className="px-4 py-4 font-medium border-r border-slate-200 cursor-pointer hover:bg-slate-100" onClick={() => requestSort('code')}>
                        <div className="flex items-center">Kode <SortIcon columnKey="code" /></div>
                      </th>
                      <th rowSpan={2} className="px-4 py-4 font-medium border-r border-slate-200 cursor-pointer hover:bg-slate-100" onClick={() => requestSort('name')}>
                        <div className="flex items-center">Cabang <SortIcon columnKey="name" /></div>
                      </th>
                      <th rowSpan={2} className="px-4 py-4 font-medium border-r border-slate-200 cursor-pointer hover:bg-slate-100" onClick={() => requestSort('class')}>
                        <div className="flex items-center">Kelas <SortIcon columnKey="class" /></div>
                      </th>
                      {(Object.keys(themes) as Array<keyof typeof themes>).map((key) => (
                        <th key={key} colSpan={3} className={`px-4 py-2 font-medium text-center border-r border-b border-slate-200 ${themes[key].headerBg}`}>
                          {themes[key].label}
                        </th>
                      ))}
                    </tr>
                    <tr>
                      {(Object.keys(themes) as Array<keyof typeof themes>).map((key) => (
                        <React.Fragment key={`${key}-cols`}>
                          <th className={`px-4 py-2 font-medium text-right cursor-pointer hover:opacity-80 ${themes[key].headerBg}`} onClick={() => requestSort(`${key}.today`)}>
                            <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey={`${key}.today`} /></div>
                          </th>
                          <th className={`px-4 py-2 font-medium text-right cursor-pointer hover:opacity-80 ${themes[key].headerBg}`} onClick={() => requestSort(`${key}.target`)}>
                            <div className="flex items-center justify-end">Target <SortIcon columnKey={`${key}.target`} /></div>
                          </th>
                          <th className={`px-4 py-2 font-medium text-right border-r border-slate-200 cursor-pointer hover:opacity-80 ${themes[key].headerBg}`} onClick={() => requestSort(`${key}.percentTarget`)}>
                            <div className="flex items-center justify-end">% Target <SortIcon columnKey={`${key}.percentTarget`} /></div>
                          </th>
                        </React.Fragment>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedBranches.map((branch) => (
                      <tr key={branch.code} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-800 border-r border-slate-100">{branch.code}</td>
                        <td className="px-4 py-3 font-medium text-slate-800 border-r border-slate-100">{branch.name.replace('Jakarta ', '')}</td>
                        <td className="px-4 py-3 font-medium text-slate-800 border-r border-slate-100">{branch.class}</td>
                        
                        {(Object.keys(themes) as Array<keyof typeof themes>).map((key) => {
                          const data = branch.ekosistem[key];
                          return (
                            <React.Fragment key={`${branch.code}-${key}`}>
                              <td className={`px-4 py-3 text-right font-bold ${themes[key].text}`}>{formatNumber(data.today)}</td>
                              <td className="px-4 py-3 text-right text-slate-600">{formatNumber(data.target)}</td>
                              <td className="px-4 py-3 text-right font-medium border-r border-slate-100">{formatPercent(data.percentTarget)}</td>
                            </React.Fragment>
                          );
                        })}
                      </tr>
                    ))}
                    
                    {/* Total Row */}
                    <tr className="bg-slate-100 font-bold border-t-2 border-slate-200">
                      <td colSpan={3} className="px-4 py-4 text-slate-800 border-r border-slate-200">
                        TOTAL {selectedBranchCode === 'all' ? 'AREA JAKARTA TEBET SUPOMO' : (selectedBranchCode.startsWith('class-') ? `KELAS ${selectedBranchCode.replace('class-', '')}` : currentData.name.toUpperCase())}
                      </td>
                      {(Object.keys(themes) as Array<keyof typeof themes>).map((key) => {
                        const data = currentData.ekosistem[key];
                        return (
                          <React.Fragment key={`total-${key}`}>
                            <td className={`px-4 py-4 text-right ${themes[key].text}`}>{formatNumber(data.today)}</td>
                            <td className="px-4 py-4 text-right text-slate-600">{formatNumber(data.target)}</td>
                            <td className="px-4 py-4 text-right border-r border-slate-200">{formatPercent(data.percentTarget)}</td>
                          </React.Fragment>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
