import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Zap, Home, Settings, Battery, BookOpen, Calendar, CircleHelp, FileText, LifeBuoy } from 'lucide-react';
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

export default function DashboardLayout() {
  const { pathname } = useLocation();
  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr]">
        <Sidebar>
          {/* Sidebar content as in Next.js scaffold, using <Link> */}
        </Sidebar>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-gray-100 px-4 lg:px-6">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Patient Dashboard</h1>
          </header>
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}