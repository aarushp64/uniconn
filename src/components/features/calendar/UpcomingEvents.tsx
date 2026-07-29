import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Card } from '../../common/Card';
import type { CalendarEvent } from '../../../mock/calendarEvents';
import {
  CATEGORY_CONFIG,
  getCalendarEvents,
} from '../../../mock/calendarEvents';

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function isWithinDays(eventDate: string, fromDate: Date, days: number): boolean {
  const event = new Date(eventDate + 'T00:00:00');
  const end = new Date(fromDate);
  end.setDate(end.getDate() + days);
  return event >= fromDate && event <= end;
}

export const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    getCalendarEvents().then(setEvents);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = formatDate(today);

  const todayEvents = events.filter((e) => e.date === todayStr);
  const weekEvents = events
    .filter((e) => e.date !== todayStr && isWithinDays(e.date, today, 7))
    .sort((a, b) => a.date.localeCompare(b.date));

  const displayEvents = [...todayEvents.slice(0, 2), ...weekEvents.slice(0, 3)];
  const hasContent = displayEvents.length > 0;

  return (
    <Card className="p-4 border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
      {/* Glow accent */}
      <div className="absolute -top-6 -right-6 w-16 h-16 bg-sky-50 blur-2xl rounded-full group-hover:bg-sky-100 transition-colors pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <CalendarDays size={11} className="text-sky-500" />
          UPCOMING EVENTS
        </h3>
      </div>

      <div className="relative z-10 space-y-1.5">
        {/* Today's Events */}
        {todayEvents.length > 0 && (
          <div className="mb-2">
            <span className="text-[7px] font-black text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded uppercase">
              Today
            </span>
            <div className="mt-1.5 space-y-1.5">
              {todayEvents.slice(0, 2).map((event) => (
                <EventMiniCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* This Week */}
        {weekEvents.length > 0 && (
          <div>
            <span className="text-[7px] font-black text-slate-400 uppercase">
              This Week
            </span>
            <div className="mt-1.5 space-y-1.5">
              {weekEvents.slice(0, 3).map((event) => (
                <EventMiniCard key={event.id} event={event} showDate />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!hasContent && (
          <div className="text-center py-4">
            <CalendarDays size={18} className="text-slate-200 mx-auto mb-1.5" />
            <p className="text-[10px] text-slate-400 font-medium">
              No upcoming events
            </p>
          </div>
        )}
      </div>

      {/* View Full Calendar */}
      <Link
        to="/calendar"
        className="
          flex items-center justify-center gap-1.5
          w-full mt-3 py-2 bg-sky-500 hover:bg-sky-600
          rounded-lg text-[8px] font-black text-white
          transition-all uppercase tracking-widest shadow-sm
          active:scale-95 relative z-10
        "
      >
        View Full Calendar
        <ChevronRight size={10} />
      </Link>
    </Card>
  );
};

/* ─── Mini event card (for the widget) ─── */
interface EventMiniCardProps {
  event: CalendarEvent;
  showDate?: boolean;
}

const WEEKDAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const EventMiniCard: React.FC<EventMiniCardProps> = ({ event, showDate = false }) => {
  const config = CATEGORY_CONFIG[event.category];

  return (
    <div className="p-2.5 bg-white hover:bg-slate-50/50 rounded-lg border border-slate-50 hover:border-slate-100 transition-all cursor-pointer group/evt">
      <div className="flex justify-between items-start mb-1">
        <span
          className={`text-[7px] font-black ${config.color} ${config.bg} px-1.5 py-0.5 rounded-full border ${config.border}`}
        >
          {config.label}
        </span>
        {showDate && (
          <span className="text-[8px] font-bold text-slate-400">
            {(() => {
              const d = new Date(event.date + 'T00:00:00');
              return `${WEEKDAY_SHORT[d.getDay()]}, ${d.getDate()}`;
            })()}
          </span>
        )}
      </div>
      <h4 className="text-[10px] font-bold text-slate-800 group-hover/evt:text-sky-600 transition-colors truncate">
        {event.title}
      </h4>
      <div className="flex items-center gap-3 mt-1">
        <span className="flex items-center gap-1 text-[8px] text-slate-400 font-medium">
          <Clock size={8} />
          {event.startTime}
        </span>
        <span className="flex items-center gap-1 text-[8px] text-slate-400 font-medium truncate">
          <MapPin size={8} />
          {event.location}
        </span>
      </div>
    </div>
  );
};
