import React from 'react';
import { 
  BarChart3, 
  Wallet, 
  CreditCard, 
  Network, 
  Building2, 
  Trophy,
  Calendar
} from 'lucide-react';
import { cn } from '../lib/utils';
import { sidebarDateText } from '../data/MasterData';

const menuItems = [
  { id: 'summary', label: 'Summary Area', icon: Trophy },   
  { id: 'bpa', label: 'Branch Profitability Analysis', icon: BarChart3 },
  { id: 'funding', label: 'Funding', icon: Wallet },
  { id: 'kredit', label: 'Kredit Retail', icon: CreditCard },
  { id: 'ekosistem', label: 'Ekosistem Region', icon: Network },
  { id: 'project', label: 'Project Cabang', icon: Building2 },
  { id: 'topracer', label: 'Top Racer', icon: Trophy },
];

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

export function Sidebar({ activeMenu, setActiveMenu }: SidebarProps) {
  return (
    <div className="w-64 bg-[#003D79] text-white h-screen flex flex-col flex-shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-white p-1.5 rounded-lg flex items-center justify-center w-12 h-10">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" 
              alt="Bank Mandiri" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Bank Mandiri</h1>
            <p className="text-xs text-blue-200">Area Jakarta Tebet Supomo</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-blue-100 mb-6 px-4 py-3 bg-white/10 rounded-lg text-sm font-medium">
          <Calendar size={16} />
          <span>{sidebarDateText}</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
                  isActive 
                    ? "bg-[#F2A900] text-[#003D79] font-medium shadow-md" 
                    : "hover:bg-blue-800/50 text-blue-100"
                )}
              >
                <Icon size={20} className={cn(isActive ? "text-[#003D79]" : "text-blue-300")} />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-blue-800/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-xs font-medium">
            ATF
          </div>
          <div className="text-sm">
            <p className="font-medium">Area Transaction and Funding Team</p>
            <p className="text-xs text-blue-300">AJTS 124</p>
          </div>
        </div>
      </div>
    </div>
  );
}
