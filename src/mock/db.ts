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
    id: 'event-5',
    userId: 'student-1',
    title: 'MLOps Pipeline Prototype',
    role: 'AI Engineer',
    date: 'Dec 2026',
    description: 'Prototype MLOps pipeline for automated model training and deployment.',
    tags: ['MLOps', 'Docker', 'CI/CD'],
    award: '⭐ Innovation',
    verificationStatus: 'UNVERIFIED',
    verifierId: null,
  },
  {
    id: 'event-1',
    userId: 'student-1',
    title: 'AI Prompt Optimization Engine',
    role: 'Solo Developer',
    date: 'Oct 2026',
    description: 'System that optimizes prompts based on user intent and structured constraints.',
    tags: ['Prompt Engineering', 'Python', 'NLP'],
    verificationStatus: 'UNVERIFIED',
    verifierId: null,
  },
  {
    id: 'event-2',
    userId: 'student-1',
    title: 'ML Model Deployment API',
    role: 'Backend Engineer',
    date: 'Aug 2026',
    description: 'ML model exposed via FastAPI, Dockerized and deployed.',
    tags: ['FastAPI', 'Docker', 'Rest API'],
    award: '🚀 Deployed',
    verificationStatus: 'VERIFIED',
    verifierId: 'faculty-1',
  },
  {
    id: 'event-4',
    userId: 'student-1',
    title: 'Automated Resume Analyzer',
    role: 'ML Engineer',
    date: 'July 2026',
    description: 'NLP-based resume parser and analyzer. Deployed for student use.',
    tags: ['NLP', 'Python', 'Spacy'],
    award: '✓ Deployed',
    verificationStatus: 'VERIFIED',
    verifierId: 'faculty-1',
  },
  {
    id: 'event-3',
    userId: 'student-1',
    title: 'MERN Stack SaaS Dashboard',
    role: 'Full Stack Developer',
    date: 'May 2026',
    description: 'Full-stack analytics dashboard with authentication and RBAC.',
    tags: ['React', 'Node.js', 'MongoDB'],
    verificationStatus: 'UNVERIFIED',
    verifierId: null,
  },
];

export function findEventById(id: string): TimelineEvent | undefined {
  return timelineEvents.find((event) => event.id === id);
}

