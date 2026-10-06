'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileSignature,
  FileText,
  Calendar,
  Receipt,
  Bell,
  Settings,
  Scale,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

// Navigation items with icons
const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Clients', href: '/dashboard/clients', icon: Users },
  { label: 'Cases', href: '/dashboard/cases', icon: Briefcase },
  { label: 'Contracts', href: '/dashboard/contracts', icon: FileSignature },
  { label: 'Documents', href: '/dashboard/documents', icon: FileText },
  { label: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
  { label: 'Billing', href: '/dashboard/billing', icon: Receipt },
  { label: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Sidebar content component
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
            <Scale className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-lg font-bold text-sidebar-foreground whitespace-nowrap overflow-hidden"
              >
                LegalPractice
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* Mobile close button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={onMobileClose}
        >
          <X className="w-5 h-5" />
          <span className="sr-only">Close sidebar</span>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-sidebar-primary')} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-sidebar-border space-y-2">
        {/* Collapse toggle - desktop only */}
        <Button
          variant="ghost"
          className={cn(
            'hidden lg:flex w-full justify-start gap-3 text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50',
            collapsed && 'justify-center'
          )}
          onClick={onToggle}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>Collapse</span>
            </>
          )}
        </Button>

        {/* Logout button */}
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start gap-3 text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50',
            collapsed && 'justify-center'
          )}
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="whitespace-nowrap overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.2 }}
        className="hidden lg:block fixed left-0 top-0 bottom-0 bg-sidebar z-40"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-sidebar z-50"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

// Dashboard header component
interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="w-5 h-5" />
        <span className="sr-only">Open menu</span>
      </Button>

      {/* Page title placeholder */}
      <div className="hidden lg:block" />

      {/* User info */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">
            Welcome, {user?.name || 'User'}
          </p>
          <p className="text-xs text-muted-foreground">{user?.role || 'Attorney'}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <span className="text-sm font-semibold text-primary-foreground">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </span>
        </div>
      </div>
    </header>
  );
}

// Main dashboard layout component
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main content area */}
      <motion.div
        initial={false}
        animate={{ marginLeft: collapsed ? 72 : 256 }}
        transition={{ duration: 0.2 }}
        className="lg:transition-[margin] min-h-screen ml-0"
      >
        <DashboardHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="p-4 lg:p-6">{children}</main>
      </motion.div>
    </div>
  );
}
