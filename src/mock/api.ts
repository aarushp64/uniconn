import { findEventById, timelineEvents, type TimelineEvent } from './db';

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

  // Only move UNVERIFIED or REJECTED events into PENDING
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

export type { TimelineEvent } from './db';

