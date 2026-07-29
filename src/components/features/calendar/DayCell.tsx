import React from 'react';
import type { CalendarEvent } from '../../../mock/calendarEvents';
import { CATEGORY_CONFIG } from '../../../mock/calendarEvents';

interface DayCellProps {
  dateStr: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  events: CalendarEvent[];
  onClick: (dateStr: string) => void;
}

export const DayCell: React.FC<DayCellProps> = ({
  dateStr,
  dayNumber,
  isCurrentMonth,
  isToday,
  isSelected,
  events,
  onClick,
}) => {
  // Get unique category dots (max 4)
  const uniqueCategories = [...new Set(events.map((e) => e.category))].slice(0, 4);

  return (
    <button
      onClick={() => onClick(dateStr)}
      className={`
        relative flex flex-col items-center gap-1 p-1.5 rounded-xl min-h-[72px]
        transition-all duration-200 group cursor-pointer
        ${!isCurrentMonth ? 'opacity-30' : ''}
        ${isSelected
          ? 'bg-sky-500 shadow-md shadow-sky-200'
          : isToday
            ? 'bg-sky-50 border border-sky-200'
            : 'hover:bg-slate-50 border border-transparent hover:border-slate-100'
        }
      `}
    >
      {/* Day number */}
      <span
        className={`
          text-sm font-semibold leading-none
          ${isSelected
            ? 'text-white'
            : isToday
              ? 'text-sky-600 font-bold'
              : isCurrentMonth
                ? 'text-slate-700 group-hover:text-slate-900'
                : 'text-slate-300'
          }
        `}
      >
        {dayNumber}
      </span>

      {/* Category dots */}
      {uniqueCategories.length > 0 && (
        <div className="flex items-center gap-0.5 mt-auto">
          {uniqueCategories.map((cat) => (
            <span
              key={cat}
              className={`
                w-1.5 h-1.5 rounded-full transition-transform
                ${isSelected ? 'bg-white/80' : CATEGORY_CONFIG[cat].dot}
                ${!isSelected ? 'group-hover:scale-125' : ''}
              `}
              title={CATEGORY_CONFIG[cat].label}
            />
          ))}
          {events.length > uniqueCategories.length && (
            <span
              className={`text-[7px] font-bold ml-0.5 ${
                isSelected ? 'text-white/70' : 'text-slate-400'
              }`}
            >
              +{events.length - uniqueCategories.length}
            </span>
          )}
        </div>
      )}

      {/* Event count badge for days with many events */}
      {events.length > 0 && (
        <span
          className={`
            absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center
            text-[8px] font-black rounded-full leading-none px-1
            ${isSelected
              ? 'bg-white text-sky-600'
              : 'bg-sky-100 text-sky-600'
            }
            ${events.length >= 3 ? 'animate-pulse' : ''}
          `}
        >
          {events.length}
        </span>
      )}
    </button>
  );
};
