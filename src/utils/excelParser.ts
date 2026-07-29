/**
 * Excel → Calendar Event Parser
 *
 * This module transforms raw JSON rows (from an Excel export) into typed
 * CalendarEvent objects. It is completely decoupled from the UI so that
 * swapping Excel files each semester requires no UI code changes.
 *
 * Pipeline:  Excel File → xlsx-to-json tool → raw JSON[] → parseExcelToEvents() → CalendarEvent[]
 */

import type { CalendarEvent, EventCategory } from '../mock/calendarEvents';
import { CATEGORY_CONFIG } from '../mock/calendarEvents';

/* ─── Column name mapping (case-insensitive) ─── */
const COLUMN_MAP: Record<string, keyof CalendarEvent> = {
  id: 'id',
  title: 'title',
  name: 'title',
  'event name': 'title',
  'event title': 'title',
  description: 'description',
  details: 'description',
  date: 'date',
  'event date': 'date',
  'start date': 'date',
  'start time': 'startTime',
  'start': 'startTime',
  from: 'startTime',
  'end time': 'endTime',
  'end': 'endTime',
  to: 'endTime',
  category: 'category',
  type: 'category',
  'event type': 'category',
  organizer: 'organizer',
  'organised by': 'organizer',
  'organized by': 'organizer',
  location: 'location',
  venue: 'location',
  'registration link': 'registrationLink',
  'reg link': 'registrationLink',
  link: 'registrationLink',
  image: 'image',
  featured: 'featured',
};

/* ─── Category inference from keywords ─── */
const CATEGORY_KEYWORDS: Record<EventCategory, string[]> = {
  workshop: ['workshop', 'bootcamp', 'hands-on', 'session', 'training'],
  research: ['research', 'symposium', 'paper', 'thesis', 'journal'],
  club: ['club', 'cultural', 'event', 'committee', 'council'],
  placement: ['placement', 'recruitment', 'drive', 'internship', 'campus hiring', 'career'],
  exam: ['exam', 'examination', 'test', 'quiz', 'assessment', 'mid-sem', 'end-sem'],
  holiday: ['holiday', 'vacation', 'break', 'closed', 'celebration'],
  academic: ['academic', 'orientation', 'semester', 'convocation', 'lecture', 'project'],
  sports: ['sports', 'match', 'tournament', 'athletics', 'football', 'cricket', 'basketball'],
  festival: ['fest', 'festival', 'persona'],
  competition: ['competition', 'contest', 'challenge'],
  seminar: ['seminar', 'talk', 'keynote', 'webinar'],
  hackathon: ['hackathon', 'hack', 'ideathon'],
};

function inferCategory(text: string): EventCategory {
  const lower = text.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return category as EventCategory;
    }
  }
  return 'academic'; // default
}

/* ─── Date normaliser ─── */
function normalizeDate(raw: string | number): string {
  // Handle Excel serial date numbers
  if (typeof raw === 'number') {
    const date = new Date((raw - 25569) * 86400 * 1000);
    return date.toISOString().split('T')[0];
  }

  const str = String(raw).trim();

  // Already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;

  // DD/MM/YYYY or DD-MM-YYYY
  const dmy = str.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (dmy) {
    return `${dmy[3]}-${dmy[2].padStart(2, '0')}-${dmy[1].padStart(2, '0')}`;
  }

  // MM/DD/YYYY
  const mdy = str.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (mdy) {
    return `${mdy[3]}-${mdy[1].padStart(2, '0')}-${mdy[2].padStart(2, '0')}`;
  }

  // Fallback: try native parse
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split('T')[0];
  }

  return str; // return as-is if unparseable
}

/* ─── Time normaliser ─── */
function normalizeTime(raw: string | undefined): string {
  if (!raw) return '09:00';
  const str = String(raw).trim();

  // HH:mm already
  if (/^\d{2}:\d{2}$/.test(str)) return str;

  // H:mm AM/PM
  const ampm = str.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
  if (ampm) {
    let h = parseInt(ampm[1], 10);
    if (ampm[3].toLowerCase() === 'pm' && h !== 12) h += 12;
    if (ampm[3].toLowerCase() === 'am' && h === 12) h = 0;
    return `${String(h).padStart(2, '0')}:${ampm[2]}`;
  }

  return '09:00'; // fallback
}

/* ─── Main Parser ─── */
export function parseExcelToEvents(rows: Record<string, unknown>[]): CalendarEvent[] {
  return rows.map((row, index) => {
    // Normalise column names
    const mapped: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(row)) {
      const normalised = key.toLowerCase().trim();
      const field = COLUMN_MAP[normalised];
      if (field) {
        mapped[field] = value;
      }
    }

    const title = String(mapped.title || 'Untitled Event');
    const description = String(mapped.description || '');
    const category: EventCategory =
      (mapped.category && Object.keys(CATEGORY_CONFIG).includes(String(mapped.category).toLowerCase()))
        ? (String(mapped.category).toLowerCase() as EventCategory)
        : inferCategory(`${title} ${description}`);

    const config = CATEGORY_CONFIG[category];

    return {
      id: String(mapped.id || `excel-${index + 1}`),
      title,
      description,
      date: normalizeDate(mapped.date as string | number),
      startTime: normalizeTime(mapped.startTime as string | undefined),
      endTime: normalizeTime(mapped.endTime as string | undefined),
      category,
      organizer: String(mapped.organizer || 'University'),
      location: String(mapped.location || 'Campus'),
      registrationLink: mapped.registrationLink ? String(mapped.registrationLink) : undefined,
      image: mapped.image ? String(mapped.image) : undefined,
      color: config.dot.replace('bg-', '').replace('-500', '').replace('-400', ''),
      featured: mapped.featured === true || String(mapped.featured).toLowerCase() === 'yes',
    };
  });
}
