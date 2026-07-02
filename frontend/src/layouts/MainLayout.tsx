import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Compass, Map, Users, MessageCircle, ShieldCheck, Building, ArrowLeftRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const MainLayout = () => {
  const [role, setRole] = useState<'employee' | 'hr'>('employee');
  const navigate = useNavigate();

  const handleRoleToggle = () => {
    const newRole = role === 'employee' ? 'hr' : 'employee';
    setRole(newRole);
    navigate(newRole === 'hr' ? '/hr' : '/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Compass, roles: ['employee'] },
    { name: 'Journey', path: '/journey', icon: Map, roles: ['employee'] },
    { name: 'Connect', path: '/connect', icon: Users, roles: ['employee'] },
    { name: 'Office', path: '/office', icon: Building, roles: ['employee'] },
    { name: 'Ask Meridian', path: '/ask', icon: MessageCircle, roles: ['employee'] },
    { name: 'HR View', path: '/hr', icon: ShieldCheck, roles: ['hr'] },
  ];

  const visibleNavItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-deep-navy flex flex-col shrink-0 border-r border-slate-800">
        {/* Logo */}
        <div className="p-5 pb-2">
          <h1 className="text-xl font-display font-bold text-white flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-soft-teal grid place-items-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            Meridian
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white/90'
                )
              }
            >
              <item.icon className="w-[16px] h-[16px]" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Role Switcher */}
        <div className="p-4">
          <button
            onClick={handleRoleToggle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-white/50 bg-white/5 hover:bg-white/10 hover:text-white/90 transition-all cursor-pointer border border-white/5"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>View as {role === 'employee' ? 'HR' : 'Employee'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-warm-offwhite overflow-y-auto min-h-screen">
        <div className="p-6 md:px-12 md:py-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
