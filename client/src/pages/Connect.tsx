import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { allEmployees } from '../lib/mockData';
import { MapPin, MessageSquare, Tag } from 'lucide-react';

const departments = ["All", "Engineering", "Design", "Human Resources"];

const Connect: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredEmployees = activeFilter === "All" 
    ? allEmployees 
    : allEmployees.filter(emp => emp.department === activeFilter);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-deep-navy">Meridian Connect</h1>
        <p className="text-gray-600 mt-2">Discover people across the company and find common interests.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {departments.map(dept => (
          <button
            key={dept}
            onClick={() => setActiveFilter(dept)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              activeFilter === dept 
                ? 'bg-deep-navy text-white' 
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEmployees.map((emp, index) => (
          <motion.div
            key={emp.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[var(--color-subtle-peach)] rounded-full flex items-center justify-center text-[var(--color-deep-navy)] font-bold text-2xl">
                  {emp.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-deep-navy">{emp.name}</h3>
                  <p className="text-soft-teal font-medium">{emp.role}</p>
                </div>
              </div>
              {emp.matchReason && (
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-100">
                  {emp.matchReason}
                </span>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span>Office Days: {emp.officeDays.join(', ')}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MessageSquare className="w-4 h-4 mr-2 text-gray-400" />
                <span>Ask me about: {emp.askMeAbout}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
              <Tag className="w-4 h-4 text-gray-400 mt-1" />
              {emp.interests.map(interest => (
                <span key={interest} className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Connect;
