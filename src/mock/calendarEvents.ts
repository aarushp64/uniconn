/* ─── Calendar Event Types ─── */
import importedEventsData from './events.json';

export type EventCategory =
  | 'workshop'
  | 'research'
  | 'club'
  | 'placement'
  | 'exam'
  | 'holiday'
  | 'academic'
  | 'sports';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  category: EventCategory;
  organizer: string;
  location: string;
  registrationLink?: string;
  image?: string;
  color: string; // Tailwind color key
  featured: boolean;
}

/* ─── Category → Color Map ─── */
export const CATEGORY_CONFIG: Record<
  EventCategory,
  { label: string; color: string; bg: string; dot: string; border: string }
> = {
  workshop: {
    label: 'Workshop',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    dot: 'bg-sky-500',
    border: 'border-sky-200',
  },
  research: {
    label: 'Research',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    dot: 'bg-emerald-500',
    border: 'border-emerald-200',
  },
  club: {
    label: 'Club Activity',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    dot: 'bg-violet-500',
    border: 'border-violet-200',
  },
  placement: {
    label: 'Placement',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    dot: 'bg-amber-500',
    border: 'border-amber-200',
  },
  exam: {
    label: 'Examination',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    dot: 'bg-rose-500',
    border: 'border-rose-200',
  },
  holiday: {
    label: 'Holiday',
    color: 'text-slate-500',
    bg: 'bg-slate-50',
    dot: 'bg-slate-400',
    border: 'border-slate-200',
  },
  academic: {
    label: 'Academic',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    dot: 'bg-blue-500',
    border: 'border-blue-200',
  },
  sports: {
    label: 'Sports',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    dot: 'bg-orange-500',
    border: 'border-orange-200',
  },
};

