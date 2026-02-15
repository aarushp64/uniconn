export type VerificationStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';

export type TimelineEvent = {
  id: string;
  userId: string;
  title: string;
  role: string;
  date: string;
  description: string;
  tags: string[]; // skills or technologies demonstrated
  award?: string;
  verificationStatus: VerificationStatus;
  verifierId?: string | null;
};

// Simple in-memory store for demo purposes only.
// NOTE: This state is reset on full page reload (intended for prototype).
export const timelineEvents: TimelineEvent[] = [
  {
    id: 'event-1',
    userId: 'student-1',
    title: 'Campus Events Platform',
    role: 'Lead Developer',
    date: 'Oct 2026',
    description: 'Full-stack MERN app for college events. 500+ users.',
    tags: ['React.js', 'Node.js'],
    award: '🏆 Best Project',
    verificationStatus: 'UNVERIFIED',
    verifierId: null,
  },
  {
    id: 'event-2',
    userId: 'student-1',
    title: 'IoT Research Assistant',
    role: 'Data Analyst',
    date: 'Aug 2026',
    description: 'Analyzed sensor data for Prof. Sharma. Published report.',
    tags: ['Python', 'Pandas', 'Data Analysis'],
    award: '✓ Published',
    verificationStatus: 'VERIFIED',
    verifierId: 'faculty-1',
  },
  {
    id: 'event-3',
    userId: 'student-1',
    title: 'Smart India Hackathon',
    role: 'Team Lead',
    date: 'July 2026',
    description: 'Built AI attendance system. 2nd Runner Up.',
    tags: ['Python', 'Machine Learning'],
    award: '🥈 2nd Place',
    verificationStatus: 'VERIFIED',
    verifierId: 'faculty-1',
  },
];

export function findEventById(id: string): TimelineEvent | undefined {
  return timelineEvents.find((event) => event.id === id);
}

