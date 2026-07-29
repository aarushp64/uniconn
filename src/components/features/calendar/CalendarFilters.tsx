import React, { useState } from 'react';
import { Search, X, SlidersHorizontal, Star, Globe, ChevronDown, Check } from 'lucide-react';
import type { EventCategory } from '../../../mock/calendarEvents';
import { CATEGORY_CONFIG } from '../../../mock/calendarEvents';

interface CalendarFiltersProps {
  activeCategories: EventCategory[];
  searchQuery: string;
  eventType: 'all' | 'online' | 'offline' | 'hybrid';
  featuredOnly: boolean;
  registrationRequired: boolean | null;
  onToggleCategory: (cat: EventCategory) => void;
  onSearchChange: (q: string) => void;
  onEventTypeChange: (type: 'all' | 'online' | 'offline' | 'hybrid') => void;
  onToggleFeatured: () => void;
  onToggleRegistrationRequired: (val: boolean | null) => void;
  onClear: () => void;
}

const ALL_CATEGORIES: EventCategory[] = [
  'workshop',
  'placement',
  'club',
  'research',
  'festival',
  'holiday',
  'academic',
  'exam',
  'sports',
  'competition',
  'seminar',
  'hackathon',
];

export const CalendarFilters: React.FC<CalendarFiltersProps> = ({
  activeCategories,
  searchQuery,
  eventType,
  featuredOnly,
  registrationRequired,
  onToggleCategory,
  onSearchChange,
  onEventTypeChange,
  onToggleFeatured,
  onToggleRegistrationRequired,
  onClear,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasActiveFilters =
    activeCategories.length > 0 ||
    searchQuery.trim() !== '' ||
    eventType !== 'all' ||
    featuredOnly ||
    registrationRequired !== null;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-4">
      {/* Top row: Search + Quick toggles + Clear */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="flex items-center gap-1.5 shrink-0">
          <SlidersHorizontal size={12} className="text-sky-500" />
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
            Search & Filters
          </span>
        </div>

        {/* Instant Search Bar */}
        <div className="flex-1 min-w-[200px] relative">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search events, clubs, venues, descriptions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="
              w-full pl-8 pr-3 py-2 text-xs font-medium text-slate-700
              bg-slate-50 rounded-xl border border-transparent
              focus:bg-white focus:border-sky-300 focus:outline-none
              placeholder:text-slate-400 transition-all
            "
          />
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Featured Toggle */}
          <button
            onClick={onToggleFeatured}
            className={`
              flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-bold transition-all active:scale-95 border
              ${featuredOnly
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-amber-50 hover:text-amber-600'
              }
            `}
          >
            <Star size={11} className={featuredOnly ? 'fill-white' : ''} />
            <span>Featured</span>
          </button>

          {/* More Filters Dropdown Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`
              flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-bold transition-all active:scale-95 border
              ${showAdvanced || eventType !== 'all' || registrationRequired !== null
                ? 'bg-sky-50 text-sky-600 border-sky-200'
                : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
              }
            `}
          >
            <Globe size={11} />
            <span>Format & Reg</span>
            <ChevronDown size={10} className={showAdvanced ? 'rotate-180 transition-transform' : 'transition-transform'} />
          </button>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={onClear}
              className="flex items-center gap-1 px-2 py-1.5 text-[9px] font-bold text-rose-500 bg-rose-50 border border-rose-100 hover:bg-rose-100 rounded-xl transition-all active:scale-95"
            >
              <X size={10} />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filter Row (Expandable) */}
      {showAdvanced && (
        <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-50 rounded-xl mb-3 border border-slate-100 animate-in fade-in duration-150">
          {/* Format Options */}
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mr-1">Format:</span>
            {(['all', 'offline', 'online', 'hybrid'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => onEventTypeChange(fmt)}
                className={`
                  px-2 py-1 rounded-lg text-[9px] font-bold capitalize transition-all
                  ${eventType === fmt ? 'bg-sky-500 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-100'}
                `}
              >
                {fmt}
              </button>
            ))}
          </div>

          {/* Registration Required Toggle */}
          <div className="flex items-center gap-1 ml-auto">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mr-1">Registration:</span>
            <button
              onClick={() => onToggleRegistrationRequired(registrationRequired === true ? null : true)}
              className={`
                px-2 py-1 rounded-lg text-[9px] font-bold transition-all border
                ${registrationRequired === true ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-100'}
              `}
            >
              Required Link Only
            </button>
          </div>
        </div>
      )}

      {/* 12 Category chips */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {ALL_CATEGORIES.map((cat) => {
          const config = CATEGORY_CONFIG[cat] || CATEGORY_CONFIG.academic;
          const isActive = activeCategories.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => onToggleCategory(cat)}
              className={`
                flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold
                transition-all duration-150 active:scale-95 border
                ${isActive
                  ? `${config.bg} ${config.color} ${config.border} shadow-2xs`
                  : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50 hover:text-slate-700'
                }
              `}
            >
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  isActive ? config.dot : 'bg-slate-200'
                }`}
              />
              {config.label}
              {isActive && <Check size={10} className="ml-0.5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
