import React from 'react';
import { DayCell } from './DayCell';
import type { CalendarEvent } from '../../../mock/calendarEvents';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarGridProps {
  days: { date: Date; dateStr: string; isCurrentMonth: boolean }[];
  selectedDate: string | null;
  getEventsForDate: (date: string) => CalendarEvent[];
  isToday: (dateStr: string) => boolean;
  onSelectDate: (dateStr: string) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  selectedDate,
  getEventsForDate,
  isToday,
  onSelectDate,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 overflow-hidden">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-[9px] font-black text-slate-400 uppercase tracking-widest py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <DayCell
            key={day.dateStr}
            dateStr={day.dateStr}
            dayNumber={day.date.getDate()}
            isCurrentMonth={day.isCurrentMonth}
            isToday={isToday(day.dateStr)}
            isSelected={selectedDate === day.dateStr}
            events={getEventsForDate(day.dateStr)}
            onClick={onSelectDate}
          />
        ))}
      </div>
    </div>
  );
};
