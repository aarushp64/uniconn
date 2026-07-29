import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CalendarDays } from 'lucide-react';
import type { CalendarEvent } from '../../../mock/calendarEvents';
import { EventCard } from './EventCard';

interface AgendaPanelProps {
  selectedDate: string | null;
  events: CalendarEvent[];
  interestedIds?: string[];
  registeredIds?: string[];
  reminders?: Record<string, string>;
  onToggleInterested?: (id: string) => void;
  onToggleRegistered?: (id: string) => void;
  onSetReminder?: (id: string, timing: string | null) => void;
  onSelectEvent?: (event: CalendarEvent) => void;
  onClose: () => void;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatDisplayDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const day = d.getDate();
  const month = MONTH_NAMES[d.getMonth()];
  const year = d.getFullYear();
  const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });
  return `${weekday}, ${month} ${day}, ${year}`;
}

export const AgendaPanel: React.FC<AgendaPanelProps> = ({
  selectedDate,
  events,
  interestedIds = [],
  registeredIds = [],
  reminders = {},
  onToggleInterested,
  onToggleRegistered,
  onSetReminder,
  onSelectEvent,
  onClose,
}) => {
  return (
    <AnimatePresence mode="wait">
      {selectedDate && (
        <motion.div
          key={selectedDate}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 w-full"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                <CalendarDays size={11} className="text-sky-500" />
                AGENDA
              </h3>
              <p className="text-sm font-bold text-slate-800">
                {formatDisplayDate(selectedDate)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors active:scale-90"
              aria-label="Close agenda panel"
            >
              <X size={16} className="text-slate-400" />
            </button>
          </div>

          {/* Events list */}
          {events.length > 0 ? (
            <div className="flex flex-col gap-3">
              {events.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.2 }}
                >
                  <EventCard
                    event={event}
                    isInterested={interestedIds.includes(event.id)}
                    isRegistered={registeredIds.includes(event.id)}
                    activeReminder={reminders[event.id] || null}
                    onToggleInterested={onToggleInterested}
                    onToggleRegistered={onToggleRegistered}
                    onSetReminder={onSetReminder}
                    onSelectEvent={onSelectEvent}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-3">
                <CalendarDays size={20} className="text-slate-300" />
              </div>
              <p className="text-sm font-semibold text-slate-400">No events</p>
              <p className="text-xs text-slate-300 mt-0.5">Nothing scheduled for this day</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
