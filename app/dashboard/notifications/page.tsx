'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, AlertTriangle, Info, CheckCircle2, XCircle } from 'lucide-react';
import { notifications } from '@/data/mock-data';
import type { NotificationType } from '@/types';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

// Notification type config
const typeConfig: Record<NotificationType, { icon: typeof Info; color: string; bgColor: string }> = {
  info: {
    icon: Info,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
  },
  success: {
    icon: CheckCircle2,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
  error: {
    icon: XCircle,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
  },
};

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

export default function NotificationsPage() {
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  // Filter notifications
  const filteredNotifications = notificationsList.filter((n) => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotificationsList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Unread count
  const unreadCount = notificationsList.filter((n) => !n.read).length;

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with important alerts and updates
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead} className="gap-2">
            <Check className="w-4 h-4" />
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            filter === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          All ({notificationsList.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            filter === 'unread'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications list */}
      <div className="space-y-3">
        {filteredNotifications.map((notification, index) => {
          const config = typeConfig[notification.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={notification.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={cn(
                'bg-card rounded-xl border border-border p-4 transition-all',
                !notification.read && 'border-l-4 border-l-primary bg-primary/5'
              )}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                    config.bgColor
                  )}
                >
                  <Icon className={cn('w-5 h-5', config.color)} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-foreground">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {formatDistanceToNow(new Date(notification.timestamp), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>

                    {/* Actions */}
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="flex-shrink-0"
                      >
                        <Check className="w-4 h-4" />
                        <span className="sr-only">Mark as read</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredNotifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-card rounded-xl border border-border"
        >
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {filter === 'unread'
              ? 'No unread notifications'
              : 'No notifications to display'}
          </p>
        </motion.div>
      )}
    </DashboardLayout>
  );
}
