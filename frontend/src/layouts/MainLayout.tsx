import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Compass, Map, Users, MessageCircle, ShieldAlert, Building } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MainLayout: React.FC = () => {
  const [role, setRole] = useState<'employee' | 'hr'>('employee');
  const navigate = useNavigate();

  const handleRoleToggle = () => {
    const newRole = role === 'employee' ? 'hr' : 'employee';
    setRole(newRole);
    if (newRole === 'hr') {
      navigate('/hr');
    } else {
      navigate('/');
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Compass, roles: ['employee'] },
    { name: 'Journey', path: '/journey', icon: Map, roles: ['employee'] },
    { name: 'Connect', path: '/connect', icon: Users, roles: ['employee'] },
    { name: 'Office', path: '/office', icon: Building, roles: ['employee'] },
    { name: 'Ask Meridian', path: '/ask', icon: MessageCircle, roles: ['employee'] },
    { name: 'HR View', path: '/hr', icon: ShieldAlert, roles: ['hr'] },
  ];

  const visibleNavItems = navItems.filter(item => item.roles.includes(role));

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-warm-offwhite">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-deep-navy flex items-center space-x-2">
            <Compass className="text-soft-teal" />
            <span>Meridian</span>
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors",
                  isActive
                    ? "bg-light-mint text-soft-teal font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-deep-navy"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={handleRoleToggle}
            className="w-full btn-secondary flex items-center justify-center space-x-2"
          >
            <span>View as {role === 'employee' ? 'HR' : 'Employee'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
