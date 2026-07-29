import React from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface CalendarHeaderProps {
  currentMonth: number;
  currentYear: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  currentYear,
  onPrev,
  onNext,
  onToday,
}) => {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-sky-50 rounded-xl">
          <CalendarDays size={20} className="text-sky-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </h1>
          <p className="text-xs text-slate-400 font-medium">Academic Calendar</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToday}
          className="px-3 py-1.5 text-xs font-bold text-sky-600 bg-sky-50 hover:bg-sky-100 rounded-lg transition-all active:scale-95"
        >
          Today
        </button>
        <div className="flex items-center bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <button
            onClick={onPrev}
            className="p-2 hover:bg-slate-50 transition-colors active:scale-90"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} className="text-slate-500" />
          </button>
          <div className="w-px h-5 bg-slate-100" />
          <button
            onClick={onNext}
            className="p-2 hover:bg-slate-50 transition-colors active:scale-90"
            aria-label="Next month"
          >
            <ChevronRight size={16} className="text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
