import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Circle, Coffee, Compass, MapPin, MessageCircle, Sparkles, Users } from 'lucide-react';
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-8 md:p-12 border border-gray-100"
        style={{ background: 'linear-gradient(135deg, var(--color-light-mint), var(--color-teal-soft), var(--color-subtle-peach))' }}
      >
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-deep-navy mb-5 border border-white/50">
            <Sparkles className="h-3.5 w-3.5 text-soft-teal" /> Welcome to Meridian
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-deep-navy">
            Hi {employeeData.name} — your first day starts in{' '}
            <span className="relative inline-block">
              <span className="relative z-10">3&nbsp;days</span>
              <span className="absolute inset-x-0 bottom-1 h-3 rounded-md bg-subtle-peach" />
            </span>.
          </h1>
          <p className="mt-4 text-base md:text-lg text-deep-navy/70 max-w-xl">
            You don't need to figure everything out alone. Here are the things that matter most right now — everything else can wait.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/journey" className="btn-primary inline-flex items-center gap-2">
              Open your Journey <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/ask" className="btn-secondary inline-flex items-center gap-2">
              <MessageCircle className="h-4 w-4" /> Ask a question
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ── Top grid: Actions + Progress ── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Next Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 card"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display text-xl font-bold text-deep-navy">Today's next actions</h2>
              <p className="text-sm text-gray-500 mt-0.5">Small, kind steps. Nothing urgent, nothing scary.</p>
            </div>
            <Link to="/journey" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-soft-teal hover:underline">
              See all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="space-y-3">
            {nextActions.map((a) => {
              const bg = a.tone === 'peach' ? 'bg-subtle-peach' : a.tone === 'teal' ? 'bg-teal-soft' : 'bg-sky';
              return (
                <li key={a.id} className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-warm-offwhite/60 p-4 hover:shadow-sm transition-all">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${bg}`}>
                    <Circle className="h-4 w-4 text-deep-navy/60" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-deep-navy truncate">{a.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{a.meta}</div>
                  </div>
                  <button className="text-xs font-medium text-soft-teal hover:text-deep-navy opacity-0 group-hover:opacity-100 transition cursor-pointer">
                    Mark done
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* First-week progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card"
        >
          <h2 className="font-display text-xl font-bold text-deep-navy">First-week progress</h2>
          <p className="text-sm text-gray-500 mt-0.5">You're just getting started — that's perfectly fine.</p>

          <div className="mt-6 flex items-center gap-5">
            <div className="relative h-24 w-24 shrink-0">
              <svg viewBox="0 0 36 36" className="h-24 w-24 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--color-soft-teal)" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${pct}, 100`} />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-2xl font-bold text-deep-navy">{pct}%</span>
              </div>
            </div>
            <div className="text-sm space-y-1.5 min-w-0">
              <Stat dot="var(--color-soft-teal)" label="Done" value={done} />
              <Stat dot="var(--color-subtle-peach)" label="In progress" value={inProgress} />
              <Stat dot="#9ca3af" label="Ahead of you" value={total - done - inProgress} />
            </div>
          </div>

          <div className="mt-5 rounded-xl p-3 text-xs text-deep-navy/80 bg-light-mint">
            💚 {done} task{done !== 1 && 's'} done already. That's a real head start.
          </div>
        </motion.div>
      </div>

      {/* ── Middle grid: People + Office Days ── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* People to meet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 card"
        >
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="font-display text-xl font-bold text-deep-navy">People to meet this week</h2>
              <p className="text-sm text-gray-500 mt-0.5">Hand-picked based on your team, interests, and office days.</p>
            </div>
            <Link to="/connect" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-soft-teal hover:underline">
              Meridian Connect <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {suggestedConnections.map((p) => (
              <div key={p.id} className="rounded-2xl border border-gray-100 p-4 bg-warm-offwhite/60 hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full font-semibold text-deep-navy text-sm" style={{ background: p.color }}>
                    {p.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-deep-navy truncate">{p.name}</div>
                    <div className="text-xs text-gray-500 truncate">{p.role}</div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-deep-navy/70 leading-relaxed">{p.reason}</p>
                <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-soft-teal hover:text-deep-navy cursor-pointer">
                  <Coffee className="h-3.5 w-3.5" /> Coffee chat
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming office days */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="card"
        >
          <h2 className="font-display text-xl font-bold text-deep-navy flex items-center gap-2">
            <Calendar className="h-5 w-5" /> Upcoming office days
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">Engineering anchors Wed + Thu.</p>
          <ul className="mt-5 space-y-2.5">
            {upcomingOfficeDays.map((d) => {
              const bg = d.tone === 'peach' ? 'bg-subtle-peach' : d.tone === 'teal' ? 'bg-teal-soft' : 'bg-sky';
              return (
                <li key={d.date} className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-gray-50 transition">
                  <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-deep-navy ${bg}`}>
                    <div className="text-center leading-tight">
                      <div className="text-[9px] uppercase tracking-wider opacity-70">{d.day}</div>
                      <div className="text-sm font-semibold">{d.date.split(' ')[1]}</div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{d.label}</div>
                    <div className="text-xs text-gray-500">{d.date}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>

      {/* ── Quick access ── */}
      <div>
        <h2 className="font-display text-xl font-bold text-deep-navy mb-4">Explore Meridian Compass</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickCard to="/journey" title="Meridian Journey" desc="Your 30-day guided path." icon={Compass} bg="bg-teal-soft" />
          <QuickCard to="/connect" title="Meridian Connect" desc="Real people, warm intros." icon={Users} bg="bg-subtle-peach" />
          <QuickCard to="/office" title="Office Explorer" desc="Know the space before Monday." icon={MapPin} bg="bg-sky" />
          <QuickCard to="/ask" title="Ask Meridian" desc="Answers to the small questions." icon={MessageCircle} bg="bg-butter" />
        </div>
      </div>

      {/* ── Confidence builder ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 border border-gray-100"
        style={{ background: 'linear-gradient(120deg, var(--color-light-mint), var(--color-teal-soft))' }}
      >
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/80 shadow-sm">
          <Sparkles className="h-5 w-5 text-soft-teal" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-lg font-bold text-deep-navy">A quiet reminder</div>
          <p className="text-sm text-deep-navy/70 mt-1 max-w-2xl">
            Nobody expects you to know everything on day one — or day thirty. Curiosity beats certainty here. Ask, wander, and trust the pace.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

function Stat({ dot, label, value }: { dot: string; label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full shrink-0" style={{ background: dot }} />
      <span className="text-gray-500">{label}</span>
      <span className="ml-auto font-semibold text-deep-navy tabular-nums">{value}</span>
    </div>
  );
}

function QuickCard({ to, title, desc, icon: Icon, bg }: { to: string; title: string; desc: string; icon: React.ElementType; bg: string }) {
  return (
    <Link to={to} className="group card hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className={`grid h-10 w-10 place-items-center rounded-xl mb-4 ${bg}`}>
        <Icon className="h-5 w-5 text-deep-navy" />
      </div>
      <div className="font-semibold text-deep-navy">{title}</div>
      <div className="text-xs text-gray-500 mt-1">{desc}</div>
      <div className="mt-3 text-xs font-medium text-soft-teal inline-flex items-center gap-1 group-hover:text-deep-navy">
        Open <ArrowRight className="h-3 w-3" />
      </div>
    </Link>
  );
}

export default Dashboard;
