'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Calendar, User, Scale, Filter } from 'lucide-react';
import { cases } from '@/data/mock-data';
import type { CaseStatus } from '@/types';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

// Status badge colors
const statusColors: Record<CaseStatus, string> = {
  Open: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
  Pending: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
  'In Court': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800',
  Closed: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700',
};

// Case card component
function CaseCard({ caseItem, index }: { caseItem: (typeof cases)[0]; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:border-accent/30 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-muted-foreground font-mono mb-1">
            {caseItem.caseNumber}
          </p>
          <h3 className="font-semibold text-foreground line-clamp-2">
            {caseItem.title}
          </h3>
        </div>
        <span
          className={cn(
            'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border',
            statusColors[caseItem.status]
          )}
        >
          {caseItem.status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          <span className="truncate">{caseItem.client}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Scale className="w-4 h-4" />
          <span>{caseItem.lawyer}</span>
        </div>
        {caseItem.nextHearing && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              Next: {new Date(caseItem.nextHearing).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        )}
      </div>

      {/* Action */}
      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </div>
    </motion.div>
  );
}

export default function CasesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CaseStatus | 'All'>('All');

  // Filter cases
  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.client.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || caseItem.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Status filter options
  const statusOptions: (CaseStatus | 'All')[] = ['All', 'Open', 'Pending', 'In Court', 'Closed'];

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Case Management</h1>
          <p className="text-muted-foreground">
            Track and manage all your legal cases
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Case
        </Button>
      </div>

      {/* Search and filters */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                  statusFilter === status
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cases grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCases.map((caseItem, index) => (
          <CaseCard key={caseItem.id} caseItem={caseItem} index={index} />
        ))}
      </div>

      {/* Empty state */}
      {filteredCases.length === 0 && (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground">No cases found matching your criteria.</p>
        </div>
      )}
    </DashboardLayout>
  );
}
