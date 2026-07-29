import React from 'react';
import type { CalendarEvent } from '../../../mock/calendarEvents';
import { CATEGORY_CONFIG } from '../../../mock/calendarEvents';
import { Clock, MapPin, User, ExternalLink, Star } from 'lucide-react';

interface EventCardProps {
  event: CalendarEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const config = CATEGORY_CONFIG[event.category];

  return (
    <div
      className={`
        group bg-white rounded-xl border border-slate-100 p-4
        hover:shadow-md hover:border-slate-200 transition-all duration-200
        relative overflow-hidden
      `}
    >
      {/* Accent bar */}
      <div className={`absolute top-0 left-0 w-1 h-full ${config.dot} rounded-l-xl`} />

      {/* Header */}
      <div className="flex items-start justify-between gap-2 pl-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`text-[8px] font-black ${config.color} ${config.bg} px-2 py-0.5 rounded-full uppercase tracking-wide ${config.border} border`}
            >
              {config.label}
            </span>
            {event.featured && (
              <Star size={10} className="text-amber-400 fill-amber-400 shrink-0" />
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

      {/* Meta */}
      <div className="flex flex-col gap-1.5 mt-3 pl-2">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Clock size={11} className="shrink-0" />
          <span className="text-[10px] font-semibold">
            {event.startTime} — {event.endTime}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <MapPin size={11} className="shrink-0" />
          <span className="text-[10px] font-semibold truncate">{event.location}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <User size={11} className="shrink-0" />
          <span className="text-[10px] font-semibold truncate">{event.organizer}</span>
        </div>
      </div>

      {/* Registration link */}
      {event.registrationLink && (
        <a
          href={event.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-1.5 mt-3 ml-2 px-3 py-1.5
            text-[10px] font-bold text-sky-600 bg-sky-50 hover:bg-sky-100
            rounded-lg transition-all active:scale-95 w-fit
          "
        >
          <ExternalLink size={10} />
          Register Now
        </a>
      )}
    </div>
  );
};
