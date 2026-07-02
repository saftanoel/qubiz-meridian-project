import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { allEmployees } from '../lib/mockData';
import { Search, MessageSquare, Coffee, Sparkles, Calendar, X } from 'lucide-react';
import { showToast } from '../components/Toast';

const departments = ['All', ...Array.from(new Set(allEmployees.map((e) => e.department)))];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const allInterests = Array.from(new Set(allEmployees.flatMap((e) => e.interests)));

const Connect = () => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [dayFilter, setDayFilter] = useState<string | null>(null);
  const [interestFilter, setInterestFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return allEmployees.filter((e) => {
      if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.role.toLowerCase().includes(search.toLowerCase())) return false;
      if (deptFilter !== 'All' && e.department !== deptFilter) return false;
      if (dayFilter && !e.officeDays.includes(dayFilter)) return false;
      if (interestFilter && !e.interests.includes(interestFilter)) return false;
      return true;
    });
  }, [search, deptFilter, dayFilter, interestFilter]);

  const suggestedThisWeek = allEmployees.slice(0, 3);
  const hasFilters = deptFilter !== 'All' || dayFilter || interestFilter;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="font-display text-3xl font-bold text-deep-navy">Meridian Connect</h1>
        <p className="text-gray-500 mt-1">Meet people who can help you feel at home.</p>
      </div>

      {/* People to Meet This Week */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 border border-amber-200/40"
        style={{ background: 'linear-gradient(135deg, #fef3c7, #ffedd5)' }}
      >
        <h2 className="font-display font-semibold text-sm text-amber-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          People you should meet this week
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {suggestedThisWeek.map((person) => (
            <div key={person.id} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-amber-100 min-w-[200px]">
              <div className="w-10 h-10 rounded-full bg-subtle-peach grid place-items-center font-semibold text-deep-navy text-sm shrink-0">
                {person.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-deep-navy truncate">{person.name}</p>
                <p className="text-xs text-gray-400 truncate">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-soft-teal/20 focus:border-soft-teal/30 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Departments */}
          <div className="flex gap-1.5 flex-wrap">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setDeptFilter(dept)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  deptFilter === dept ? 'bg-deep-navy text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-soft-teal/40'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Day filter */}
          <div className="flex gap-1.5 flex-wrap">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setDayFilter(dayFilter === day ? null : day)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  dayFilter === day ? 'bg-soft-teal text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-soft-teal/40'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Interest chips */}
          <div className="flex gap-1.5 flex-wrap">
            {allInterests.map((interest) => (
              <button
                key={interest}
                onClick={() => setInterestFilter(interestFilter === interest ? null : interest)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  interestFilter === interest ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>

          {hasFilters && (
            <button
              onClick={() => { setDeptFilter('All'); setDayFilter(null); setInterestFilter(null); }}
              className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3 h-3" /> Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((person, i) => (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="card hover:shadow-md hover:border-soft-teal/20 transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-subtle-peach grid place-items-center font-bold text-deep-navy text-xl shrink-0">
                {person.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-deep-navy">{person.name}</h3>
                    <p className="text-xs text-gray-500">{person.role} · {person.department}</p>
                  </div>
                  {person.isBuddy && (
                    <span className="text-[10px] font-medium bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">Your Buddy</span>
                  )}
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    Office: {person.officeDays.join(', ')}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {person.interests.map((interest) => (
                      <span key={interest} className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full">
                        {interest}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">
                    <span className="font-medium text-gray-600">Ask me about:</span> {person.askMeAbout}
                  </div>
                </div>

                {/* Match Reason */}
                <div className="mt-3 bg-teal-50/60 rounded-lg px-3 py-2">
                  <p className="text-xs text-teal-700 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-teal-500" />
                    {person.matchReason}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => showToast(`Message sent to ${person.name}!`)}
                    className="flex-1 text-xs font-medium bg-deep-navy text-white py-2 px-3 rounded-lg hover:opacity-90 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Start conversation
                  </button>
                  <button
                    onClick={() => showToast(`Coffee chat scheduled with ${person.name}!`)}
                    className="text-xs font-medium bg-amber-50 text-amber-700 py-2 px-3 rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Coffee className="w-3.5 h-3.5" />
                    Coffee chat
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">No colleagues match your filters. Try adjusting them.</p>
        </div>
      )}
    </div>
  );
};

export default Connect;
