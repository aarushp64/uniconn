/* ─── Types ─── */
export interface TimelineEvent {
  id: string;
  userId: string;
  title: string;
  description: string;
  date: string;
  type: 'project' | 'achievement' | 'club' | 'course';
  verificationStatus: 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
  verifierId?: string;
  role?: string;
  tags?: string[];
  award?: string;
}

/* ─── In-memory data ─── */
const timelineEvents: TimelineEvent[] = [
  { id: 'e1', userId: 'u1', title: 'Campus Event System', description: 'Built full-stack MERN event management app', date: '2025-09-15', type: 'project', verificationStatus: 'VERIFIED', role: 'Full Stack Developer', tags: ['React', 'Node.js', 'MongoDB'] },
  { id: 'e2', userId: 'u1', title: 'Smart India Hackathon', description: 'Won 1st place with AI crop disease detector', date: '2025-11-20', type: 'achievement', verificationStatus: 'VERIFIED', role: 'Team Lead', tags: ['AI', 'Python', 'TensorFlow'], award: '1st Place' },
  { id: 'e3', userId: 'u1', title: 'GDSC Core Team', description: 'Selected as Flutter Lead for GDSC MIT ADTU', date: '2025-08-01', type: 'club', verificationStatus: 'PENDING', verifierId: 'faculty-1', role: 'Flutter Lead', tags: ['Flutter', 'Dart', 'Firebase'] },
  { id: 'e4', userId: 'u1', title: 'AI/ML Specialization', description: 'Completed Stanford ML course on Coursera', date: '2026-01-10', type: 'course', verificationStatus: 'UNVERIFIED', role: 'Student', tags: ['Machine Learning', 'Python'] },
];

function findEventById(id: string): TimelineEvent | undefined {
  return timelineEvents.find(e => e.id === id);
}

/* ─── API helpers ─── */
const SIMULATED_DELAY = 150;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getTimelineEvents(userId: string): Promise<TimelineEvent[]> {
  await delay(SIMULATED_DELAY);
  return timelineEvents.filter((event) => event.userId === userId);
}

export async function requestVerification(eventId: string, verifierId: string): Promise<TimelineEvent | undefined> {
  await delay(SIMULATED_DELAY);
  const event = findEventById(eventId);
  if (!event) return undefined;
  if (event.verificationStatus === 'UNVERIFIED' || event.verificationStatus === 'REJECTED') {
    event.verificationStatus = 'PENDING';
    event.verifierId = verifierId;
  }
  return event;
}

export async function getPendingVerifications(verifierId: string): Promise<TimelineEvent[]> {
  await delay(SIMULATED_DELAY);
  return timelineEvents.filter(
    (event) => event.verifierId === verifierId && event.verificationStatus === 'PENDING',
  );
}

export async function verifyEvent(eventId: string): Promise<TimelineEvent | undefined> {
  await delay(SIMULATED_DELAY);
  const event = findEventById(eventId);
  if (!event) return undefined;
  event.verificationStatus = 'VERIFIED';
  return event;
}

export async function rejectEvent(eventId: string): Promise<TimelineEvent | undefined> {
  await delay(SIMULATED_DELAY);
  const event = findEventById(eventId);
  if (!event) return undefined;
  event.verificationStatus = 'REJECTED';
  return event;
}
