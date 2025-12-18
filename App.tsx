
import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, AreaChart, Area
} from 'recharts';
import AnnouncementBar from './components/AnnouncementBar';
import StatCard from './components/StatCard';
import { mockAnnouncements, mockRooms, mockExpenses } from './mockData';
import { RoomContribution, Expense } from './types';

const App: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('2023-10');
  const [showAllExpenses, setShowAllExpenses] = useState(false);

  const monthName = useMemo(() => {
    const d = new Date(selectedMonth);
    return d.toLocaleString('default', { month: 'long', year: 'numeric' });
  }, [selectedMonth]);

  const filteredExpenses = useMemo(() => 
    mockExpenses.filter(e => e.date_added.startsWith(selectedMonth)),
  [selectedMonth]);

  const totalContributionsMonth = useMemo(() => 
    mockRooms.reduce((acc, curr) => acc + curr.month_total, 0),
  []);

  const totalExpensesMonth = useMemo(() => 
    filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0),
  [filteredExpenses]);

  const balanceMonth = totalContributionsMonth - totalExpensesMonth;

  const totalContributionsAll = useMemo(() => 
    mockRooms.reduce((acc, curr) => acc + curr.overall_total, 0),
  []);

  const totalExpensesAll = useMemo(() => 
    mockExpenses.reduce((acc, curr) => acc + curr.amount, 0),
  []);

  const balanceAll = totalContributionsAll - totalExpensesAll;

  const chartData = [
    { name: 'Inflow', value: totalContributionsMonth },
    { name: 'Outflow', value: totalExpensesMonth },
  ];

  const COLORS = ['#10b981', '#f43f5e'];

  return (
    <div className="min-h-screen text-slate-200">
      {/* High Fidelity Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight leading-none text-white">GREEN HOUSE</h1>
              <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mt-1.5 opacity-80">Financial Engine v2.0</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl group focus-within:border-cyan-500/50 transition-all">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <input 
                    type="month" 
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="bg-transparent border-none text-sm font-bold text-white focus:ring-0 outline-none cursor-pointer"
                />
            </div>
            <button className="bg-white text-slate-950 px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10">
                Log New
            </button>
          </div>
        </div>
        <AnnouncementBar announcements={mockAnnouncements} />
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-12">
        
        {/* Key Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              label="Monthly Revenue" 
              amount={totalContributionsMonth} 
              type="contribution"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 11l5-5m0 0l5 5m-5-5v12" /></svg>}
            />
            <StatCard 
              label="Monthly Spend" 
              amount={totalExpensesMonth} 
              type="expense"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 13l-5 5m0 0l-5-5m5 5V6" /></svg>}
            />
            <StatCard 
              label="Net Cashflow" 
              amount={balanceMonth} 
              type="balance"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
            />
        </section>

        {/* Visual & Table Section */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Chart Column */}
            <div className="xl:col-span-5 flex flex-col gap-8">
                <div className="glass-card p-8 rounded-[2.5rem] flex flex-col items-center min-h-[400px]">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8 w-full text-center">Liquidity Analysis</h3>
                    <div className="w-full h-64 flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <defs>
                                    <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                                    </linearGradient>
                                    <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.2}/>
                                    </linearGradient>
                                </defs>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={75}
                                    outerRadius={95}
                                    paddingAngle={10}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#0f172a', 
                                        border: '1px solid rgba(255,255,255,0.1)', 
                                        borderRadius: '16px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        color: '#fff'
                                    }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ opacity: 0.1 }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-10 mt-6 bg-white/5 py-4 px-8 rounded-2xl w-full">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-bold text-slate-500 uppercase mb-1">Inflow</span>
                            <span className="text-emerald-400 font-black">₦{totalContributionsMonth.toLocaleString()}</span>
                        </div>
                        <div className="w-[1px] h-full bg-white/10"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-bold text-slate-500 uppercase mb-1">Outflow</span>
                            <span className="text-rose-400 font-black">₦{totalExpensesMonth.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Room List Column */}
            <div className="xl:col-span-7 glass-card p-8 rounded-[2.5rem] overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Residency Ledger</h3>
                    <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">Verified Stream</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-white/5">
                                <th className="pb-4 px-2 text-left">Entity (Room)</th>
                                <th className="pb-4 px-2 text-left">Monthly contribution</th>
                                <th className="pb-4 px-2 text-right">Lifetime accumulated</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {mockRooms.map((r, i) => (
                                <tr key={i} className="group hover:bg-white/5 transition-all">
                                    <td className="py-5 px-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-black group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                                                {r.room.replace('Room ', '')}
                                            </div>
                                            <span className="font-bold text-sm text-slate-300 group-hover:text-white">{r.room}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-2">
                                        <div className={`text-sm font-black ${r.month_total > 0 ? 'text-emerald-400' : 'text-slate-600 italic'}`}>
                                            {r.month_total > 0 ? `+ ₦${r.month_total.toLocaleString()}` : '--'}
                                        </div>
                                    </td>
                                    <td className="py-5 px-2 text-right">
                                        <span className="text-xs font-bold text-slate-400">₦{r.overall_total.toLocaleString()}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        {/* Expenses Feed */}
        <section>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">Financial Outlets</h2>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Transaction History & Expense Logs</p>
                </div>
                <button 
                    onClick={() => setShowAllExpenses(!showAllExpenses)}
                    className="flex items-center gap-2 bg-slate-900 border border-white/10 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all text-cyan-400"
                >
                    {showAllExpenses ? "Compact Feed" : "Expanded History"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(showAllExpenses ? mockExpenses : filteredExpenses).map((e, idx) => (
                    <div key={idx} className="glass-card p-6 rounded-3xl relative group">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-black text-slate-600 bg-white/5 px-2 py-1 rounded uppercase tracking-tighter">
                                {new Date(e.date_added).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                            </span>
                            <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>
                        </div>
                        <h4 className="text-sm font-bold text-slate-300 mb-6 group-hover:text-white transition-colors">{e.description}</h4>
                        <div className="flex items-end justify-between">
                            <div className="text-2xl font-black text-white tracking-tighter">
                                <span className="text-xs text-rose-500 mr-1">₦</span>
                                {e.amount.toLocaleString()}
                            </div>
                            <svg className="w-5 h-5 text-slate-700 group-hover:text-cyan-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Global Summary Mega-Card */}
        <section className="relative pt-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-[3.5rem] p-12 lg:p-16 border border-white/5 shadow-2xl overflow-hidden relative group">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -mr-48 -mt-48 group-hover:bg-cyan-500/20 transition-all duration-1000"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                    <div className="max-w-xl text-center lg:text-left">
                        <div className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">Foundation Statistics</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-8">Lifetime Asset Valuation</h2>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Total Inflow</p>
                                <p className="text-2xl font-black text-emerald-400">₦{totalContributionsAll.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Total Burn</p>
                                <p className="text-2xl font-black text-rose-400">₦{totalExpensesAll.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center lg:items-end">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-4">Total Liquid Capital</p>
                        <div className="text-7xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-800">
                            ₦{balanceAll.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="mt-12 flex gap-4">
                            <button className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                                Export Audit
                            </button>
                            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                                History
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </main>

      <footer className="mt-20 py-16 border-t border-white/5 flex flex-col items-center gap-6">
        <div className="flex items-center gap-2 text-slate-700 grayscale opacity-40">
           <div className="w-5 h-5 bg-white rounded-md"></div>
           <span className="text-[10px] font-black uppercase tracking-[0.4em]">Fintech Standard Ledger</span>
        </div>
        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">Green House Managed Assets © 2024</p>
      </footer>
    </div>
  );
};

export default App;
