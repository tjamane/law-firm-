'use client';

import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Clock,
  Plus,
  Download,
  MoreHorizontal,
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock billing data
const invoices = [
  {
    id: 'INV-2024-001',
    client: 'Anderson & Associates LLC',
    amount: 12500,
    status: 'Paid',
    date: '2024-04-25',
    dueDate: '2024-05-25',
  },
  {
    id: 'INV-2024-002',
    client: 'TechVentures Inc.',
    amount: 8750,
    status: 'Pending',
    date: '2024-04-20',
    dueDate: '2024-05-20',
  },
  {
    id: 'INV-2024-003',
    client: 'Sarah Mitchell',
    amount: 3200,
    status: 'Overdue',
    date: '2024-03-15',
    dueDate: '2024-04-15',
  },
  {
    id: 'INV-2024-004',
    client: 'Metropolitan Real Estate',
    amount: 15000,
    status: 'Paid',
    date: '2024-04-10',
    dueDate: '2024-05-10',
  },
  {
    id: 'INV-2024-005',
    client: 'Robert Chen',
    amount: 4500,
    status: 'Pending',
    date: '2024-04-28',
    dueDate: '2024-05-28',
  },
];

// Status colors
const statusColors = {
  Paid: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Overdue: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

export default function BillingPage() {
  // Calculate totals
  const totalRevenue = invoices.reduce((sum, inv) => 
    inv.status === 'Paid' ? sum + inv.amount : sum, 0
  );
  const pendingAmount = invoices.reduce((sum, inv) => 
    inv.status === 'Pending' ? sum + inv.amount : sum, 0
  );
  const overdueAmount = invoices.reduce((sum, inv) => 
    inv.status === 'Overdue' ? sum + inv.amount : sum, 0
  );

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Billing & Invoicing</h1>
          <p className="text-muted-foreground">
            Manage invoices, payments, and financial records
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Invoice
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            title: 'Total Revenue',
            value: `$${totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-100 dark:bg-green-900/30',
          },
          {
            title: 'Pending',
            value: `$${pendingAmount.toLocaleString()}`,
            icon: Clock,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
          },
          {
            title: 'Overdue',
            value: `$${overdueAmount.toLocaleString()}`,
            icon: TrendingUp,
            color: 'text-red-600',
            bgColor: 'bg-red-100 dark:bg-red-900/30',
          },
          {
            title: 'Total Invoices',
            value: invoices.length,
            icon: CreditCard,
            color: 'text-primary',
            bgColor: 'bg-primary/10',
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl border border-border p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', stat.bgColor)}>
                <stat.icon className={cn('w-6 h-6', stat.color)} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Invoices table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-card rounded-xl border border-border overflow-hidden"
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Recent Invoices</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                  Invoice ID
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                  Client
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                  Date
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                  Due Date
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-foreground">
                      {invoice.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-foreground">{invoice.client}</span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-muted-foreground text-sm">
                      {new Date(invoice.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-muted-foreground text-sm">
                      {new Date(invoice.dueDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-semibold text-foreground">
                      ${invoice.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        statusColors[invoice.status as keyof typeof statusColors]
                      )}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
