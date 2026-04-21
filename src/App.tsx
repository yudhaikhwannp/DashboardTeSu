/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { FundingDashboard } from './components/FundingDashboard';
import { KreditRetailDashboard } from './components/KreditRetailDashboard';
import { EkosistemRegionDashboard } from './components/EkosistemRegionDashboard';
import { Login } from './components/Login';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState('bpa');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Cek status autentikasi dari localStorage saat komponen dimount
    const authStatus = localStorage.getItem('dashboard_auth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <Login onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}
      
      {/* Sidebar Wrapper */}
      <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar activeMenu={activeMenu} setActiveMenu={(menu) => {
          setActiveMenu(menu);
          setIsSidebarOpen(false);
        }} />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Global Header */}
        <div className="px-4 md:px-8 pt-4 md:pt-6 pb-2 shrink-0">
          <div className="bg-gradient-to-r from-[#003D79] to-blue-600 rounded-2xl md:rounded-full px-4 md:px-8 py-3 md:py-4 shadow-md flex items-center gap-3">
            <button 
              className="md:hidden text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-sm md:text-xl font-bold text-white tracking-wide truncate">
              Selamat Datang di Dashboard Area!
            </h1>
          </div>
        </div>

        <div className="flex-1 overflow-hidden h-full">
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

