import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Lightbulb } from 'lucide-react';

const OFFICE_ZONES = [
  {
    id: 'reception',
    title: 'Reception / Welcome Area',
    description: 'The main arrival point where new hires check in, get greeted, and orient themselves.',
    whoYouCanMeet: 'Office Managers, IT Support (morning shift)',
    whyItMatters: 'First impressions matter! This is where you grab your badge and get a warm welcome.',
    coords3d: { x: 19, y: 56 },
    coords2d: { x: 13, y: 56 }
  },
  {
    id: 'hr',
    title: 'HR Desk / People Ops',
    description: 'The People Ops area for onboarding help, admin questions, and first-day support.',
    whoYouCanMeet: 'HR Partners, Onboarding Specialists',
    whyItMatters: 'Your go-to spot for any paperwork, benefits questions, or general HR support.',
    coords3d: { x: 15, y: 33 },
    coords2d: { x: 14, y: 19 }
  },
  {
    id: 'engineering',
    title: 'Engineering Workspace',
    description: 'The main open workspace where product and engineering teams work together.',
    whoYouCanMeet: 'Software Engineers, Product Managers, Designers',
    whyItMatters: 'This is the core engine of the company where all the building happens.',
    coords3d: { x: 46, y: 30 },
    coords2d: { x: 44, y: 26 }
  },
  {
    id: 'meeting',
    title: 'Meeting Room',
    description: 'A formal room for team meetings, planning sessions, and presentations.',
    whoYouCanMeet: 'Cross-functional teams, Leadership',
    whyItMatters: 'Equipped with screens and whiteboards for collaborative planning and syncs.',
    coords3d: { x: 64, y: 20 },
    coords2d: { x: 64, y: 15 }
  },
  {
    id: 'collaboration',
    title: 'Collaboration Room',
    description: 'A smaller room for quick syncs, 1:1s, and focused group discussions.',
    whoYouCanMeet: 'Small project groups, Mentors',
    whyItMatters: 'Perfect for ad-hoc brainstorming or private conversations.',
    coords3d: { x: 64, y: 38 },
    coords2d: { x: 62, y: 42 }
  },
  {
    id: 'collaboration-2',
    title: 'Collaboration Room',
    description: 'A smaller room for quick syncs, 1:1s, and focused group discussions.',
    whoYouCanMeet: 'Small project groups, Mentors',
    whyItMatters: 'Perfect for ad-hoc brainstorming or private conversations.',
    coords3d: { x: 78, y: 28 },
    coords2d: { x: 86, y: 25 }
  },
  {
    id: 'kitchen',
    title: 'Kitchen / Coffee Area',
    description: 'The social recharge zone for coffee, snacks, lunch, and casual conversations.',
    whoYouCanMeet: 'Everyone from all departments',
    whyItMatters: 'The best place to meet people outside your team and grab a caffeine boost.',
    coords3d: { x: 86, y: 38 },
    coords2d: { x: 87, y: 43 }
  },
  {
    id: 'quiet',
    title: 'Quiet Focus Zone',
    description: 'A low-distraction area for deep work and concentrated solo tasks.',
    whoYouCanMeet: 'Anyone needing deep focus (no talking allowed)',
    whyItMatters: 'When you need to put your head down and crush a task without interruptions.',
    coords3d: { x: 43, y: 71 },
    coords2d: { x: 43, y: 70 }
  },
  {
    id: 'lounge',
    title: 'Social Lounge / Break Area',
    description: 'A relaxed space for informal chats, breaks, and decompressing during the day.',
    whoYouCanMeet: 'Colleagues taking a break',
    whyItMatters: 'Important for mental health, catching up on life, and building team culture.',
    coords3d: { x: 65, y: 72 },
    coords2d: { x: 63, y: 78 }
  }
];

