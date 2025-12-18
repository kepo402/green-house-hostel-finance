import React, { useEffect, useState, useMemo } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import StatCard from './components/StatCard';
import { fetchDashboard } from './services/api';
import { DashboardResponse, RoomContribution, Expense } from './types'; 



import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const App: React.FC = () => {
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 7); // "YYYY-MM"
  });
  const [showAllExpenses, setShowAllExpenses] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchDashboard(selectedMonth)
    .then((data) => {
      console.log('API Response:', data);
      if (data && typeof data === 'object') {
        setDashboard(data);
      } else {
        setDashboard({
          month_name: '',
          monthly_summary: { total_contributions: 0, total_expenses: 0, balance: 0 },
          overall_summary: { total_contributions: 0, total_expenses: 0, balance: 0 },
          room_data: [],
          expenses_month: [],
          expenses_all: [],
          announcements: [],
        });
      }
    })
    .catch((err) => {
      console.error('Fetch error:', err);
      setDashboard({
        month_name: '',
        monthly_summary: { total_contributions: 0, total_expenses: 0, balance: 0 },
        overall_summary: { total_contributions: 0, total_expenses: 0, balance: 0 },
        room_data: [],
        expenses_month: [],
        expenses_all: [],
        announcements: [],
      });
    })
    .finally(() => setLoading(false));
}, [selectedMonth]);
  

  // Month display name
  const monthName = useMemo(() => {
    if (!selectedMonth) return '';
    const d = new Date(selectedMonth);
    return d.toLocaleString('default', { month: 'long', year: 'numeric' });
  }, [selectedMonth]);

  if (loading || !dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white font-bold text-xl">
        Loading dashboard...
      </div>
    );
  }

  const { room_data, expenses_month, expenses_all, announcements, monthly_summary, overall_summary } = dashboard;

  const chartData = [
    { name: 'Inflow', value: monthly_summary.total_contributions },
    { name: 'Outflow', value: monthly_summary.total_expenses },
  ];

  const COLORS = ['#10b981', '#f43f5e'];

  return (
    <div className="min-h-screen text-slate-200 bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black leading-none text-white">GREEN HOUSE</h1>
              <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mt-1.5 opacity-80">Financial Engine v2.0</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl group focus-within:border-cyan-500/50 transition-all">
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent border-none text-sm font-bold text-white focus:ring-0 outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>
        <AnnouncementBar announcements={announcements} />
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-12">
        {/* Key Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Monthly Revenue" amount={monthly_summary.total_contributions} type="contribution" />
          <StatCard label="Monthly Spend" amount={monthly_summary.total_expenses} type="expense" />
          <StatCard label="Net Cashflow" amount={monthly_summary.balance} type="balance" />
        </section>

        {/* Charts & Rooms */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Pie Chart */}
          <div className="xl:col-span-5 flex flex-col gap-8">
            <div className="glass-card p-8 rounded-[2.5rem] flex flex-col items-center min-h-[400px]">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8 w-full text-center">Liquidity Analysis</h3>
              <div className="w-full h-64 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
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
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
                  </div>
                  
                  <div className="xl:col-span-5 flex flex-col gap-8">
  <div className="glass-card p-8 rounded-[2.5rem] flex flex-col items-center min-h-[400px]">
    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8 w-full text-center">Liquidity Analysis</h3>
    
    {/* Pie Chart */}
    <div className="w-full h-64 mb-8">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" innerRadius={75} outerRadius={95} paddingAngle={10} dataKey="value" stroke="none">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* Bar Chart */}
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={room_data.map(r => ({ room: r.room, monthly: Number(r.month_total) }))}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="room" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="monthly" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>

  </div>
</div>


          {/* Room Table */}
          <div className="xl:col-span-7 glass-card p-8 rounded-[2.5rem] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-white/5">
                    <th>Room</th>
                    <th>Monthly</th>
                    <th>Lifetime</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {room_data.map((r: RoomContribution, i) => (
                    <tr key={i} className="group hover:bg-white/5 transition-all">
                      <td className="py-3 px-2">{r.room}</td>
                      <td className="py-3 px-2 text-emerald-400">₦{Number(r.month_total).toLocaleString()}</td>
<td className="py-3 px-2 text-right">₦{Number(r.overall_total).toLocaleString()}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Expenses */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-white tracking-tight">Financial Outlets</h2>
            <button
              onClick={() => setShowAllExpenses(!showAllExpenses)}
              className="flex items-center gap-2 bg-slate-900 border border-white/10 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all text-cyan-400"
            >
              {showAllExpenses ? "Compact Feed" : "Expanded History"}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAllExpenses ? expenses_all : expenses_month).map((e: Expense, idx) => (
              <div key={idx} className="glass-card p-6 rounded-3xl relative group">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-slate-600 bg-white/5 px-2 py-1 rounded uppercase tracking-tighter">
                    {new Date(e.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-300 mb-6 group-hover:text-white transition-colors">{e.description}</h4>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-black text-white tracking-tighter">
                    <span className="text-xs text-rose-500 mr-1">₦</span>
                    {e.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Overall Summary */}
        <section>
          <h2 className="text-2xl font-black text-white mb-4">Lifetime Asset Valuation</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p>Total Inflow</p>
              <p>₦{overall_summary.total_contributions.toLocaleString()}</p>
            </div>
            <div>
              <p>Total Burn</p>
              <p>₦{overall_summary.total_expenses.toLocaleString()}</p>
            </div>
            <div>
              <p>Net Capital</p>
              <p>₦{overall_summary.balance.toLocaleString()}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
