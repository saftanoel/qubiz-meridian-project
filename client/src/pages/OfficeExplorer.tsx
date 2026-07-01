import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { officeAreas } from '../lib/mockData';
import { Info } from 'lucide-react';

type AreaKey = keyof typeof officeAreas;

const OfficeExplorer: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<AreaKey | null>(null);

  return (
    <div className="space-y-8 max-w-5xl mx-auto h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-deep-navy">Office Explorer</h1>
        <p className="text-gray-600 mt-2">Click on different areas to learn about our workspace.</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-8">
        {/* Map Container */}
        <div className="flex-[2] bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex items-center justify-center min-h-[400px]">
          {/* Conceptual Isometric Map using SVG */}
          <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-lg">
            <g transform="translate(400, 100) scale(1, 0.5) rotate(45)">
              {/* Floor Base */}
              <rect x="0" y="0" width="400" height="400" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="2" />

              {/* Kitchen */}
              <motion.g 
                onClick={() => setSelectedArea('kitchen')}
                className="cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <rect x="20" y="20" width="150" height="150" fill={selectedArea === 'kitchen' ? '#4b9e9e' : '#e2f3f1'} stroke="#4b9e9e" strokeWidth="2" />
                <text x="95" y="105" transform="rotate(-45 95 105) scale(1, 2)" textAnchor="middle" fill={selectedArea === 'kitchen' ? '#fff' : '#1a2b4c'} fontWeight="bold">Kitchen</text>
              </motion.g>

              {/* Social Space */}
              <motion.g 
                onClick={() => setSelectedArea('social')}
                className="cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <rect x="200" y="20" width="180" height="150" fill={selectedArea === 'social' ? '#fcd34d' : '#fef3c7'} stroke="#f59e0b" strokeWidth="2" />
                <text x="290" y="105" transform="rotate(-45 290 105) scale(1, 2)" textAnchor="middle" fill="#1a2b4c" fontWeight="bold">Social Space</text>
              </motion.g>

              {/* Reception */}
              <motion.g 
                onClick={() => setSelectedArea('reception')}
                className="cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <rect x="20" y="200" width="100" height="180" fill={selectedArea === 'reception' ? '#60a5fa' : '#dbeafe'} stroke="#3b82f6" strokeWidth="2" />
                <text x="70" y="290" transform="rotate(-45 70 290) scale(1, 2)" textAnchor="middle" fill="#1a2b4c" fontWeight="bold">Reception</text>
              </motion.g>

              {/* Engineering Pods */}
              <motion.g 
                onClick={() => setSelectedArea('engineering')}
                className="cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <rect x="150" y="200" width="230" height="100" fill={selectedArea === 'engineering' ? '#1a2b4c' : '#e0e7ff'} stroke="#1a2b4c" strokeWidth="2" />
                <text x="265" y="260" transform="rotate(-45 265 260) scale(1, 2)" textAnchor="middle" fill={selectedArea === 'engineering' ? '#fff' : '#1a2b4c'} fontWeight="bold">Engineering</text>
              </motion.g>

              {/* Meeting Rooms */}
              <motion.g 
                onClick={() => setSelectedArea('meeting')}
                className="cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <rect x="150" y="320" width="230" height="60" fill={selectedArea === 'meeting' ? '#9ca3af' : '#f3f4f6'} stroke="#6b7280" strokeWidth="2" />
                <text x="265" y="355" transform="rotate(-45 265 355) scale(1, 2)" textAnchor="middle" fill={selectedArea === 'meeting' ? '#fff' : '#1a2b4c'} fontWeight="bold">Meeting Rooms</text>
              </motion.g>

            </g>
          </svg>
        </div>

        {/* Info Panel */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {selectedArea ? (
              <motion.div
                key={selectedArea}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="card h-full"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-light-mint rounded-lg">
                    <Info className="w-6 h-6 text-soft-teal" />
                  </div>
                  <h2 className="text-2xl font-bold text-deep-navy">{officeAreas[selectedArea].title}</h2>
                </div>
                
                <p className="text-gray-600 mb-6 text-lg">
                  {officeAreas[selectedArea].description}
                </p>

                <div className="space-y-3">
                  <h3 className="font-bold text-deep-navy">Good to know:</h3>
                  <ul className="space-y-2">
                    {officeAreas[selectedArea].tips.map((tip, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-soft-teal mr-2">•</span>
                        <span className="text-gray-600">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4 border-dashed border-2"
              >
                <Info className="w-12 h-12" />
                <p className="text-lg">Select an area on the map to see details.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OfficeExplorer;
