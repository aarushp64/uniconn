import { useState, useEffect, useMemo, useCallback } from 'react';
import type {
  CalendarEvent,
  EventCategory,
} from '../../../mock/calendarEvents';
import { getCalendarEvents } from '../../../mock/calendarEvents';

export interface CalendarFilters {
  categories: EventCategory[];
  searchQuery: string;
}

export interface UseCalendarReturn {
  /* ── State ── */
  currentMonth: number; // 0-11
  currentYear: number;
  selectedDate: string | null; // YYYY-MM-DD
  allEvents: CalendarEvent[];
  filteredEvents: CalendarEvent[];
  filters: CalendarFilters;
  loading: boolean;

  /* ── Actions ── */
  goNextMonth: () => void;
  goPrevMonth: () => void;
  goToToday: () => void;
  setSelectedDate: (date: string | null) => void;
  toggleCategory: (cat: EventCategory) => void;
  setSearchQuery: (q: string) => void;
  clearFilters: () => void;

  /* ── Helpers ── */
  getEventsForDate: (date: string) => CalendarEvent[];
  getDaysInMonth: () => { date: Date; dateStr: string; isCurrentMonth: boolean }[];
  isToday: (dateStr: string) => boolean;
}

export function useCalendar(): UseCalendarReturn {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CalendarFilters>({
    categories: [],
    searchQuery: '',
  });

  // Fetch events on mount
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getCalendarEvents().then((events) => {
      if (!cancelled) {
        setAllEvents(events);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Filtered events
  const filteredEvents = useMemo(() => {
    let result = allEvents;

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((e) => filters.categories.includes(e.category));
    }

    // Search filter
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.organizer.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q),
      );
    }

    return result;
  }, [allEvents, filters]);

  // Get events for a specific date
  const getEventsForDate = useCallback(
    (date: string) => filteredEvents.filter((e) => e.date === date),
    [filteredEvents],
  );

  // Navigation
  const goNextMonth = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const goPrevMonth = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const goToToday = useCallback(() => {
    const now = new Date();
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
    const todayStr = formatDate(now);
    setSelectedDate(todayStr);
  }, []);

  // Filter actions
  const toggleCategory = useCallback((cat: EventCategory) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  }, []);

  const setSearchQuery = useCallback((q: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: q }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ categories: [], searchQuery: '' });
  }, []);

  // Build days grid for the current month (includes leading/trailing days)
  const getDaysInMonth = useCallback(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startWeekday = firstDay.getDay(); // 0=Sun
    const totalDays = lastDay.getDate();

    const days: { date: Date; dateStr: string; isCurrentMonth: boolean }[] = [];

    // Previous month's trailing days
    for (let i = startWeekday - 1; i >= 0; i--) {
      const d = new Date(currentYear, currentMonth, -i);
      days.push({ date: d, dateStr: formatDate(d), isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      const d = new Date(currentYear, currentMonth, i);
      days.push({ date: d, dateStr: formatDate(d), isCurrentMonth: true });
    }

    // Next month's leading days to fill out the grid (6 rows × 7 cols = 42)
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(currentYear, currentMonth + 1, i);
      days.push({ date: d, dateStr: formatDate(d), isCurrentMonth: false });
    }

    return days;
  }, [currentMonth, currentYear]);

  const isToday = useCallback((dateStr: string) => {
    return dateStr === formatDate(new Date());
  }, []);

  return {
    currentMonth,
    currentYear,
    selectedDate,
    allEvents,
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
  };
}

/* ─── Utility ─── */
function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
