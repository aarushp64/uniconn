import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { BadgeCheck, MessageSquare, Heart, Share2, MoreHorizontal } from 'lucide-react';

const Feed = () => {
    return (
        <div className="flex flex-col gap-8 animate-fade-in">
            {/* Welcome Banner */}
            <div className="relative rounded-3xl bg-gradient-to-r from-primary to-primary-dark p-8 md:p-10 text-white overflow-hidden shadow-2xl border border-white/10">
                {/* Decorative Circles */}
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-secondary/20 blur-3xl" />

                <div className="relative z-10">
                    <h1 className="text-3xl font-black mb-2">Welcome back, Pranav! 👋</h1>
                    <p className="text-white/80 text-lg mb-8 max-w-xl">You have 3 new opportunities matching your skills. Keep building your verifiable identity.</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Active Projects', val: '8' },
                            { label: 'Verified Skills', val: '12' },
                            { label: 'Completed Gigs', val: '5' },
                            { label: 'Readiness Score', val: '64%' },
                        ].map(stat => (
                            <div key={stat.label} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
                                <div className="text-2xl font-bold mb-1">{stat.val}</div>
                                <div className="text-xs text-white/70 uppercase tracking-wide font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Feed Header */}
            <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📰</span>
                <h2 className="text-xl font-bold text-white">Campus Activity Feed</h2>
                <span className="text-xs font-bold px-2 py-1 bg-primary/20 text-primary rounded-md ml-auto animate-pulse">LIVE</span>
            </div>

            {/* Feed Items */}
            <div className="flex flex-col gap-6">

                {/* 1. Achievement Post */}
                <Card className="p-0 overflow-hidden border-l-4 border-l-primary">
                    <div className="p-6">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex-center text-white font-bold shrink-0">AR</div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-white flex items-center gap-2">
                                            Arjun Mehta
                                            <BadgeCheck size={16} className="text-success fill-success/20" />
                                        </h3>
                                        <p className="text-sm text-secondary">completed a project • 5 min ago</p>
                                    </div>
                                    <Button variant="ghost" size="sm"><MoreHorizontal size={18} /></Button>
                                </div>

                                <p className="text-text-primary mt-3 leading-relaxed">
                                    🎉 Just completed the <strong>Campus Event Management System</strong> with my team! Big thanks to everyone who contributed.
                                    Check out the live demo!
                                </p>

                                <div className="flex gap-2 mt-4">
                                    {['React', 'Node.js', 'MongoDB'].map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-lg bg-bg-main border border-white/10 text-xs text-secondary font-medium">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 px-6 py-3 flex gap-6 border-t border-white/5">
                        <button className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors font-medium">
                            <Heart size={18} /> Like
                        </button>
                        <button className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors font-medium">
                            <MessageSquare size={18} /> Comment
                        </button>
                        <button className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors font-medium">
                            <Share2 size={18} /> Share
                        </button>
                    </div>
                </Card>

                {/* 2. Opportunity Post (Club) */}
                <Card className="p-6 border-l-4 border-l-yellow-500">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex-center text-white font-bold shrink-0 text-xl">🏛️</div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-yellow-500 uppercase tracking-wider">Announcement</span>
                                        <span className="text-xs text-muted">• 15 min ago</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white">Inter-College Hackathon 2026</h3>
                                    <p className="text-sm text-secondary">Hosted by Coding Club</p>
                                </div>
                            </div>

                            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                <p className="text-secondary mb-4">
                                    🚀 Registrations are now open! Form your teams and register by Jan 20th.
                                    <strong> Prize pool: ₹50,000!</strong>
                                </p>
                                <Button variant="primary" size="sm" className="w-full sm:w-auto">Register Team Now</Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 3. Opportunity Post (Research) */}
                <Card className="p-6 border-l-4 border-l-success">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-emerald-700 flex-center text-white font-bold shrink-0">SM</div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-success uppercase tracking-wider">New Opportunity</span>
                                <span className="text-xs text-muted">• 1 hr ago</span>
                            </div>
                            <h3 className="text-lg font-bold text-white">Research Assistant: IoT Smart Agriculture</h3>
                            <p className="text-sm text-secondary mb-3">Prof. Sharma • ECE Dept</p>

                            <p className="text-secondary leading-relaxed mb-4">
                                Looking for 2 research assistants for my IoT Smart Agriculture project.
                                Python and data analysis skills required.
                            </p>

                            <div className="flex items-center justify-between mt-2">
                                <div className="text-xs font-bold text-white bg-white/10 px-3 py-1 rounded-full">
                                    💰 Stipend: ₹3000/mo
                                </div>
                                <Button variant="outline" size="sm">View Details</Button>
                            </div>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default Feed;
