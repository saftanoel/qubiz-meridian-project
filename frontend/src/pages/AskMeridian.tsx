import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, Sparkles, MessageCircle, Loader2, WifiOff } from 'lucide-react';
import { getResources } from '../lib/api';
import { faqs as mockFaqs, suggestedQuestions } from '../lib/mockData';
import type { Resource } from '../types/api';

const AskMeridian = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getResources()
      .then((res) => {
        if (!cancelled) {
          setResources(res);
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

  const dataToUse = error || resources.length === 0 ? mockFaqs : resources;
  
  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(dataToUse.map(r => r.category)))];
  }, [dataToUse]);

  const filteredFaqs = dataToUse.filter((faq) => {
    const matchesSearch =
      !searchTerm ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSuggestedClick = (q: string) => {
    setSearchTerm(q);
    setActiveCategory('All');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 text-soft-teal animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Loading answers…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {error && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm font-medium">
          <WifiOff className="h-4 w-4 shrink-0" />
          Could not reach the Meridian backend. Showing cached resources.
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-light-mint px-3 py-1 text-xs font-medium text-soft-teal">
          <MessageCircle className="h-3.5 w-3.5" /> Ask anything
        </div>
        <h1 className="font-display text-4xl font-semibold text-deep-navy tracking-tight">
          The questions no one thinks to ask.
        </h1>
        <p className="text-gray-500 mt-2 text-[15px] max-w-md mx-auto">
          No question is too small. Find answers about how things actually work at Meridian.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border-warm shadow-sm focus:outline-none focus:ring-2 focus:ring-soft-teal/20 focus:border-soft-teal/30 text-base text-text-main transition-all"
        />
      </div>

      {/* Suggested Questions */}
      <div className="flex flex-wrap justify-center gap-2">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => handleSuggestedClick(q)}
            className="text-xs px-3 py-1.5 rounded-full bg-card-soft border border-border-warm text-text-main font-medium hover:bg-card transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3 inline mr-1" />
            {q}
          </button>
        ))}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-text-main text-app'
                : 'bg-card-soft text-text-muted border border-border-warm hover:border-border-hover'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Cards */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="card overflow-hidden cursor-pointer"
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-deep-navy pr-8">{faq.question}</h3>
                <div className="text-gray-400 shrink-0">
                  {expandedId === faq.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>
              <AnimatePresence>
                {expandedId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-sm text-text-muted pt-4 border-t border-border-warm leading-relaxed">
                      {faq.answer}
                    </p>
                    <span className="inline-block mt-3 text-[10px] font-medium bg-card-soft border border-border-warm text-text-muted px-2 py-0.5 rounded-full">
                      {faq.category}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-12">
            No results found for "{searchTerm}". Try a different search term or category.
          </div>
        )}
      </div>

      {/* AI Note */}
      <div className="text-center">
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          💡 AI assistant integration could be added later using internal documentation and company policies.
        </p>
      </div>
    </div>
  );
};

export default AskMeridian;
