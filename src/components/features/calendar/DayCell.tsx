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
          {uniqueCategories.map((cat) => {
            const config = CATEGORY_CONFIG[cat] || CATEGORY_CONFIG.academic;
            return (
              <span
                key={cat}
                className={`
                  w-1.5 h-1.5 rounded-full transition-transform
                  ${isSelected ? 'bg-white/80' : config.dot}
                  ${!isSelected ? 'group-hover:scale-125' : ''}
                `}
                title={config.label}
              />
            );
          })}
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

      {/* Event count badge */}
      {events.length > 0 && (
        <span
          className={`
            absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center
            text-[8px] font-black rounded-full leading-none px-1 z-10
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

      {/* Hover preview tooltip */}
      {events.length > 0 && (
        <div
          className="
            hidden group-hover:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48
            bg-slate-900 text-white rounded-xl p-2.5 shadow-xl z-30 pointer-events-none text-left
            animate-in fade-in zoom-in-95 duration-150
          "
        >
          <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1 mb-1.5">
            <span>{events.length} {events.length === 1 ? 'Event' : 'Events'}</span>
            <span>Click to View</span>
          </div>

          <div className="space-y-1">
            {events.slice(0, 2).map((evt) => {
              const cfg = CATEGORY_CONFIG[evt.category] || CATEGORY_CONFIG.academic;
              return (
                <div key={evt.id} className="flex items-start gap-1.5 text-[9px]">
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} mt-1 shrink-0`} />
                  <span className="font-semibold text-slate-200 truncate">{evt.title}</span>
                </div>
              );
            })}
            {events.length > 2 && (
              <div className="text-[8px] text-slate-400 pl-3 pt-0.5">
                + {events.length - 2} more...
              </div>
            )}
          </div>
        </div>
      )}
    </button>
  );
};
