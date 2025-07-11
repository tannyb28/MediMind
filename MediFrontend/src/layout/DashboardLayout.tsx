import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Zap, Home, Settings, Battery, BookOpen, Calendar, CircleHelp, FileText, LifeBuoy, Bell, User, Heart } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '../components/ui/sidebar';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  // Get current time and greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get user initials
  const getUserInitials = () => {
    if (!user?.full_name) return 'U';
    return user.full_name
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr]">
        <Sidebar>
          {/* Sidebar content as in Next.js scaffold, using <Link> */}
        </Sidebar>
        <div className="flex flex-col">
          <header className="relative flex h-16 items-center justify-between border-b bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 px-4 lg:px-6 shadow-sm">
            {/* Left section */}
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                    MediMind
                  </h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">Patient Dashboard</p>
                </div>
              </div>
            </div>

            {/* Center section */}
            <div className="hidden md:flex flex-col items-center">
              <div className="text-sm font-medium text-gray-700">
                {getGreeting()}{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}
              </div>
              <div className="text-xs text-muted-foreground">
                {getCurrentDate()}
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative h-9 w-9 rounded-full hover:bg-white/50 border-0 bg-transparent flex items-center justify-center transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Avatar */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end">
                  <div className="text-sm font-medium text-gray-700">
                    {user?.full_name || 'User'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {user?.disease_state || 'Patient'}
                  </div>
                </div>
                <button
                  className="relative h-9 w-9 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all border-0 flex items-center justify-center"
                  onClick={logout}
                >
                  {getUserInitials()}
                </button>
              </div>
            </div>

            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 pointer-events-none"></div>
          </header>
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}