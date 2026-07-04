import { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { Compass, Map, Users, MessageCircle, ShieldCheck, Building } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ThemeToggle } from '../components/ThemeToggle';

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
    <div className="h-[100dvh] flex flex-col md:flex-row font-sans overflow-hidden bg-app text-text-main transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-sidebar flex flex-col shrink-0 border-r border-border-warm md:h-full z-10 transition-colors duration-300">
        {/* Logo */}
        <div className="p-5 pb-2">
          <Link to="/" className="inline-block cursor-pointer">
            <h1 className="text-xl font-bold text-text-main flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-soft-teal to-teal-600 grid place-items-center shadow-sm shrink-0">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display">Meridian</span>
                <span className="font-sans text-[17px] font-semibold opacity-80">Compass</span>
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
                  'flex items-center gap-3 px-4 py-2.5 rounded-full text-[13px] font-medium transition-all cursor-pointer',
                  isActive
                    ? 'bg-text-main text-app shadow-sm'
                    : 'text-text-muted hover:bg-card-soft hover:text-text-main'
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
          <div className="bg-card rounded-[20px] p-3 shadow-sm border border-border-warm relative overflow-hidden transition-colors duration-300">
            <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2.5 px-1">Viewing as</div>
            <div className="flex bg-card-soft p-1 rounded-[16px] border border-border-warm/50 transition-colors duration-300">
              <button
                onClick={() => handleRoleChange('employee')}
                className={cn(
                  "flex-1 text-[11px] font-semibold py-1.5 rounded-full transition-all cursor-pointer text-center",
                  role === 'employee' ? 'bg-text-main text-app shadow-sm' : 'text-text-muted hover:text-text-main hover:bg-card'
                )}
              >
                New Employee
              </button>
              <button
                onClick={() => handleRoleChange('hr')}
                className={cn(
                  "flex-1 text-[11px] font-semibold py-1.5 rounded-full transition-all cursor-pointer text-center",
                  role === 'hr' ? 'bg-text-main text-app shadow-sm' : 'text-text-muted hover:text-text-main hover:bg-card'
                )}
              >
                HR
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-app overflow-y-auto h-[100dvh] relative transition-colors duration-300">
        <div className="p-6 md:px-12 md:py-10 max-w-7xl mx-auto">
          <ThemeToggle />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
