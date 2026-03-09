import { useState, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import Feed from '../components/features/feed/Feed';
import { TrendingUp, Target, Briefcase } from 'lucide-react';
import { Card } from '../components/common/Card';
import { LiveActivity } from '../components/features/dashboard/LiveActivity';

const TECH_ITEMS = [
    { cat: 'AI & ML', catColor: 'text-sky-600 bg-sky-50', time: '10m ago', text: 'OpenAI launches Sora: text-to-video era begins with high fidelity.' },
    { cat: 'Market', catColor: 'text-teal-600 bg-teal-50', time: '1h ago', text: 'Nvidia market cap crosses $2T as global AI chip demand peaks.' },
    { cat: 'Web3', catColor: 'text-indigo-600 bg-indigo-50', time: '3h ago', text: 'Ethereum Dencun upgrade goes live on Goerli testnet.' },
    { cat: 'Dev', catColor: 'text-violet-600 bg-violet-50', time: '4h ago', text: 'Rust 2.0 release candidate announced with async trait support.' },
    { cat: 'Cloud', catColor: 'text-emerald-600 bg-emerald-50', time: '5h ago', text: 'AWS announces $10B investment in India cloud infrastructure.' },
    { cat: 'Security', catColor: 'text-rose-600 bg-rose-50', time: '6h ago', text: 'NIST publishes new post-quantum cryptography standards for 2026.' },
    { cat: 'Mobile', catColor: 'text-orange-600 bg-orange-50', time: '8h ago', text: 'Flutter 4.0 ships with native compilation for all desktop platforms.' },
    { cat: 'Data', catColor: 'text-cyan-600 bg-cyan-50', time: '10h ago', text: 'Apache Spark 4.0 introduces real-time ML pipeline orchestration.' },
    { cat: 'AI & ML', catColor: 'text-sky-600 bg-sky-50', time: '12h ago', text: 'Anthropic Claude 4 scores 95% on ARC-AGI reasoning benchmark.' },
    { cat: 'Startup', catColor: 'text-amber-600 bg-amber-50', time: '14h ago', text: 'Indian edtech unicorn raises $200M Series D for AI tutoring.' },
];

const Dashboard = () => {
    const [techIndex, setTechIndex] = useState(0);
    const [techPaused, setTechPaused] = useState(false);
    const visibleCount = 3;

    useEffect(() => {
        if (techPaused) return;
        const interval = setInterval(() => {
            setTechIndex(prev => (prev + 1) % TECH_ITEMS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [techPaused]);

    const getVisibleTech = () => {
        const items = [];
        for (let i = 0; i < visibleCount; i++) {
            items.push(TECH_ITEMS[(techIndex + i) % TECH_ITEMS.length]);
        }
        return items;
    };

    const rightPanel = (
        <div className="flex flex-col gap-4">

                    {/* Live Bulletin */}
                    <LiveActivity />

                    {/* Tech Pulse - Expanded with Auto-Scroll */}
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
                                <span className="text-[7px] font-bold text-slate-300">{techIndex + 1}/{TECH_ITEMS.length}</span>
                                <div className="p-1 bg-sky-50 rounded text-sky-600"><TrendingUp size={10} /></div>
                            </div>
                        </div>

                        <div className="space-y-2.5 min-h-[140px]">
                            {getVisibleTech().map((item, i) => (
                                <div
                                    key={`${techIndex}-${i}`}
                                    className={`cursor-pointer group animate-fade-in ${i > 0 ? 'pt-2 border-t border-slate-50' : ''}`}
                                    style={{ animationDelay: `${i * 80}ms` }}
                                >
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <span className={`text-[7px] font-black ${item.catColor} px-1.5 py-0.5 rounded uppercase`}>{item.cat}</span>
                                        <span className="text-[8px] text-slate-400">{item.time}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-600 font-semibold leading-snug group-hover:text-sky-600 transition-colors">{item.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Progress bar */}
                        <div className="mt-3 h-0.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-sky-400 rounded-full transition-all duration-300"
                                style={{ width: `${((techIndex + 1) / TECH_ITEMS.length) * 100}%` }}
                            />
                        </div>

                        <div className="flex items-center justify-between mt-2">
                            <span className="text-[7px] text-slate-300 font-bold">{techPaused ? 'PAUSED' : 'AUTO-SCROLLING'}</span>
                            <button
                                onClick={() => setTechIndex(prev => (prev + 1) % TECH_ITEMS.length)}
                                className="text-[8px] font-bold text-sky-500 hover:text-sky-600 active:scale-95 transition-all"
                            >
                                Next →
                            </button>
                        </div>
                    </Card>

                    {/* Career Openings */}
                    <Card className="p-4 border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                        <div className="absolute -top-6 -right-6 w-16 h-16 bg-rose-50 blur-2xl rounded-full group-hover:bg-rose-100 transition-colors pointer-events-none" />

                        <div className="flex items-center justify-between mb-3 relative z-10">
                            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                <Target size={11} className="text-rose-500" /> CAREER OPENINGS
                            </h3>
                            <Briefcase size={10} className="text-rose-400" />
                        </div>

                        <div className="space-y-2 relative z-10">
                            {[
                                { type: 'DRIVE', typeColor: 'text-rose-600 bg-rose-50 border-rose-100', when: 'TOMORROW', title: 'Google STEP Intern \'27', desc: 'Off-campus hackathon track' },
                                { type: 'PLACEMENT', typeColor: 'text-sky-600 bg-sky-50 border-sky-100', when: 'MAR 02', title: 'Philips Core Research', desc: 'On-campus drive (Mech/Elec)' },
                                { type: 'REMOTE', typeColor: 'text-teal-600 bg-teal-50 border-teal-100', when: 'LEVEL 1', title: 'Stripe Dev Infrastructure', desc: 'Cloud Platform (Foundational)' },
                            ].map((job, i) => (
                                <div key={i} className="p-2.5 bg-white hover:bg-slate-50/50 rounded-lg border border-slate-50 hover:border-slate-100 transition-all cursor-pointer group/job">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className={`text-[7px] font-black ${job.typeColor} px-1.5 py-0.5 rounded-full border`}>{job.type}</span>
                                        <span className="text-[8px] font-bold text-slate-400">{job.when}</span>
                                    </div>
                                    <h4 className="text-[10px] font-bold text-slate-800 group-hover/job:text-sky-600 transition-colors">{job.title}</h4>
                                    <p className="text-[8px] text-slate-400 font-medium mt-0.5">{job.desc}</p>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-3 py-2 bg-sky-500 hover:bg-sky-600 rounded-lg text-[8px] font-black text-white transition-all uppercase tracking-widest shadow-sm active:scale-95">
                            Browse All Opportunities
                        </button>
                    </Card>

                    {/* Hot Topics */}
                    <Card className="p-4 border-slate-100 shadow-sm opacity-80 hover:opacity-100 transition-opacity">
                        <h3 className="text-[9px] font-black text-slate-400 mb-3 flex items-center gap-1.5 uppercase tracking-widest">
                            <TrendingUp size={11} className="text-sky-500" /> HOT TOPICS
                        </h3>
                        <div className="flex flex-col gap-1.5">
                            {[
                                { title: 'Formula Bharat 2026', meta: '🏆 Team Speedtail wins!' },
                                { title: 'Persona Fest Day 2', meta: 'Star night tonight' },
                                { title: 'Shiv Jayanti Live', meta: 'Happening now @ Gate' },
                                { title: 'Hackathon 2026', meta: '450+ registered' },
                            ].map((item, i) => (
                                <div key={i} className="p-2 bg-slate-50/50 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 cursor-pointer transition-all group active:scale-[0.98]">
                                    <div className="font-bold text-slate-800 mb-0.5 group-hover:text-sky-600 transition-colors text-[9px] truncate">{item.title}</div>
                                    <div className="text-[7px] text-slate-400 font-bold uppercase">{item.meta}</div>
                                </div>
                            ))}
                        </div>
                    </Card>

        </div>
    );

    return (
        <MainLayout rightPanel={rightPanel}>
            <Feed />
        </MainLayout>
    );
};

export default Dashboard;
