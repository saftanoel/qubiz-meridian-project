import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle, Coffee, Sparkles, X, UserRoundCheck, Loader2, WifiOff } from 'lucide-react';
import { showToast } from '../components/Toast';
import { getEmployees, getEmployeeMatches } from '../lib/api';
import { allEmployees as mockAllEmployees } from '../lib/mockData';
import ChatPopup from '../components/ChatPopup';
import type { Employee, SuggestedPerson } from '../types/api';

const Connect = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [matches, setMatches] = useState<SuggestedPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [dayFilter, setDayFilter] = useState<string | null>(null);
  const [interestFilter, setInterestFilter] = useState<string | null>(null);

  const [activeChatEmployee, setActiveChatEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([getEmployees(), getEmployeeMatches()])
      .then(([empRes, matchesRes]) => {
        if (!cancelled) {
          setEmployees(empRes);
          setMatches(matchesRes);
          setError(false);
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

  // Use backend data or fallback to mock data
  const dataToUse = error || employees.length === 0 ? mockAllEmployees.map(e => ({
    id: e.id,
    name: e.name,
    role: e.role,
    department: e.department,
    avatar_url: e.avatarUrl || null,
    is_buddy: e.isBuddy || false,
    match_reason: e.matchReason || null,
    ask_me_about: e.askMeAbout || null,
    interests: e.interests.map((int, i) => ({ id: i, interest: int })),
    office_days: e.officeDays.map((day, i) => ({ id: i, day })),
  })) : employees;

  const matchesToUse = error || matches.length === 0 ? mockAllEmployees.slice(0, 3).map(e => ({
    id: e.id,
    name: e.name,
    role: e.role,
    department: e.department,
    reason: e.matchReason || 'A great connection.',
    initials: e.name.split(' ').map(n => n[0]).join('').substring(0, 2),
    avatar_url: e.avatarUrl,
  })) : matches;

  // Extract dynamic filters from data
  const departments = ['All', ...Array.from(new Set(dataToUse.map((e) => e.department)))];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const allInterests = Array.from(new Set(dataToUse.flatMap((e) => e.interests.map(i => i.interest))));

  const filtered = useMemo(() => {
    return dataToUse.filter((e) => {
      if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.role.toLowerCase().includes(search.toLowerCase())) return false;
      if (deptFilter !== 'All' && e.department !== deptFilter) return false;
      if (dayFilter && !e.office_days.some(d => d.day === dayFilter)) return false;
      if (interestFilter && !e.interests.some(i => i.interest === interestFilter)) return false;
      return true;
    });
  }, [search, deptFilter, dayFilter, interestFilter, dataToUse]);

  const hasFilters = deptFilter !== 'All' || dayFilter || interestFilter;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 text-soft-teal animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Loading directory…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="font-display text-4xl font-semibold text-deep-navy tracking-tight">Meridian Connect</h1>
        <p className="text-gray-500 mt-2 text-[15px]">Meet people who can help you feel at home.</p>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm font-medium">
          <WifiOff className="h-4 w-4 shrink-0" />
          Could not reach the Meridian backend. Showing cached directory.
        </div>
      )}

      {/* People to Meet This Week */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="font-display font-semibold text-lg text-deep-navy mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-slate-400" />
          People you should meet this week
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {matchesToUse.map((person, index) => {
            let bgGradient = '';
            if (index === 0) bgGradient = 'linear-gradient(135deg, var(--color-light-mint), var(--color-teal-soft))';
            else if (index === 1) bgGradient = 'linear-gradient(135deg, var(--color-sky), var(--color-sky))';
            else bgGradient = 'linear-gradient(135deg, var(--color-subtle-peach), var(--color-subtle-peach))';

            return (
              <div key={person.id} className="rounded-[28px] p-5 shadow-sm" style={{ background: bgGradient }}>
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="w-12 h-12 rounded-full bg-card grid place-items-center font-bold text-text-main text-[15px] shrink-0 shadow-sm relative overflow-hidden">
                    {person.initials}
                    {person.avatar_url && (
                      <img
                        src={person.avatar_url}
                        alt={`${person.name} profile photo`}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[15px] font-bold text-deep-navy truncate leading-tight">{person.name}</p>
                    <p className="text-[12px] text-slate-500/90 truncate mt-0.5 font-medium">{person.role} · {person.department}</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5 mt-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" fill="currentColor" />
                  <p className="text-[12px] text-slate-600 font-medium leading-relaxed">
                    {person.reason}
                  </p>
                </div>
              </div>
            );
          })}
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
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border-warm rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-soft-teal/20 focus:border-soft-teal/30 transition-all text-text-main"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Departments */}
          <div className="flex gap-1 flex-wrap">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setDeptFilter(dept)}
                className={`text-[12px] px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${deptFilter === dept ? 'bg-text-main text-app shadow-sm' : 'bg-card-soft text-text-muted border border-border-warm hover:border-border-hover hover:bg-card'
                  }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Day filter */}
          <div className="flex gap-1 flex-wrap">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setDayFilter(dayFilter === day ? null : day)}
                className={`text-[12px] px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${dayFilter === day ? 'bg-soft-teal text-white shadow-sm' : 'bg-card-soft text-text-muted border border-border-warm hover:border-border-hover hover:bg-card'
                  }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Interest chips */}
          <div className="flex gap-1 flex-wrap">
            {allInterests.map((interest) => (
              <button
                key={interest}
                onClick={() => setInterestFilter(interestFilter === interest ? null : interest)}
                className={`text-[12px] px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${interestFilter === interest ? 'bg-amber-500 text-white shadow-sm' : 'bg-card-soft text-amber-700 border border-border-warm hover:bg-card hover:border-border-hover'
                  }`}
              >
                {interest}
              </button>
            ))}
          </div>

          {hasFilters && (
            <button
              onClick={() => { setDeptFilter('All'); setDayFilter(null); setInterestFilter(null); setSearch(''); }}
              className="text-[12px] text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer ml-1"
            >
              <X className="w-3.5 h-3.5" /> Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((person, i) => (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card border border-border-warm rounded-[28px] p-6 hover:border-border-hover hover:shadow-[0_10px_40px_rgba(55,40,20,0.08)] hover:-translate-y-1 transition-all flex flex-col h-full"
          >
            {/* Top row */}
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="w-[72px] h-[72px] rounded-2xl bg-card-soft grid place-items-center font-bold text-text-main text-xl shadow-sm border border-border-warm absolute inset-0">
                  {person.name.charAt(0)}
                </div>
                {person.avatar_url && (
                  <img src={person.avatar_url} alt={`${person.name} profile photo`} className="w-[72px] h-[72px] rounded-2xl object-cover shadow-sm relative z-10" />
                )}
              </div>

              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-[18px] text-deep-navy tracking-tight truncate">{person.name}</h3>
                    <p className="text-[13px] font-medium text-slate-500 uppercase tracking-wide mt-0.5 truncate">{person.role} · {person.department}</p>
                  </div>
                  {person.is_buddy && (
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full border border-teal-100/50 shrink-0">
                      <UserRoundCheck className="w-3 h-3" /> Buddy
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex-1 flex flex-col space-y-5">
              {/* Office Days Pills */}
              <div>
                <div className="flex items-center gap-1.5">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((dayStr) => {
                    const short = dayStr.substring(0, 3);
                    const isActive = person.office_days.some(d => d.day === dayStr);
                    return (
                      <div key={dayStr} className={`flex-1 text-center py-1.5 rounded-full text-[11px] transition-colors ${isActive
                          ? 'bg-soft-teal/20 text-teal-800 font-bold border border-soft-teal/30'
                          : 'bg-card-soft border border-border-warm text-text-muted font-medium'
                        }`}>
                        {short}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interests */}
              {person.interests && person.interests.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {person.interests.map((interest) => (
                      <span key={interest.id} className="text-[11.5px] bg-card-soft border border-border-hover text-text-main/80 px-3 py-1 rounded-full font-medium">
                        {interest.interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Ask Me About */}
              {person.ask_me_about && (
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">Ask me about</p>
                  <p className="text-[13px] text-deep-navy/80 font-medium leading-relaxed">{person.ask_me_about}</p>
                </div>
              )}

              {/* Match Reason */}
              {person.match_reason && (
                <div className="mt-auto pt-2">
                  <div className="bg-teal-50/50 rounded-2xl p-3.5 border border-teal-100/50">
                    <p className="text-[13px] text-teal-800 flex items-start gap-2 leading-relaxed font-medium">
                      <Sparkles className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      {person.match_reason}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setActiveChatEmployee(person)}
                className="flex-1 text-[13.5px] font-semibold bg-text-main text-app py-2.5 px-4 rounded-full hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Start conversation
              </button>
              <button
                onClick={() => showToast(`Coffee chat invitation sent to ${person.name}!`)}
                className="text-[13.5px] font-semibold bg-card-soft text-text-main border border-border-warm py-2.5 px-4 rounded-full hover:bg-card hover:border-border-hover transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Coffee className="w-4 h-4" />
                Coffee chat
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">No colleagues match your filters. Try adjusting them.</p>
        </div>
      )}

      <ChatPopup
        isOpen={!!activeChatEmployee}
        onClose={() => setActiveChatEmployee(null)}
        employee={activeChatEmployee}
      />
    </div>
  );
};

export default Connect;
