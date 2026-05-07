import React, { useState, useMemo } from 'react';
import { sumberDataTerpadu, getSummaryAreaTotal, UnifiedBranch, positionDateTexts } from '../data/MasterData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { ArrowUpDown, ChevronUp, ChevronDown, Calendar } from 'lucide-react';

const formatCurrencyM = (value: number) => {
  const inMiliar = value / 1000;
  const formatted = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(inMiliar);
  return `Rp ${formatted} M`;
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('id-ID').format(value);
};

// Flatten data for easier sorting and charting
const flattenBranchData = (branch: UnifiedBranch) => {
  return {
    code: branch.code,
    class: branch.class,
    name: branch.name,
    // Funding
    fun_tab_lead: branch.funding.leading.newCifTabungan.today,
    fun_tab_lag: branch.funding.lagging.tabungan.today,
    fun_giro_lead: branch.funding.leading.newCifGiro.today,
    fun_giro_lag: branch.funding.lagging.giro.today,
    // Transaction
    trx_edc_lead: branch.transaction.newEDC.today,
    trx_edc_lag: branch.transaction.svEDC.today,
    trx_lvm_lead: branch.transaction.newLVM.today,
    trx_lvm_lag: branch.transaction.svLvmMTD.today,
    trx_livin_lead: branch.transaction.newLivinUreg.today,
    trx_kopra_lead: branch.transaction.newUregKopra.today,
    // Prioritas
    prio_ntp: branch.prioritas.ntp.today,
    prio_ntb: branch.prioritas.ntb.today,
    // Kredit
    krd_sme_ref: branch.kredit.lagging.smeReferral.today,
    krd_sme_bade: branch.kredit.lagging.sme.today,
    krd_cl_reg: branch.kredit.lagging.clBookingRegular.today,
    krd_cl_flpp: branch.kredit.lagging.clBookingFLPP.today,
    krd_cl_bade: branch.kredit.lagging.cl.today,
    krd_ksm_book: branch.kredit.lagging.ksm.today, // wait, booking MTD for ksm is lagging? The prompt said KSM Booking MTD (lagging) and Bade (lagging). Let's use `kredit.leading.bookingKSM.today` for booking, and `kredit.lagging.ksm.today` for bade.
    krd_ksm_lead: branch.kredit.leading.bookingKSM.today,
    krd_cc_app: branch.kredit.lagging.ccAplikasi.today,
    krd_cc_bade: branch.kredit.lagging.cc.today,
    krd_kum_book: branch.kredit.leading.bookingMicro.today,
    krd_kum_bade: branch.kredit.lagging.micro.today,
    krd_kkb_book: branch.kredit.leading.bookingKKB.today,
    krd_kkb_bade: branch.kredit.lagging.kkb.today,
  };
};

type FlatBranch = ReturnType<typeof flattenBranchData>;

