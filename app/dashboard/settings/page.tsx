'use client';

import { motion } from 'framer-motion';
import { User, Mail, Lock, Moon, Sun, Bell, Shield, Palette } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

// Toggle switch component
function ToggleSwitch({
  enabled,
  onToggle,
  label,
}: {
  enabled: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
        enabled ? 'bg-primary' : 'bg-muted'
      )}
      role="switch"
      aria-checked={enabled}
      aria-label={label}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          enabled ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile section */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-muted-foreground" />
              <h2 className="font-semibold text-foreground">Profile Information</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-primary-foreground">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {user?.name || 'User'}
                </h3>
                <p className="text-muted-foreground">{user?.role || 'Attorney'}</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Change Avatar
                </Button>
              </div>
            </div>

            <div className="grid gap-4 max-w-md">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Display Name
                </label>
                <Input
                  type="text"
                  defaultValue={user?.name || ''}
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    defaultValue={user?.email || ''}
                    placeholder="Enter your email"
                    className="pl-10"
                  />
                </div>
              </div>
              <Button className="w-fit">Save Changes</Button>
            </div>
          </div>
        </motion.div>

        {/* Appearance section */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-muted-foreground" />
              <h2 className="font-semibold text-foreground">Appearance</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between py-4 border-b border-border">
              <div className="flex items-center gap-3">
                {mounted && theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Sun className="w-5 h-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium text-foreground">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Toggle between light and dark themes
                  </p>
                </div>
              </div>
              {mounted && (
                <ToggleSwitch
                  enabled={theme === 'dark'}
                  onToggle={toggleTheme}
                  label="Toggle dark mode"
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Notifications section */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <h2 className="font-semibold text-foreground">Notifications</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {[
              {
                title: 'Email Notifications',
                description: 'Receive email updates about case activity',
                defaultEnabled: true,
              },
              {
                title: 'Push Notifications',
                description: 'Get browser notifications for urgent matters',
                defaultEnabled: true,
              },
              {
                title: 'Calendar Reminders',
                description: 'Receive reminders for upcoming events',
                defaultEnabled: true,
              },
              {
                title: 'Contract Expiry Alerts',
                description: 'Get notified when contracts are expiring',
                defaultEnabled: false,
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={cn(
                  'flex items-center justify-between py-4',
                  index !== 3 && 'border-b border-border'
                )}
              >
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <ToggleSwitch
                  enabled={item.defaultEnabled}
                  onToggle={() => {}}
                  label={item.title}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security section */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <h2 className="font-semibold text-foreground">Security</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Password</p>
                  <p className="text-sm text-muted-foreground">
                    Change your account password
                  </p>
                </div>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>

            <div className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium text-foreground">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline">Enable 2FA</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
