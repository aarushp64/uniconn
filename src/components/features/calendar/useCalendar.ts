import { useState, useEffect, useMemo, useCallback } from 'react';
import type {
  CalendarEvent,
  EventCategory,
} from '../../../mock/calendarEvents';
import { getCalendarEvents } from '../../../mock/calendarEvents';

export interface CalendarFilters {
  categories: EventCategory[];
  searchQuery: string;
  organizer: string;
  eventType: 'all' | 'online' | 'offline' | 'hybrid';
  registrationRequired: boolean | null;
  featuredOnly: boolean;
  viewTab: 'all' | 'interested' | 'registered' | 'saved';
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

  /* ── User Interaction States ── */
  interestedIds: string[];
  registeredIds: string[];
  savedIds: string[];
  reminders: Record<string, string>; // eventId -> timing

  /* ── Actions ── */
  goNextMonth: () => void;
  goPrevMonth: () => void;
  goToToday: () => void;
  setSelectedDate: (date: string | null) => void;
  toggleCategory: (cat: EventCategory) => void;
  setSearchQuery: (q: string) => void;
  setOrganizerFilter: (org: string) => void;
  setEventTypeFilter: (type: 'all' | 'online' | 'offline' | 'hybrid') => void;
  setRegistrationRequiredFilter: (req: boolean | null) => void;
  toggleFeaturedOnly: () => void;
  setViewTab: (tab: 'all' | 'interested' | 'registered' | 'saved') => void;
  clearFilters: () => void;

  /* ── User Actions ── */
  toggleInterested: (eventId: string) => void;
  toggleRegistered: (eventId: string) => void;
  toggleSaved: (eventId: string) => void;
  setReminder: (eventId: string, timing: string | null) => void;

  /* ── Helpers ── */
  getEventsForDate: (date: string) => CalendarEvent[];
  getDaysInMonth: () => { date: Date; dateStr: string; isCurrentMonth: boolean }[];
  isToday: (dateStr: string) => boolean;
  getGoogleCalendarUrl: (event: CalendarEvent) => string;
}

