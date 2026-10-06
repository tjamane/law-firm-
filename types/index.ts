// Client types
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'Pending';
  createdAt: string;
  address?: string;
  company?: string;
}

// Case types
export type CaseStatus = 'Open' | 'Pending' | 'In Court' | 'Closed';

export interface Case {
  id: string;
  caseNumber: string;
  title: string;
  client: string;
  clientId: string;
  lawyer: string;
  status: CaseStatus;
  nextHearing: string;
  createdAt: string;
  description?: string;
}

// Contract types
export type ContractStatus = 'Active' | 'Pending' | 'Expired' | 'Draft';
export type ContractType = 'Employment' | 'NDA' | 'Service' | 'Partnership' | 'Lease' | 'Settlement';

export interface Contract {
  id: string;
  title: string;
  type: ContractType;
  client: string;
  clientId: string;
  expiryDate: string;
  status: ContractStatus;
  createdAt: string;
  value?: number;
}

// Document types
export type DocumentType = 'PDF' | 'DOC' | 'XLS' | 'IMG';

export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  uploadDate: string;
  size: string;
  caseId?: string;
  clientId?: string;
  uploadedBy: string;
}

// Calendar Event types
export type EventType = 'Consultation' | 'Court Hearing' | 'Deadline' | 'Meeting' | 'Deposition';

export interface CalendarEvent {
  id: string;
  title: string;
  type: EventType;
  date: string;
  time: string;
  location?: string;
  caseId?: string;
  description?: string;
}

// Notification types
export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  read: boolean;
}

// Activity types
export interface Activity {
  id: string;
  action: string;
  timestamp: string;
  user: string;
  details?: string;
}

// User types
export interface User {
  name: string;
  email?: string;
  role?: string;
  avatar?: string;
}

// Dashboard Stats types
export interface DashboardStats {
  totalClients: number;
  activeCases: number;
  pendingContracts: number;
  upcomingHearings: number;
}

// Chart data types
export interface ChartData {
  name: string;
  value: number;
}

export interface MonthlyData {
  month: string;
  cases: number;
  revenue: number;
}
