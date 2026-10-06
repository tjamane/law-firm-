'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Calendar, FileText, DollarSign } from 'lucide-react';
import { contracts } from '@/data/mock-data';
import type { ContractStatus, ContractType } from '@/types';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

// Status colors
const statusColors: Record<ContractStatus, string> = {
  Active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Expired: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Draft: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
};

// Contract type icons and colors
const typeStyles: Record<ContractType, { color: string }> = {
  Employment: { color: 'bg-blue-500' },
  NDA: { color: 'bg-purple-500' },
  Service: { color: 'bg-teal-500' },
  Partnership: { color: 'bg-accent' },
  Lease: { color: 'bg-orange-500' },
  Settlement: { color: 'bg-pink-500' },
};

// Contract card component
function ContractCard({
  contract,
  index,
}: {
  contract: (typeof contracts)[0];
  index: number;
}) {
  const daysUntilExpiry = Math.ceil(
    (new Date(contract.expiryDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const isExpiringSoon = daysUntilExpiry > 0 && daysUntilExpiry <= 30;

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
      <div className="flex items-start gap-3 mb-4">
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
            typeStyles[contract.type].color
          )}
        >
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">
            {contract.title}
          </h3>
          <p className="text-sm text-muted-foreground">{contract.type}</p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={cn(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            statusColors[contract.status]
          )}
        >
          {contract.status}
        </span>
        {isExpiringSoon && contract.status === 'Active' && (
          <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
            Expires in {daysUntilExpiry} days
          </span>
        )}
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>
            Expires:{' '}
            {new Date(contract.expiryDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
        {contract.value !== undefined && contract.value > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span>${contract.value.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Client */}
      <div className="pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground truncate">
          Client: <span className="text-foreground">{contract.client}</span>
        </p>
      </div>
    </motion.div>
  );
}

export default function ContractsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ContractStatus | 'All'>('All');

  // Filter contracts
  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || contract.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Status options
  const statusOptions: (ContractStatus | 'All')[] = [
    'All',
    'Active',
    'Pending',
    'Draft',
    'Expired',
  ];

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Contract Management
          </h1>
          <p className="text-muted-foreground">
            Manage contracts, agreements, and renewals
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Contract
        </Button>
      </div>

      {/* Search and filters */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search contracts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2 flex-wrap">
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

      {/* Contracts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredContracts.map((contract, index) => (
          <ContractCard key={contract.id} contract={contract} index={index} />
        ))}
      </div>

      {/* Empty state */}
      {filteredContracts.length === 0 && (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground">
            No contracts found matching your criteria.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}