/* ─── Sample Event Data (Academic Year 2026-27) ─── */
const calendarEvents: CalendarEvent[] = [
  // ── July 2026 ──
  {
    id: 'evt-001',
    title: 'Orientation Day — New Batch 2026',
    description:
      'Welcome ceremony for incoming freshers. Campus tour, department introductions, and ice-breaker activities.',
    date: '2026-07-30',
    startTime: '09:00',
    endTime: '16:00',
    category: 'academic',
    organizer: 'Dean of Student Affairs',
    location: 'Main Auditorium',
    color: 'blue',
    featured: true,
  },
  {
    id: 'evt-002',
    title: 'Git & GitHub Bootcamp',
    description:
      'Hands-on workshop covering version control fundamentals, branching strategies, and collaborative workflows.',
    date: '2026-07-31',
    startTime: '14:00',
    endTime: '17:00',
    category: 'workshop',
    organizer: 'GDSC MIT-ADTU',
    location: 'Computer Lab 4',
    registrationLink: 'https://gdsc.community.dev/events/git-bootcamp',
    color: 'sky',
    featured: false,
  },

  // ── August 2026 ──
  {
    id: 'evt-003',
    title: 'Independence Day Celebration',
    description:
      'Flag hoisting ceremony followed by cultural programme and patriotic performances.',
    date: '2026-08-15',
    startTime: '08:00',
    endTime: '12:00',
    category: 'holiday',
    organizer: 'University Administration',
    location: 'Central Ground',
    color: 'slate',
    featured: true,
  },
  {
    id: 'evt-004',
    title: 'AI/ML Research Symposium',
    description:
      'Faculty and PhD scholars present ongoing research in artificial intelligence, NLP, and computer vision.',
    date: '2026-08-20',
    startTime: '10:00',
    endTime: '17:00',
    category: 'research',
    organizer: 'Dept. of Computer Science',
    location: 'Conference Hall A',
    registrationLink: 'https://uniconn.edu/research-symposium',
    color: 'emerald',
    featured: true,
  },
  {
    id: 'evt-005',
    title: 'Intramural Football League — Kickoff',
    description:
      'Opening matches of the annual inter-department football tournament.',
    date: '2026-08-22',
    startTime: '16:00',
    endTime: '19:00',
    category: 'sports',
    organizer: 'Sports Committee',
    location: 'University Sports Complex',
    color: 'orange',
    featured: false,
  },
  {
    id: 'evt-006',
    title: 'Club Fair 2026',
    description:
      'All campus clubs set up stalls for recruitment. Explore 40+ clubs — tech, arts, culture, sports, and more.',
    date: '2026-08-25',
    startTime: '10:00',
    endTime: '16:00',
    category: 'club',
    organizer: 'Student Council',
    location: 'Open Air Theatre',
    color: 'violet',
    featured: true,
  },
  {
    id: 'evt-007',
    title: 'Flutter Forward Workshop',
    description:
      'Build a complete cross-platform app with Flutter 4 and Dart. Bring your laptops!',
    date: '2026-08-28',
    startTime: '14:00',
    endTime: '18:00',
    category: 'workshop',
    organizer: 'GDSC MIT-ADTU',
    location: 'Computer Lab 2',
    registrationLink: 'https://gdsc.community.dev/events/flutter-forward',
    color: 'sky',
    featured: false,
  },

  // ── September 2026 ──
  {
    id: 'evt-008',
    title: 'Mid-Semester Examinations Begin',
    description:
      'Mid-semester examination schedule for all departments. Check portal for individual timetables.',
    date: '2026-09-14',
    startTime: '09:00',
    endTime: '17:00',
    category: 'exam',
    organizer: 'Examination Cell',
    location: 'Respective Departments',
    color: 'rose',
    featured: true,
  },
  {
    id: 'evt-009',
    title: 'TCS CodeVita — Campus Round',
    description:
      'TCS conducts the campus coding round for CodeVita Season 12. Top 50 advance to regionals.',
    date: '2026-09-05',
    startTime: '10:00',
    endTime: '13:00',
    category: 'placement',
    organizer: 'Training & Placement Cell',
    location: 'Computer Lab 1 & 3',
    registrationLink: 'https://codevita.tcs.com',
    color: 'amber',
    featured: true,
  },
  {
    id: 'evt-010',
    title: 'Entrepreneurship Talk — Building Startups in India',
    description:
      'Guest lecture by an IIT-alumni-turned-founder on lean startup methodology and Indian ecosystem.',
    date: '2026-09-10',
    startTime: '15:00',
    endTime: '17:00',
    category: 'workshop',
    organizer: 'E-Cell',
    location: 'Seminar Hall B',
    color: 'sky',
    featured: false,
  },
  {
    id: 'evt-011',
    title: 'Mid-Semester Break',
    description: 'No classes scheduled. Library and labs remain open.',
    date: '2026-09-21',
    startTime: '00:00',
    endTime: '23:59',
    category: 'holiday',
    organizer: 'University Administration',
    location: 'Campus-wide',
    color: 'slate',
    featured: false,
  },

  // ── October 2026 ──
  {
    id: 'evt-012',
    title: 'Gandhi Jayanti',
    description: 'National holiday. Campus closed.',
    date: '2026-10-02',
    startTime: '00:00',
    endTime: '23:59',
    category: 'holiday',
    organizer: 'University Administration',
    location: 'Campus-wide',
    color: 'slate',
    featured: false,
  },
  {
    id: 'evt-013',
    title: 'Infosys Campus Recruitment Drive',
    description:
      'On-campus placement drive for B.Tech & M.Tech final year students. Roles: SDE, Systems Engineer.',
    date: '2026-10-08',
    startTime: '09:00',
    endTime: '18:00',
    category: 'placement',
    organizer: 'Training & Placement Cell',
    location: 'Admin Block Seminar Hall',
    color: 'amber',
    featured: true,
  },
  {
    id: 'evt-014',
    title: 'Persona Fest 2026 — Day 1',
    description:
      'Annual cultural festival. Day 1 features Battle of Bands, stand-up comedy, and art exhibitions.',
    date: '2026-10-15',
    startTime: '10:00',
    endTime: '22:00',
    category: 'club',
    organizer: 'Cultural Committee',
    location: 'Central Grounds & Auditorium',
    color: 'violet',
    featured: true,
  },
  {
    id: 'evt-015',
    title: 'Persona Fest 2026 — Day 2',
    description:
      'Day 2 features DJ night, dance competitions, fashion show, and star-night performance.',
    date: '2026-10-16',
    startTime: '10:00',
    endTime: '23:00',
    category: 'club',
    organizer: 'Cultural Committee',
    location: 'Central Grounds & Auditorium',
    color: 'violet',
    featured: true,
  },
  {
    id: 'evt-016',
    title: 'IoT & Embedded Systems Lab',
    description:
      'Workshop on Arduino, Raspberry Pi, and sensor integration for IoT projects.',
    date: '2026-10-22',
    startTime: '14:00',
    endTime: '17:00',
    category: 'workshop',
    organizer: 'Robotics Club',
    location: 'Electronics Lab',
    registrationLink: 'https://uniconn.edu/iot-workshop',
    color: 'sky',
    featured: false,
  },

  // ── November 2026 ──
  {
    id: 'evt-017',
    title: 'Diwali Vacation',
    description: 'Campus closed for Diwali break.',
    date: '2026-11-02',
    startTime: '00:00',
    endTime: '23:59',
    category: 'holiday',
    organizer: 'University Administration',
    location: 'Campus-wide',
    color: 'slate',
    featured: false,
  },
  {
    id: 'evt-018',
    title: 'Smart India Hackathon — Internal Round',
    description:
      'Internal screening round for SIH 2026. Teams present prototypes to faculty panel.',
    date: '2026-11-12',
    startTime: '09:00',
    endTime: '20:00',
    category: 'academic',
    organizer: 'Innovation Cell',
    location: 'Multi-purpose Hall',
    registrationLink: 'https://sih.gov.in',
    color: 'blue',
    featured: true,
  },
  {
    id: 'evt-019',
    title: 'Inter-College Basketball Tournament',
    description:
      'MIT-ADTU hosts 8 colleges for the annual basketball invitational.',
    date: '2026-11-18',
    startTime: '09:00',
    endTime: '18:00',
    category: 'sports',
    organizer: 'Sports Committee',
    location: 'Indoor Stadium',
    color: 'orange',
    featured: false,
  },
  {
    id: 'evt-020',
    title: 'AWS Cloud Practitioner Workshop',
    description:
      'Prep session for AWS Cloud Practitioner certification. Free vouchers for top 20 scorers.',
    date: '2026-11-25',
    startTime: '10:00',
    endTime: '16:00',
    category: 'workshop',
    organizer: 'AWS Student Club',
    location: 'Seminar Hall A',
    registrationLink: 'https://aws.amazon.com/education',
    color: 'sky',
    featured: false,
  },

  // ── December 2026 ──
  {
    id: 'evt-021',
    title: 'End-Semester Examinations Begin',
    description:
      'Semester-end examinations for odd-semester courses across all departments.',
    date: '2026-12-07',
    startTime: '09:00',
    endTime: '17:00',
    category: 'exam',
    organizer: 'Examination Cell',
    location: 'Respective Departments',
    color: 'rose',
    featured: true,
  },
  {
    id: 'evt-022',
    title: 'Christmas & Winter Break',
    description:
      'Winter vacation begins. Campus reopens January 5, 2027.',
    date: '2026-12-25',
    startTime: '00:00',
    endTime: '23:59',
    category: 'holiday',
    organizer: 'University Administration',
    location: 'Campus-wide',
    color: 'slate',
    featured: false,
  },

  // ── January 2027 ──
  {
    id: 'evt-023',
    title: 'Even Semester Begins',
    description:
      'First day of the even semester. New timetables in effect.',
    date: '2027-01-05',
    startTime: '09:00',
    endTime: '17:00',
    category: 'academic',
    organizer: 'Academic Office',
    location: 'All Departments',
    color: 'blue',
    featured: true,
  },
  {
    id: 'evt-024',
    title: 'Republic Day Celebration',
    description:
      'Flag hoisting, parade by NCC cadets, and cultural programme.',
    date: '2027-01-26',
    startTime: '08:00',
    endTime: '12:00',
    category: 'holiday',
    organizer: 'University Administration',
    location: 'Central Ground',
    color: 'slate',
    featured: true,
  },

  // ── February 2027 ──
  {
    id: 'evt-025',
    title: 'Google STEP Internship — Info Session',
    description:
      'Google recruiters visit campus. Info session on STEP 2027 internship for pre-final year students.',
    date: '2027-02-10',
    startTime: '14:00',
    endTime: '16:00',
    category: 'placement',
    organizer: 'Training & Placement Cell',
    location: 'Auditorium',
    color: 'amber',
    featured: true,
  },
  {
    id: 'evt-026',
    title: 'Blockchain & Web3 Workshop',
    description:
      'Build and deploy your first smart contract on Ethereum using Solidity.',
    date: '2027-02-18',
    startTime: '10:00',
    endTime: '16:00',
    category: 'workshop',
    organizer: 'Blockchain Club',
    location: 'Computer Lab 3',
    registrationLink: 'https://uniconn.edu/web3-workshop',
    color: 'sky',
    featured: false,
  },
  {
    id: 'evt-027',
    title: 'Annual Sports Meet — Day 1',
    description:
      'Track and field events, swimming heats, and opening ceremony.',
    date: '2027-02-22',
    startTime: '07:00',
    endTime: '18:00',
    category: 'sports',
    organizer: 'Sports Committee',
    location: 'University Sports Complex',
    color: 'orange',
    featured: true,
  },

  // ── March 2027 ──
  {
    id: 'evt-028',
    title: 'Philips Core Research — Placement Drive',
    description:
      'On-campus drive for Mechanical and Electrical branches. Roles include R&D Engineer.',
    date: '2027-03-02',
    startTime: '09:00',
    endTime: '17:00',
    category: 'placement',
    organizer: 'Training & Placement Cell',
    location: 'Admin Block',
    color: 'amber',
    featured: false,
  },
  {
    id: 'evt-029',
    title: 'Quantum Computing Seminar',
    description:
      'Invited lecture by Dr. Ananya Rao on recent breakthroughs in quantum error correction.',
    date: '2027-03-15',
    startTime: '11:00',
    endTime: '13:00',
    category: 'research',
    organizer: 'Physics Department',
    location: 'Conference Hall B',
    color: 'emerald',
    featured: false,
  },
  {
    id: 'evt-030',
    title: 'Holi Festival — Campus Celebration',
    description:
      'Organic colors, music, and food stalls. Organized by cultural committee.',
    date: '2027-03-14',
    startTime: '10:00',
    endTime: '15:00',
    category: 'holiday',
    organizer: 'Cultural Committee',
    location: 'Open Air Theatre',
    color: 'slate',
    featured: true,
  },

  // ── April 2027 ──
  {
    id: 'evt-031',
    title: 'End-Semester Examinations — Even Sem',
    description:
      'Final examinations for even-semester courses.',
    date: '2027-04-15',
    startTime: '09:00',
    endTime: '17:00',
    category: 'exam',
    organizer: 'Examination Cell',
    location: 'Respective Departments',
    color: 'rose',
    featured: true,
  },
  {
    id: 'evt-032',
    title: 'Project Expo 2027',
    description:
      'Final year students showcase capstone projects. Industry judges award top innovations.',
    date: '2027-04-28',
    startTime: '10:00',
    endTime: '17:00',
    category: 'academic',
    organizer: 'All Departments',
    location: 'Multi-purpose Hall',
    color: 'blue',
    featured: true,
  },
];

/* ─── API helpers (follows existing mock/api.ts pattern) ─── */
const SIMULATED_DELAY = 150;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const activeEvents = (importedEventsData as CalendarEvent[]).length > 0 
  ? (importedEventsData as CalendarEvent[]) 
  : calendarEvents;

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  await delay(SIMULATED_DELAY);
  return [...activeEvents];
}

export async function getCalendarEventById(
  id: string,
): Promise<CalendarEvent | undefined> {
  await delay(SIMULATED_DELAY);
  return activeEvents.find((e) => e.id === id);
}

export async function getEventsByDate(
  date: string,
): Promise<CalendarEvent[]> {
  await delay(SIMULATED_DELAY);
  return activeEvents.filter((e) => e.date === date);
}

export async function getFeaturedEvents(): Promise<CalendarEvent[]> {
  await delay(SIMULATED_DELAY);
  return activeEvents.filter((e) => e.featured);
}
