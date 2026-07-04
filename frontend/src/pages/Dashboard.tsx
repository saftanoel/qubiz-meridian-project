import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, MapPin, MessageCircle, Sparkles, Users, CircleCheck, TrendingUp, UsersRound, CalendarDays, Loader2, WifiOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDashboard } from '../lib/api';
import { employeeData, nextActions as mockNextActions, suggestedConnections, upcomingOfficeDays as mockOfficeDays, journeyPhases } from '../lib/mockData';
import type { DashboardResponse } from '../types/api';

const Dashboard = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getDashboard()
      .then((res) => { if (!cancelled) { setData(res); setError(false); } })
      .catch(() => { if (!cancelled) setError(true); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // Derive values — backend-first, mockData fallback
  const hireName = data?.new_hire?.name ?? employeeData.name;
  const pct = data?.progress_summary?.completion_percent ?? Math.round(journeyPhases.flatMap(p => p.tasks).filter(t => t.status === 'done').length / journeyPhases.flatMap(p => p.tasks).length * 100);
  const done = data?.progress_summary?.done ?? journeyPhases.flatMap(p => p.tasks).filter(t => t.status === 'done').length;
  const inProgress = data?.progress_summary?.in_progress ?? journeyPhases.flatMap(p => p.tasks).filter(t => t.status === 'in_progress').length;
  const total = data?.progress_summary?.total ?? journeyPhases.flatMap(p => p.tasks).length;
  const actions = data?.today_next_actions ?? mockNextActions;
  const officeDays = data?.upcoming_office_days ?? mockOfficeDays;

  // Suggested people — use backend with avatar_url, fallback to mock
  const suggestedPeople = data?.suggested_people
    ? data.suggested_people.map((p, i) => ({
        id: p.id,
        name: p.name,
        role: p.role,
        department: p.department,
        reason: p.reason,
        initials: p.initials,
        color: i === 0 ? 'var(--color-subtle-peach)' : i === 1 ? 'var(--color-teal-soft)' : 'var(--color-light-mint)',
        avatar_url: p.avatar_url,
      }))
    : suggestedConnections.map(c => ({ ...c, avatar_url: undefined as string | undefined }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 text-soft-teal animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Backend error banner */}
      {error && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm font-medium">
          <WifiOff className="h-4 w-4 shrink-0" />
          Could not reach the Meridian backend. Showing cached data. Please start the FastAPI server.
        </div>
      )}

      {/* ── Hero ── */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100"
        style={{ background: 'linear-gradient(135deg, var(--color-light-mint) 0%, var(--color-teal-soft) 40%, var(--color-subtle-peach) 100%)' }}
      >
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-card-soft/60 backdrop-blur-sm px-3 py-1 text-[11px] uppercase tracking-widest font-semibold text-text-main mb-4 border border-border-warm/40 shadow-sm">
            <Sparkles className="h-3 w-3 text-soft-teal" /> Welcome to Meridian
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl text-deep-navy tracking-tight leading-[1.1]">
            Hi {hireName} — your first day starts in{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">3 days</span>
              <span className="absolute inset-x-0 bottom-1.5 h-2 rounded-md bg-subtle-peach/80 mix-blend-multiply" />
            </span>.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-deep-navy/70 max-w-xl font-medium">
            You don't need to figure everything out alone. Here are the things that matter most right now — everything else can wait.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/journey" className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm">
              Open your Journey <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/ask" className="btn-secondary inline-flex items-center gap-2 px-5 py-2.5 bg-card-soft/60 backdrop-blur-sm border-border-warm/50 text-sm">
              <MessageCircle className="h-4 w-4 text-slate-500" /> Ask a question
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ── Top grid: Actions + Progress ── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Next Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 card"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-[17px] font-display font-semibold text-deep-navy tracking-wide flex items-center gap-2">
                <CircleCheck className="h-4 w-4 text-slate-400" /> Today's next actions
              </h2>
              <p className="text-[13px] text-slate-500 mt-1">Small, kind steps. Nothing urgent, nothing scary.</p>
            </div>
            <Link to="/journey" className="hidden sm:inline-flex items-center gap-1.5 text-[14px] font-bold text-soft-teal hover:opacity-80 transition-opacity bg-soft-teal/10 hover:bg-soft-teal/20 px-3.5 py-1.5 rounded-full">
              See all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="space-y-2">
            {actions.map((a) => {
              const bg = a.tone === 'peach' ? 'bg-subtle-peach' : a.tone === 'teal' ? 'bg-teal-soft' : 'bg-sky';
              return (
                <li key={a.id} className="group flex items-center gap-5 rounded-2xl border border-border-warm bg-card-soft p-4 hover:bg-card hover:border-border-hover hover:shadow-[0_4px_20px_rgba(55,40,20,0.05)] transition-all cursor-pointer">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${bg}`}>
                    <CircleCheck className="h-5 w-5 text-deep-navy/60" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14.5px] font-semibold text-deep-navy truncate">{a.title}</div>
                    <div className="text-[12.5px] text-slate-500 mt-0.5">{a.meta}</div>
                  </div>
                  <button className="text-[12px] font-semibold text-soft-teal opacity-0 group-hover:opacity-100 transition-opacity">
                    Mark done
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* First-week progress */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card flex flex-col"
        >
          <h2 className="text-[17px] font-display font-semibold text-deep-navy tracking-wide flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-slate-400" /> First-week progress
          </h2>
          <p className="text-[13px] text-slate-500 mt-1">You're just getting started.</p>

          <div className="my-auto flex items-center gap-6 py-4">
            <div className="relative h-[88px] w-[88px] shrink-0">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--color-soft-teal)" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${pct}, 100`} />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-[26px] font-semibold text-deep-navy">{pct}%</span>
              </div>
            </div>
            <div className="text-[13px] space-y-2 min-w-0">
              <Stat dot="var(--color-soft-teal)" label="Done" value={done} />
              <Stat dot="var(--color-subtle-peach)" label="In progress" value={inProgress} />
              <Stat dot="#cbd5e1" label="Ahead" value={total - done - inProgress} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Middle grid: People + Office Days ── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* People to meet */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 card"
        >
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-[17px] font-display font-semibold text-deep-navy tracking-wide flex items-center gap-2">
                <UsersRound className="h-4 w-4 text-slate-400" /> People to meet this week
              </h2>
              <p className="text-[13px] text-slate-500 mt-1">Based on your team and office days.</p>
            </div>
            <Link to="/connect" className="hidden sm:inline-flex items-center gap-1.5 text-[14px] font-bold text-soft-teal hover:opacity-80 transition-opacity bg-soft-teal/10 hover:bg-soft-teal/20 px-3.5 py-1.5 rounded-full">
              Meridian Connect <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {suggestedPeople.map((p) => (
              <div key={p.id} className="bg-card-soft border border-border-warm rounded-3xl p-5 hover:border-border-hover hover:shadow-[0_8px_30px_rgba(55,40,20,0.06)] transition-all cursor-pointer flex flex-col h-full group">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl font-semibold text-deep-navy text-[15px] shadow-sm relative overflow-hidden" style={{ background: p.color }}>
                    {p.initials}
                    {p.avatar_url && (
                      <img
                        src={p.avatar_url}
                        alt={`${p.name} profile photo`}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[14px] font-bold text-deep-navy truncate group-hover:text-soft-teal transition-colors">{p.name}</div>
                    <div className="text-[12px] font-medium text-slate-500 truncate uppercase tracking-wide mt-0.5">{p.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-[13px] text-slate-600 leading-relaxed line-clamp-2 flex-1">{p.reason}</p>
                <button className="mt-4 w-full bg-card-soft border border-border-warm text-text-main hover:bg-card hover:border-border-hover text-[12.5px] font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all">
                  <UsersRound className="h-3.5 w-3.5 text-soft-teal" /> Coffee chat
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming office days */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="card"
        >
          <h2 className="text-[17px] font-display font-semibold text-deep-navy tracking-wide flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-slate-400" /> Upcoming office days
          </h2>
          <ul className="mt-5 space-y-2">
            {officeDays.map((d) => {
              const bg = d.tone === 'peach' ? 'bg-subtle-peach' : d.tone === 'teal' ? 'bg-teal-soft' : 'bg-sky';
              return (
                <li key={d.date} className="flex items-center gap-4 rounded-2xl p-3 hover:bg-card-soft transition cursor-pointer border border-transparent hover:border-border-warm">
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-deep-navy shadow-[0_2px_10px_rgb(0,0,0,0.02)] ${bg}`}>
                    <div className="text-center leading-none">
                      <div className="text-[9.5px] uppercase font-bold tracking-wider opacity-60 mb-1">{d.day}</div>
                      <div className="text-[14px] font-bold">{d.date.split(' ')[1]}</div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[14px] font-semibold text-deep-navy truncate">{d.label}</div>
                    <div className="text-[12.5px] text-slate-500 mt-0.5">{d.date}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>

      {/* ── Quick access ── */}
      <div>
        <h2 className="text-[17px] font-display font-semibold text-deep-navy tracking-wide mb-4">Explore Compass</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickCard to="/journey" title="Meridian Journey" desc="Your 30-day path" icon={Compass} bg="bg-teal-soft" />
          <QuickCard to="/connect" title="Meridian Connect" desc="Real people" icon={Users} bg="bg-subtle-peach" />
          <QuickCard to="/office" title="Office Explorer" desc="Know the space" icon={MapPin} bg="bg-sky" />
          <QuickCard to="/ask" title="Ask Meridian" desc="Small questions" icon={MessageCircle} bg="bg-butter" />
        </div>
      </div>

      {/* ── Confidence builder ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 border border-border-warm shadow-soft"
        style={{ background: 'linear-gradient(120deg, var(--color-light-mint), var(--color-teal-soft))' }}
      >
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] bg-card/80 shadow-sm">
          <Sparkles className="h-5 w-5 text-soft-teal" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-xl font-semibold text-deep-navy">A quiet reminder</div>
          <p className="text-[14px] text-deep-navy/70 mt-1 max-w-2xl font-medium">
            Nobody expects you to know everything on day one — or day thirty. Curiosity beats certainty here. Ask, wander, and trust the pace.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

function Stat({ dot, label, value }: { dot: string; label: string; value: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-2 w-2 rounded-full shrink-0" style={{ background: dot }} />
      <span className="text-slate-500 font-medium">{label}</span>
      <span className="ml-auto font-bold text-deep-navy">{value}</span>
    </div>
  );
}

function QuickCard({ to, title, desc, icon: Icon, bg }: { to: string; title: string; desc: string; icon: React.ElementType; bg: string }) {
  return (
    <Link to={to} className="group bg-card-soft border border-border-warm rounded-3xl p-5 hover:border-border-hover hover:shadow-[0_8px_30px_rgba(55,40,20,0.06)] hover:-translate-y-0.5 transition-all flex flex-col h-[130px]">
      <div className={`grid h-10 w-10 place-items-center rounded-2xl ${bg}`}>
        <Icon className="h-4 w-4 text-deep-navy" />
      </div>
      <div className="mt-auto pt-4">
        <div className="text-[14px] font-bold text-deep-navy group-hover:text-soft-teal transition-colors">{title}</div>
        <div className="text-[12.5px] text-slate-500 mt-0.5">{desc}</div>
      </div>
    </Link>
  );
}

export default Dashboard;
