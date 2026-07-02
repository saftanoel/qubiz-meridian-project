import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { employeeData, nextActions, suggestedConnections } from '../lib/mockData';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const daysUntilStart = 3; // Mock calculated value

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-mint"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-deep-navy mb-2">
          Welcome to Meridian, {employeeData.name}!
        </h1>
        <p className="text-soft-teal text-lg font-medium">
          Your first day starts in {daysUntilStart} days
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Next Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card md:col-span-2 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-deep-navy">Today's Next Actions</h2>
            <Link to="/journey" className="text-soft-teal text-sm font-medium flex items-center hover:underline">
              View full journey <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {nextActions.map((action) => (
              <div key={action.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                {action.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-soft-teal shrink-0" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300 shrink-0" />
                )}
                <span className={action.completed ? "text-gray-500 line-through" : "text-deep-navy font-medium"}>
                  {action.title}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Ask */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-blue flex flex-col justify-between"
        >
          <div>
            <h2 className="text-xl font-bold text-deep-navy mb-2">Have a question?</h2>
            <p className="text-gray-600 mb-4">
              Don't hesitate to reach out or check our FAQ.
            </p>
          </div>
          <Link to="/ask" className="btn-primary w-full text-center">
            Ask Meridian
          </Link>
        </motion.div>
      </div>

      {/* Suggested Connections */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-bold text-deep-navy">People to Meet</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestedConnections.map((person) => (
            <div key={person.id} className="card flex items-center space-x-4">
              <div className="w-12 h-12 bg-subtle-peach rounded-full flex items-center justify-center text-deep-navy font-bold text-lg">
                {person.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-deep-navy">{person.name}</p>
                <p className="text-sm text-gray-500">{person.role}</p>
                <p className="text-xs text-soft-teal mt-1 font-medium">{person.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
