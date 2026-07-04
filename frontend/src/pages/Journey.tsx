import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as lucideIcons from 'lucide-react';
import { CheckCircle2, Circle, Clock, ChevronDown, ChevronUp, User, Timer, Loader2, WifiOff } from 'lucide-react';
import { getOnboardingTasks, updateTaskStatus } from '../lib/api';
import { journeyPhases as mockPhases } from '../lib/mockData';
import type { OnboardingTasksResponse, TaskStatus } from '../types/api';

const statusConfig: Record<TaskStatus, { label: string; color: string; icon: React.ElementType }> = {
  done: { label: 'Done', color: 'text-emerald-700 bg-emerald-100', icon: CheckCircle2 },
  in_progress: { label: 'In progress', color: 'text-amber-700 bg-amber-100', icon: Clock },
  not_started: { label: 'Not started', color: 'text-slate-600 bg-slate-200/80', icon: Circle },
};

const priorityColors: Record<string, string> = {
  high: 'bg-rose-100 text-rose-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-sky-100 text-sky-700',
};

const iconMapping: Record<string, string> = {
  before_day_1: 'ClipboardList',
  first_day: 'Sun',
  first_week: 'Compass',
  first_month: 'Map',
};

const Journey = () => {
  const [data, setData] = useState<OnboardingTasksResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState<string[]>(mockPhases.map((p) => p.id));
  const [updatingTask, setUpdatingTask] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getOnboardingTasks()
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setError(false);
          setExpanded(res.phases.map((p) => p.phase));
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const cycleStatus = async (phaseId: string, taskId: number, currentStatus: TaskStatus) => {
    if (updatingTask) return; // Prevent concurrent updates to the same or different tasks
    
    // Optimistic offline mode if using mock data
    if (error || !data) {
      // In a real app we'd update mock state, but since we are API driven, we do nothing for offline except maybe toast
      return;
    }

    const nextStatus: TaskStatus = currentStatus === 'not_started' ? 'in_progress' : currentStatus === 'in_progress' ? 'done' : 'not_started';
    
    setUpdatingTask(taskId);
    
    try {
      const res = await updateTaskStatus(taskId, nextStatus);
      
      // Update local state cleanly
      setData((prev) => {
        if (!prev) return prev;
        return {
          progress: res.progress,
          phases: prev.phases.map(p => 
            p.phase === phaseId 
              ? { ...p, tasks: p.tasks.map(t => t.id === taskId ? res.task : t) }
              : p
          )
        };
      });
    } catch (err) {
      console.error("Failed to update task", err);
      // Revert could be implemented here
    } finally {
      setUpdatingTask(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 text-soft-teal animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Loading your journey…</p>
        </div>
      </div>
    );
  }

  // Fallback to mock data if backend fails
  const phases = data?.phases.map(p => ({
    id: p.phase,
    title: p.title,
    iconName: iconMapping[p.phase] || 'List',
    tasks: p.tasks.map(t => ({
      id: t.id.toString(), // Convert ID to string for UI compatibility if needed, or keep as number
      numId: t.id,
      title: t.title,
      description: t.description || '',
      status: t.status,
      priority: t.priority === 'high' ? 'High' : t.priority === 'medium' ? 'Medium' : 'Low',
      time: t.estimated_minutes ? `${t.estimated_minutes} min` : 'N/A',
      owner: t.owner_department || 'General'
    }))
  })) ?? mockPhases.map(p => ({
    ...p,
    tasks: p.tasks.map(t => ({ ...t, numId: parseInt(t.id, 10) || 0 }))
  }));

  const allTasks = phases.flatMap((p) => p.tasks);
  const doneCount = data?.progress.done ?? allTasks.filter((t) => t.status === 'done').length;
  const totalCount = data?.progress.total ?? allTasks.length;
  const progressPct = (data?.progress.completion_percent ?? Math.round((doneCount / totalCount) * 100)) || 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-display text-4xl font-semibold text-deep-navy tracking-tight">Meridian Journey</h1>
        <p className="text-gray-500 mt-2 text-[15px]">Your 30-day onboarding path — one step at a time.</p>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm font-medium">
          <WifiOff className="h-4 w-4 shrink-0" />
          Could not reach the Meridian backend. Showing cached data. Updates will not be saved.
        </div>
      )}

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
            const count = data 
              ? data.progress[key as keyof typeof data.progress] as number
              : allTasks.filter((t) => t.status === key).length;
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
          const phasePct = phaseTotal > 0 ? Math.round((phaseDone / phaseTotal) * 100) : 0;
          const isOpen = expanded.includes(phase.id);

          const PhaseIcon = lucideIcons[phase.iconName as keyof typeof lucideIcons] as React.ElementType || lucideIcons.List;

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
                        const sc = statusConfig[task.status as TaskStatus] || statusConfig.not_started;
                        const isUpdating = updatingTask === task.numId;
                        return (
                          <div
                            key={task.id}
                            className={`rounded-xl border px-4 py-3.5 flex items-start gap-3 transition-all duration-200 ${
                              task.status === 'done'
                                ? 'bg-emerald-50 border-emerald-200'
                                : 'bg-card-soft border-border-warm hover:border-border-hover'
                            } ${isUpdating ? 'opacity-50 pointer-events-none' : ''}`}
                          >
                            <button onClick={() => cycleStatus(phase.id, task.numId, task.status as TaskStatus)} className="mt-0.5 shrink-0 cursor-pointer disabled:opacity-50" disabled={error}>
                              <sc.icon className={`w-5 h-5 ${sc.color.split(' ')[0]} transition-all`} />
                            </button>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${task.status === 'done' ? 'line-through text-gray-400' : 'text-deep-navy'}`}>
                                {task.title}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5">{task.description}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${priorityColors[task.priority.toLowerCase()] || priorityColors.medium}`}>
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
