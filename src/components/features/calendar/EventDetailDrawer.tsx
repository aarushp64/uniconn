import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Clock, MapPin, User, ExternalLink, Star, Bell, Globe, Check, ChevronRight } from 'lucide-react';
import type { CalendarEvent } from '../../../mock/calendarEvents';
import { CATEGORY_CONFIG } from '../../../mock/calendarEvents';
import { generateGoogleCalendarUrl } from './useCalendar';

interface EventDetailDrawerProps {
  event: CalendarEvent | null;
  allEvents: CalendarEvent[];
  onClose: () => void;
  interestedIds?: string[];
  reminders?: Record<string, string>;
  onToggleInterested?: (id: string) => void;
  onSetReminder?: (id: string, timing: string | null) => void;
  onSelectEvent?: (event: CalendarEvent) => void;
}

const REMINDER_OPTIONS = [
  { label: '10 Mins Before', value: '10m' },
  { label: '30 Mins Before', value: '30m' },
  { label: '1 Hour Before', value: '1h' },
  { label: '1 Day Before', value: '1d' },
  { label: '1 Week Before', value: '1w' },
];

export const EventDetailDrawer: React.FC<EventDetailDrawerProps> = ({
  event,
  allEvents,
  onClose,
  interestedIds = [],
  reminders = {},
  onToggleInterested,
  onSetReminder,
  onSelectEvent,
}) => {
  const [showReminderMenu, setShowReminderMenu] = useState(false);

  if (!event) return null;

  const config = CATEGORY_CONFIG[event.category] || CATEGORY_CONFIG.academic;
  const isInterested = interestedIds.includes(event.id);
  const activeReminder = reminders[event.id] || null;
  const googleCalUrl = generateGoogleCalendarUrl(event);

  // Find related events (same category or same organizer, excluding current)
  const relatedEvents = allEvents
    .filter((e) => e.id !== event.id && (e.category === event.category || e.organizer === event.organizer))
    .slice(0, 3);

  const baseInterestedCount = event.interestedCount || 18;
  const currentInterestedCount = baseInterestedCount + (isInterested ? 1 : 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg bg-white h-full shadow-sm z-10 flex flex-col overflow-hidden"
        >
          {/* Hero Header */}
          <div className={`relative h-44 ${config.bg} border-b ${config.border} flex flex-col justify-between p-6 shrink-0`}>
            {/* Background Pattern / Image */}
            {event.bannerImage ? (
              <img
                src={event.bannerImage}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
            ) : null}
            {/* Top Close Button & Badges */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black ${config.color} bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full uppercase tracking-wider border ${config.border}`}>
                  {config.label}
                </span>
                <span className="text-[10px] font-bold text-slate-700 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
                  <Globe size={10} />
                  {event.eventType || 'Offline'}
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-600 flex items-center justify-center transition-colors shadow-xs"
              >
                <X size={16} />
              </button>
            </div>

            {/* Event Title */}
            <div className="relative z-10 mt-auto">
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
                {event.title}
              </h2>
            </div>
          </div>

          {/* Drawer Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {/* Meta Information Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5">
                <div className="p-2 bg-sky-100 text-sky-600 rounded-lg shrink-0 mt-0.5">
                  <Clock size={14} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Date & Time</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{event.date}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{event.startTime} — {event.endTime}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg shrink-0 mt-0.5">
                  <MapPin size={14} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Venue</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5 truncate">{event.location}</p>
                  <p className="text-[10px] text-slate-500 font-medium">Campus Location</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5 col-span-2">
                <div className="p-2 bg-violet-100 text-violet-600 rounded-lg shrink-0 mt-0.5">
                  <User size={14} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Organized By</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{event.organizer}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">About This Event</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                {event.description}
              </p>
            </div>

            {/* Related Events Section */}
            {relatedEvents.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Related Campus Events</h3>
                <div className="space-y-2">
                  {relatedEvents.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectEvent?.(rel)}
                      className="p-3 bg-white hover:bg-slate-50 rounded-lg border border-slate-100 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`w-2 h-2 rounded-full ${CATEGORY_CONFIG[rel.category]?.dot || 'bg-blue-500'} shrink-0`} />
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-800 group-hover:text-sky-600 transition-colors truncate">{rel.title}</p>
                          <p className="text-[10px] text-slate-400">{rel.date} • {rel.startTime}</p>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-sky-500 transition-colors shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              {/* Interested Button */}
              <button
                onClick={() => onToggleInterested?.(event.id)}
                className={`
                  flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 border
                  ${isInterested
                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50 hover:text-amber-600'
                  }
                `}
              >
                <Star size={13} className={isInterested ? 'fill-white' : ''} />
                <span>{isInterested ? 'Interested' : 'Interested'}</span>
                <span className={`px-1.5 py-0.2 text-[9px] rounded-full ${isInterested ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {currentInterestedCount}
                </span>
              </button>

              {/* Remind Button */}
              <div className="relative">
                <button
                  onClick={() => setShowReminderMenu(!showReminderMenu)}
                  className={`
                    flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 border
                    ${activeReminder
                      ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50 hover:text-sky-600'
                    }
                  `}
                >
                  <Bell size={13} className={activeReminder ? 'fill-white' : ''} />
                  <span>{activeReminder ? activeReminder : 'Remind'}</span>
                </button>

                {showReminderMenu && (
                  <div className="absolute left-0 bottom-full mb-2 w-44 bg-white rounded-lg shadow-sm border border-slate-100 p-2 z-30">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 py-1 border-b border-slate-50 mb-1">
                      Set Reminder
                    </div>
                    {REMINDER_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          onSetReminder?.(event.id, activeReminder === opt.value ? null : opt.value);
                          setShowReminderMenu(false);
                        }}
                        className={`
                          w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors
                          ${activeReminder === opt.value ? 'bg-sky-50 text-sky-600 font-bold' : 'hover:bg-slate-50 text-slate-600'}
                        `}
                      >
                        <span>{opt.label}</span>
                        {activeReminder === opt.value && <Check size={12} className="text-sky-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Google Cal */}
              <a
                href={googleCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200 hover:border-blue-200 rounded-lg transition-all active:scale-95"
                title="Add to Google Calendar"
              >
                <CalendarIcon size={14} className="text-blue-500" />
              </a>
            </div>

            {/* Register Link */}
            {event.registrationLink && (
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-1.5 px-4 py-2
                  text-xs font-bold text-white bg-sky-500 hover:bg-sky-600
                  rounded-lg transition-all active:scale-95 shadow-sm
                "
              >
                <ExternalLink size={13} />
                Register Now
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