export function SummaryAreaDashboard() {
  const [selectedBranchCode, setSelectedBranchCode] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof FlatBranch, direction: 'asc' | 'desc' } | null>(null);
  
  const [chartType, setChartType] = useState<'top' | 'bottom' | 'both'>('top');
  const [chartMetric, setChartMetric] = useState<keyof FlatBranch>('fun_tab_lag');

  const areaTotal = useMemo(() => flattenBranchData(getSummaryAreaTotal()), []);
  const allFlatBranches = useMemo(() => sumberDataTerpadu.map(flattenBranchData), []);

  const filteredBranches = useMemo(() => {
    if (selectedBranchCode === 'all') return allFlatBranches;
    if (selectedBranchCode.startsWith('class-')) {
      const cls = selectedBranchCode.replace('class-', '');
      return allFlatBranches.filter(b => b.class === cls);
    }
    return allFlatBranches.filter(b => b.code === selectedBranchCode);
  }, [selectedBranchCode, allFlatBranches]);

  const topN = selectedBranchCode === 'class-B.1' ? 2 : (selectedBranchCode.startsWith('class-') ? 3 : 5);

  const currentData: FlatBranch = useMemo(() => {
    if (selectedBranchCode === 'all') return areaTotal;
    if (selectedBranchCode.startsWith('class-')) {
      const cls = selectedBranchCode.replace('class-', '');
      const clsBranches = allFlatBranches.filter(b => b.class === cls);
      
      const res: any = { code: `class-${cls}`, class: cls, name: `Kelas ${cls}` };
      const keysToSum = Object.keys(areaTotal).filter(k => k !== 'code' && k !== 'name' && k !== 'class') as (keyof FlatBranch)[];
      keysToSum.forEach(k => {
        res[k] = clsBranches.reduce((acc, b) => acc + (b[k] as number), 0);
      });
      return res as FlatBranch;
    }
    return allFlatBranches.find(b => b.code === selectedBranchCode) || areaTotal;
  }, [selectedBranchCode, areaTotal, allFlatBranches]);

  const reqTypes = {
    fun_tab_lead: { label: 'New CIF Tab.', isMiliar: false },
    fun_tab_lag: { label: 'Endbal Tab. (M)', isMiliar: true },
    fun_giro_lead: { label: 'New CIF Giro', isMiliar: false },
    fun_giro_lag: { label: 'Endbal Giro (M)', isMiliar: true },
    
    trx_edc_lead: { label: 'New EDC', isMiliar: false },
    trx_edc_lag: { label: 'SV EDC (M)', isMiliar: true },
    trx_lvm_lead: { label: 'New LVM', isMiliar: false },
    trx_lvm_lag: { label: 'SV LVM MTD (M)', isMiliar: true },
    trx_livin_lead: { label: 'New Livin\' (Ureg)', isMiliar: false },
    trx_kopra_lead: { label: 'New Ureg KOPRA (MTD)', isMiliar: false },
    
    prio_ntp: { label: 'NTP (MTD)', isMiliar: false },
    prio_ntb: { label: 'NTB (MTD)', isMiliar: false },
    
    krd_sme_ref: { label: 'SME Referral (M)', isMiliar: true },
    krd_sme_bade: { label: 'SME Bade (M)', isMiliar: true },
    
    krd_cl_reg: { label: 'CL Booking Reg (M)', isMiliar: true },
    krd_cl_flpp: { label: 'CL Booking FLPP (M)', isMiliar: true },
    krd_cl_bade: { label: 'CL Bade (M)', isMiliar: true },
    
    krd_ksm_lead: { label: 'KSM Booking (M)', isMiliar: true }, // Booking leading usually not M, but user requested Booking MTD (M) for lagging
    krd_ksm_book: { label: 'KSM Bade (M)', isMiliar: true }, // we use krd_ksm_book for bade? Wait, I mapped it wrongly. Let's fix mapping in table.
    
    krd_cc_app: { label: 'CC Aplikasi MTD', isMiliar: false },
    krd_cc_bade: { label: 'CC Bade (M)', isMiliar: true },
    
    krd_kum_book: { label: 'KUM Booking (MTD)', isMiliar: false },
    krd_kum_bade: { label: 'KUM Bade (M)', isMiliar: true },
    
    krd_kkb_book: { label: 'KKB Booking (MTD)', isMiliar: false },
    krd_kkb_bade: { label: 'KKB Bade YTD (M)', isMiliar: true },
  };

  const chartData = useMemo(() => {
    if (selectedBranchCode !== 'all' && !selectedBranchCode.startsWith('class-')) {
      return [];
    }
    
    let sorted = [...filteredBranches].sort((a, b) => (b[chartMetric] as number) - (a[chartMetric] as number));
    
    let result: any[] = [];
    if (chartType === 'top') {
      result = sorted.slice(0, topN).map((b, i) => ({ ...b, fill: '#003D79' }));
    } else if (chartType === 'bottom') {
      result = sorted.slice(-topN).map((b, i) => ({ ...b, fill: '#F43F5E' }));
    } else {
      const top = sorted.slice(0, topN).map((b, i) => ({ ...b, fill: '#003D79' }));
      const bottom = sorted.slice(-topN).map((b, i) => ({ ...b, fill: '#F43F5E' }));
      result = [...top, ...bottom];
    }
    
    return result;
  }, [filteredBranches, chartType, chartMetric, selectedBranchCode, topN]);

  const requestSort = (key: keyof FlatBranch) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const sortedBranches = useMemo(() => {
    let sortableItems = [...filteredBranches];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredBranches, sortConfig]);

  const formatVal = (val: number, isMiliar: boolean) => isMiliar ? formatCurrencyM(val) : formatNumber(val);

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortConfig?.key !== columnKey) return <ArrowUpDown size={14} className="ml-1 opacity-20" />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />;
  };

  const metricOptions = Object.entries(reqTypes).map(([k, v]) => ({ value: k, label: v.label }));

  return (
    <div className="h-full flex flex-col overflow-hidden bg-slate-50">
      <div className="flex-none px-8 py-4 border-b border-slate-200 bg-white shadow-sm z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Summary Area</h2>
            <p className="text-sm italic text-slate-500 mt-1">{positionDateTexts.summary}</p>
          </div>
          <div className="flex gap-3">
             <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200 flex">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${chartType === 'top' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                onClick={() => setChartType('top')}
              >
                Top ${topN}
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${chartType === 'bottom' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                onClick={() => setChartType('bottom')}
              >
                Bottom ${topN}
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${chartType === 'both' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                onClick={() => setChartType('both')}
              >
                Top & Bottom ${topN}
              </button>
            </div>

            <select
              className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-4 py-2.5 shadow-sm"
              value={selectedBranchCode}
              onChange={(e) => setSelectedBranchCode(e.target.value)}
            >
              <option value="all">Semua Cabang (Area)</option>
              <option value="class-B.1">Kelas B.1</option>
              <option value="class-B.2">Kelas B.2</option>
              <option value="class-B.3">Kelas B.3</option>
              <option disabled>──────────</option>
              {allFlatBranches.map((branch) => (
                <option key={branch.code} value={branch.code}>
                  {branch.code} - {branch.name.replace('Jakarta ', '')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Highlight Section */}
          {selectedBranchCode === 'all' || selectedBranchCode.startsWith('class-') ? (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
               <div className="flex justify-between items-center mb-6">
                 <div>
                   <h3 className="text-xl font-bold text-slate-800">Highlight Pencapaian Cabang</h3>
                   <p className="text-slate-500 text-sm mt-1">Ranking performa cabang di Area Jakarta Tebet Supomo</p>
                 </div>
                 <div className="flex items-center gap-3">
                   <select
                      className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-3 py-2"
                      value={chartMetric as string}
                      onChange={(e) => setChartMetric(e.target.value as keyof FlatBranch)}
                    >
                      {metricOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                 </div>
               </div>
               
               <div className="h-72 mt-4">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                     <XAxis 
                       dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} angle={-45} textAnchor="end" interval={0} height={60}
                     />
                     <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(val) => {
                       return reqTypes[chartMetric as keyof typeof reqTypes].isMiliar ? `${(val/1000).toFixed(0)}M` : formatNumber(val);
                     }}/>
                     <Tooltip 
                       cursor={{ fill: '#F1F5F9' }}
                       contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                       formatter={(value: number) => [
                         reqTypes[chartMetric as keyof typeof reqTypes].isMiliar ? formatCurrencyM(value) : formatNumber(value), 
                         reqTypes[chartMetric as keyof typeof reqTypes].label
                       ]}
                     />
                     <Bar dataKey={chartMetric as string} radius={[4, 4, 0, 0]}>
                       {chartData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.fill} />
                       ))}
                     </Bar>
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>
          ) : null}

          {/* Data Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">Detail Summary Area</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th rowSpan={2} className="px-4 py-3 border-r cursor-pointer hover:bg-slate-100" onClick={() => requestSort('code')}>
                      <div className="flex items-center">Kode <SortIcon columnKey="code" /></div>
                    </th>
                    <th rowSpan={2} className="px-4 py-3 border-r cursor-pointer hover:bg-slate-100" onClick={() => requestSort('name')}>
                      <div className="flex items-center">Cabang <SortIcon columnKey="name" /></div>
                    </th>
                    <th rowSpan={2} className="px-4 py-3 border-r cursor-pointer hover:bg-slate-100" onClick={() => requestSort('class')}>
                      <div className="flex items-center">Kelas <SortIcon columnKey="class" /></div>
                    </th>
                    
                    <th colSpan={4} className="px-4 py-2 border-r border-b text-center bg-blue-50/50 text-[#003D79]">Funding</th>
                    <th colSpan={6} className="px-4 py-2 border-r border-b text-center bg-emerald-50/50 text-emerald-700">Transaction</th>
                    <th colSpan={2} className="px-4 py-2 border-r border-b text-center bg-purple-50/50 text-purple-700">Prioritas</th>
                    <th colSpan={13} className="px-4 py-2 border-b text-center bg-orange-50/50 text-orange-700">Kredit Retail</th>
                  </tr>
                  <tr>
                    {/* Funding Columns */}
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80" onClick={() => requestSort('fun_tab_lead')}>New Cif Tab. <SortIcon columnKey="fun_tab_lead" /></th>
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80" onClick={() => requestSort('fun_tab_lag')}>Endbal Tab.(M) <SortIcon columnKey="fun_tab_lag" /></th>
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80" onClick={() => requestSort('fun_giro_lead')}>New Cif Giro <SortIcon columnKey="fun_giro_lead" /></th>
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80 font-bold" onClick={() => requestSort('fun_giro_lag')}>Endbal Giro(M) <SortIcon columnKey="fun_giro_lag" /></th>
                    
                    {/* Transaction Columns */}
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80" onClick={() => requestSort('trx_edc_lead')}>New EDC <SortIcon columnKey="trx_edc_lead" /></th>
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80" onClick={() => requestSort('trx_edc_lag')}>SV EDC (M) <SortIcon columnKey="trx_edc_lag" /></th>
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80" onClick={() => requestSort('trx_lvm_lead')}>New LVM <SortIcon columnKey="trx_lvm_lead" /></th>
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80" onClick={() => requestSort('trx_lvm_lag')}>SV LVM MTD (M) <SortIcon columnKey="trx_lvm_lag" /></th>
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80" onClick={() => requestSort('trx_livin_lead')}>New Livin' <SortIcon columnKey="trx_livin_lead" /></th>
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80 font-bold" onClick={() => requestSort('trx_kopra_lead')}>New KOPRA <SortIcon columnKey="trx_kopra_lead" /></th>
                    
                    {/* Prioritas Columns */}
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80" onClick={() => requestSort('prio_ntp')}>NTP <SortIcon columnKey="prio_ntp" /></th>
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80 font-bold" onClick={() => requestSort('prio_ntb')}>NTB <SortIcon columnKey="prio_ntb" /></th>
                    
                    {/* Kredit Retail Columns */}
                    {/* SME */}
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80" onClick={() => requestSort('krd_sme_ref')}>SME Ref.(M) <SortIcon columnKey="krd_sme_ref" /></th>
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80 font-bold bg-orange-100/50" onClick={() => requestSort('krd_sme_bade')}>SME Bade(M) <SortIcon columnKey="krd_sme_bade" /></th>
                    {/* CL */}
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80" onClick={() => requestSort('krd_cl_reg')}>CL Reg.(M) <SortIcon columnKey="krd_cl_reg" /></th>
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80" onClick={() => requestSort('krd_cl_flpp')}>CL FLPP(M) <SortIcon columnKey="krd_cl_flpp" /></th>
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80 font-bold bg-orange-100/50" onClick={() => requestSort('krd_cl_bade')}>CL Bade(M) <SortIcon columnKey="krd_cl_bade" /></th>
                    {/* KSM */}
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80" onClick={() => requestSort('krd_ksm_lead')}>KSM Book(M) <SortIcon columnKey="krd_ksm_lead" /></th>
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80 font-bold bg-orange-100/50" onClick={() => requestSort('krd_ksm_book')}>KSM Bade(M) <SortIcon columnKey="krd_ksm_book" /></th>
                    {/* CC */}
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80" onClick={() => requestSort('krd_cc_app')}>CC Apps. <SortIcon columnKey="krd_cc_app" /></th>
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80 font-bold bg-orange-100/50" onClick={() => requestSort('krd_cc_bade')}>CC Bade(M) <SortIcon columnKey="krd_cc_bade" /></th>
                    {/* KUM */}
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80" onClick={() => requestSort('krd_kum_book')}>KUM Book. <SortIcon columnKey="krd_kum_book" /></th>
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80 font-bold bg-orange-100/50" onClick={() => requestSort('krd_kum_bade')}>KUM Bade(M) <SortIcon columnKey="krd_kum_bade" /></th>
                    {/* KKB */}
                    <th className="px-4 py-2 border-r cursor-pointer text-right hover:opacity-80" onClick={() => requestSort('krd_kkb_book')}>KKB Book. <SortIcon columnKey="krd_kkb_book" /></th>
                    <th className="px-4 py-2 cursor-pointer text-right hover:opacity-80 font-bold bg-orange-100/50" onClick={() => requestSort('krd_kkb_bade')}>KKB YTD(M) <SortIcon columnKey="krd_kkb_bade" /></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedBranches.map((branch) => (
                    <tr key={branch.code} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-medium text-slate-800 border-r">{branch.code}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-800 border-r">{branch.name.replace('Jakarta ', '')}</td>
                      <td className="px-4 py-3 text-slate-600 border-r">{branch.class}</td>
                      
                      {/* Funding Data */}
                      <td className="px-4 py-3 text-right border-r">{formatVal(branch.fun_tab_lead, false)}</td>
                      <td className="px-4 py-3 text-right border-r">{formatVal(branch.fun_tab_lag, true)}</td>
                      <td className="px-4 py-3 text-right border-r">{formatVal(branch.fun_giro_lead, false)}</td>
                      <td className="px-4 py-3 text-right border-r border-slate-300 font-medium bg-slate-50">{formatVal(branch.fun_giro_lag, true)}</td>
                      
                      {/* Transaction Data */}
                      <td className="px-4 py-3 text-right border-r">{formatVal(branch.trx_edc_lead, false)}</td>
                      <td className="px-4 py-3 text-right border-r">{formatVal(branch.trx_edc_lag, true)}</td>
                      <td className="px-4 py-3 text-right border-r">{formatVal(branch.trx_lvm_lead, false)}</td>
                      <td className="px-4 py-3 text-right border-r">{formatVal(branch.trx_lvm_lag, true)}</td>
                      <td className="px-4 py-3 text-right border-r">{formatVal(branch.trx_livin_lead, false)}</td>
                      <td className="px-4 py-3 text-right border-r border-slate-300 font-medium bg-slate-50">{formatVal(branch.trx_kopra_lead, false)}</td>
                      
                      {/* Prioritas Data */}
                      <td className="px-4 py-3 text-right border-r">{formatVal(branch.prio_ntp, false)}</td>
                      <td className="px-4 py-3 text-right border-r border-slate-300 font-medium bg-slate-50">{formatVal(branch.prio_ntb, false)}</td>

                      {/* Kredit Data */}
                      <td className="px-4 py-3 text-right border-r">{formatVal(branch.krd_sme_ref, true)}</td>
                      <td className="px-4 py-3 text-right border-r font-medium bg-orange-50/30">{formatVal(branch.krd_sme_bade, true)}</td>
                      <td className="px-4 py-3 text-right border-r">{formatVal(branch.krd_cl_reg, true)}</td>
                      <td className="px-4 py-3 text-right border-r">{formatVal(branch.krd_cl_flpp, true)}</td>
                      <td className="px-4 py-3 text-right border-r font-medium bg-orange-50/30">{formatVal(branch.krd_cl_bade, true)}</td>
                      <td className="px-4 py-3 text-right border-r">{formatVal(branch.krd_ksm_lead, true)}</td>
                      <td className="px-4 py-3 text-right border-r font-medium bg-orange-50/30">{formatVal(branch.krd_ksm_book, true)}</td>
                      <td className="px-4 py-3 text-right border-r">{formatVal(branch.krd_cc_app, false)}</td>
                      <td className="px-4 py-3 text-right border-r font-medium bg-orange-50/30">{formatVal(branch.krd_cc_bade, true)}</td>
                      <td className="px-4 py-3 text-right border-r">{formatVal(branch.krd_kum_book, false)}</td>
                      <td className="px-4 py-3 text-right border-r font-medium bg-orange-50/30">{formatVal(branch.krd_kum_bade, true)}</td>
                      <td className="px-4 py-3 text-right border-r">{formatVal(branch.krd_kkb_book, false)}</td>
                      <td className="px-4 py-3 text-right font-medium bg-orange-50/30">{formatVal(branch.krd_kkb_bade, true)}</td>
                    </tr>
                  ))}
                  
                  {/* Total Row */}
                  <tr className="bg-slate-100 font-bold border-t-2 border-slate-200">
                    <td colSpan={3} className="px-4 py-4 text-slate-800 border-r border-slate-200">
                      TOTAL {currentData.name.toUpperCase()}
                    </td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.fun_tab_lead, false)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.fun_tab_lag, true)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.fun_giro_lead, false)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-300">{formatVal(currentData.fun_giro_lag, true)}</td>
                    
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.trx_edc_lead, false)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.trx_edc_lag, true)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.trx_lvm_lead, false)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.trx_lvm_lag, true)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.trx_livin_lead, false)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-300">{formatVal(currentData.trx_kopra_lead, false)}</td>
                    
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.prio_ntp, false)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-300">{formatVal(currentData.prio_ntb, false)}</td>
                    
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.krd_sme_ref, true)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.krd_sme_bade, true)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.krd_cl_reg, true)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.krd_cl_flpp, true)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.krd_cl_bade, true)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.krd_ksm_lead, true)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.krd_ksm_book, true)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.krd_cc_app, false)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.krd_cc_bade, true)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.krd_kum_book, false)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.krd_kum_bade, true)}</td>
                    <td className="px-4 py-4 text-right border-r border-slate-200">{formatVal(currentData.krd_kkb_book, false)}</td>
                    <td className="px-4 py-4 text-right">{formatVal(currentData.krd_kkb_bade, true)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
