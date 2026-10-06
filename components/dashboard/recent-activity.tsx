'use client';

import { motion } from 'framer-motion';
import { recentActivities } from '@/data/mock-data';
import { formatDistanceToNow } from 'date-fns';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

// Get icon color based on action type
function getActionColor(action: string): string {
  if (action.toLowerCase().includes('added')) return 'bg-green-500';
  if (action.toLowerCase().includes('updated')) return 'bg-blue-500';
  if (action.toLowerCase().includes('uploaded')) return 'bg-accent';
  if (action.toLowerCase().includes('scheduled')) return 'bg-purple-500';
  if (action.toLowerCase().includes('reviewed')) return 'bg-teal-500';
  return 'bg-primary';
}

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-card rounded-xl border border-border p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Recent Activities
      </h3>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {recentActivities.slice(0, 5).map((activity) => (
          <motion.div
            key={activity.id}
            variants={itemVariants}
            className="flex items-start gap-3"
          >
            {/* Activity indicator */}
            <div
              className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getActionColor(
                activity.action
              )}`}
            />

            {/* Activity content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-medium">
                {activity.action}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {activity.details}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {activity.user} &middot;{' '}
                {formatDistanceToNow(new Date(activity.timestamp), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
