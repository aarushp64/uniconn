import React, { useState } from 'react';
import type { CalendarEvent } from '../../../mock/calendarEvents';
import { CATEGORY_CONFIG } from '../../../mock/calendarEvents';
import { generateGoogleCalendarUrl } from './useCalendar';
import { Clock, MapPin, User, ExternalLink, Star, Bell, Calendar as CalendarIcon, Check, ChevronDown, Globe } from 'lucide-react';

interface EventCardProps {
  event: CalendarEvent;
  isInterested?: boolean;
  isRegistered?: boolean;
  activeReminder?: string | null;
  onToggleInterested?: (id: string) => void;
  onToggleRegistered?: (id: string) => void;
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

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isInterested = false,
  isRegistered: _isRegistered = false,
  activeReminder = null,
  onToggleInterested,
  onSetReminder,
  onSelectEvent,
}) => {
  const config = CATEGORY_CONFIG[event.category] || CATEGORY_CONFIG.academic;
  const [showReminderMenu, setShowReminderMenu] = useState(false);

  const baseInterestedCount = event.interestedCount || 12;
  const currentInterestedCount = baseInterestedCount + (isInterested ? 1 : 0);

  const googleCalUrl = generateGoogleCalendarUrl(event);

  return (
    <div
      onClick={() => onSelectEvent?.(event)}
      className={`
        group bg-white rounded-xl border border-slate-100 p-4
        hover:shadow-md hover:border-slate-200 transition-all duration-200
        relative overflow-visible cursor-pointer flex flex-col justify-between
      `}
    >
      {/* Accent bar */}
      <div className={`absolute top-0 left-0 w-1 h-full ${config.dot} rounded-l-xl`} />

      <div>
        {/* Header Badges */}
        <div className="flex items-start justify-between gap-2 pl-2">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span
                className={`text-[8px] font-black ${config.color} ${config.bg} px-2 py-0.5 rounded-full uppercase tracking-wide ${config.border} border flex items-center gap-1`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                {config.label}
              </span>

              {/* Event Type Badge */}
              <span className="text-[8px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
                <Globe size={9} />
                {event.eventType || 'Offline'}
              </span>

              {event.featured && (
                <span className="text-[8px] font-black text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <Star size={9} className="text-amber-500 fill-amber-500" />
                  Featured
                </span>
              )}
            </div>

            <h4 className="text-sm font-bold text-slate-800 group-hover:text-sky-600 transition-colors leading-snug">
              {event.title}
            </h4>
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <p className="text-xs text-slate-500 mt-2 pl-2 leading-relaxed line-clamp-2">
            {event.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex flex-col gap-1.5 mt-3 pl-2">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock size={11} className="shrink-0 text-sky-500" />
            <span className="text-[10px] font-semibold text-slate-600">
              {event.startTime} — {event.endTime}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <MapPin size={11} className="shrink-0 text-emerald-500" />
            <span className="text-[10px] font-semibold text-slate-600 truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <User size={11} className="shrink-0 text-violet-500" />
            <span className="text-[10px] font-semibold text-slate-600 truncate">{event.organizer}</span>
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div
        className="flex flex-wrap items-center justify-between gap-1.5 mt-4 pt-3 border-t border-slate-100 pl-2 relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-1">
          {/* Interested Button */}
          <button
            onClick={() => onToggleInterested?.(event.id)}
            className={`
              flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all active:scale-95 border
              ${isInterested
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200'
              }
            `}
            title="Mark Interested"
          >
            <Star size={11} className={isInterested ? 'fill-white' : ''} />
            <span>{isInterested ? 'Interested' : 'Interested'}</span>
            <span className={`ml-0.5 px-1 py-0.2 text-[8px] rounded-full ${isInterested ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
              {currentInterestedCount}
            </span>
          </button>

          {/* Remind Me Popover */}
          <div className="relative">
            <button
              onClick={() => setShowReminderMenu(!showReminderMenu)}
              className={`
                flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all active:scale-95 border
                ${activeReminder
                  ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                  : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200'
                }
              `}
              title="Set Reminder"
            >
              <Bell size={11} className={activeReminder ? 'fill-white' : ''} />
              <span>{activeReminder ? activeReminder : 'Remind'}</span>
              <ChevronDown size={10} />
            </button>

            {/* Reminder Dropdown Menu */}
            {showReminderMenu && (
              <div className="absolute left-0 bottom-full mb-1 w-40 bg-white rounded-xl shadow-lg border border-slate-100 p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
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
                      w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-[10px] font-medium text-left transition-colors
                      ${activeReminder === opt.value ? 'bg-sky-50 text-sky-600 font-bold' : 'hover:bg-slate-50 text-slate-600'}
                    `}
                  >
                    <span>{opt.label}</span>
                    {activeReminder === opt.value && <Check size={10} className="text-sky-600" />}
                  </button>
                ))}
                {activeReminder && (
                  <button
                    onClick={() => {
                      onSetReminder?.(event.id, null);
                      setShowReminderMenu(false);
                    }}
                    className="w-full text-center text-[9px] font-bold text-rose-500 hover:bg-rose-50 px-2 py-1 rounded-lg mt-1 border-t border-slate-50"
                  >
                    Remove Reminder
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Add to Google Calendar */}
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-100 hover:border-blue-200 rounded-lg text-[10px] font-bold transition-all active:scale-95"
            title="Add to Google Calendar"
          >
            <CalendarIcon size={11} className="text-blue-500" />
            <span className="hidden sm:inline">Add Cal</span>
          </a>
        </div>

        {/* Register Button */}
        {event.registrationLink && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1 px-3 py-1.5
              text-[10px] font-bold text-white bg-sky-500 hover:bg-sky-600
              rounded-lg transition-all active:scale-95 shadow-sm
            "
          >
            <ExternalLink size={10} />
            Register
          </a>
        )}
      </div>
    </div>
  );
};
