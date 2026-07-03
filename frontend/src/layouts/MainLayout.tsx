import { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { Compass, Map, Users, MessageCircle, ShieldCheck, Building } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const MainLayout = () => {
  const [role, setRole] = useState<'employee' | 'hr'>('employee');
  const navigate = useNavigate();

  const handleRoleChange = (newRole: 'employee' | 'hr') => {
    if (role === newRole) return;
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
    <div className="h-[100dvh] flex flex-col md:flex-row font-sans overflow-hidden bg-warm-offwhite">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-warm-offwhite flex flex-col shrink-0 border-r border-[#e6d8c3] md:h-full z-10">
        {/* Logo */}
        <div className="p-5 pb-2">
          <Link to="/" className="inline-block cursor-pointer">
            <h1 className="text-xl font-bold text-deep-navy flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 rounded-lg bg-soft-teal grid place-items-center shadow-sm">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display">Meridian</span>
                <span className="font-sans text-[17px] font-semibold text-deep-navy/80">Compass</span>
              </div>
            </h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-full text-[13px] font-medium transition-all',
                  isActive
                    ? 'bg-deep-navy text-white shadow-sm'
                    : 'text-slate-500 hover:bg-[#ebe1d1] hover:text-deep-navy'
                )
              }
            >
              <item.icon className="w-[16px] h-[16px]" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Role Switcher */}
        <div className="p-4 pb-6 mt-auto">
          <div className="bg-[#fff8ea] rounded-[20px] p-3 shadow-sm border border-[#e6d8c3] relative overflow-hidden">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">Viewing as</div>
            <div className="flex bg-[#f3eee5] p-1 rounded-[16px] border border-[#eee7dc]/50">
              <button
                onClick={() => handleRoleChange('employee')}
                className={cn(
                  "flex-1 text-[11px] font-semibold py-1.5 rounded-full transition-all cursor-pointer text-center",
                  role === 'employee' ? 'bg-deep-navy text-white shadow-sm' : 'text-slate-500 hover:text-deep-navy hover:bg-[#ebe4d8]'
                )}
              >
                New Employee
              </button>
              <button
                onClick={() => handleRoleChange('hr')}
                className={cn(
                  "flex-1 text-[11px] font-semibold py-1.5 rounded-full transition-all cursor-pointer text-center",
                  role === 'hr' ? 'bg-deep-navy text-white shadow-sm' : 'text-slate-500 hover:text-deep-navy hover:bg-[#ebe4d8]'
                )}
              >
                HR
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-warm-offwhite overflow-y-auto h-[100dvh] relative">
        <div className="p-6 md:px-12 md:py-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
