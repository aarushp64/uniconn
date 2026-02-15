import { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { getPendingVerifications, rejectEvent, verifyEvent, type TimelineEvent } from '../mock/api';

const VERIFIER_ID = 'faculty-1';

const VerifyQueue = () => {
  const [pending, setPending] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [actingId, setActingId] = useState<string | null>(null);

  const loadPending = async () => {
    setLoading(true);
    try {
      const items = await getPendingVerifications(VERIFIER_ID);
      setPending(items);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPending();
  }, []);

  const handleVerify = async (eventId: string) => {
    setActingId(eventId);
    try {
      await verifyEvent(eventId);
      setPending((prev) => prev.filter((e) => e.id !== eventId));
    } finally {
      setActingId(null);
    }
  };

  const handleReject = async (eventId: string) => {
    setActingId(eventId);
    try {
      await rejectEvent(eventId);
      setPending((prev) => prev.filter((e) => e.id !== eventId));
    } finally {
      setActingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-darker text-primary flex-center p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-white mb-6">Pending Verifications</h1>
        <p className="text-secondary mb-8">
          Review and verify student activities assigned to you.
        </p>

        <Card className="p-6">
          {loading && pending.length === 0 && (
            <div className="text-secondary text-sm">Loading pending verifications...</div>
          )}
          {!loading && pending.length === 0 && (
            <div className="text-secondary text-sm">No pending verifications at the moment.</div>
          )}

          <div className="space-y-4">
            {pending.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 p-5 rounded-2xl border border-white/5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm text-primary font-semibold">{item.date}</div>
                    <h2 className="text-lg font-bold text-white">{item.title}</h2>
                    <p className="text-secondary text-sm">{item.role}</p>
                  </div>
                </div>
                <p className="text-muted text-sm leading-relaxed">{item.description}</p>

                <div className="flex flex-wrap gap-2 items-center">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.award && (
                    <span className="ml-auto px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20">
                      {item.award}
                    </span>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReject(item.id)}
                    disabled={actingId === item.id}
                  >
                    {actingId === item.id ? 'Rejecting...' : 'Reject'}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleVerify(item.id)}
                    disabled={actingId === item.id}
                  >
                    {actingId === item.id ? 'Verifying...' : 'Verify'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VerifyQueue;

