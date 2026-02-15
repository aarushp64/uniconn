import { MainLayout } from '../components/layout/MainLayout';
import Feed from '../components/features/feed/Feed';
import { Sparkles, TrendingUp, Users } from 'lucide-react';
import { Card } from '../components/common/Card';
import { StatsWidget } from '../components/features/dashboard/StatsWidget';
import { LiveActivity } from '../components/features/dashboard/LiveActivity';

const Dashboard = () => {
    return (
        <MainLayout>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 pb-10">

                {/* Main Feed Column */}
                <div>
                    <Feed />
                </div>

                {/* Right Sidebar - AI Bulletin */}
                <div className="hidden lg:flex flex-col gap-6 sticky top-24 h-fit">

                    {/* Stats Widget */}
                    <StatsWidget />

                    {/* Live Activity */}
                    <LiveActivity />

                    {/* AI Insights */}
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-2xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 blur-2xl rounded-full -mr-10 -mt-10"></div>
                        <div className="flex items-center gap-2 mb-4 text-primary font-bold relative z-10">
                            <Sparkles size={20} /> AI Insight
                        </div>
                        <p className="text-sm text-secondary leading-relaxed mb-3 relative z-10">
                            Based on your interest in <strong>AI</strong> and recent Python certifications, you are a <strong>92% match</strong> for the new Research Assistant role with Prof. Sharma.
                        </p>
                        <button className="text-xs font-bold text-white bg-primary px-3 py-2 rounded-lg w-full hover:bg-primary-dark transition-colors relative z-10">
                            View Opportunity
                        </button>
                    </div>

                    <Card className="p-5">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <TrendingUp size={18} className="text-secondary" /> Trending
                        </h3>
                        <div className="flex flex-col gap-3 text-sm">
                            {[
                                { title: 'Hackathon 2026', meta: '450 registered' },
                                { title: 'Web3 Workshop', meta: 'Tomorrow, 10 AM' },
                                { title: 'Placement Drive', meta: 'Starts next week' }
                            ].map((item, i) => (
                                <div key={i} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors group">
                                    <div className="font-semibold text-white mb-1 group-hover:text-primary transition-colors">{item.title}</div>
                                    <div className="text-xs text-muted">{item.meta}</div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-5">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Users size={18} className="text-accent" /> Network
                        </h3>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full bg-white/10 flex-center text-xs font-bold ring-2 ring-bg-card -ml-2 first:ml-0 hover:z-10 relative cursor-pointer hover:scale-110 transition-transform bg-gradient-to-br from-gray-700 to-gray-800">
                                    U{i}
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex-center text-xs font-bold text-primary ring-2 ring-bg-card -ml-2 z-0">
                                +12
                            </div>
                        </div>
                        <p className="text-xs text-muted mt-3">12 connections active now</p>
                    </Card>

                </div>

            </div>


        </MainLayout >
    );
};

export default Dashboard;
