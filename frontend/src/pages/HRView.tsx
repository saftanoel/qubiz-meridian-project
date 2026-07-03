import { motion } from 'framer-motion';
import { newHires, hrStats, actionItems, type HireStatus, type Severity } from '../lib/mockData';
import { UsersRound, TrendingUp, UserPlus, AlertTriangle, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { showToast } from '../components/Toast';

const statCards = [
  { label: 'New hires this month', value: hrStats.newHiresCount, icon: UsersRound, color: 'bg-teal-50 text-teal-600', accent: 'border-teal-200' },
  { label: 'Avg. onboarding progress', value: `${hrStats.avgProgress}%`, icon: TrendingUp, color: 'bg-blue-50 text-blue-600', accent: 'border-blue-200' },
  { label: 'Missing buddy assignments', value: hrStats.missingBuddies, icon: UserPlus, color: 'bg-amber-50 text-amber-600', accent: 'border-amber-200' },
  { label: 'Tasks overdue', value: hrStats.overdueTasks, icon: AlertTriangle, color: 'bg-rose-50 text-rose-600', accent: 'border-rose-200' },
  { label: 'Pending check-ins', value: hrStats.pendingFeedback, icon: MessageSquare, color: 'bg-purple-50 text-purple-600', accent: 'border-purple-200' },
];

const statusBadge: Record<HireStatus, { label: string; color: string; icon: React.ElementType }> = {
  on_track: { label: 'On track', color: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
  needs_attention: { label: 'Needs attention', color: 'bg-amber-50 text-amber-700', icon: AlertCircle },
};

const severityStyles: Record<Severity, string> = {
  high: 'bg-rose-50 border-rose-200',
  medium: 'bg-amber-50 border-amber-200',
  low: 'bg-blue-50 border-blue-200',
};

const severityBtnStyles: Record<Severity, string> = {
  high: 'bg-rose-600 hover:bg-rose-700',
  medium: 'bg-amber-600 hover:bg-amber-700',
  low: 'bg-blue-600 hover:bg-blue-700',
};

const HRView = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-display text-4xl font-semibold text-deep-navy tracking-tight">HR Dashboard</h1>
        <p className="text-gray-500 mt-2 text-[15px]">Overview of all new hire onboarding — see what needs your attention.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`bg-white rounded-xl p-4 border ${stat.accent} shadow-sm`}
          >
            <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-[18px] h-[18px]" />
            </div>
            <p className="text-[28px] font-display font-semibold text-deep-navy leading-none mt-1">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main content: Table + Action Required */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Onboarding Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 card overflow-hidden !p-0"
        >
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-display font-semibold text-deep-navy">Active Onboarding</h2>
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Employee</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Department</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Start Date</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Buddy</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Progress</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {newHires.map((hire) => {
                  const status = statusBadge[hire.status];
                  return (
                    <tr key={hire.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-subtle-peach grid place-items-center font-semibold text-deep-navy text-sm shrink-0">
                            {hire.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-deep-navy">{hire.name}</p>
                            <p className="text-xs text-gray-400">{hire.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{hire.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{hire.startDate}</td>
                      <td className="px-6 py-4">
                        {hire.buddy ? (
                          <span className="text-sm text-gray-600">{hire.buddy}</span>
                        ) : (
                          <span className="text-xs font-medium bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full">Not assigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${hire.status === 'on_track' ? 'bg-soft-teal' : 'bg-amber-400'}`}
                              style={{ width: `${hire.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{hire.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
                          <status.icon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-gray-100">
            {newHires.map((hire) => {
              const status = statusBadge[hire.status];
              return (
                <div key={hire.id} className="px-5 py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-subtle-peach grid place-items-center font-semibold text-deep-navy text-sm">
                        {hire.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-deep-navy">{hire.name}</p>
                        <p className="text-xs text-gray-500">{hire.department}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${status.color}`}>
                      <status.icon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs text-gray-500">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase">Start</p>
                      <p>{hire.startDate}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase">Buddy</p>
                      <p>{hire.buddy || <span className="text-rose-500">Not assigned</span>}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase">Progress</p>
                      <p className="font-medium">{hire.progress}%</p>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${hire.status === 'on_track' ? 'bg-soft-teal' : 'bg-amber-400'}`}
                      style={{ width: `${hire.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Action Required Panel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="font-display font-semibold text-deep-navy flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Action Required
          </h2>

          {actionItems.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl border p-4 space-y-3 ${severityStyles[item.severity]}`}
            >
              <div>
                <h3 className="text-sm font-semibold text-deep-navy">{item.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{item.description}</p>
              </div>
              <button
                onClick={() => showToast(`✅ ${item.buttonLabel} — action completed!`)}
                className={`text-xs font-medium text-white px-3 py-2 rounded-lg transition-colors w-full cursor-pointer ${severityBtnStyles[item.severity]}`}
              >
                {item.buttonLabel}
              </button>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HRView;
