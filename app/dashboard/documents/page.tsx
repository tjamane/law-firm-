'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Upload,
  FileText,
  FileSpreadsheet,
  File,
  Image,
  Download,
  MoreHorizontal,
  Eye,
  Trash2,
  Grid,
  List,
} from 'lucide-react';
import { documents } from '@/data/mock-data';
import type { DocumentType } from '@/types';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.3 },
  }),
};

// Document type icons and colors
const typeConfig: Record<DocumentType, { icon: typeof FileText; color: string }> = {
  PDF: { icon: FileText, color: 'bg-red-500' },
  DOC: { icon: File, color: 'bg-blue-500' },
  XLS: { icon: FileSpreadsheet, color: 'bg-green-500' },
  IMG: { icon: Image, color: 'bg-purple-500' },
};

// Document card component
function DocumentCard({
  document,
  index,
  viewMode,
}: {
  document: (typeof documents)[0];
  index: number;
  viewMode: 'grid' | 'list';
}) {
  const config = typeConfig[document.type];
  const Icon = config.icon;

  if (viewMode === 'list') {
    return (
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-4 bg-card rounded-lg border border-border p-4 hover:bg-muted/20 transition-colors"
      >
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
            config.color
          )}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate">{document.title}</h3>
          <p className="text-sm text-muted-foreground">
            {document.size} &middot; Uploaded{' '}
            {new Date(document.uploadDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Download className="w-4 h-4" />
            <span className="sr-only">Download</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Download className="w-4 h-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-destructive">
                <Trash2 className="w-4 h-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:border-accent/30 transition-all group"
    >
      {/* Document icon */}
      <div className="flex items-center justify-center mb-4">
        <div
          className={cn(
            'w-16 h-16 rounded-xl flex items-center justify-center',
            config.color
          )}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Document info */}
      <div className="text-center mb-4">
        <h3 className="font-medium text-foreground truncate mb-1">
          {document.title}
        </h3>
        <p className="text-sm text-muted-foreground">{document.size}</p>
      </div>

      {/* Meta info */}
      <div className="text-center text-xs text-muted-foreground mb-4">
        <p>
          Uploaded{' '}
          {new Date(document.uploadDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
        <p className="truncate">by {document.uploadedBy}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="w-3 h-3" />
          Download
        </Button>
      </div>
    </motion.div>
  );
}

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [typeFilter, setTypeFilter] = useState<DocumentType | 'All'>('All');

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'All' || doc.type === typeFilter;

    return matchesSearch && matchesType;
  });

  // Type options
  const typeOptions: (DocumentType | 'All')[] = ['All', 'PDF', 'DOC', 'XLS', 'IMG'];

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Document Management</h1>
          <p className="text-muted-foreground">
            Store, organize, and access legal documents
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      {/* Search and filters */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Type filter and view toggle */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              {typeOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                    typeFilter === type
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  )}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'grid'
                    ? 'bg-background shadow-sm'
                    : 'hover:bg-background/50'
                )}
              >
                <Grid className="w-4 h-4" />
                <span className="sr-only">Grid view</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'list'
                    ? 'bg-background shadow-sm'
                    : 'hover:bg-background/50'
                )}
              >
                <List className="w-4 h-4" />
                <span className="sr-only">List view</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Documents display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDocuments.map((doc, index) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              index={index}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredDocuments.map((doc, index) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              index={index}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground">
            No documents found matching your criteria.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}
