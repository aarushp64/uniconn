import { Card } from '../../common/Card';
import { TrendingUp, Eye, MousePointerClick } from 'lucide-react';

export const StatsWidget = () => {
    return (
        <Card className="p-5 bg-gradient-to-br from-bg-card to-bg-elevated border-primary/20">
            <h3 className="text-sm font-medium text-muted mb-4">Weekly Engagement</h3>
            <div className="flex justify-between items-end">
                <div>
                    <div className="text-3xl font-black text-white">2.4k</div>
                    <div className="text-xs text-success flex items-center gap-1 mt-1">
                        <TrendingUp size={12} /> +12.5%
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="h-8 w-1 bg-white/10 rounded-full" />
                    <div className="h-8 w-1 bg-white/10 rounded-full" />
                    <div className="h-8 w-1 bg-primary/20 rounded-full" />
                    <div className="h-8 w-1 bg-primary/40 rounded-full" />
                    <div className="h-8 w-1 bg-primary/60 rounded-full" />
                    <div className="h-8 w-1 bg-primary rounded-full animate-pulse" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5">
                <div className="flex flex-col">
                    <span className="text-xs text-muted flex items-center gap-1"><Eye size={12} /> Profile Views</span>
                    <span className="text-lg font-bold text-white">842</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-muted flex items-center gap-1"><MousePointerClick size={12} /> Project Clicks</span>
                    <span className="text-lg font-bold text-white">128</span>
                </div>
            </div>
        </Card>
    );
};
