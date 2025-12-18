
import React from 'react';

interface StatCardProps {
  label: string;
  amount: number;
  type: 'contribution' | 'expense' | 'balance';
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, amount, type, icon }) => {
  const getTheme = () => {
    switch(type) {
      case 'contribution': return { 
        border: 'border-emerald-500/20', 
        glow: 'shadow-emerald-500/5',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10'
      };
      case 'expense': return { 
        border: 'border-rose-500/20', 
        glow: 'shadow-rose-500/5',
        text: 'text-rose-400',
        bg: 'bg-rose-500/10'
      };
      case 'balance': return { 
        border: 'border-cyan-500/20', 
        glow: 'shadow-cyan-500/5',
        text: 'text-cyan-400',
        bg: 'bg-cyan-500/10'
      };
      default: return { 
        border: 'border-slate-500/20', 
        glow: 'shadow-slate-500/5',
        text: 'text-slate-400',
        bg: 'bg-slate-500/10'
      };
    }
  };

  const theme = getTheme();

  return (
    <div className={`p-6 rounded-3xl glass-card border ${theme.border} transition-all duration-300 relative group overflow-hidden`}>
      {/* Decorative Glow */}
      <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full ${theme.bg} blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</span>
        <div className={`p-2 rounded-xl ${theme.bg} ${theme.text}`}>
          {icon}
        </div>
      </div>
      
      <div className="relative z-10">
        <div className={`text-3xl font-black tracking-tighter ${theme.text} mb-1`}>
          ₦{amount.toLocaleString(undefined, { minimumFractionDigits: 0 })}
        </div>
        <div className="flex items-center gap-1.5 mt-2">
            <span className="flex w-1.5 h-1.5 rounded-full bg-slate-700"></span>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Real-time Data</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
