import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs, faqCategories, suggestedQuestions } from '../lib/mockData';
import { Search, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';

const AskMeridian = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFaqs = faqs.filter((faq) => {
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

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
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
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-soft-teal/20 focus:border-soft-teal/30 text-base transition-all"
        />
      </div>

      {/* Suggested Questions */}
      <div className="flex flex-wrap justify-center gap-2">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => handleSuggestedClick(q)}
            className="text-xs px-3 py-1.5 rounded-full bg-subtle-peach text-deep-navy font-medium hover:bg-amber-100 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3 inline mr-1" />
            {q}
          </button>
        ))}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {faqCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-deep-navy text-white'
                : 'bg-[#fffaf0] text-slate-500 border border-[#e6d8c3] hover:border-[#d8c4a8]'
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
                    <p className="mt-4 text-sm text-gray-600 pt-4 border-t border-gray-100 leading-relaxed">
                      {faq.answer}
                    </p>
                    <span className="inline-block mt-3 text-[10px] font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
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
