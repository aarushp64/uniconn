import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import type { EventCategory } from '../../../mock/calendarEvents';
import { CATEGORY_CONFIG } from '../../../mock/calendarEvents';

interface CalendarFiltersProps {
  activeCategories: EventCategory[];
  searchQuery: string;
  onToggleCategory: (cat: EventCategory) => void;
  onSearchChange: (q: string) => void;
  onClear: () => void;
}

const ALL_CATEGORIES: EventCategory[] = [
  'workshop',
  'research',
  'club',
  'placement',
  'exam',
  'holiday',
  'academic',
  'sports',
];

export const CalendarFilters: React.FC<CalendarFiltersProps> = ({
  activeCategories,
  searchQuery,
  onToggleCategory,
  onSearchChange,
  onClear,
}) => {
  const hasActiveFilters = activeCategories.length > 0 || searchQuery.trim() !== '';

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-4">
      {/* Top row: Search + Clear */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal size={12} className="text-slate-400" />
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
            Filters
          </span>
        </div>
        <div className="flex-1 relative">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
          />
          <input
            type="text"
            placeholder="Search events, organizers, venues..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="
              w-full pl-8 pr-3 py-2 text-xs font-medium text-slate-700
              bg-slate-50 rounded-lg border border-transparent
              focus:bg-white focus:border-sky-200 focus:outline-none
              placeholder:text-slate-300 transition-all
            "
          />
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 px-2 py-1.5 text-[9px] font-bold text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all active:scale-95"
          >
            <X size={10} />
            Clear
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-1.5">
        {ALL_CATEGORIES.map((cat) => {
          const config = CATEGORY_CONFIG[cat];
          const isActive = activeCategories.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => onToggleCategory(cat)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold
                transition-all duration-200 active:scale-95 border
                ${isActive
                  ? `${config.bg} ${config.color} ${config.border} shadow-sm`
                  : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50 hover:text-slate-600'
                }
              `}
            >
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  isActive ? config.dot : 'bg-slate-200'
                }`}
              />
              {config.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