const OfficeExplorer = () => {
  const [is3D, setIs3D] = useState(true);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);

  const selectedZone = OFFICE_ZONES.find(z => z.id === selectedZoneId) || null;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-display text-4xl font-semibold text-deep-navy tracking-tight">Office Explorer</h1>
        <p className="text-gray-500 mt-2 text-[15px]">Click on different areas to learn about our workspace.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map Container */}
        <div className="flex-[2] card min-h-[420px] flex flex-col relative overflow-hidden bg-card-soft p-0 sm:p-0">
          {/* Toggle inside Map */}
          <div className="absolute top-4 right-4 z-10 flex bg-card rounded-full shadow-sm border border-border-warm p-1">
            <button 
              onClick={() => setIs3D(true)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-all cursor-pointer ${is3D ? 'bg-soft-teal text-white shadow' : 'text-slate-500 hover:text-deep-navy'}`}
            >
              3D
            </button>
            <button 
              onClick={() => setIs3D(false)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-all cursor-pointer ${!is3D ? 'bg-soft-teal text-white shadow' : 'text-slate-500 hover:text-deep-navy'}`}
            >
              2D
            </button>
          </div>

          <div className="relative w-full h-full flex-1 min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.img 
                key={is3D ? '3d' : '2d'}
                src={is3D ? '/office-map-3d.png' : '/office-map-2d.png'}
                alt={is3D ? '3D Office Map' : '2D Office Map'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 w-full h-full object-contain p-4 select-none pointer-events-none"
              />
            </AnimatePresence>

            {/* Hotspot Pins */}
            {OFFICE_ZONES.map(zone => {
              const coords = is3D ? zone.coords3d : zone.coords2d;
              const isSelected = selectedZoneId === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZoneId(zone.id)}
                  className={`absolute group transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-300 z-20 cursor-pointer ${isSelected ? 'scale-125 z-30' : 'hover:scale-110'}`}
                  style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors border-2 ${isSelected ? 'bg-soft-teal text-white border-white ring-4 ring-soft-teal/30' : 'bg-card text-deep-navy border-soft-teal hover:bg-soft-teal hover:text-white'}`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  {/* Tooltip label on hover/select */}
                  <span className={`absolute top-full mt-2 whitespace-nowrap text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm transition-opacity pointer-events-none ${isSelected ? 'opacity-100 bg-deep-navy text-white' : 'opacity-0 group-hover:opacity-100 bg-card text-deep-navy border border-border-warm'}`}>
                    {zone.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Panel */}
        <div className="flex-1 min-w-[300px]">
          <AnimatePresence mode="wait">
            {selectedZone ? (
              <motion.div
                key={selectedZone.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="card h-full space-y-5"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-light-mint rounded-lg shrink-0">
                    <MapPin className="w-6 h-6 text-soft-teal" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-deep-navy">{selectedZone.title}</h2>
                </div>

                <p className="text-[14.5px] text-gray-600 leading-relaxed font-medium">{selectedZone.description}</p>

                <div className="space-y-4">
                  {selectedZone.whoYouCanMeet && (
                    <div className="bg-card-soft border border-border-warm rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-deep-navy flex items-center gap-1.5 mb-2">
                        <Users className="w-4 h-4 text-soft-teal" /> Who you'll meet
                      </h3>
                      <p className="text-[13.5px] text-gray-600 font-medium">{selectedZone.whoYouCanMeet}</p>
                    </div>
                  )}

                  {selectedZone.whyItMatters && (
                    <div className="rounded-xl bg-light-mint p-4">
                      <h3 className="text-sm font-semibold text-deep-navy flex items-center gap-1.5 mb-2">
                        <Lightbulb className="w-4 h-4 text-soft-teal" /> Why it matters for you
                      </h3>
                      <p className="text-[13.5px] text-teal-900/80 font-medium">{selectedZone.whyItMatters}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4 border-dashed border-2 border-border-warm min-h-[300px]"
              >
                <MapPin className="w-12 h-12 text-slate-300" />
                <p className="text-lg font-medium text-deep-navy">Select an area on the map</p>
                <p className="text-[13.5px] text-slate-500 max-w-[250px]">Click on any room to learn what happens there and who you'll meet.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OfficeExplorer;
