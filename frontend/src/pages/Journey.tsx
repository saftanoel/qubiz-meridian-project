import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as lucideIcons from 'lucide-react';
import { CheckCircle2, Circle, Clock, ChevronDown, ChevronUp, User, Timer } from 'lucide-react';
import { journeyPhases as initialPhases, type JourneyPhase, type TaskStatus } from '../lib/mockData';

const statusConfig: Record<TaskStatus, { label: string; color: string; icon: React.ElementType }> = {
  done: { label: 'Done', color: 'text-emerald-700 bg-emerald-100', icon: CheckCircle2 },
  in_progress: { label: 'In progress', color: 'text-amber-700 bg-amber-100', icon: Clock },
  not_started: { label: 'Not started', color: 'text-slate-600 bg-slate-200/80', icon: Circle },
};

const priorityColors: Record<string, string> = {
  High: 'bg-rose-100 text-rose-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-sky-100 text-sky-700',
};

const Journey = () => {
  const [phases, setPhases] = useState<JourneyPhase[]>(initialPhases);
  const [expanded, setExpanded] = useState<string[]>(phases.map((p) => p.id));

  const allTasks = phases.flatMap((p) => p.tasks);
  const doneCount = allTasks.filter((t) => t.status === 'done').length;
  const totalCount = allTasks.length;
  const progressPct = Math.round((doneCount / totalCount) * 100);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const cycleStatus = (phaseId: string, taskId: string) => {
    setPhases((prev) =>
      prev.map((phase) =>
        phase.id === phaseId
          ? {
              ...phase,
              tasks: phase.tasks.map((t) =>
                t.id === taskId
                  ? { ...t, status: (t.status === 'not_started' ? 'in_progress' : t.status === 'in_progress' ? 'done' : 'not_started') as TaskStatus }
                  : t
              ),
            }
          : phase
      )
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-display text-4xl font-semibold text-deep-navy tracking-tight">Meridian Journey</h1>
        <p className="text-gray-500 mt-2 text-[15px]">Your 30-day onboarding path — one step at a time.</p>
      </div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-sm text-gray-500">Overall Progress</p>
            <p className="text-[32px] font-display font-semibold text-deep-navy leading-none mt-1">{progressPct}%</p>
          </div>
          <p className="text-sm text-gray-400">
            {doneCount} of {totalCount} tasks
          </p>
        </div>
        <div className="w-full h-3 bg-border-warm/40 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-soft-teal to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <div className="flex gap-4 mt-4">
          {(Object.entries(statusConfig) as [TaskStatus, typeof statusConfig[TaskStatus]][]).map(([key, cfg]) => {
            const count = allTasks.filter((t) => t.status === key).length;
            return (
              <div key={key} className="flex items-center gap-1.5 text-xs">
                <cfg.icon className={`w-3.5 h-3.5 ${cfg.color.split(' ')[0]}`} />
                <span className="text-gray-500">
                  {count} {cfg.label.toLowerCase()}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Phases */}
      <div className="space-y-4">
        {phases.map((phase, phaseIdx) => {
          const phaseDone = phase.tasks.filter((t) => t.status === 'done').length;
          const phaseTotal = phase.tasks.length;
          const phasePct = Math.round((phaseDone / phaseTotal) * 100);
          const isOpen = expanded.includes(phase.id);

          const PhaseIcon = lucideIcons[phase.iconName as keyof typeof lucideIcons] as React.ElementType;

          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: phaseIdx * 0.08 }}
              className="card overflow-hidden !p-0"
            >
              {/* Phase Header */}
              <button
                onClick={() => toggleExpand(phase.id)}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-card-soft transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-card-soft border border-border-warm text-slate-600">
                    {PhaseIcon && <PhaseIcon className="w-5 h-5" />}
                  </div>
                  <div className="text-left">
                    <h3 className="font-display font-semibold text-deep-navy">{phase.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {phaseDone}/{phaseTotal} tasks · {phasePct}% complete
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-border-warm/40 rounded-full overflow-hidden hidden sm:block">
                    <div className="h-full bg-soft-teal rounded-full transition-all duration-500" style={{ width: `${phasePct}%` }} />
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </button>

              {/* Tasks */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 space-y-2">
                      {phase.tasks.map((task) => {
                        const sc = statusConfig[task.status];
                        return (
                          <div
                            key={task.id}
                            className={`rounded-xl border px-4 py-3.5 flex items-start gap-3 transition-all duration-200 ${
                              task.status === 'done'
                                ? 'bg-emerald-50 border-emerald-200'
                                : 'bg-card-soft border-border-warm hover:border-border-hover'
                            }`}
                          >
                            <button onClick={() => cycleStatus(phase.id, task.id)} className="mt-0.5 shrink-0 cursor-pointer">
                              <sc.icon className={`w-5 h-5 ${sc.color.split(' ')[0]} transition-all`} />
                            </button>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${task.status === 'done' ? 'line-through text-gray-400' : 'text-deep-navy'}`}>
                                {task.title}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5">{task.description}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
                                  {task.priority}
                                </span>
                                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                  <Timer className="w-3 h-3" />
                                  {task.time}
                                </span>
                                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {task.owner}
                                </span>
                              </div>
                            </div>
                            <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full shrink-0 ${sc.color}`}>
                              {sc.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Journey;
