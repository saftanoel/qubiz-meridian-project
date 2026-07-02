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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-deep-navy flex flex-col shrink-0">
        {/* Logo */}
        <div className="p-6 pb-2">
          <h1 className="text-xl font-display font-bold text-white flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-soft-teal grid place-items-center">
              <Compass className="w-4.5 h-4.5 text-white" />
            </div>
            Meridian
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white/90'
                )
              }
            >
              <item.icon className="w-[18px] h-[18px]" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Role Switcher */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleRoleToggle}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 bg-white/5 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>View as {role === 'employee' ? 'HR' : 'Employee'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-warm-offwhite overflow-y-auto min-h-screen">
        <div className="p-6 md:px-10 md:py-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
