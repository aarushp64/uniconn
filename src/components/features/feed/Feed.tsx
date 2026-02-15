import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { BadgeCheck, MessageSquare, Heart, Share2, MoreHorizontal, Code, ThumbsUp } from 'lucide-react';

const Feed = () => {
    return (
        <div className="flex flex-col gap-8 animate-fade-in">
            {/* Welcome Banner */}
            <div className="relative rounded-3xl bg-gradient-to-r from-primary to-primary-dark p-8 md:p-10 text-white overflow-hidden shadow-2xl border border-white/10 group">
                {/* Decorative Circles */}
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/10 blur-3xl group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-secondary/20 blur-3xl group-hover:scale-110 transition-transform duration-700" />

                <div className="relative z-10">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-black mb-2">Welcome back, Aarush! 👋</h1>
                            <p className="text-white/80 text-lg mb-8 max-w-xl">You have <strong>3 new opportunities</strong> matching your AI Systems Engineer profile. Keep building!</p>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col items-center">
                                <span className="text-xs text-white/70 uppercase font-bold tracking-wider">Daily Streak</span>
                                <span className="text-3xl font-black text-white mt-1">12 🔥</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Active Projects', val: '8' },
                            { label: 'Verified Skills', val: '13' },
                            { label: 'Completed Gigs', val: '5' },
                            { label: 'Readiness Score', val: '72%' },
                        ].map(stat => (
                            <div key={stat.label} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-colors cursor-pointer">
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
                <div className="ml-auto flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-1 bg-primary/20 text-primary rounded-md animate-pulse">LIVE</span>
                </div>
            </div>

            {/* Feed Items */}
            <div className="flex flex-col gap-6">

                {/* 1. Achievement Post - Visual & Rich */}
                <Card className="p-0 overflow-hidden border-l-4 border-l-primary hover:border-l-8 transition-all duration-300">
                    <div className="p-6">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex-center text-white font-bold shrink-0 shadow-lg shadow-primary/20">AP</div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-white flex items-center gap-2">
                                            Aarush Parate
                                            <BadgeCheck size={16} className="text-success fill-success/20" />
                                        </h3>
                                        <p className="text-sm text-secondary">deployed a new project • 2 hrs ago</p>
                                    </div>
                                    <Button variant="ghost" size="sm"><MoreHorizontal size={18} /></Button>
                                </div>

                                <p className="text-gray-300 mt-3 leading-relaxed">
                                    🚀 Just deployed my <strong>MLOps Pipeline Prototype</strong>! It automates the entire model training and deployment lifecycle using Docker and CI/CD.
                                    <br /><br />
                                    Check out the architecture below! 👇
                                </p>

                                {/* Mock Rich Content - "Image" */}
                                <div className="mt-4 rounded-xl bg-black/40 border border-white/10 p-1 overflow-hidden group/image cursor-pointer">
                                    <div className="h-48 rounded-lg bg-gradient-to-br from-gray-900 to-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover/image:opacity-50 transition-opacity"></div>
                                        <div className="z-10 bg-black/50 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                                            <div className="flex items-center gap-2 text-white font-mono text-sm">
                                                <Code size={16} className="text-accent" /> pipeline.yml
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-4 flex-wrap">
                                    {['MLOps', 'Docker', 'CI/CD', 'Python'].map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-secondary font-medium hover:bg-white/10 transition-colors cursor-pointer">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 px-6 py-3 flex gap-6 border-t border-white/5">
                        <button className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors font-medium group/btn">
                            <Heart size={18} className="group-hover/btn:fill-primary group-hover/btn:scale-110 transition-transform" /> 24 Likes
                        </button>
                        <button className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors font-medium">
                            <MessageSquare size={18} /> 5 Comments
                        </button>
                        <button className="flex items-center gap-2 text-sm text-secondary hover:text-white transition-colors font-medium ml-auto">
                            <Share2 size={18} /> Share
                        </button>
                    </div>
                </Card>

                {/* 2. Community Question - Interactive */}
                <Card className="p-6 border-l-4 border-l-purple-500">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex-center text-white font-bold shrink-0 text-lg">JS</div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-white">Jiya Sharma</h3>
                                    <p className="text-sm text-secondary">asked a question • 30 min ago</p>
                                </div>
                            </div>

                            <h4 className="text-lg font-bold text-white mt-2">Best resources for defined Advanced NLP? 📚</h4>
                            <p className="text-secondary mt-1 text-sm">
                                I'm starting with Transformers but getting stuck on the math part. Any interactive visual guides recommended?
                            </p>

                            <div className="mt-4 space-y-2">
                                <div className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer flex justify-between items-center group">
                                    <span className="text-sm text-gray-300">Jayalammar's Blog is great!</span>
                                    <div className="flex items-center gap-1 text-xs text-muted group-hover:text-primary">
                                        <ThumbsUp size={12} /> 12
                                    </div>
                                </div>
                                <div className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer flex justify-between items-center group">
                                    <span className="text-sm text-gray-300">Try HuggingFace Course</span>
                                    <div className="flex items-center gap-1 text-xs text-muted group-hover:text-primary">
                                        <ThumbsUp size={12} /> 8
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <input
                                        type="text"
                                        placeholder="Add your recommendation..."
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>


                {/* 3. Upcoming Event - Call to Action */}
                <Card className="p-6 border-l-4 border-l-secondary relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -mr-8 -mt-8"></div>

                    <div className="flex gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-teal-700 flex-center text-white font-bold shrink-0 text-xl shadow-lg shadow-secondary/20">📅</div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">Happening Tomorrow</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white">GenAI Workshop: From Zero to RAG</h3>
                                    <p className="text-sm text-secondary">Hosted by AI Club • 10:00 AM @ Main Audi</p>
                                </div>
                                <div className="text-center bg-white/5 p-2 rounded-lg border border-white/10">
                                    <div className="text-xs text-muted uppercase">OCT</div>
                                    <div className="text-xl font-black text-white">24</div>
                                </div>
                            </div>

                            <p className="text-secondary mt-3 text-sm">
                                Hands-on workshop where we build a naive RAG pipeline using LangChain. Bring your laptops!
                                <br />
                                <strong>Prerequisites:</strong> Python Basics, OpenAI API Key (optional)
                            </p>

                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className={`w-8 h-8 rounded-full border-2 border-bg-card bg-gray-700 flex-center text-[10px] text-white`}>
                                            U{i}
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-bg-card bg-secondary/20 flex-center text-[10px] text-secondary font-bold">
                                        +42
                                    </div>
                                </div>
                                <div className="text-xs text-muted"><strong>46 students</strong> registered</div>
                                <Button variant="primary" size="sm" className="ml-auto">Register Now</Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 4. Community Poll */}
                <Card className="p-6 border-l-4 border-l-pink-500">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex-center text-white font-bold shrink-0 text-xl">📊</div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-white">Quick Poll: Weekend Hackathon Theme?</h3>
                            <p className="text-sm text-secondary mb-4">Helping the club decide the theme for next week.</p>

                            <div className="space-y-3">
                                <div className="relative h-10 bg-white/5 rounded-lg overflow-hidden cursor-pointer group">
                                    <div className="absolute top-0 left-0 h-full bg-pink-500/20 w-[45%]"></div>
                                    <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                                        <span className="text-sm font-medium text-white">AI for Social Good</span>
                                        <span className="text-xs text-white/70">45%</span>
                                    </div>
                                </div>
                                <div className="relative h-10 bg-white/5 rounded-lg overflow-hidden cursor-pointer group">
                                    <div className="absolute top-0 left-0 h-full bg-pink-500/20 w-[30%]"></div>
                                    <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                                        <span className="text-sm font-medium text-white">Web3 & DeFi</span>
                                        <span className="text-xs text-white/70">30%</span>
                                    </div>
                                </div>
                                <div className="relative h-10 bg-white/5 rounded-lg overflow-hidden cursor-pointer group">
                                    <div className="absolute top-0 left-0 h-full bg-pink-500/20 w-[25%]"></div>
                                    <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                                        <span className="text-sm font-medium text-white">GameDev</span>
                                        <span className="text-xs text-white/70">25%</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-muted mt-3">142 votes • Ends in 2 hours</p>
                        </div>
                    </div>
                </Card>

                {/* 5. Collab Request */}
                <Card className="p-6 border-l-4 border-l-blue-500">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex-center text-white font-bold shrink-0 text-xl">🤝</div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">COLLAB REQUEST</span>
                            </div>
                            <h3 className="text-lg font-bold text-white">Looking for a UI/UX Designer</h3>
                            <p className="text-secondary mt-1 text-sm leading-relaxed">
                                We are building **CampuSync**, a centralized platform for campus logistics.
                                We have the backend ready (Node/Postgres) but need someone to design the mobile app.
                            </p>
                            <div className="flex gap-2 mt-3">
                                <span className="px-2 py-1 bg-white/5 rounded text-xs text-secondary">Figma</span>
                                <span className="px-2 py-1 bg-white/5 rounded text-xs text-secondary">Mobile Design</span>
                            </div>
                            <div className="mt-4 flex gap-3">
                                <Button variant="primary" size="sm">I'm Interested</Button>
                                <Button variant="ghost" size="sm">View Project</Button>
                            </div>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default Feed;
