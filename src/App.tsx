/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { FundingDashboard } from './components/FundingDashboard';
import { KreditRetailDashboard } from './components/KreditRetailDashboard';
import { EkosistemRegionDashboard } from './components/EkosistemRegionDashboard';

export default function App() {
  const [activeMenu, setActiveMenu] = useState('bpa');

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Global Header */}
        <div className="px-8 pt-6 pb-2 shrink-0">
          <div className="bg-gradient-to-r from-[#003D79] to-blue-600 rounded-full px-8 py-4 shadow-md flex items-center">
            <h1 className="text-xl font-bold text-white tracking-wide">
              Selamat Datang di Dashboard Area Jakarta Tebet Supomo!
            </h1>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {activeMenu === 'bpa' ? (
            <Dashboard />
          ) : activeMenu === 'funding' ? (
            <FundingDashboard />
          ) : activeMenu === 'kredit' ? (
            <KreditRetailDashboard />
          ) : activeMenu === 'ekosistem' ? (
            <EkosistemRegionDashboard />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-50">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-400 mb-2">Coming Soon</h2>
                <p className="text-slate-500">Halaman {activeMenu} sedang dalam pengembangan.</p>
              </div>
            </div>
          )}
        </div>
        
        <footer className="bg-white border-t border-slate-200 py-2 px-8 text-center shrink-0">
          <p className="text-[10px] sm:text-xs text-slate-400">
            © 2026 PT Bank Mandiri (Persero) Tbk Area Jakarta Tebet Supomo. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