export function generateGoogleCalendarUrl(event: CalendarEvent): string {
  const title = encodeURIComponent(event.title);
  const details = encodeURIComponent(`${event.description}\n\nOrganizer: ${event.organizer}`);
  const location = encodeURIComponent(event.location);
  
  const dateClean = event.date.replace(/-/g, '');
  const startClean = (event.startTime || '09:00').replace(':', '') + '00';
  const endClean = (event.endTime || '10:00').replace(':', '') + '00';
  
  const dates = `${dateClean}T${startClean}/${dateClean}T${endClean}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

export function useCalendar(initialDate?: string): UseCalendarReturn {
  const initialDateObj = initialDate ? new Date(initialDate + 'T00:00:00') : new Date();
  
  const [currentMonth, setCurrentMonth] = useState(initialDateObj.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDateObj.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(initialDate || null);
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // LocalStorage state persistence
  const [interestedIds, setInterestedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('uniconn_interested_events');
      return saved ? JSON.parse(saved) : ['evt-001', 'evt-004'];
    } catch {
      return ['evt-001', 'evt-004'];
    }
  });

  const [registeredIds, setRegisteredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('uniconn_registered_events');
      return saved ? JSON.parse(saved) : ['evt-002'];
    } catch {
      return ['evt-002'];
    }
  });

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('uniconn_saved_events');
      return saved ? JSON.parse(saved) : ['evt-005'];
    } catch {
      return ['evt-005'];
    }
  });

  const [reminders, setRemindersState] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('uniconn_event_reminders');
      return saved ? JSON.parse(saved) : { 'evt-001': '1h' };
    } catch {
      return { 'evt-001': '1h' };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('uniconn_interested_events', JSON.stringify(interestedIds));
    } catch {}
  }, [interestedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('uniconn_registered_events', JSON.stringify(registeredIds));
    } catch {}
  }, [registeredIds]);

  useEffect(() => {
    try {
      localStorage.setItem('uniconn_saved_events', JSON.stringify(savedIds));
    } catch {}
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('uniconn_event_reminders', JSON.stringify(reminders));
    } catch {}
  }, [reminders]);

  const [filters, setFilters] = useState<CalendarFilters>({
    categories: [],
    searchQuery: '',
    organizer: '',
    eventType: 'all',
    registrationRequired: null,
    featuredOnly: false,
    viewTab: 'all',
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

    // View tab filtering
    if (filters.viewTab === 'interested') {
      result = result.filter((e) => interestedIds.includes(e.id));
    } else if (filters.viewTab === 'registered') {
      result = result.filter((e) => registeredIds.includes(e.id));
    } else if (filters.viewTab === 'saved') {
      result = result.filter((e) => savedIds.includes(e.id));
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((e) => filters.categories.includes(e.category));
    }

    // Organizer filter
    if (filters.organizer.trim()) {
      const org = filters.organizer.toLowerCase();
      result = result.filter((e) => e.organizer.toLowerCase().includes(org));
    }

    // Event type filter
    if (filters.eventType !== 'all') {
      result = result.filter((e) => e.eventType === filters.eventType);
    }

    // Registration required filter
    if (filters.registrationRequired !== null) {
      result = result.filter(
        (e) => (!!e.registrationLink || !!e.registrationRequired) === filters.registrationRequired,
      );
    }

    // Featured only
    if (filters.featuredOnly) {
      result = result.filter((e) => e.featured);
    }

    // Search filter across title, description, organizer, location, category
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.organizer.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q),
      );
    }

    return result;
  }, [allEvents, filters, interestedIds, registeredIds, savedIds]);

  // Actions for user interactions
  const toggleInterested = useCallback((eventId: string) => {
    setInterestedIds((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId],
    );
  }, []);

  const toggleRegistered = useCallback((eventId: string) => {
    setRegisteredIds((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId],
    );
  }, []);

  const toggleSaved = useCallback((eventId: string) => {
    setSavedIds((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId],
    );
  }, []);

  const setReminder = useCallback((eventId: string, timing: string | null) => {
    setRemindersState((prev) => {
      const next = { ...prev };
      if (timing === null) {
        delete next[eventId];
      } else {
        next[eventId] = timing;
      }
      return next;
    });
  }, []);

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

  const setOrganizerFilter = useCallback((org: string) => {
    setFilters((prev) => ({ ...prev, organizer: org }));
  }, []);

  const setEventTypeFilter = useCallback((type: 'all' | 'online' | 'offline' | 'hybrid') => {
    setFilters((prev) => ({ ...prev, eventType: type }));
  }, []);

  const setRegistrationRequiredFilter = useCallback((req: boolean | null) => {
    setFilters((prev) => ({ ...prev, registrationRequired: req }));
  }, []);

  const toggleFeaturedOnly = useCallback(() => {
    setFilters((prev) => ({ ...prev, featuredOnly: !prev.featuredOnly }));
  }, []);

  const setViewTab = useCallback((tab: 'all' | 'interested' | 'registered' | 'saved') => {
    setFilters((prev) => ({ ...prev, viewTab: tab }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      categories: [],
      searchQuery: '',
      organizer: '',
      eventType: 'all',
      registrationRequired: null,
      featuredOnly: false,
      viewTab: 'all',
    });
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
    setOrganizerFilter,
    setEventTypeFilter,
    setRegistrationRequiredFilter,
    toggleFeaturedOnly,
    setViewTab,
    clearFilters,
    toggleInterested,
    toggleRegistered,
    toggleSaved,
    setReminder,
    getEventsForDate,
    getDaysInMonth,
    isToday,
    getGoogleCalendarUrl: generateGoogleCalendarUrl,
  };
}

/* ─── Utility ─── */
function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
