import { motion } from 'framer-motion';
import { ArrowRight, Compass, MapPin, MessageCircle, Sparkles, Users, CircleCheck, TrendingUp, UsersRound, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { employeeData, nextActions, suggestedConnections, upcomingOfficeDays, journeyPhases } from '../lib/mockData';

const Dashboard = () => {
  const allTasks = journeyPhases.flatMap((p) => p.tasks);
  const done = allTasks.filter((t) => t.status === 'done').length;
  const inProgress = allTasks.filter((t) => t.status === 'in_progress').length;
  const total = allTasks.length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="space-y-8">
      {/* ── Hero ── */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] p-8 md:p-14 shadow-sm border border-slate-100"
        style={{ background: 'linear-gradient(135deg, var(--color-light-mint) 0%, var(--color-teal-soft) 40%, var(--color-subtle-peach) 100%)' }}
      >
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-sm px-3.5 py-1.5 text-[11px] uppercase tracking-widest font-semibold text-deep-navy mb-6 border border-white/40 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-soft-teal" /> Welcome to Meridian
          </div>
          <h1 className="font-serif-elegant text-4xl md:text-5xl lg:text-6xl text-deep-navy tracking-tight leading-[1.1]">
            Hi {employeeData.name} — your first day starts in{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">3 days</span>
              <span className="absolute inset-x-0 bottom-2 h-2.5 rounded-md bg-subtle-peach/80 mix-blend-multiply" />
            </span>.
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed text-deep-navy/70 max-w-xl font-medium">
            You don't need to figure everything out alone. Here are the things that matter most right now — everything else can wait.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/journey" className="btn-primary inline-flex items-center gap-2 px-6 py-3">
              Open your Journey <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/ask" className="btn-secondary inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm border-white/50">
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
              <h2 className="text-[15px] font-bold text-deep-navy uppercase tracking-wider flex items-center gap-2">
                <CircleCheck className="h-4 w-4 text-slate-400" /> Today's next actions
              </h2>
              <p className="text-[13px] text-slate-500 mt-1">Small, kind steps. Nothing urgent, nothing scary.</p>
            </div>
            <Link to="/journey" className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-semibold text-soft-teal hover:text-deep-navy transition-colors">
              See all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="space-y-2">
            {nextActions.map((a) => {
              const bg = a.tone === 'peach' ? 'bg-subtle-peach' : a.tone === 'teal' ? 'bg-teal-soft' : 'bg-sky';
              return (
                <li key={a.id} className="group flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                  <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-[10px] ${bg}`}>
                    <CircleCheck className="h-4 w-4 text-deep-navy/50" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-semibold text-deep-navy truncate">{a.title}</div>
                    <div className="text-[12px] text-slate-500 mt-0.5">{a.meta}</div>
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
          <h2 className="text-[15px] font-bold text-deep-navy uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-slate-400" /> First-week progress
          </h2>
          <p className="text-[13px] text-slate-500 mt-1">You're just getting started.</p>

          <div className="mt-auto flex items-center gap-6 py-4">
            <div className="relative h-[88px] w-[88px] shrink-0">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--color-soft-teal)" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${pct}, 100`} />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-xl font-bold text-deep-navy">{pct}%</span>
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
              <h2 className="text-[15px] font-bold text-deep-navy uppercase tracking-wider flex items-center gap-2">
                <UsersRound className="h-4 w-4 text-slate-400" /> People to meet this week
              </h2>
              <p className="text-[13px] text-slate-500 mt-1">Based on your team and office days.</p>
            </div>
            <Link to="/connect" className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-semibold text-soft-teal hover:text-deep-navy transition-colors">
              Connect <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {suggestedConnections.map((p) => (
              <div key={p.id} className="card-compact bg-slate-50/50 hover:bg-white transition-all cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-[10px] font-semibold text-deep-navy text-sm shadow-sm" style={{ background: p.color }}>
                    {p.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-deep-navy truncate">{p.name}</div>
                    <div className="text-[11px] font-medium text-slate-500 truncate uppercase tracking-wide mt-0.5">{p.role}</div>
                  </div>
                </div>
                <p className="mt-3 text-[12px] text-slate-600 leading-relaxed line-clamp-2">{p.reason}</p>
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
          <h2 className="text-[15px] font-bold text-deep-navy uppercase tracking-wider flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-slate-400" /> Upcoming office days
          </h2>
          <ul className="mt-5 space-y-2">
            {upcomingOfficeDays.map((d) => {
              const bg = d.tone === 'peach' ? 'bg-subtle-peach' : d.tone === 'teal' ? 'bg-teal-soft' : 'bg-sky';
              return (
                <li key={d.date} className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition cursor-pointer border border-transparent hover:border-slate-100">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-[10px] text-deep-navy ${bg}`}>
                    <div className="text-center leading-none">
                      <div className="text-[9px] uppercase tracking-wider opacity-70 mb-0.5">{d.day}</div>
                      <div className="text-[13px] font-bold">{d.date.split(' ')[1]}</div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-deep-navy truncate">{d.label}</div>
                    <div className="text-[11px] text-slate-500">{d.date}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>

      {/* ── Quick access ── */}
      <div>
        <h2 className="text-[15px] font-bold text-deep-navy uppercase tracking-wider mb-4">Explore Compass</h2>
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
        className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 border border-slate-100 shadow-[var(--shadow-soft)]"
        style={{ background: 'linear-gradient(120deg, var(--color-light-mint), var(--color-teal-soft))' }}
      >
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] bg-white/80 shadow-sm">
          <Sparkles className="h-5 w-5 text-soft-teal" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-lg font-bold text-deep-navy">A quiet reminder</div>
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
    <Link to={to} className="group card-compact hover:shadow-md transition-all flex flex-col justify-between h-[120px]">
      <div className={`grid h-9 w-9 place-items-center rounded-[10px] ${bg}`}>
        <Icon className="h-4 w-4 text-deep-navy" />
      </div>
      <div>
        <div className="text-[13px] font-bold text-deep-navy group-hover:text-soft-teal transition-colors">{title}</div>
        <div className="text-[12px] text-slate-500 mt-0.5">{desc}</div>
      </div>
    </Link>
  );
}

export default Dashboard;
