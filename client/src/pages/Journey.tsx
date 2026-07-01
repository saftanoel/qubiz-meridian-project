import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import { journeyPhases } from '../lib/mockData';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Journey: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-deep-navy">Meridian Journey</h1>
        <p className="text-gray-600 mt-2">Your 30-day onboarding roadmap. Complete tasks to unlock the next phase.</p>
      </div>

      <div className="space-y-8">
        {journeyPhases.map((phase, index) => (
          <motion.div 
            key={phase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "card border-l-4",
              phase.status === 'completed' ? "border-l-[var(--color-soft-teal)] opacity-75" :
              phase.status === 'current' ? "border-l-blue-500 shadow-md ring-1 ring-blue-50" :
              "border-l-gray-300 opacity-60"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-deep-navy flex items-center space-x-2">
                {phase.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-soft-teal" />}
                {phase.status === 'current' && <Clock className="w-5 h-5 text-blue-500" />}
                <span>{phase.title}</span>
              </h2>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600 capitalize">
                {phase.status}
              </span>
            </div>

            <div className="space-y-3">
              {phase.tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-soft-teal flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                    )}
                    <span className={cn(
                      "font-medium",
                      task.completed ? "text-gray-500 line-through" : "text-deep-navy"
                    )}>
                      {task.title}
                    </span>
                  </div>
                  {task.priority === 'high' && !task.completed && (
                     <span className="flex items-center text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded border border-orange-100">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Priority
                     </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Journey;
