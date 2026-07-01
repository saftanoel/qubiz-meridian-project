import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '../lib/mockData';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const AskMeridian: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-deep-navy">Ask Meridian</h1>
        <p className="text-gray-600">Find answers to common questions about working at Meridian.</p>
        
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-soft-teal focus:border-transparent text-lg"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card overflow-hidden cursor-pointer"
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-deep-navy pr-8">{faq.question}</h3>
                <div className="text-gray-400">
                  {expandedId === faq.id ? <ChevronUp /> : <ChevronDown />}
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
                    <p className="mt-4 text-gray-600 pt-4 border-t border-gray-100">
                      {faq.answer}
                    </p>
                    <span className="inline-block mt-4 text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {faq.category}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-12">
            No results found for "{searchTerm}". Try a different search term.
          </div>
        )}
      </div>
    </div>
  );
};

export default AskMeridian;
