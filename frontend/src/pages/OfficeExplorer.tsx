import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { officeAreas } from '../lib/mockData';
import { Info, MapPin, Users, Lightbulb } from 'lucide-react';

type AreaKey = keyof typeof officeAreas;

const OfficeExplorer = () => {
  const [selectedArea, setSelectedArea] = useState<AreaKey | null>(null);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-display text-3xl font-bold text-deep-navy">Office Explorer</h1>
        <p className="text-gray-500 mt-1">Click on different areas to learn about our workspace.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map Container */}
        <div className="flex-[2] card min-h-[420px] flex items-center justify-center">
          <svg viewBox="0 0 800 600" className="w-full h-full max-h-[500px] drop-shadow-lg">
            <g transform="translate(400, 80) scale(1, 0.5) rotate(45)">
              {/* Floor Base */}
              <rect x="0" y="0" width="450" height="450" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="2" rx="4" />

              {/* Kitchen */}
              <motion.g onClick={() => setSelectedArea('kitchen')} className="cursor-pointer" whileHover={{ y: -5 }}>
                <rect x="20" y="20" width="140" height="130" rx="6" fill={selectedArea === 'kitchen' ? '#4b9e9e' : '#e2f3f1'} stroke="#4b9e9e" strokeWidth="2" />
                <text x="90" y="95" transform="rotate(-45 90 95) scale(1, 2)" textAnchor="middle" fill={selectedArea === 'kitchen' ? '#fff' : '#1a2b4c'} fontWeight="bold" fontSize="13">Kitchen</text>
              </motion.g>

              {/* Social Space */}
              <motion.g onClick={() => setSelectedArea('social')} className="cursor-pointer" whileHover={{ y: -5 }}>
                <rect x="180" y="20" width="130" height="130" rx="6" fill={selectedArea === 'social' ? '#f59e0b' : '#fef3c7'} stroke="#f59e0b" strokeWidth="2" />
                <text x="245" y="95" transform="rotate(-45 245 95) scale(1, 2)" textAnchor="middle" fill="#1a2b4c" fontWeight="bold" fontSize="13">Social</text>
              </motion.g>

              {/* Quiet Zone */}
              <motion.g onClick={() => setSelectedArea('quiet')} className="cursor-pointer" whileHover={{ y: -5 }}>
                <rect x="330" y="20" width="100" height="130" rx="6" fill={selectedArea === 'quiet' ? '#8b5cf6' : '#ede9fe'} stroke="#8b5cf6" strokeWidth="2" />
                <text x="380" y="95" transform="rotate(-45 380 95) scale(1, 2)" textAnchor="middle" fill={selectedArea === 'quiet' ? '#fff' : '#1a2b4c'} fontWeight="bold" fontSize="12">Quiet</text>
              </motion.g>

              {/* Reception */}
              <motion.g onClick={() => setSelectedArea('reception')} className="cursor-pointer" whileHover={{ y: -5 }}>
                <rect x="20" y="170" width="100" height="130" rx="6" fill={selectedArea === 'reception' ? '#3b82f6' : '#dbeafe'} stroke="#3b82f6" strokeWidth="2" />
                <text x="70" y="245" transform="rotate(-45 70 245) scale(1, 2)" textAnchor="middle" fill={selectedArea === 'reception' ? '#fff' : '#1a2b4c'} fontWeight="bold" fontSize="12">Reception</text>
              </motion.g>

              {/* HR Desk */}
              <motion.g onClick={() => setSelectedArea('hr')} className="cursor-pointer" whileHover={{ y: -5 }}>
                <rect x="140" y="170" width="120" height="80" rx="6" fill={selectedArea === 'hr' ? '#ec4899' : '#fce7f3'} stroke="#ec4899" strokeWidth="2" />
                <text x="200" y="215" transform="rotate(-45 200 215) scale(1, 2)" textAnchor="middle" fill={selectedArea === 'hr' ? '#fff' : '#1a2b4c'} fontWeight="bold" fontSize="12">HR Desk</text>
              </motion.g>

              {/* Engineering Pods */}
              <motion.g onClick={() => setSelectedArea('engineering')} className="cursor-pointer" whileHover={{ y: -5 }}>
                <rect x="140" y="270" width="290" height="80" rx="6" fill={selectedArea === 'engineering' ? '#1a2b4c' : '#e0e7ff'} stroke="#1a2b4c" strokeWidth="2" />
                <text x="285" y="315" transform="rotate(-45 285 315) scale(1, 2)" textAnchor="middle" fill={selectedArea === 'engineering' ? '#fff' : '#1a2b4c'} fontWeight="bold" fontSize="13">Engineering</text>
              </motion.g>

              {/* Meeting Rooms */}
              <motion.g onClick={() => setSelectedArea('meeting')} className="cursor-pointer" whileHover={{ y: -5 }}>
                <rect x="140" y="370" width="290" height="60" rx="6" fill={selectedArea === 'meeting' ? '#6b7280' : '#f3f4f6'} stroke="#6b7280" strokeWidth="2" />
                <text x="285" y="405" transform="rotate(-45 285 405) scale(1, 2)" textAnchor="middle" fill={selectedArea === 'meeting' ? '#fff' : '#1a2b4c'} fontWeight="bold" fontSize="12">Meetings</text>
              </motion.g>
            </g>
          </svg>
        </div>

        {/* Info Panel */}
        <div className="flex-1 min-w-[300px]">
          <AnimatePresence mode="wait">
            {selectedArea ? (
              <motion.div
                key={selectedArea}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="card h-full space-y-5"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-light-mint rounded-lg">
                    <MapPin className="w-6 h-6 text-soft-teal" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-deep-navy">{officeAreas[selectedArea].title}</h2>
                </div>

                <p className="text-gray-600 leading-relaxed">{officeAreas[selectedArea].description}</p>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-deep-navy flex items-center gap-1.5 mb-2">
                      <Info className="w-4 h-4 text-soft-teal" /> Good to know
                    </h3>
                    <ul className="space-y-1.5">
                      {officeAreas[selectedArea].tips.map((tip, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-600">
                          <span className="text-soft-teal mr-2 mt-0.5">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-deep-navy flex items-center gap-1.5 mb-1">
                      <Users className="w-4 h-4 text-soft-teal" /> Who you'll meet
                    </h3>
                    <p className="text-sm text-gray-600">{officeAreas[selectedArea].whoYouMeet}</p>
                  </div>

                  <div className="rounded-xl bg-light-mint p-3">
                    <h3 className="text-sm font-semibold text-deep-navy flex items-center gap-1.5 mb-1">
                      <Lightbulb className="w-4 h-4 text-soft-teal" /> Why it matters for you
                    </h3>
                    <p className="text-sm text-deep-navy/70">{officeAreas[selectedArea].whyItMatters}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4 border-dashed border-2 min-h-[300px]"
              >
                <MapPin className="w-12 h-12" />
                <p className="text-lg font-medium">Select an area on the map</p>
                <p className="text-sm">Click on any room to learn what happens there and who you'll meet.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OfficeExplorer;
