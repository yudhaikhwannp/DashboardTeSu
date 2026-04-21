import React, { useState, useMemo } from 'react';
import { 
  ArrowUpDown, 
  ChevronUp, 
  ChevronDown,
  Wallet,
  Target,
  TrendingUp,
  FileCheck,
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
import { kreditBranches, getKreditAreaTotal, KreditBranch, KreditMetrics } from '../data/mockData';

export function KreditRetailDashboard() {
  const [selectedBranchCode, setSelectedBranchCode] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'lagging' | 'leading'>('all');
  const [laggingPortfolio, setLaggingPortfolio] = useState<'sme' | 'cl' | 'ksm' | 'cc' | 'micro'>('sme');
  const [leadingPortfolio, setLeadingPortfolio] = useState<'bookingSME' | 'bookingCL' | 'bookingKSM' | 'bookingCC' | 'bookingMicro'>('bookingSME');
  
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const [chartDataType, setChartDataType] = useState<'lagging' | 'leading'>('lagging');
  const [chartProduct, setChartProduct] = useState<string>('sme');
  const [chartMetric, setChartMetric] = useState<'today' | 'percentTarget'>('today');
  const [chartView, setChartView] = useState<'top' | 'bottom' | 'both'>('both');

  const areaTotal = useMemo(() => getKreditAreaTotal(), []);
  
  const laggingThemes = {
    sme: { label: 'SME', active: 'bg-[#003D79] text-white border-[#003D79]', inactive: 'bg-white text-[#003D79] border-blue-200 hover:bg-blue-50', headerBg: 'bg-blue-50/50', text: 'text-[#003D79]' },
    cl: { label: 'CL', active: 'bg-[#F2A900] text-white border-[#F2A900]', inactive: 'bg-white text-[#F2A900] border-yellow-200 hover:bg-yellow-50', headerBg: 'bg-yellow-50/50', text: 'text-[#F2A900]' },
    ksm: { label: 'KSM', active: 'bg-emerald-600 text-white border-emerald-600', inactive: 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50', headerBg: 'bg-emerald-50/50', text: 'text-emerald-600' },
    cc: { label: 'CC', active: 'bg-indigo-600 text-white border-indigo-600', inactive: 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50', headerBg: 'bg-indigo-50/50', text: 'text-indigo-600' },
    micro: { label: 'Micro', active: 'bg-purple-600 text-white border-purple-600', inactive: 'bg-white text-purple-600 border-purple-200 hover:bg-purple-50', headerBg: 'bg-purple-50/50', text: 'text-purple-600' },
  };

  const leadingThemes = {
    bookingSME: { label: 'Booking SME', active: 'bg-[#003D79] text-white border-[#003D79]', inactive: 'bg-white text-[#003D79] border-blue-200 hover:bg-blue-50', headerBg: 'bg-blue-50/50', text: 'text-[#003D79]' },
    bookingCL: { label: 'Booking CL', active: 'bg-[#F2A900] text-white border-[#F2A900]', inactive: 'bg-white text-[#F2A900] border-yellow-200 hover:bg-yellow-50', headerBg: 'bg-yellow-50/50', text: 'text-[#F2A900]' },
    bookingKSM: { label: 'Booking KSM', active: 'bg-emerald-600 text-white border-emerald-600', inactive: 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50', headerBg: 'bg-emerald-50/50', text: 'text-emerald-600' },
    bookingCC: { label: 'Booking CC', active: 'bg-indigo-600 text-white border-indigo-600', inactive: 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50', headerBg: 'bg-indigo-50/50', text: 'text-indigo-600' },
    bookingMicro: { label: 'Booking Micro', active: 'bg-purple-600 text-white border-purple-600', inactive: 'bg-white text-purple-600 border-purple-200 hover:bg-purple-50', headerBg: 'bg-purple-50/50', text: 'text-purple-600' },
  };

  const filteredBranches = useMemo(() => {
    if (selectedBranchCode === 'all') return kreditBranches;
    if (selectedBranchCode.startsWith('class-')) {
      const cls = selectedBranchCode.replace('class-', '');
      return kreditBranches.filter(b => b.class === cls);
    }
    return kreditBranches.filter(b => b.code === selectedBranchCode);
  }, [selectedBranchCode]);

  const currentData = useMemo(() => {
    if (selectedBranchCode === 'all') return areaTotal;
    if (selectedBranchCode.startsWith('class-')) {
      const cls = selectedBranchCode.replace('class-', '');
      const clsBranches = kreditBranches.filter(b => b.class === cls);
      
      const total: KreditBranch = {
        code: `class-${cls}`,
        class: cls,
        name: `Kelas ${cls}`,
        lagging: {
          sme: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
          cl: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
          ksm: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
          cc: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
          micro: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
        },
        leading: {
          bookingSME: { today: 0, target: 0, percentTarget: 0 },
          bookingCL: { today: 0, target: 0, percentTarget: 0 },
          bookingKSM: { today: 0, target: 0, percentTarget: 0 },
          bookingCC: { today: 0, target: 0, percentTarget: 0 },
          bookingMicro: { today: 0, target: 0, percentTarget: 0 },
        }
      };

      clsBranches.forEach(b => {
        (['sme', 'cl', 'ksm', 'cc', 'micro'] as const).forEach(type => {
          total.lagging[type].today += b.lagging[type].today;
          total.lagging[type].wtd += b.lagging[type].wtd;
          total.lagging[type].mtd += b.lagging[type].mtd;
          total.lagging[type].ytd += b.lagging[type].ytd;
          total.lagging[type].yoy += b.lagging[type].yoy;
          total.lagging[type].target += b.lagging[type].target;
        });
        (['bookingSME', 'bookingCL', 'bookingKSM', 'bookingCC', 'bookingMicro'] as const).forEach(type => {
          total.leading[type].today += b.leading[type].today;
          total.leading[type].target += b.leading[type].target;
        });
      });

      (['sme', 'cl', 'ksm', 'cc', 'micro'] as const).forEach(type => {
        total.lagging[type].percentTarget = total.lagging[type].target > 0 ? (total.lagging[type].today / total.lagging[type].target) * 100 : 0;
      });
      (['bookingSME', 'bookingCL', 'bookingKSM', 'bookingCC', 'bookingMicro'] as const).forEach(type => {
        total.leading[type].percentTarget = total.leading[type].target > 0 ? (total.leading[type].today / total.leading[type].target) * 100 : 0;
      });

      return total;
    }
    return kreditBranches.find(b => b.code === selectedBranchCode) || areaTotal;
  }, [selectedBranchCode, areaTotal]);

  const chartData = useMemo(() => {
    if (selectedBranchCode !== 'all' && !selectedBranchCode.startsWith('class-')) {
      const branch = currentData;
      if (!branch) return [];
      
      if (chartProduct === 'all') {
        if (chartDataType === 'lagging') {
          return [
            { name: 'SME', value: branch.lagging.sme[chartMetric as 'today' | 'percentTarget'], fill: '#003D79' },
            { name: 'CL', value: branch.lagging.cl[chartMetric as 'today' | 'percentTarget'], fill: '#F2A900' },
            { name: 'KSM', value: branch.lagging.ksm[chartMetric as 'today' | 'percentTarget'], fill: '#059669' },
            { name: 'CC', value: branch.lagging.cc[chartMetric as 'today' | 'percentTarget'], fill: '#4F46E5' },
            { name: 'Micro', value: branch.lagging.micro[chartMetric as 'today' | 'percentTarget'], fill: '#9333EA' }
          ];
        } else {
          return [
            { name: 'Booking SME', value: branch.leading.bookingSME[chartMetric as 'today' | 'percentTarget'], fill: '#003D79' },
            { name: 'Booking CL', value: branch.leading.bookingCL[chartMetric as 'today' | 'percentTarget'], fill: '#F2A900' },
            { name: 'Booking KSM', value: branch.leading.bookingKSM[chartMetric as 'today' | 'percentTarget'], fill: '#059669' },
            { name: 'Booking CC', value: branch.leading.bookingCC[chartMetric as 'today' | 'percentTarget'], fill: '#4F46E5' },
            { name: 'Booking Micro', value: branch.leading.bookingMicro[chartMetric as 'today' | 'percentTarget'], fill: '#9333EA' }
          ];
        }
      } else {
        let val = 0;
        let fill = '#003D79';
        let name = '';
        if (chartDataType === 'lagging') {
          val = branch.lagging[chartProduct as keyof typeof branch.lagging][chartMetric as 'today' | 'percentTarget'];
          if (chartProduct === 'sme') { fill = '#003D79'; name = 'SME'; }
          if (chartProduct === 'cl') { fill = '#F2A900'; name = 'CL'; }
          if (chartProduct === 'ksm') { fill = '#059669'; name = 'KSM'; }
          if (chartProduct === 'cc') { fill = '#4F46E5'; name = 'CC'; }
          if (chartProduct === 'micro') { fill = '#9333EA'; name = 'Micro'; }
        } else {
          val = branch.leading[chartProduct as keyof typeof branch.leading][chartMetric as 'today' | 'percentTarget'];
          if (chartProduct === 'bookingSME') { fill = '#003D79'; name = 'Booking SME'; }
          if (chartProduct === 'bookingCL') { fill = '#F2A900'; name = 'Booking CL'; }
          if (chartProduct === 'bookingKSM') { fill = '#059669'; name = 'Booking KSM'; }
          if (chartProduct === 'bookingCC') { fill = '#4F46E5'; name = 'Booking CC'; }
          if (chartProduct === 'bookingMicro') { fill = '#9333EA'; name = 'Booking Micro'; }
        }
        
        return [{
          name: name,
          value: val,
          fill: fill
        }];
      }
    }

    let sourceBranches = kreditBranches;
    if (selectedBranchCode.startsWith('class-')) {
      const cls = selectedBranchCode.replace('class-', '');
      sourceBranches = kreditBranches.filter(b => b.class === cls);
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
      result = sorted.slice(0, 5).map(b => {
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
      result = sorted.slice(-5).reverse().map(b => {
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
      const top5 = sorted.slice(0, 5).map(b => {
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
      const bottom5 = sorted.slice(-5).reverse().map(b => {
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
      
      const combined = [...top5];
      bottom5.forEach(b => {
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
    const branch = kreditBranches.find(b => b.code === selectedBranchCode);
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
          aValue = a[sortConfig.key as keyof KreditBranch];
          bValue = b[sortConfig.key as keyof KreditBranch];
        } else if (activeTab === 'all') {
          aValue = getNestedValue(a, sortConfig.key);
          bValue = getNestedValue(b, sortConfig.key);
        } else if (activeTab === 'lagging') {
          aValue = a.lagging[laggingPortfolio][sortConfig.key as keyof KreditMetrics];
          bValue = b.lagging[laggingPortfolio][sortConfig.key as keyof KreditMetrics];
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
  }, [kreditBranches, sortConfig, activeTab, laggingPortfolio]);

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
            <h2 className="text-2xl font-bold text-[#003D79]">Kredit Retail</h2>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm border border-slate-200">
            <span className="text-sm font-medium text-slate-600 pl-2">Filter Portofolio:</span>
            <select 
              className="bg-slate-50 border border-slate-200 text-sm rounded-md py-1.5 px-3 outline-none focus:ring-2 focus:ring-[#003D79]"
              value={selectedBranchCode}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedBranchCode(val);
                if (val !== 'all') {
                  setChartProduct('all');
                } else if (chartProduct === 'all') {
                  setChartProduct(chartDataType === 'lagging' ? 'sme' : 'bookingSME');
                }
              }}
            >
              <option value="all">Area Jakarta Tebet Supomo</option>
              <option value="class-B.1">Kelas B.1</option>
              <option value="class-B.2">Kelas B.2</option>
              <option value="class-B.3">Kelas B.3</option>
              <option value="class-B.4">Kelas B.4</option>
              <optgroup label="Cabang Kelas B.1">
                {kreditBranches.filter(b => b.class === 'B.1').map(b => (
                  <option key={b.code} value={b.code}>{b.code} - {b.name}</option>
                ))}
              </optgroup>
              <optgroup label="Cabang Kelas B.2">
                {kreditBranches.filter(b => b.class === 'B.2').map(b => (
                  <option key={b.code} value={b.code}>{b.code} - {b.name}</option>
                ))}
              </optgroup>
              <optgroup label="Cabang Kelas B.3">
                {kreditBranches.filter(b => b.class === 'B.3').map(b => (
                  <option key={b.code} value={b.code}>{b.code} - {b.name}</option>
                ))}
              </optgroup>
              <optgroup label="Cabang Kelas B.4">
                {kreditBranches.filter(b => b.class === 'B.4').map(b => (
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
                    ? `${chartView === 'top' ? 'Top 5' : chartView === 'bottom' ? 'Bottom 5' : 'Top & Bottom 5'} Cabang` 
                    : chartProduct === 'all' 
                      ? `Komposisi ${getTableTitle()}` 
                      : (chartDataType === 'lagging' ? laggingThemes[chartProduct as keyof typeof laggingThemes].label : leadingThemes[chartProduct as keyof typeof leadingThemes].label)}
                </h3>
                
                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  <select 
                    className="bg-slate-50 border border-slate-200 text-sm rounded-md py-1 px-2 outline-none focus:ring-2 focus:ring-[#003D79]"
                    value={chartDataType}
                    onChange={(e) => {
                      const newType = e.target.value as 'lagging' | 'leading';
                      setChartDataType(newType);
                      if (selectedBranchCode !== 'all' && !selectedBranchCode.startsWith('class-')) {
                        setChartProduct('all');
                      } else {
                        setChartProduct(newType === 'lagging' ? 'sme' : 'bookingSME');
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
                        <option value="sme">SME</option>
                        <option value="cl">CL</option>
                        <option value="ksm">KSM</option>
                        <option value="cc">CC</option>
                        <option value="micro">Micro</option>
                      </>
                    ) : (
                      <>
                        <option value="bookingSME">Booking SME</option>
                        <option value="bookingCL">Booking CL</option>
                        <option value="bookingKSM">Booking KSM</option>
                        <option value="bookingCC">Booking CC</option>
                        <option value="bookingMicro">Booking Micro</option>
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
                  
                  {selectedBranchCode === 'all' || selectedBranchCode.startsWith('class-') ? (
                    <select 
                      className="bg-slate-50 border border-slate-200 text-sm rounded-md py-1 px-2 outline-none focus:ring-2 focus:ring-[#003D79]"
                      value={chartView}
                      onChange={(e) => setChartView(e.target.value as 'top' | 'bottom' | 'both')}
                    >
                      <option value="top">Top 5</option>
                      <option value="bottom">Bottom 5</option>
                      <option value="both">Top & Bottom 5</option>
                    </select>
                  ) : null}
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
                      <th colSpan={15} className="px-4 py-2 font-medium text-center border-r border-slate-200 border-b border-slate-200 bg-slate-100">Lagging</th>
                      <th colSpan={15} className="px-4 py-2 font-medium text-center border-b border-slate-200 bg-slate-100">Leading</th>
                    </tr>
                    <tr>
                      {/* Lagging Sub-headers */}
                      <th colSpan={3} className="px-4 py-2 font-medium text-center border-r border-slate-200 border-b border-slate-200 bg-blue-50/50">SME</th>
                      <th colSpan={3} className="px-4 py-2 font-medium text-center border-r border-slate-200 border-b border-slate-200 bg-yellow-50/50">CL</th>
                      <th colSpan={3} className="px-4 py-2 font-medium text-center border-r border-slate-200 border-b border-slate-200 bg-emerald-50/50">KSM</th>
                      <th colSpan={3} className="px-4 py-2 font-medium text-center border-r border-slate-200 border-b border-slate-200 bg-indigo-50/50">CC</th>
                      <th colSpan={3} className="px-4 py-2 font-medium text-center border-r border-slate-200 border-b border-slate-200 bg-purple-50/50">Micro</th>
                      {/* Leading Sub-headers */}
                      <th colSpan={3} className="px-4 py-2 font-medium text-center border-r border-slate-200 border-b border-slate-200 bg-blue-50/50">SME</th>
                      <th colSpan={3} className="px-4 py-2 font-medium text-center border-r border-slate-200 border-b border-slate-200 bg-yellow-50/50">CL</th>
                      <th colSpan={3} className="px-4 py-2 font-medium text-center border-r border-slate-200 border-b border-slate-200 bg-emerald-50/50">KSM</th>
                      <th colSpan={3} className="px-4 py-2 font-medium text-center border-r border-slate-200 border-b border-slate-200 bg-indigo-50/50">CC</th>
                      <th colSpan={3} className="px-4 py-2 font-medium text-center border-b border-slate-200 bg-purple-50/50">Micro</th>
                    </tr>
                    <tr>
                      {/* Lagging - SME */}
                      <th className="px-4 py-2 font-medium text-right bg-blue-50/30 cursor-pointer hover:bg-blue-100/50 text-[#003D79]" onClick={() => requestSort('lagging.sme.today')}>
                        <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey="lagging.sme.today" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-blue-50/30 cursor-pointer hover:bg-blue-100/50 text-[#003D79]" onClick={() => requestSort('lagging.sme.target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="lagging.sme.target" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right border-r border-slate-200 bg-blue-50/30 cursor-pointer hover:bg-blue-100/50 text-[#003D79]" onClick={() => requestSort('lagging.sme.percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="lagging.sme.percentTarget" /></div>
                      </th>
                      {/* Lagging - CL */}
                      <th className="px-4 py-2 font-medium text-right bg-yellow-50/30 cursor-pointer hover:bg-yellow-100/50 text-[#F2A900]" onClick={() => requestSort('lagging.cl.today')}>
                        <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey="lagging.cl.today" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-yellow-50/30 cursor-pointer hover:bg-yellow-100/50 text-[#F2A900]" onClick={() => requestSort('lagging.cl.target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="lagging.cl.target" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right border-r border-slate-200 bg-yellow-50/30 cursor-pointer hover:bg-yellow-100/50 text-[#F2A900]" onClick={() => requestSort('lagging.cl.percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="lagging.cl.percentTarget" /></div>
                      </th>
                      {/* Lagging - KSM */}
                      <th className="px-4 py-2 font-medium text-right bg-emerald-50/30 cursor-pointer hover:bg-emerald-100/50 text-emerald-600" onClick={() => requestSort('lagging.ksm.today')}>
                        <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey="lagging.ksm.today" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-emerald-50/30 cursor-pointer hover:bg-emerald-100/50 text-emerald-600" onClick={() => requestSort('lagging.ksm.target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="lagging.ksm.target" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right border-r border-slate-200 bg-emerald-50/30 cursor-pointer hover:bg-emerald-100/50 text-emerald-600" onClick={() => requestSort('lagging.ksm.percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="lagging.ksm.percentTarget" /></div>
                      </th>
                      {/* Lagging - CC */}
                      <th className="px-4 py-2 font-medium text-right bg-indigo-50/30 cursor-pointer hover:bg-indigo-100/50 text-indigo-600" onClick={() => requestSort('lagging.cc.today')}>
                        <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey="lagging.cc.today" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-indigo-50/30 cursor-pointer hover:bg-indigo-100/50 text-indigo-600" onClick={() => requestSort('lagging.cc.target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="lagging.cc.target" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right border-r border-slate-200 bg-indigo-50/30 cursor-pointer hover:bg-indigo-100/50 text-indigo-600" onClick={() => requestSort('lagging.cc.percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="lagging.cc.percentTarget" /></div>
                      </th>
                      {/* Lagging - Micro */}
                      <th className="px-4 py-2 font-medium text-right bg-purple-50/30 cursor-pointer hover:bg-purple-100/50 text-purple-600" onClick={() => requestSort('lagging.micro.today')}>
                        <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey="lagging.micro.today" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-purple-50/30 cursor-pointer hover:bg-purple-100/50 text-purple-600" onClick={() => requestSort('lagging.micro.target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="lagging.micro.target" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right border-r border-slate-200 bg-purple-50/30 cursor-pointer hover:bg-purple-100/50 text-purple-600" onClick={() => requestSort('lagging.micro.percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="lagging.micro.percentTarget" /></div>
                      </th>
                      {/* Leading - SME */}
                      <th className="px-4 py-2 font-medium text-right bg-blue-50/30 cursor-pointer hover:bg-blue-100/50 text-[#003D79]" onClick={() => requestSort('leading.bookingSME.today')}>
                        <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey="leading.bookingSME.today" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-blue-50/30 cursor-pointer hover:bg-blue-100/50 text-[#003D79]" onClick={() => requestSort('leading.bookingSME.target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="leading.bookingSME.target" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right border-r border-slate-200 bg-blue-50/30 cursor-pointer hover:bg-blue-100/50 text-[#003D79]" onClick={() => requestSort('leading.bookingSME.percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="leading.bookingSME.percentTarget" /></div>
                      </th>
                      {/* Leading - CL */}
                      <th className="px-4 py-2 font-medium text-right bg-yellow-50/30 cursor-pointer hover:bg-yellow-100/50 text-[#F2A900]" onClick={() => requestSort('leading.bookingCL.today')}>
                        <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey="leading.bookingCL.today" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-yellow-50/30 cursor-pointer hover:bg-yellow-100/50 text-[#F2A900]" onClick={() => requestSort('leading.bookingCL.target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="leading.bookingCL.target" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right border-r border-slate-200 bg-yellow-50/30 cursor-pointer hover:bg-yellow-100/50 text-[#F2A900]" onClick={() => requestSort('leading.bookingCL.percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="leading.bookingCL.percentTarget" /></div>
                      </th>
                      {/* Leading - KSM */}
                      <th className="px-4 py-2 font-medium text-right bg-emerald-50/30 cursor-pointer hover:bg-emerald-100/50 text-emerald-600" onClick={() => requestSort('leading.bookingKSM.today')}>
                        <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey="leading.bookingKSM.today" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-emerald-50/30 cursor-pointer hover:bg-emerald-100/50 text-emerald-600" onClick={() => requestSort('leading.bookingKSM.target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="leading.bookingKSM.target" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right border-r border-slate-200 bg-emerald-50/30 cursor-pointer hover:bg-emerald-100/50 text-emerald-600" onClick={() => requestSort('leading.bookingKSM.percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="leading.bookingKSM.percentTarget" /></div>
                      </th>
                      {/* Leading - CC */}
                      <th className="px-4 py-2 font-medium text-right bg-indigo-50/30 cursor-pointer hover:bg-indigo-100/50 text-indigo-600" onClick={() => requestSort('leading.bookingCC.today')}>
                        <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey="leading.bookingCC.today" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-indigo-50/30 cursor-pointer hover:bg-indigo-100/50 text-indigo-600" onClick={() => requestSort('leading.bookingCC.target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="leading.bookingCC.target" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right border-r border-slate-200 bg-indigo-50/30 cursor-pointer hover:bg-indigo-100/50 text-indigo-600" onClick={() => requestSort('leading.bookingCC.percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="leading.bookingCC.percentTarget" /></div>
                      </th>
                      {/* Leading - Micro */}
                      <th className="px-4 py-2 font-medium text-right bg-purple-50/30 cursor-pointer hover:bg-purple-100/50 text-purple-600" onClick={() => requestSort('leading.bookingMicro.today')}>
                        <div className="flex items-center justify-end">14 Apr 26 <SortIcon columnKey="leading.bookingMicro.today" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-purple-50/30 cursor-pointer hover:bg-purple-100/50 text-purple-600" onClick={() => requestSort('leading.bookingMicro.target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="leading.bookingMicro.target" /></div>
                      </th>
                      <th className="px-4 py-2 font-medium text-right bg-purple-50/30 cursor-pointer hover:bg-purple-100/50 text-purple-600" onClick={() => requestSort('leading.bookingMicro.percentTarget')}>
                        <div className="flex items-center justify-end">% Thd Target <SortIcon columnKey="leading.bookingMicro.percentTarget" /></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedBranches.map((branch) => (
                      <tr key={branch.code} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-800 border-r border-slate-100">{branch.code}</td>
                        <td className="px-4 py-3 font-medium text-slate-800 border-r border-slate-100">{branch.name.replace('Jakarta ', '')}</td>
                        <td className="px-4 py-3 font-medium text-slate-800 border-r border-slate-100">{branch.class}</td>
                        
                        {/* SME */}
                        <td className="px-4 py-3 text-right text-[#003D79]">{formatCurrency(branch.lagging.sme.today)}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(branch.lagging.sme.target)}</td>
                        <td className="px-4 py-3 text-right font-medium border-r border-slate-100">{formatPercent(branch.lagging.sme.percentTarget)}</td>
                        
                        {/* CL */}
                        <td className="px-4 py-3 text-right text-[#F2A900]">{formatCurrency(branch.lagging.cl.today)}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(branch.lagging.cl.target)}</td>
                        <td className="px-4 py-3 text-right font-medium border-r border-slate-100">{formatPercent(branch.lagging.cl.percentTarget)}</td>
                        
                        {/* KSM */}
                        <td className="px-4 py-3 text-right text-emerald-600">{formatCurrency(branch.lagging.ksm.today)}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(branch.lagging.ksm.target)}</td>
                        <td className="px-4 py-3 text-right font-medium border-r border-slate-100">{formatPercent(branch.lagging.ksm.percentTarget)}</td>
                        
                        {/* CC */}
                        <td className="px-4 py-3 text-right text-indigo-600">{formatCurrency(branch.lagging.cc.today)}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(branch.lagging.cc.target)}</td>
                        <td className="px-4 py-3 text-right font-medium border-r border-slate-100">{formatPercent(branch.lagging.cc.percentTarget)}</td>
                        
                        {/* Micro */}
                        <td className="px-4 py-3 text-right text-purple-600">{formatCurrency(branch.lagging.micro.today)}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(branch.lagging.micro.target)}</td>
                        <td className="px-4 py-3 text-right font-medium border-r border-slate-100">{formatPercent(branch.lagging.micro.percentTarget)}</td>
                        
                        {/* Leading SME */}
                        <td className="px-4 py-3 text-right text-[#003D79]">{formatNumber(branch.leading.bookingSME.today)}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatNumber(branch.leading.bookingSME.target)}</td>
                        <td className="px-4 py-3 text-right font-medium border-r border-slate-100">{formatPercent(branch.leading.bookingSME.percentTarget)}</td>
                        
                        {/* Leading CL */}
                        <td className="px-4 py-3 text-right text-[#F2A900]">{formatNumber(branch.leading.bookingCL.today)}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatNumber(branch.leading.bookingCL.target)}</td>
                        <td className="px-4 py-3 text-right font-medium border-r border-slate-100">{formatPercent(branch.leading.bookingCL.percentTarget)}</td>
                        
                        {/* Leading KSM */}
                        <td className="px-4 py-3 text-right text-emerald-600">{formatNumber(branch.leading.bookingKSM.today)}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatNumber(branch.leading.bookingKSM.target)}</td>
                        <td className="px-4 py-3 text-right font-medium border-r border-slate-100">{formatPercent(branch.leading.bookingKSM.percentTarget)}</td>
                        
                        {/* Leading CC */}
                        <td className="px-4 py-3 text-right text-indigo-600">{formatNumber(branch.leading.bookingCC.today)}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatNumber(branch.leading.bookingCC.target)}</td>
                        <td className="px-4 py-3 text-right font-medium border-r border-slate-100">{formatPercent(branch.leading.bookingCC.percentTarget)}</td>
                        
                        {/* Leading Micro */}
                        <td className="px-4 py-3 text-right text-purple-600">{formatNumber(branch.leading.bookingMicro.today)}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{formatNumber(branch.leading.bookingMicro.target)}</td>
                        <td className="px-4 py-3 text-right font-medium">{formatPercent(branch.leading.bookingMicro.percentTarget)}</td>
                      </tr>
                    ))}
                    {/* Total Row */}
                    <tr className="bg-slate-100 font-bold border-t-2 border-slate-200">
                      <td colSpan={3} className="px-4 py-4 text-slate-800 border-r border-slate-200">
                        TOTAL {selectedBranchCode === 'all' ? 'AREA JAKARTA TEBET SUPOMO' : (selectedBranchCode.startsWith('class-') ? `KELAS ${selectedBranchCode.replace('class-', '')}` : currentData.name.toUpperCase())}
                      </td>
                      
                      {/* SME */}
                      <td className="px-4 py-4 text-right text-[#003D79]">{formatCurrency(currentData.lagging.sme.today)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatCurrency(currentData.lagging.sme.target)}</td>
                      <td className="px-4 py-4 text-right border-r border-slate-200">{formatPercent(currentData.lagging.sme.percentTarget)}</td>
                      
                      {/* CL */}
                      <td className="px-4 py-4 text-right text-[#F2A900]">{formatCurrency(currentData.lagging.cl.today)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatCurrency(currentData.lagging.cl.target)}</td>
                      <td className="px-4 py-4 text-right border-r border-slate-200">{formatPercent(currentData.lagging.cl.percentTarget)}</td>
                      
                      {/* KSM */}
                      <td className="px-4 py-4 text-right text-emerald-600">{formatCurrency(currentData.lagging.ksm.today)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatCurrency(currentData.lagging.ksm.target)}</td>
                      <td className="px-4 py-4 text-right border-r border-slate-200">{formatPercent(currentData.lagging.ksm.percentTarget)}</td>
                      
                      {/* CC */}
                      <td className="px-4 py-4 text-right text-indigo-600">{formatCurrency(currentData.lagging.cc.today)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatCurrency(currentData.lagging.cc.target)}</td>
                      <td className="px-4 py-4 text-right border-r border-slate-200">{formatPercent(currentData.lagging.cc.percentTarget)}</td>
                      
                      {/* Micro */}
                      <td className="px-4 py-4 text-right text-purple-600">{formatCurrency(currentData.lagging.micro.today)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatCurrency(currentData.lagging.micro.target)}</td>
                      <td className="px-4 py-4 text-right border-r border-slate-200">{formatPercent(currentData.lagging.micro.percentTarget)}</td>
                      
                      {/* Leading SME */}
                      <td className="px-4 py-4 text-right text-[#003D79]">{formatNumber(currentData.leading.bookingSME.today)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatNumber(currentData.leading.bookingSME.target)}</td>
                      <td className="px-4 py-4 text-right border-r border-slate-200">{formatPercent(currentData.leading.bookingSME.percentTarget)}</td>
                      
                      {/* Leading CL */}
                      <td className="px-4 py-4 text-right text-[#F2A900]">{formatNumber(currentData.leading.bookingCL.today)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatNumber(currentData.leading.bookingCL.target)}</td>
                      <td className="px-4 py-4 text-right border-r border-slate-200">{formatPercent(currentData.leading.bookingCL.percentTarget)}</td>
                      
                      {/* Leading KSM */}
                      <td className="px-4 py-4 text-right text-emerald-600">{formatNumber(currentData.leading.bookingKSM.today)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatNumber(currentData.leading.bookingKSM.target)}</td>
                      <td className="px-4 py-4 text-right border-r border-slate-200">{formatPercent(currentData.leading.bookingKSM.percentTarget)}</td>
                      
                      {/* Leading CC */}
                      <td className="px-4 py-4 text-right text-indigo-600">{formatNumber(currentData.leading.bookingCC.today)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatNumber(currentData.leading.bookingCC.target)}</td>
                      <td className="px-4 py-4 text-right border-r border-slate-200">{formatPercent(currentData.leading.bookingCC.percentTarget)}</td>
                      
                      {/* Leading Micro */}
                      <td className="px-4 py-4 text-right text-purple-600">{formatNumber(currentData.leading.bookingMicro.today)}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{formatNumber(currentData.leading.bookingMicro.target)}</td>
                      <td className="px-4 py-4 text-right">{formatPercent(currentData.leading.bookingMicro.percentTarget)}</td>
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
              {(['sme', 'cl', 'ksm', 'cc', 'micro'] as const).map((port) => (
                <button
                  key={port}
                  onClick={() => setLaggingPortfolio(port)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                    laggingPortfolio === port
                      ? laggingThemes[port].active
                      : laggingThemes[port].inactive
                  }`}
                >
                  {port.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                title={`Kredit Hari Ini (${laggingPortfolio.toUpperCase()})`}
                value={currentData.lagging[laggingPortfolio].today} 
                icon={Wallet} 
                colorClass={laggingThemes[laggingPortfolio].active.replace('border-', 'bg-').replace('text-white', 'text-slate-800')} 
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
                  Detail {getTableTitle()} - {laggingPortfolio.toUpperCase()}
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
                      <th className={`px-4 py-4 font-medium cursor-pointer group transition-colors text-right ${laggingThemes[laggingPortfolio].headerBg}`} onClick={() => requestSort('today')}>
                        <div className="flex items-center justify-end">14 April 2026 <SortIcon columnKey="today" /></div>
                      </th>
                      <th className={`px-4 py-4 font-medium cursor-pointer group transition-colors text-right ${laggingThemes[laggingPortfolio].headerBg}`} onClick={() => requestSort('wtd')}>
                        <div className="flex items-center justify-end">WTD <SortIcon columnKey="wtd" /></div>
                      </th>
                      <th className={`px-4 py-4 font-medium cursor-pointer group transition-colors text-right ${laggingThemes[laggingPortfolio].headerBg}`} onClick={() => requestSort('mtd')}>
                        <div className="flex items-center justify-end">MtD <SortIcon columnKey="mtd" /></div>
                      </th>
                      <th className={`px-4 py-4 font-medium cursor-pointer group transition-colors text-right ${laggingThemes[laggingPortfolio].headerBg}`} onClick={() => requestSort('ytd')}>
                        <div className="flex items-center justify-end">YtD <SortIcon columnKey="ytd" /></div>
                      </th>
                      <th className={`px-4 py-4 font-medium cursor-pointer group transition-colors text-right ${laggingThemes[laggingPortfolio].headerBg}`} onClick={() => requestSort('yoy')}>
                        <div className="flex items-center justify-end">YoY <SortIcon columnKey="yoy" /></div>
                      </th>
                      <th className={`px-4 py-4 font-medium cursor-pointer group transition-colors text-right ${laggingThemes[laggingPortfolio].headerBg}`} onClick={() => requestSort('target')}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey="target" /></div>
                      </th>
                      <th className={`px-4 py-4 font-medium cursor-pointer group transition-colors text-right ${laggingThemes[laggingPortfolio].headerBg}`} onClick={() => requestSort('percentTarget')}>
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
                          <td className={`px-4 py-3 text-right font-medium ${laggingThemes[laggingPortfolio].text}`}>{formatCurrency(data.today)}</td>
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
                      <td className={`px-4 py-4 text-right ${laggingThemes[laggingPortfolio].text}`}>{formatCurrency(currentData.lagging[laggingPortfolio].today)}</td>
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
                title={`Realisasi Booking Hari Ini (${leadingThemes[leadingPortfolio].label})`} 
                value={currentData.leading[leadingPortfolio].today} 
                icon={FileCheck} 
                colorClass={leadingThemes[leadingPortfolio].active.replace('border-', 'bg-').replace('text-white', 'text-slate-800')} 
                isCurrency={false}
              />
              <StatCard 
                title="Target Booking April 26" 
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
                      <th className={`px-6 py-4 font-medium cursor-pointer group transition-colors text-right ${leadingThemes[leadingPortfolio].headerBg}`} onClick={() => requestSort(`${leadingPortfolio}.today`)}>
                        <div className="flex items-center justify-end">14 April 2026 <SortIcon columnKey={`${leadingPortfolio}.today`} /></div>
                      </th>
                      <th className={`px-6 py-4 font-medium cursor-pointer group transition-colors text-right ${leadingThemes[leadingPortfolio].headerBg}`} onClick={() => requestSort(`${leadingPortfolio}.target`)}>
                        <div className="flex items-center justify-end">Target Apr 26 <SortIcon columnKey={`${leadingPortfolio}.target`} /></div>
                      </th>
                      <th className={`px-6 py-4 font-medium cursor-pointer group transition-colors text-right ${leadingThemes[leadingPortfolio].headerBg}`} onClick={() => requestSort(`${leadingPortfolio}.percentTarget`)}>
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
                          <td className={`px-6 py-3 text-right font-medium ${leadingThemes[leadingPortfolio].text}`}>{formatNumber(data.today)}</td>
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
                      <td className={`px-6 py-4 text-right ${leadingThemes[leadingPortfolio].text}`}>{formatNumber(currentData.leading[leadingPortfolio].today)}</td>
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
