import React, { useState, useMemo } from 'react';
import { 
  ArrowUpDown, 
  ChevronUp, 
  ChevronDown,
  Wallet,
  Target,
  TrendingUp,
  UserPlus,
  PieChart
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
import { fundingBranches, getFundingAreaTotal, FundingBranch, FundingLagging, positionDateTexts } from '../data/MasterData';

export function FundingDashboard() {
  const [selectedBranchCode, setSelectedBranchCode] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'lagging' | 'leading'>('all');
  const [laggingPortfolio, setLaggingPortfolio] = useState<'tabungan' | 'giro' | 'deposito'>('tabungan');
  const [leadingPortfolio, setLeadingPortfolio] = useState<'newCifTabungan' | 'newCifGiro' | 'newCifTabunganBisnis' | 'newToPriority'>('newCifTabungan');
  
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const [chartDataType, setChartDataType] = useState<'lagging' | 'leading'>('lagging');
  const [chartProduct, setChartProduct] = useState<string>('tabungan');
  const [chartMetric, setChartMetric] = useState<'today' | 'percentTarget'>('today');
  const [chartView, setChartView] = useState<'top' | 'bottom' | 'both'>('both');

  const areaTotal = useMemo(() => getFundingAreaTotal(), []);
  
  const laggingThemes = {
    tabungan: { active: 'bg-[#003D79] text-white border-[#003D79]', inactive: 'bg-white text-[#003D79] border-blue-200 hover:bg-blue-50' },
    giro: { active: 'bg-[#F2A900] text-white border-[#F2A900]', inactive: 'bg-white text-[#F2A900] border-yellow-200 hover:bg-yellow-50' },
    deposito: { active: 'bg-emerald-600 text-white border-emerald-600', inactive: 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50' },
  };

  const leadingThemes = {
    newCifTabungan: { label: 'New CIF Tabungan', active: 'bg-[#003D79] text-white border-[#003D79]', inactive: 'bg-white text-[#003D79] border-blue-200 hover:bg-blue-50' },
    newCifGiro: { label: 'New CIF Giro', active: 'bg-[#F2A900] text-white border-[#F2A900]', inactive: 'bg-white text-[#F2A900] border-yellow-200 hover:bg-yellow-50' },
    newCifTabunganBisnis: { label: 'New CIF Tab. Bisnis', active: 'bg-emerald-600 text-white border-emerald-600', inactive: 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50' },
    newToPriority: { label: 'New to Priority', active: 'bg-indigo-600 text-white border-indigo-600', inactive: 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50' },
  };

  const filteredBranches = useMemo(() => {
    if (selectedBranchCode === 'all') return fundingBranches;
    if (selectedBranchCode.startsWith('class-')) {
      const cls = selectedBranchCode.replace('class-', '');
      return fundingBranches.filter(b => b.class === cls);
    }
    return fundingBranches.filter(b => b.code === selectedBranchCode);
  }, [selectedBranchCode]);

  const topN = selectedBranchCode === 'class-B.1' ? 2 : (selectedBranchCode.startsWith('class-') ? 3 : 5);

  const currentData = useMemo(() => {
    if (selectedBranchCode === 'all') return areaTotal;
    if (selectedBranchCode.startsWith('class-')) {
      const cls = selectedBranchCode.replace('class-', '');
      const clsBranches = fundingBranches.filter(b => b.class === cls);
      
      const total: FundingBranch = {
        code: `class-${cls}`,
        class: cls,
        name: `Kelas ${cls}`,
        lagging: {
          tabungan: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
          giro: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
          deposito: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
        },
        leading: {
          newCifTabungan: { today: 0, target: 0, percentTarget: 0 },
          newCifGiro: { today: 0, target: 0, percentTarget: 0 },
          newCifTabunganBisnis: { today: 0, target: 0, percentTarget: 0 },
          newToPriority: { today: 0, target: 0, percentTarget: 0 },
        }
      };

      clsBranches.forEach(b => {
        (['tabungan', 'giro', 'deposito'] as const).forEach(type => {
          total.lagging[type].today += b.lagging[type].today;
          total.lagging[type].wtd += b.lagging[type].wtd;
          total.lagging[type].mtd += b.lagging[type].mtd;
          total.lagging[type].ytd += b.lagging[type].ytd;
          total.lagging[type].yoy += b.lagging[type].yoy;
          total.lagging[type].target += b.lagging[type].target;
        });
        (['newCifTabungan', 'newCifGiro', 'newCifTabunganBisnis', 'newToPriority'] as const).forEach(type => {
          total.leading[type].today += b.leading[type].today;
          total.leading[type].target += b.leading[type].target;
        });
      });

      (['tabungan', 'giro', 'deposito'] as const).forEach(type => {
        total.lagging[type].percentTarget = total.lagging[type].target > 0 ? (total.lagging[type].today / total.lagging[type].target) * 100 : 0;
      });
      (['newCifTabungan', 'newCifGiro', 'newCifTabunganBisnis', 'newToPriority'] as const).forEach(type => {
        total.leading[type].percentTarget = total.leading[type].target > 0 ? (total.leading[type].today / total.leading[type].target) * 100 : 0;
      });

      return total;
    }
    return fundingBranches.find(b => b.code === selectedBranchCode) || areaTotal;
  }, [selectedBranchCode, areaTotal]);

  const chartData = useMemo(() => {
    if (selectedBranchCode !== 'all' && !selectedBranchCode.startsWith('class-')) {
      const branch = currentData;
      if (!branch) return [];
      
      if (chartProduct === 'all') {
        if (chartDataType === 'lagging') {
          return [
            { name: 'Tabungan', value: branch.lagging.tabungan[chartMetric as 'today' | 'percentTarget'], fill: '#003D79' },
            { name: 'Giro', value: branch.lagging.giro[chartMetric as 'today' | 'percentTarget'], fill: '#F2A900' },
            { name: 'Deposito', value: branch.lagging.deposito[chartMetric as 'today' | 'percentTarget'], fill: '#059669' }
          ];
        } else {
          return [
            { name: 'New CIF Tabungan', value: branch.leading.newCifTabungan[chartMetric as 'today' | 'percentTarget'], fill: '#003D79' },
            { name: 'New CIF Giro', value: branch.leading.newCifGiro[chartMetric as 'today' | 'percentTarget'], fill: '#F2A900' },
            { name: 'New CIF Tab. Bisnis', value: branch.leading.newCifTabunganBisnis[chartMetric as 'today' | 'percentTarget'], fill: '#059669' },
            { name: 'New to Priority', value: branch.leading.newToPriority[chartMetric as 'today' | 'percentTarget'], fill: '#4F46E5' }
          ];
        }
      } else {
        let val = 0;
        let fill = '#003D79';
        let name = '';
        if (chartDataType === 'lagging') {
          val = branch.lagging[chartProduct as keyof typeof branch.lagging][chartMetric as 'today' | 'percentTarget'];
          if (chartProduct === 'tabungan') { fill = '#003D79'; name = 'Tabungan'; }
          if (chartProduct === 'giro') { fill = '#F2A900'; name = 'Giro'; }
          if (chartProduct === 'deposito') { fill = '#059669'; name = 'Deposito'; }
        } else {
          val = branch.leading[chartProduct as keyof typeof branch.leading][chartMetric as 'today' | 'percentTarget'];
          if (chartProduct === 'newCifTabungan') { fill = '#003D79'; name = 'New CIF Tabungan'; }
          if (chartProduct === 'newCifGiro') { fill = '#F2A900'; name = 'New CIF Giro'; }
          if (chartProduct === 'newCifTabunganBisnis') { fill = '#059669'; name = 'New CIF Tab. Bisnis'; }
          if (chartProduct === 'newToPriority') { fill = '#4F46E5'; name = 'New to Priority'; }
        }
        
        return [{
          name: name,
          value: val,
          fill: fill
        }];
      }
    }

    let sourceBranches = fundingBranches;
    if (selectedBranchCode !== 'all' && selectedBranchCode.startsWith('class-')) {
      const cls = selectedBranchCode.replace('class-', '');
      sourceBranches = fundingBranches.filter(b => b.class === cls);
    }

    let sorted = [...sourceBranches].sort((a, b) => {
      let aVal = 0;
      let bVal = 0;
      if (chartDataType === 'lagging') {
        aVal = a.lagging[chartProduct as keyof typeof a.lagging][chartMetric as 'today' | 'percentTarget'];
        bVal = b.lagging[chartProduct as keyof typeof b.lagging][chartMetric as 'today' | 'percentTarget'];
      } else {
        aVal = a.leading[chartProduct as keyof typeof a.leading][chartMetric as 'today' | 'percentTarget'];
        bVal = b.leading[chartProduct as keyof typeof b.leading][chartMetric as 'today' | 'percentTarget'];
      }
      return bVal - aVal;
    });

    let result: any[] = [];
    
    if (chartView === 'top') {
      result = sorted.slice(0, topN).map(b => {
        let val = 0;
        if (chartDataType === 'lagging') {
          val = b.lagging[chartProduct as keyof typeof b.lagging][chartMetric as 'today' | 'percentTarget'];
        } else {
          val = b.leading[chartProduct as keyof typeof b.leading][chartMetric as 'today' | 'percentTarget'];
        }
        return {
          name: b.name.replace('Jakarta ', ''),
          value: val,
          fill: '#003D79'
        };
      });
    } else if (chartView === 'bottom') {
      result = sorted.slice(-topN).reverse().map(b => {
        let val = 0;
        if (chartDataType === 'lagging') {
          val = b.lagging[chartProduct as keyof typeof b.lagging][chartMetric as 'today' | 'percentTarget'];
        } else {
          val = b.leading[chartProduct as keyof typeof b.leading][chartMetric as 'today' | 'percentTarget'];
        }
        return {
          name: b.name.replace('Jakarta ', ''),
          value: val,
          fill: '#F43F5E'
        };
      });
    } else {
      const topData = sorted.slice(0, topN).map(b => {
        let val = 0;
        if (chartDataType === 'lagging') {
          val = b.lagging[chartProduct as keyof typeof b.lagging][chartMetric as 'today' | 'percentTarget'];
        } else {
          val = b.leading[chartProduct as keyof typeof b.leading][chartMetric as 'today' | 'percentTarget'];
        }
        return {
          code: b.code,
          name: b.name.replace('Jakarta ', ''),
          value: val,
          fill: '#003D79'
        };
      });
      const bottomData = sorted.slice(-topN).map(b => {
        let val = 0;
        if (chartDataType === 'lagging') {
          val = b.lagging[chartProduct as keyof typeof b.lagging][chartMetric as 'today' | 'percentTarget'];
        } else {
          val = b.leading[chartProduct as keyof typeof b.leading][chartMetric as 'today' | 'percentTarget'];
        }
        return {
          code: b.code,
          name: b.name.replace('Jakarta ', ''),
          value: val,
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
  }, [selectedBranchCode, chartDataType, chartProduct, chartMetric, chartView]);

  const formatCurrency = (value: number) => {
    const formatted = new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(value);
    return `Rp ${formatted} Jt`;
  };

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
    const branch = fundingBranches.find(b => b.code === selectedBranchCode);
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
          aValue = a[sortConfig.key as keyof FundingBranch];
          bValue = b[sortConfig.key as keyof FundingBranch];
        } else if (activeTab === 'all') {
          aValue = getNestedValue(a, sortConfig.key);
          bValue = getNestedValue(b, sortConfig.key);
        } else if (activeTab === 'lagging') {
          aValue = a.lagging[laggingPortfolio][sortConfig.key as keyof FundingLagging];
          bValue = b.lagging[laggingPortfolio][sortConfig.key as keyof FundingLagging];
        } else {
          aValue = getNestedValue(a.leading, sortConfig.key);
          bValue = getNestedValue(b.leading, sortConfig.key);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredBranches, sortConfig, activeTab, laggingPortfolio]);

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

  const StatCard = ({ title, value, icon: Icon, colorClass, isCurrency = true }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
      <div className={`p-4 rounded-lg ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">
          {isCurrency ? formatCurrency(value) : formatNumber(value)}
        </h3>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-slate-50 overflow-y-auto">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#003D79]">Funding</h2>
            <p className="text-xs text-slate-500 italic mt-1">{positionDateTexts.funding}</p>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm border border-slate-200">
            <span className="text-sm font-medium text-slate-600 pl-2">Filter Portofolio:</span>
            <select 
              className="bg-slate-50 border border-slate-200 text-sm rounded-md py-1.5 px-3 outline-none focus:ring-2 focus:ring-[#003D79]"
              value={selectedBranchCode}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedBranchCode(val);
                if (val !== 'all' && !val.startsWith('class-')) {
                  setChartProduct('all');
                } else if (chartProduct === 'all') {
                  setChartProduct(chartDataType === 'lagging' ? 'tabungan' : 'newCifTabungan');
                }
              }}
            >
              <option value="all">Area Jakarta Tebet Supomo</option>
              <option value="class-B.1">Kelas B.1</option>
              <option value="class-B.2">Kelas B.2</option>
              <option value="class-B.3">Kelas B.3</option>
              <option value="class-B.4">Kelas B.4</option>
              <optgroup label="Cabang Kelas B.1">
                {fundingBranches.filter(b => b.class === 'B.1').map(b => (
                  <option key={b.code} value={b.code}>{b.code} - {b.name}</option>
                ))}
              </optgroup>
              <optgroup label="Cabang Kelas B.2">
                {fundingBranches.filter(b => b.class === 'B.2').map(b => (
                  <option key={b.code} value={b.code}>{b.code} - {b.name}</option>
                ))}
              </optgroup>
              <optgroup label="Cabang Kelas B.3">
                {fundingBranches.filter(b => b.class === 'B.3').map(b => (
                  <option key={b.code} value={b.code}>{b.code} - {b.name}</option>
                ))}
              </optgroup>
              <optgroup label="Cabang Kelas B.4">
                {fundingBranches.filter(b => b.class === 'B.4').map(b => (
                  <option key={b.code} value={b.code}>{b.code} - {b.name}</option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'all' 
                ? 'border-[#003D79] text-[#003D79]' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('all')}
          >
            Data All
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'lagging' 
                ? 'border-[#003D79] text-[#003D79]' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('lagging')}
          >
            Data Lagging
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'leading' 
                ? 'border-[#003D79] text-[#003D79]' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('leading')}
          >
            Data Leading
          </button>
        </div>

        {activeTab === 'all' && (
          <div className="space-y-6">
            {/* Chart Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-lg font-bold text-slate-800">
                  {selectedBranchCode === 'all' || selectedBranchCode.startsWith('class-')
                    ? `${chartView === 'top' ? `Top ${topN}` : chartView === 'bottom' ? `Bottom ${topN}` : `Top & Bottom ${topN}`} Cabang` 
                    : `Komposisi ${getTableTitle()}`}
                </h3>
                
                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  {selectedBranchCode === 'all' || selectedBranchCode.startsWith('class-') ? (
                    <select 
                      className="bg-slate-50 border border-slate-200 text-sm rounded-md py-1 px-2 outline-none focus:ring-2 focus:ring-[#003D79]"
                      value={chartView}
                      onChange={(e) => setChartView(e.target.value as 'top' | 'bottom' | 'both')}
                    >
                      <option value="top">Top {topN}</option>
                      <option value="bottom">Bottom {topN}</option>
                      <option value="both">Top & Bottom {topN}</option>
                    </select>
                  ) : null}
                  <select 
                    className="bg-slate-50 border border-slate-200 text-sm rounded-md py-1 px-2 outline-none focus:ring-2 focus:ring-[#003D79]"
                    value={chartDataType}
                    onChange={(e) => {
                      const newType = e.target.value as 'lagging' | 'leading';
                      setChartDataType(newType);
                      if (selectedBranchCode !== 'all' && !selectedBranchCode.startsWith('class-')) {
                        setChartProduct('all');
                      } else {
                        setChartProduct(newType === 'lagging' ? 'tabungan' : 'newCifTabungan');
                      }
                    }}
                  >
                    <option value="lagging">Data Lagging</option>
                    <option value="leading">Data Leading</option>
                  </select>
                  <select 
                    className="bg-slate-50 border border-slate-200 text-sm rounded-md py-1 px-2 outline-none focus:ring-2 focus:ring-[#003D79]"
                    value={chartProduct}
                    onChange={(e) => setChartProduct(e.target.value)}
                  >
                    {selectedBranchCode !== 'all' && !selectedBranchCode.startsWith('class-') && <option value="all">Semua Portofolio</option>}
                    {chartDataType === 'lagging' ? (
                      <>
                        <option value="tabungan">Tabungan</option>
                        <option value="giro">Giro</option>
                        <option value="deposito">Deposito</option>
                      </>
                    ) : (
                      <>
                        <option value="newCifTabungan">New CIF Tabungan</option>
                        <option value="newCifGiro">New CIF Giro</option>
                        <option value="newCifTabunganBisnis">New CIF Tab. Bisnis</option>
                        <option value="newToPriority">New to Priority</option>
                      </>
                    )}
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
                      tickFormatter={(value) => chartMetric === 'percentTarget' ? `${value}%` : (chartDataType === 'lagging' ? `Rp ${value} Jt` : (value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value))}
                    />
                    <Tooltip 
                      cursor={{ fill: '#F1F5F9' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number) => [
                        chartMetric === 'percentTarget' ? formatPercent(value) : (chartDataType === 'lagging' ? formatCurrency(value) : formatNumber(value)), 
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

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">
                  {getTableTitle()}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th rowSpan={3} className="px-4 py-4 font-medium border-r border-slate-200 cursor-pointer hover:bg-slate-100" onClick={() => requestSort('code')}>
                        <div className="flex items-center">Kode <SortIcon columnKey="code" /></div>
                      </th>
                      <th rowSpan={3} className="px-4 py-4 font-medium border-r border-slate-200 cursor-pointer hover:bg-slate-100" onClick={() => requestSort('name')}>
                        <div className="flex items-center">Cabang <SortIcon columnKey="name" /></div>
                      </th>
                      <th rowSpan={3} className="px-4 py-4 font-medium border-r border-slate-200 cursor-pointer hover:bg-slate-100" onClick={() => requestSort('class')}>
                        <div className="flex items-center">Kelas <SortIcon columnKey="class" /></div>
                      </th>
                      <th colSpan={9} className="px-4 py-2 font-medium text-center border-r border-slate-200 border-b border-slate-200 bg-slate-100">Lagging</th>
                      <th colSpan={12} className="px-4 py-2 font-medium text-center border-b border-slate-200 bg-slate-100">Leading</th>
                    </tr>
                    <tr>
                      {/* Lagging Sub-headers */}
                      <th colSpan={3} className="px-4 py-2 font-medium text-center border-r border-slate-200 border-b border-slate-200 bg-blue-50/50">Tabungan</th>
                      <th colSpan={3} className="px-4 py-2 font-medium text-center border-r border-slate-200 border-b border-slate-200 bg-yellow-50/50">Giro</th>
                      <th colSpan={3} className="px-4 py-2 font-medium text-center border-r border-slate-200 border-b border-slate-200 bg-emerald-50/50">Deposito</th>
                      {/* Leading Sub-headers */}
                      <th colSpan={3} className="px-4 py-2 font-medium text-center border-r border-slate-200 border-b border-slate-200 bg-blue-50/50">Tabungan</th>
                      <th colSpan={3} className="px-4 py-2 font-medium text-center border-r border-slate-200 border-b border-slate-200 bg-yellow-50/50">Giro</th>
                      <th colSpan={3} className="px-4 py-2 font-medium text-center border-r border-slate-200 border-b border-slate-200 bg-emerald-50/50">Tab. Bisnis</th>
                      <th colSpan={3} className="px-4 py-2 font-medium text-center border-b border-slate-200 bg-indigo-50/50">NTP</th>
                    </tr>
                    <tr>
                      {/* Lagging - Tabungan */}
                      <th className="px-4 py-2 font-medium text-right bg-blue-50/30 cursor-pointer hover:bg-blue-100/50" onClick={() => requestSort('lagging.tabungan.today')}>
                        <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey="lagging.tabungan.today" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-blue-50/30 cursor-pointer hover:bg-blue-100/50" onClick={() => requestSort('lagging.tabungan.target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="lagging.tabungan.target" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right border-r border-slate-200 bg-blue-50/30 cursor-pointer hover:bg-blue-100/50" onClick={() => requestSort('lagging.tabungan.percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="lagging.tabungan.percentTarget" /></div>
                      </th>
                      {/* Lagging - Giro */}
                      <th className="px-4 py-2 font-medium text-right bg-yellow-50/30 cursor-pointer hover:bg-yellow-100/50" onClick={() => requestSort('lagging.giro.today')}>
                        <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey="lagging.giro.today" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-yellow-50/30 cursor-pointer hover:bg-yellow-100/50" onClick={() => requestSort('lagging.giro.target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="lagging.giro.target" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right border-r border-slate-200 bg-yellow-50/30 cursor-pointer hover:bg-yellow-100/50" onClick={() => requestSort('lagging.giro.percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="lagging.giro.percentTarget" /></div>
                      </th>
                      {/* Lagging - Deposito */}
                      <th className="px-4 py-2 font-medium text-right bg-emerald-50/30 cursor-pointer hover:bg-emerald-100/50" onClick={() => requestSort('lagging.deposito.today')}>
                        <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey="lagging.deposito.today" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-emerald-50/30 cursor-pointer hover:bg-emerald-100/50" onClick={() => requestSort('lagging.deposito.target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="lagging.deposito.target" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right border-r border-slate-200 bg-emerald-50/30 cursor-pointer hover:bg-emerald-100/50" onClick={() => requestSort('lagging.deposito.percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="lagging.deposito.percentTarget" /></div>
                      </th>
                      {/* Leading - Tabungan */}
                      <th className="px-4 py-2 font-medium text-right bg-blue-50/30 cursor-pointer hover:bg-blue-100/50" onClick={() => requestSort('leading.newCifTabungan.today')}>
                        <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey="leading.newCifTabungan.today" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-blue-50/30 cursor-pointer hover:bg-blue-100/50" onClick={() => requestSort('leading.newCifTabungan.target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="leading.newCifTabungan.target" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right border-r border-slate-200 bg-blue-50/30 cursor-pointer hover:bg-blue-100/50" onClick={() => requestSort('leading.newCifTabungan.percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="leading.newCifTabungan.percentTarget" /></div>
                      </th>
                      {/* Leading - Giro */}
                      <th className="px-4 py-2 font-medium text-right bg-yellow-50/30 cursor-pointer hover:bg-yellow-100/50" onClick={() => requestSort('leading.newCifGiro.today')}>
                        <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey="leading.newCifGiro.today" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-yellow-50/30 cursor-pointer hover:bg-yellow-100/50" onClick={() => requestSort('leading.newCifGiro.target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="leading.newCifGiro.target" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right border-r border-slate-200 bg-yellow-50/30 cursor-pointer hover:bg-yellow-100/50" onClick={() => requestSort('leading.newCifGiro.percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="leading.newCifGiro.percentTarget" /></div>
                      </th>
                      {/* Leading - Tab Bisnis */}
                      <th className="px-4 py-2 font-medium text-right bg-emerald-50/30 cursor-pointer hover:bg-emerald-100/50" onClick={() => requestSort('leading.newCifTabunganBisnis.today')}>
                        <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey="leading.newCifTabunganBisnis.today" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-emerald-50/30 cursor-pointer hover:bg-emerald-100/50" onClick={() => requestSort('leading.newCifTabunganBisnis.target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="leading.newCifTabunganBisnis.target" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right border-r border-slate-200 bg-emerald-50/30 cursor-pointer hover:bg-emerald-100/50" onClick={() => requestSort('leading.newCifTabunganBisnis.percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="leading.newCifTabunganBisnis.percentTarget" /></div>
                      </th>
                      {/* Leading - Priority */}
                      <th className="px-4 py-2 font-medium text-right bg-indigo-50/30 cursor-pointer hover:bg-indigo-100/50" onClick={() => requestSort('leading.newToPriority.today')}>
                        <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey="leading.newToPriority.today" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-indigo-50/30 cursor-pointer hover:bg-indigo-100/50" onClick={() => requestSort('leading.newToPriority.target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="leading.newToPriority.target" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-indigo-50/30 cursor-pointer hover:bg-indigo-100/50" onClick={() => requestSort('leading.newToPriority.percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="leading.newToPriority.percentTarget" /></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedBranches.map((branch) => (
                      <tr key={branch.code} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-800 border-r border-slate-100">{branch.code}</td>
                        <td className="px-4 py-3 font-medium text-slate-800 border-r border-slate-100">{branch.name.replace('Jakarta ', '')}</td>
                        <td className="px-4 py-3 font-medium text-slate-800 border-r border-slate-100">{branch.class}</td>
                        
                        {/* Tabungan */}
                        <td className="px-4 py-3 text-right text-[#003D79]">{formatCurrency(branch.lagging.tabungan.today)}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(branch.lagging.tabungan.target)}</td>
                        <td className="px-4 py-3 text-right font-medium border-r border-slate-100">{formatPercent(branch.lagging.tabungan.percentTarget)}</td>
                        
                        {/* Giro */}
                        <td className="px-4 py-3 text-right text-[#003D79]">{formatCurrency(branch.lagging.giro.today)}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(branch.lagging.giro.target)}</td>
                        <td className="px-4 py-3 text-right font-medium border-r border-slate-100">{formatPercent(branch.lagging.giro.percentTarget)}</td>
                        
                        {/* Deposito */}
                        <td className="px-4 py-3 text-right text-[#003D79]">{formatCurrency(branch.lagging.deposito.today)}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(branch.lagging.deposito.target)}</td>
                        <td className="px-4 py-3 text-right font-medium border-r border-slate-100">{formatPercent(branch.lagging.deposito.percentTarget)}</td>
                        
                        {/* Leading Tabungan */}
                        <td className="px-4 py-3 text-right text-[#003D79]">{formatNumber(branch.leading.newCifTabungan.today)}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatNumber(branch.leading.newCifTabungan.target)}</td>
                        <td className="px-4 py-3 text-right font-medium border-r border-slate-100">{formatPercent(branch.leading.newCifTabungan.percentTarget)}</td>
                        
                        {/* Leading Giro */}
                        <td className="px-4 py-3 text-right text-[#F2A900]">{formatNumber(branch.leading.newCifGiro.today)}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatNumber(branch.leading.newCifGiro.target)}</td>
                        <td className="px-4 py-3 text-right font-medium border-r border-slate-100">{formatPercent(branch.leading.newCifGiro.percentTarget)}</td>
                        
                        {/* Leading Tab Bisnis */}
                        <td className="px-4 py-3 text-right text-emerald-600">{formatNumber(branch.leading.newCifTabunganBisnis.today)}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatNumber(branch.leading.newCifTabunganBisnis.target)}</td>
                        <td className="px-4 py-3 text-right font-medium border-r border-slate-100">{formatPercent(branch.leading.newCifTabunganBisnis.percentTarget)}</td>
                        
                        {/* Leading Priority */}
                        <td className="px-4 py-3 text-right text-indigo-600">{formatNumber(branch.leading.newToPriority.today)}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatNumber(branch.leading.newToPriority.target)}</td>
                        <td className="px-4 py-3 text-right font-medium">{formatPercent(branch.leading.newToPriority.percentTarget)}</td>
                      </tr>
                    ))}
                    {/* Total Row */}
                    <tr className="bg-slate-100 font-bold border-t-2 border-slate-200">
                      <td colSpan={3} className="px-4 py-4 text-slate-800 border-r border-slate-200">
                        TOTAL {selectedBranchCode === 'all' ? 'AREA JAKARTA TEBET SUPOMO' : (selectedBranchCode.startsWith('class-') ? `KELAS ${selectedBranchCode.replace('class-', '')}` : currentData.name.toUpperCase())}
                      </td>
                      
                      {/* Tabungan */}
                      <td className="px-4 py-4 text-right text-[#003D79]">{formatCurrency(currentData.lagging.tabungan.today)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatCurrency(currentData.lagging.tabungan.target)}</td>
                      <td className="px-4 py-4 text-right border-r border-slate-200">{formatPercent(currentData.lagging.tabungan.percentTarget)}</td>
                      
                      {/* Giro */}
                      <td className="px-4 py-4 text-right text-[#003D79]">{formatCurrency(currentData.lagging.giro.today)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatCurrency(currentData.lagging.giro.target)}</td>
                      <td className="px-4 py-4 text-right border-r border-slate-200">{formatPercent(currentData.lagging.giro.percentTarget)}</td>
                      
                      {/* Deposito */}
                      <td className="px-4 py-4 text-right text-[#003D79]">{formatCurrency(currentData.lagging.deposito.today)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatCurrency(currentData.lagging.deposito.target)}</td>
                      <td className="px-4 py-4 text-right border-r border-slate-200">{formatPercent(currentData.lagging.deposito.percentTarget)}</td>
                      
                      {/* Leading Tabungan */}
                      <td className="px-4 py-4 text-right text-[#003D79]">{formatNumber(currentData.leading.newCifTabungan.today)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatNumber(currentData.leading.newCifTabungan.target)}</td>
                      <td className="px-4 py-4 text-right border-r border-slate-200">{formatPercent(currentData.leading.newCifTabungan.percentTarget)}</td>
                      
                      {/* Leading Giro */}
                      <td className="px-4 py-4 text-right text-[#F2A900]">{formatNumber(currentData.leading.newCifGiro.today)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatNumber(currentData.leading.newCifGiro.target)}</td>
                      <td className="px-4 py-4 text-right border-r border-slate-200">{formatPercent(currentData.leading.newCifGiro.percentTarget)}</td>
                      
                      {/* Leading Tab Bisnis */}
                      <td className="px-4 py-4 text-right text-emerald-600">{formatNumber(currentData.leading.newCifTabunganBisnis.today)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatNumber(currentData.leading.newCifTabunganBisnis.target)}</td>
                      <td className="px-4 py-4 text-right border-r border-slate-200">{formatPercent(currentData.leading.newCifTabunganBisnis.percentTarget)}</td>
                      
                      {/* Leading Priority */}
                      <td className="px-4 py-4 text-right text-indigo-600">{formatNumber(currentData.leading.newToPriority.today)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatNumber(currentData.leading.newToPriority.target)}</td>
                      <td className="px-4 py-4 text-right">{formatPercent(currentData.leading.newToPriority.percentTarget)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lagging' && (
          <div className="space-y-6">
            {/* Portfolio Selector */}
            <div className="flex flex-wrap gap-2">
              {(['tabungan', 'giro', 'deposito'] as const).map((port) => (
                <button
                  key={port}
                  onClick={() => setLaggingPortfolio(port)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                    laggingPortfolio === port
                      ? laggingThemes[port].active
                      : laggingThemes[port].inactive
                  }`}
                >
                  {port.charAt(0).toUpperCase() + port.slice(1)}
                </button>
              ))}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                title={`Dana Hari Ini (${laggingPortfolio.toUpperCase()})`}
                value={currentData.lagging[laggingPortfolio].today} 
                icon={Wallet} 
                colorClass="bg-blue-100 text-[#003D79]" 
              />
              <StatCard 
                title="Target April 26" 
                value={currentData.lagging[laggingPortfolio].target} 
                icon={Target} 
                colorClass="bg-slate-100 text-slate-600" 
              />
              <StatCard 
                title="Year to Date (YtD)" 
                value={currentData.lagging[laggingPortfolio].ytd} 
                icon={TrendingUp} 
                colorClass={currentData.lagging[laggingPortfolio].ytd >= 0 ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"} 
              />
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-4 rounded-lg bg-indigo-100 text-indigo-600">
                  <PieChart size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">% Thd Target Apr 26</p>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {formatPercent(currentData.lagging[laggingPortfolio].percentTarget)}
                  </h3>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">
                  Detail {getTableTitle()} - {laggingPortfolio.charAt(0).toUpperCase() + laggingPortfolio.slice(1)}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors" onClick={() => requestSort('code')}>
                        <div className="flex items-center">Kode <SortIcon columnKey="code" /></div>
                      </th>
                      <th className="px-4 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors" onClick={() => requestSort('name')}>
                        <div className="flex items-center">Cabang <SortIcon columnKey="name" /></div>
                      </th>
                      <th className="px-4 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors" onClick={() => requestSort('class')}>
                        <div className="flex items-center">Kelas <SortIcon columnKey="class" /></div>
                      </th>
                      <th className="px-4 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors text-right" onClick={() => requestSort('today')}>
                        <div className="flex items-center justify-end">14 April 2026 <SortIcon columnKey="today" /></div>
                      </th>
                      <th className="px-4 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors text-right" onClick={() => requestSort('wtd')}>
                        <div className="flex items-center justify-end">WTD <SortIcon columnKey="wtd" /></div>
                      </th>
                      <th className="px-4 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors text-right" onClick={() => requestSort('mtd')}>
                        <div className="flex items-center justify-end">MtD <SortIcon columnKey="mtd" /></div>
                      </th>
                      <th className="px-4 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors text-right" onClick={() => requestSort('ytd')}>
                        <div className="flex items-center justify-end">YtD <SortIcon columnKey="ytd" /></div>
                      </th>
                      <th className="px-4 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors text-right" onClick={() => requestSort('yoy')}>
                        <div className="flex items-center justify-end">YoY <SortIcon columnKey="yoy" /></div>
                      </th>
                      <th className="px-4 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors text-right" onClick={() => requestSort('target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="target" /></div>
                      </th>
                      <th className="px-4 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors text-right" onClick={() => requestSort('percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="percentTarget" /></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedBranches.map((branch) => {
                      const data = branch.lagging[laggingPortfolio];
                      return (
                        <tr key={branch.code} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-3 font-medium text-slate-800">{branch.code}</td>
                          <td className="px-4 py-3 font-medium text-slate-800">{branch.name.replace('Jakarta ', '')}</td>
                          <td className="px-4 py-3 font-medium text-slate-800">{branch.class}</td>
                          <td className="px-4 py-3 text-right font-medium text-[#003D79]">{formatCurrency(data.today)}</td>
                          <td className={`px-4 py-3 text-right ${data.wtd < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{formatCurrency(data.wtd)}</td>
                          <td className={`px-4 py-3 text-right ${data.mtd < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{formatCurrency(data.mtd)}</td>
                          <td className={`px-4 py-3 text-right ${data.ytd < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{formatCurrency(data.ytd)}</td>
                          <td className={`px-4 py-3 text-right ${data.yoy < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{formatCurrency(data.yoy)}</td>
                          <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(data.target)}</td>
                          <td className="px-4 py-3 text-right font-medium">{formatPercent(data.percentTarget)}</td>
                        </tr>
                      );
                    })}
                    {/* Total Row */}
                    <tr className="bg-slate-100 font-bold border-t-2 border-slate-200">
                      <td colSpan={3} className="px-4 py-4 text-slate-800">
                        TOTAL {selectedBranchCode === 'all' ? 'AREA JAKARTA TEBET SUPOMO' : (selectedBranchCode.startsWith('class-') ? `KELAS ${selectedBranchCode.replace('class-', '')}` : currentData.name.toUpperCase())}
                      </td>
                      <td className="px-4 py-4 text-right text-[#003D79]">{formatCurrency(currentData.lagging[laggingPortfolio].today)}</td>
                      <td className={`px-4 py-4 text-right ${currentData.lagging[laggingPortfolio].wtd < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{formatCurrency(currentData.lagging[laggingPortfolio].wtd)}</td>
                      <td className={`px-4 py-4 text-right ${currentData.lagging[laggingPortfolio].mtd < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{formatCurrency(currentData.lagging[laggingPortfolio].mtd)}</td>
                      <td className={`px-4 py-4 text-right ${currentData.lagging[laggingPortfolio].ytd < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{formatCurrency(currentData.lagging[laggingPortfolio].ytd)}</td>
                      <td className={`px-4 py-4 text-right ${currentData.lagging[laggingPortfolio].yoy < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{formatCurrency(currentData.lagging[laggingPortfolio].yoy)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatCurrency(currentData.lagging[laggingPortfolio].target)}</td>
                      <td className="px-4 py-4 text-right">{formatPercent(currentData.lagging[laggingPortfolio].percentTarget)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leading' && (
          <div className="space-y-6">
            {/* Portfolio Selector */}
            <div className="flex flex-wrap gap-2">
              {(Object.keys(leadingThemes) as Array<keyof typeof leadingThemes>).map((port) => (
                <button
                  key={port}
                  onClick={() => setLeadingPortfolio(port)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                    leadingPortfolio === port
                      ? leadingThemes[port].active
                      : leadingThemes[port].inactive
                  }`}
                >
                  {leadingThemes[port].label}
                </button>
              ))}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard 
                title={`Realisasi Hari Ini (${leadingThemes[leadingPortfolio].label})`} 
                value={currentData.leading[leadingPortfolio].today} 
                icon={UserPlus} 
                colorClass={
                  leadingPortfolio === 'newCifTabungan' ? "bg-blue-100 text-[#003D79]" :
                  leadingPortfolio === 'newCifGiro' ? "bg-yellow-100 text-[#F2A900]" :
                  leadingPortfolio === 'newCifTabunganBisnis' ? "bg-emerald-100 text-emerald-600" :
                  "bg-indigo-100 text-indigo-600"
                } 
                isCurrency={false}
              />
              <StatCard 
                title="Target April 26" 
                value={currentData.leading[leadingPortfolio].target} 
                icon={Target} 
                colorClass="bg-slate-100 text-slate-600" 
                isCurrency={false}
              />
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-4 rounded-lg bg-indigo-100 text-indigo-600">
                  <PieChart size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">% Thd Target Apr 26</p>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {formatPercent(currentData.leading[leadingPortfolio].percentTarget)}
                  </h3>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">
                  Detail {getTableTitle()} - {leadingThemes[leadingPortfolio].label}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
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
                      <th className="px-6 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors text-right" onClick={() => requestSort(`${leadingPortfolio}.today`)}>
                        <div className="flex items-center justify-end">14 April 2026 <SortIcon columnKey={`${leadingPortfolio}.today`} /></div>
                      </th>
                      <th className="px-6 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors text-right" onClick={() => requestSort(`${leadingPortfolio}.target`)}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey={`${leadingPortfolio}.target`} /></div>
                      </th>
                      <th className="px-6 py-4 font-medium cursor-pointer group hover:bg-slate-100 transition-colors text-right" onClick={() => requestSort(`${leadingPortfolio}.percentTarget`)}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey={`${leadingPortfolio}.percentTarget`} /></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedBranches.map((branch) => {
                      const data = branch.leading[leadingPortfolio];
                      return (
                        <tr key={branch.code} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-3 font-medium text-slate-800">{branch.code}</td>
                          <td className="px-6 py-3 font-medium text-slate-800">{branch.name.replace('Jakarta ', '')}</td>
                          <td className="px-6 py-3 font-medium text-slate-800">{branch.class}</td>
                          <td className={`px-6 py-3 text-right font-medium ${
                            leadingPortfolio === 'newCifTabungan' ? 'text-[#003D79]' :
                            leadingPortfolio === 'newCifGiro' ? 'text-[#F2A900]' :
                            leadingPortfolio === 'newCifTabunganBisnis' ? 'text-emerald-600' :
                            'text-indigo-600'
                          }`}>{formatNumber(data.today)}</td>
                          <td className="px-6 py-3 text-right text-slate-600">{formatNumber(data.target)}</td>
                          <td className="px-6 py-3 text-right font-medium">{formatPercent(data.percentTarget)}</td>
                        </tr>
                      );
                    })}
                    {/* Total Row */}
                    <tr className="bg-slate-100 font-bold border-t-2 border-slate-200">
                      <td colSpan={3} className="px-6 py-4 text-slate-800">
                        TOTAL {selectedBranchCode === 'all' ? 'AREA JAKARTA TEBET SUPOMO' : (selectedBranchCode.startsWith('class-') ? `KELAS ${selectedBranchCode.replace('class-', '')}` : currentData.name.toUpperCase())}
                      </td>
                      <td className={`px-6 py-4 text-right ${
                        leadingPortfolio === 'newCifTabungan' ? 'text-[#003D79]' :
                        leadingPortfolio === 'newCifGiro' ? 'text-[#F2A900]' :
                        leadingPortfolio === 'newCifTabunganBisnis' ? 'text-emerald-600' :
                        'text-indigo-600'
                      }`}>{formatNumber(currentData.leading[leadingPortfolio].today)}</td>
                      <td className="px-6 py-4 text-right text-slate-600">{formatNumber(currentData.leading[leadingPortfolio].target)}</td>
                      <td className="px-6 py-4 text-right">{formatPercent(currentData.leading[leadingPortfolio].percentTarget)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
