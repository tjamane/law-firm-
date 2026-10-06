'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Plus,
} from 'lucide-react';
import { calendarEvents } from '@/data/mock-data';
import type { EventType } from '@/types';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Event type colors
const eventTypeColors: Record<EventType, string> = {
  Consultation: 'bg-blue-500 border-blue-600',
  'Court Hearing': 'bg-red-500 border-red-600',
  Deadline: 'bg-yellow-500 border-yellow-600',
  Meeting: 'bg-purple-500 border-purple-600',
  Deposition: 'bg-teal-500 border-teal-600',
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

// Get days in month
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

// Get first day of month (0 = Sunday)
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 1)); // May 2024
  const [selectedDate, setSelectedDate] = useState<string | null>('2024-05-08');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  // Navigate months
  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Format date string
  const formatDateString = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // Get events for a specific date
  const getEventsForDate = (dateString: string) => {
    return calendarEvents.filter((event) => event.date === dateString);
  };

  // Get all events for selected date
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Legal Calendar</h1>
          <p className="text-muted-foreground">
            Schedule hearings, meetings, and deadlines
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 bg-card rounded-xl border border-border p-6"
        >
          {/* Calendar header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              {monthNames[month]} {year}
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={goToPrevMonth}>
                <ChevronLeft className="w-4 h-4" />
                <span className="sr-only">Previous month</span>
              </Button>
              <Button variant="outline" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="w-4 h-4" />
                <span className="sr-only">Next month</span>
              </Button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before first of month */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square p-1" />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateString = formatDateString(day);
              const dayEvents = getEventsForDate(dateString);
              const isSelected = selectedDate === dateString;
              const isToday = dateString === '2024-05-05'; // Mock today

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateString)}
                  className={cn(
                    'aspect-square p-1 rounded-lg transition-colors relative',
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : isToday
                      ? 'bg-accent/20'
                      : 'hover:bg-muted'
                  )}
                >
                  <span className="text-sm">{day}</span>
                  {/* Event indicators */}
                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {dayEvents.slice(0, 3).map((event, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            'w-1.5 h-1.5 rounded-full',
                            isSelected ? 'bg-primary-foreground' : eventTypeColors[event.type]
                          )}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Events sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {selectedDate
              ? new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Select a date'}
          </h3>

          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDateEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className={cn(
                    'p-4 rounded-lg border-l-4',
                    eventTypeColors[event.type],
                    'bg-muted/30'
                  )}
                >
                  <p className="font-medium text-foreground mb-1">
                    {event.title}
                  </p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {event.time}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                    )}
                  </div>
                  <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded bg-background text-muted-foreground">
                    {event.type}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              No events scheduled for this date.
            </p>
          )}
        </motion.div>
      </div>

      {/* Upcoming events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-6 bg-card rounded-xl border border-border p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Upcoming Events
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {calendarEvents.slice(0, 4).map((event, index) => (
            <motion.div
              key={event.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="p-4 rounded-lg bg-muted/30 border border-border"
            >
              <p className="font-medium text-foreground truncate mb-2">
                {event.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date(event.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}{' '}
                at {event.time}
              </p>
              <span
                className={cn(
                  'inline-block mt-2 px-2 py-0.5 text-xs rounded text-white',
                  eventTypeColors[event.type]
                )}
              >
                {event.type}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
