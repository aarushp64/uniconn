import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { CalendarHeader } from '../components/features/calendar/CalendarHeader';
import { CalendarGrid } from '../components/features/calendar/CalendarGrid';
import { CalendarFilters } from '../components/features/calendar/CalendarFilters';
import { AgendaPanel } from '../components/features/calendar/AgendaPanel';
import { EventDetailDrawer } from '../components/features/calendar/EventDetailDrawer';
import { useCalendar } from '../components/features/calendar/useCalendar';
import { CATEGORY_CONFIG } from '../mock/calendarEvents';
import type { CalendarEvent } from '../mock/calendarEvents';
import { Star, CheckCircle, Bookmark, CalendarDays } from 'lucide-react';

const Calendar = () => {
  const [searchParams] = useSearchParams();
  const initialDate = searchParams.get('date') || undefined;
  const [selectedDrawerEvent, setSelectedDrawerEvent] = useState<CalendarEvent | null>(null);

  const {
    currentMonth,
    currentYear,
    selectedDate,
    allEvents,
    filteredEvents,
    filters,
    loading,
    interestedIds,
    registeredIds,
    savedIds,
    reminders,
    goNextMonth,
    goPrevMonth,
    goToToday,
    setSelectedDate,
    toggleCategory,
    setSearchQuery,
    setEventTypeFilter,
    setRegistrationRequiredFilter,
    toggleFeaturedOnly,
    setViewTab,
    clearFilters,
    toggleInterested,
    toggleRegistered,
    toggleSaved: _toggleSaved,
    setReminder,
    getEventsForDate,
    getDaysInMonth,
    isToday,
  } = useCalendar(initialDate);

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
      interestedIds={interestedIds}
      registeredIds={registeredIds}
      reminders={reminders}
      onToggleInterested={toggleInterested}
      onToggleRegistered={toggleRegistered}
      onSetReminder={setReminder}
      onSelectEvent={(evt) => setSelectedDrawerEvent(evt)}
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
          <span className="text-xs font-semibold text-slate-600">Active view results</span>
          <span className="text-lg font-bold text-slate-700">{filteredEvents.length}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">
          Categories (12)
        </h4>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
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
          💡 Click on any event card to slide open full details, or click a day on the grid to inspect the agenda.
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <MainLayout font-sans>
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-sky-200 border-t-sky-500 rounded-full animate-spin" />
            <p className="text-sm font-medium text-slate-400">Loading UniConn Event Platform...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout rightPanel={rightPanel}>
      <div className="pb-10">
        {/* Navigation / My Events Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewTab('all')}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all
                ${filters.viewTab === 'all'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }
              `}
            >
              <CalendarDays size={14} />
              <span>All Campus Events</span>
            </button>

            <button
              onClick={() => setViewTab('interested')}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all
                ${filters.viewTab === 'interested'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-amber-50 hover:text-amber-600'
                }
              `}
            >
              <Star size={14} className={filters.viewTab === 'interested' ? 'fill-white' : ''} />
              <span>Interested</span>
              <span className={`px-1.5 py-0.2 text-[9px] rounded-full ${filters.viewTab === 'interested' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {interestedIds.length}
              </span>
            </button>

            <button
              onClick={() => setViewTab('registered')}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all
                ${filters.viewTab === 'registered'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                }
              `}
            >
              <CheckCircle size={14} />
              <span>Registered</span>
              <span className={`px-1.5 py-0.2 text-[9px] rounded-full ${filters.viewTab === 'registered' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {registeredIds.length}
              </span>
            </button>

            <button
              onClick={() => setViewTab('saved')}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all
                ${filters.viewTab === 'saved'
                  ? 'bg-violet-500 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-violet-50 hover:text-violet-600'
                }
              `}
            >
              <Bookmark size={14} />
              <span>Saved</span>
              <span className={`px-1.5 py-0.2 text-[9px] rounded-full ${filters.viewTab === 'saved' ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {savedIds.length}
              </span>
            </button>
          </div>
        </div>

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
          eventType={filters.eventType}
          featuredOnly={filters.featuredOnly}
          registrationRequired={filters.registrationRequired}
          onToggleCategory={toggleCategory}
          onSearchChange={setSearchQuery}
          onEventTypeChange={setEventTypeFilter}
          onToggleFeatured={toggleFeaturedOnly}
          onToggleRegistrationRequired={setRegistrationRequiredFilter}
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
              interestedIds={interestedIds}
              registeredIds={registeredIds}
              reminders={reminders}
              onToggleInterested={toggleInterested}
              onToggleRegistered={toggleRegistered}
              onSetReminder={setReminder}
              onSelectEvent={(evt) => setSelectedDrawerEvent(evt)}
              onClose={() => setSelectedDate(null)}
            />
          )}
        </div>

        {/* Detailed Event Drawer */}
        <EventDetailDrawer
          event={selectedDrawerEvent}
          allEvents={allEvents}
          interestedIds={interestedIds}
          reminders={reminders}
          onToggleInterested={toggleInterested}
          onSetReminder={setReminder}
          onSelectEvent={(evt) => setSelectedDrawerEvent(evt)}
          onClose={() => setSelectedDrawerEvent(null)}
        />
      </div>
    </MainLayout>
  );
};

export default Calendar;
