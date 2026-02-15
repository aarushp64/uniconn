import { Card } from '../../common/Card';
import { Zap } from 'lucide-react';

export const LiveActivity = () => {
    const activities = [
        { user: 'Sneha R.', action: 'deployed', target: 'CryptoTracker', time: '2m ago' },
        { user: 'Rahul K.', action: 'joined', target: 'AI Research Group', time: '5m ago' },
        { user: 'Priya M.', action: 'asked', target: 'System Design Question', time: '12m ago' },
        { user: 'Arjun S.', action: 'forked', target: 'uniconn-frontend', time: '1h ago' },
    ];

    return (
        <Card className="p-4">
            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                <Zap size={16} className="text-yellow-400" /> Live Campus
            </h3>
            <div className="space-y-4">
                {activities.map((act, i) => (
                    <div key={i} className="flex gap-3 text-sm items-start">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0 animate-pulse" />
                        <div>
                            <span className="font-semibold text-white">{act.user}</span>
                            <span className="text-muted"> {act.action} </span>
                            <span className="text-secondary">{act.target}</span>
                            <div className="text-[10px] text-muted opacity-60 mt-0.5">{act.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
