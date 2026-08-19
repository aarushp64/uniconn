import { useState, useEffect } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card } from '../../components/common/Card';
import FacultyFeed from '../../components/features/feed/FacultyFeed';
import { Megaphone, Bell, Info, Award, TrendingUp, ChevronRight } from 'lucide-react';
import { getFacultyBulletins, getFacultyTechPulse, getFacultyStats, type BulletinItem, type TechPulseItem } from '../../mock/facultyApi';
import { useNavigate } from 'react-router-dom';

const FacultyHome = () => {
    const navigate = useNavigate();

    /* ── Live Bulletin ── */
    const [bulletins, setBulletins] = useState<BulletinItem[]>(() => getFacultyBulletins(8));
    const [bulletinIndex, setBulletinIndex] = useState(0);
    const [bulletinPaused, setBulletinPaused] = useState(false);

    /* ── Tech Pulse ── */
    const [techItems, setTechItems] = useState<TechPulseItem[]>(() => getFacultyTechPulse(3));
    const [techPaused, setTechPaused] = useState(false);

    /* ── Quick stats for actions card ── */
    const [pending, setPending] = useState(0);
    const [active, setActive] = useState(0);
    const [openOpps, setOpenOpps] = useState(0);

    useEffect(() => {
        getFacultyStats().then(s => { setPending(s.pendingVerifications); setActive(s.activeStudents); setOpenOpps(s.researchOpportunities); });
    }, []);

    /* Auto-rotate bulletin every 2.5s */
    useEffect(() => {
        if (bulletinPaused || bulletins.length === 0) return;
        const timer = setInterval(() => {
            setBulletinIndex(prev => {
                const next = (prev + 1) % bulletins.length;
                if (next === 0) setBulletins(getFacultyBulletins(8));
                return next;
            });
        }, 2500);
        return () => clearInterval(timer);
    }, [bulletinPaused, bulletins.length]);

    /* Auto-rotate tech pulse every 4s */
    useEffect(() => {
        if (techPaused) return;
        const timer = setInterval(() => {
            setTechItems(getFacultyTechPulse(3));
        }, 4000);
        return () => clearInterval(timer);
    }, [techPaused]);

    const bulletinIcon = (type: BulletinItem['type']) => {
        switch (type) {
            case 'Alert': return { icon: <Bell size={14} className="text-rose-600" />, color: 'bg-rose-50', border: 'border-rose-200', accent: 'text-rose-700' };
            case 'Announcement': return { icon: <Megaphone size={14} className="text-sky-600" />, color: 'bg-sky-50', border: 'border-sky-200', accent: 'text-sky-700' };
            case 'Update': return { icon: <Info size={14} className="text-amber-600" />, color: 'bg-amber-50', border: 'border-amber-200', accent: 'text-amber-700' };
            case 'Achievement': return { icon: <Award size={14} className="text-emerald-600" />, color: 'bg-emerald-50', border: 'border-emerald-200', accent: 'text-emerald-700' };
        }
    };

    const currentBulletin = bulletins[bulletinIndex];
    const nextBulletin = bulletins[(bulletinIndex + 1) % bulletins.length];
    const currentStyle = currentBulletin ? bulletinIcon(currentBulletin.type) : null;
    const nextStyle = nextBulletin ? bulletinIcon(nextBulletin.type) : null;

    const rightPanel = (
        <div className="flex flex-col gap-4">
            {/* Live Bulletin */}
            <Card
                className="p-5 bg-white border-sky-100 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                onMouseEnter={() => setBulletinPaused(true)}
                onMouseLeave={() => setBulletinPaused(false)}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> LIVE BULLETIN
                    </h3>
                    <span className="text-[9px] font-bold text-slate-300 uppercase">
                        {bulletins.length > 0 ? `${bulletinIndex + 1}/${bulletins.length}` : '—'}
                    </span>
                </div>

                {currentBulletin && currentStyle && (
                    <div
                        key={currentBulletin.id}
                        className={`p-4 rounded-xl ${currentStyle.color} border ${currentStyle.border} transition-all duration-500 animate-fade-in cursor-pointer group`}
                        onClick={() => setBulletinIndex(prev => (prev + 1) % bulletins.length)}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="p-1.5 bg-white/80 rounded-lg shadow-sm">{currentStyle.icon}</span>
                            <span className="text-[8px] font-black uppercase tracking-wider text-slate-500">{currentBulletin.type}</span>
                            <ChevronRight size={10} className="ml-auto text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
                        </div>
                        <p className={`text-xs ${currentStyle.accent} font-bold leading-relaxed`}>{currentBulletin.text}</p>
                    </div>
                )}

                {nextBulletin && nextStyle && (
                    <div
                        className="mt-2 p-2.5 rounded-lg bg-slate-50/50 border border-slate-100 flex items-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors opacity-60 hover:opacity-90"
                        onClick={() => setBulletinIndex(prev => (prev + 1) % bulletins.length)}
                    >
                        <span className="p-1 bg-white rounded shadow-sm">{nextStyle.icon}</span>
                        <p className="text-[10px] text-slate-500 font-bold truncate flex-1">{nextBulletin.text}</p>
                    </div>
                )}

                <div className="flex gap-1 justify-center mt-3">
                    {bulletins.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setBulletinIndex(i)}
                            className={`h-1 rounded-full transition-all duration-500 ${i === bulletinIndex ? 'w-5 bg-sky-500' : 'w-1.5 bg-sky-100 hover:bg-sky-200'}`}
                        />
                    ))}
                </div>

                <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-50 blur-2xl rounded-full pointer-events-none" />
            </Card>

            {/* Tech Pulse */}
            <Card
                className="p-4 border-slate-100 shadow-sm hover:shadow-md transition-all"
                onMouseEnter={() => setTechPaused(true)}
                onMouseLeave={() => setTechPaused(false)}
            >
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full bg-sky-500 ${!techPaused ? 'animate-pulse' : ''} shadow-[0_0_6px_rgba(14,165,233,0.5)]`} /> TECH PULSE
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-[7px] font-bold text-slate-300">{techPaused ? 'PAUSED' : 'LIVE'}</span>
                        <div className="p-1 bg-sky-50 rounded text-sky-600"><TrendingUp size={10} /></div>
                    </div>
                </div>

                <div className="space-y-2.5 min-h-[140px]">
                    {techItems.map((item, i) => (
                        <div
                            key={item.id}
                            className={`cursor-pointer group animate-fade-in ${i > 0 ? 'pt-2 border-t border-slate-50' : ''}`}
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <span className={`text-[7px] font-black ${item.catColor} px-1.5 py-0.5 rounded uppercase`}>{item.category}</span>
                                <span className="text-[8px] text-slate-400">{item.timeAgo}</span>
                            </div>
                            <p className="text-[10px] text-slate-600 font-semibold leading-snug group-hover:text-sky-600 transition-colors">{item.text}</p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-3">
                    <span className="text-[7px] text-slate-300 font-bold">{techPaused ? 'PAUSED' : 'AUTO-REFRESHING'}</span>
                    <button
                        onClick={() => setTechItems(getFacultyTechPulse(3))}
                        className="text-[8px] font-bold text-sky-500 hover:text-sky-600 active:scale-95 transition-all"
                    >
                        Refresh →
                    </button>
                </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-4 border-slate-100 shadow-sm">
                <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <TrendingUp size={11} className="text-sky-500" /> QUICK ACTIONS
                </h3>
                <div className="space-y-1.5">
                    {[
                        { label: 'Review Verifications', desc: `${pending} pending`, path: '/faculty/verifications' },
                        { label: 'Manage Students', desc: `${active} active`, path: '/faculty/students' },
                        { label: 'Workspace Listings', desc: `${openOpps} open`, path: '/faculty/opportunities' },
                    ].map((action, i) => (
                        <div
                            key={i}
                            onClick={() => navigate(action.path)}
                            className="p-2.5 bg-slate-50/50 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 cursor-pointer transition-all group active:scale-[0.98]"
                        >
                            <div className="font-bold text-slate-800 mb-0.5 group-hover:text-sky-600 transition-colors text-[9px] truncate">{action.label}</div>
                            <div className="text-[7px] text-slate-400 font-bold uppercase">{action.desc}</div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );

    return (
        <MainLayout rightPanel={rightPanel}>
            <FacultyFeed />
        </MainLayout>
    );
};

export default FacultyHome;
