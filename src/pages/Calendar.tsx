import { MainLayout } from '../components/layout/MainLayout';
import { CalendarHeader } from '../components/features/calendar/CalendarHeader';
import { CalendarGrid } from '../components/features/calendar/CalendarGrid';
import { CalendarFilters } from '../components/features/calendar/CalendarFilters';
import { AgendaPanel } from '../components/features/calendar/AgendaPanel';
import { useCalendar } from '../components/features/calendar/useCalendar';
import { CATEGORY_CONFIG } from '../mock/calendarEvents';

const Calendar = () => {
  const {
    currentMonth,
    currentYear,
    selectedDate,
    filteredEvents,
    filters,
    loading,
    goNextMonth,
    goPrevMonth,
    goToToday,
    setSelectedDate,
    toggleCategory,
    setSearchQuery,
    clearFilters,
    getEventsForDate,
    getDaysInMonth,
    isToday,
  } = useCalendar();

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];
  const days = getDaysInMonth();

  // Legend for the bottom
  const legendItems = Object.entries(CATEGORY_CONFIG).map(([key, config]) => ({
    key,
    label: config.label,
    dot: config.dot,
  }));

  // Stats
  const totalThisMonth = filteredEvents.filter((e) => {
    const d = new Date(e.date + 'T00:00:00');
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  const rightPanel = selectedDate ? (
    <AgendaPanel
      selectedDate={selectedDate}
      events={selectedDateEvents}
      onClose={() => setSelectedDate(null)}
    />
  ) : (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      {/* Quick stats card */}
      <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">
        Month Overview
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-sky-50 rounded-xl">
          <span className="text-xs font-semibold text-slate-600">Events this month</span>
          <span className="text-lg font-bold text-sky-600">{totalThisMonth}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
          <span className="text-xs font-semibold text-slate-600">Total events</span>
          <span className="text-lg font-bold text-slate-700">{filteredEvents.length}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">
          Categories
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {legendItems.map(({ key, label, dot }) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
              <span className="text-[10px] font-semibold text-slate-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="mt-5 p-3 bg-sky-50/50 rounded-xl border border-sky-100">
        <p className="text-[10px] text-sky-600 font-semibold leading-relaxed">
          💡 Click on any day to see detailed events in this panel.
          Use filters above to narrow down by category.
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-sky-200 border-t-sky-500 rounded-full animate-spin" />
            <p className="text-sm font-medium text-slate-400">Loading calendar...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout rightPanel={rightPanel}>
      <div className="animate-fade-in">
        <CalendarHeader
          currentMonth={currentMonth}
          currentYear={currentYear}
          onPrev={goPrevMonth}
          onNext={goNextMonth}
          onToday={goToToday}
        />

        <CalendarFilters
          activeCategories={filters.categories}
          searchQuery={filters.searchQuery}
          onToggleCategory={toggleCategory}
          onSearchChange={setSearchQuery}
          onClear={clearFilters}
        />

        <CalendarGrid
          days={days}
          selectedDate={selectedDate}
          getEventsForDate={getEventsForDate}
          isToday={isToday}
          onSelectDate={(date) =>
            setSelectedDate(selectedDate === date ? null : date)
          }
        />

        {/* Mobile agenda panel (below grid on small screens) */}
        <div className="block lg:hidden mt-4">
          {selectedDate && (
            <AgendaPanel
              selectedDate={selectedDate}
              events={selectedDateEvents}
              onClose={() => setSelectedDate(null)}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Calendar;
