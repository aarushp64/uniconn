import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/common/Card';
import { ShieldCheck, Rocket, BookOpen, Briefcase, TrendingUp, ArrowRight, Star, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const statCards = [
        { label: 'Verified Projects', value: 5, icon: <ShieldCheck size={20} />, color: 'text-emerald-600 bg-emerald-50', border: 'border-emerald-100' },
        { label: 'Skill Score', value: 82, icon: <TrendingUp size={20} />, color: 'text-sky-600 bg-sky-50', border: 'border-sky-100' },
        { label: 'Applications', value: 3, icon: <Briefcase size={20} />, color: 'text-violet-600 bg-violet-50', border: 'border-violet-100' },
        { label: 'Courses Active', value: 6, icon: <BookOpen size={20} />, color: 'text-amber-600 bg-amber-50', border: 'border-amber-100' },
    ];

    const recentProjects = [
        { title: 'AI Crop Disease Detector', status: 'Verified', statusColor: 'text-emerald-600 bg-emerald-50', skills: ['Python', 'TensorFlow', 'OpenCV'], mentor: 'Dr. Meera Joshi' },
        { title: 'Smart Campus IoT Dashboard', status: 'Under Review', statusColor: 'text-amber-600 bg-amber-50', skills: ['React', 'Node.js', 'MQTT'], mentor: 'Dr. Rajesh Patil' },
        { title: 'NLP Chatbot for Student FAQs', status: 'Verified', statusColor: 'text-emerald-600 bg-emerald-50', skills: ['Python', 'LangChain', 'FastAPI'], mentor: 'Dr. Priya Deshmukh' },
    ];

    const upcomingDeadlines = [
        { title: 'Microsoft SDE Intern Application', date: 'Feb 28', type: 'Placement', typeColor: 'text-sky-600 bg-sky-50' },
        { title: 'IEEE Research Paper Submission', date: 'Mar 05', type: 'Research', typeColor: 'text-emerald-600 bg-emerald-50' },
        { title: 'GDSC Flutter Workshop', date: 'Mar 08', type: 'Workshop', typeColor: 'text-teal-600 bg-teal-50' },
        { title: 'Smart India Hackathon Finals', date: 'Mar 15', type: 'Event', typeColor: 'text-rose-600 bg-rose-50' },
    ];

    const skillProgress = [
        { skill: 'Data Structures & Algorithms', level: 78, color: 'bg-sky-500' },
        { skill: 'Machine Learning', level: 65, color: 'bg-emerald-500' },
        { skill: 'Web Development', level: 88, color: 'bg-violet-500' },
        { skill: 'System Design', level: 42, color: 'bg-amber-500' },
    ];

    return (
        <MainLayout>
            <div className="flex flex-col gap-6 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-xl font-bold text-slate-900 mb-1">Student Dashboard</h1>
                    <p className="text-xs text-slate-500">Welcome back, Aarush — here is your academic overview</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {statCards.map((stat, i) => (
                        <Card key={i} className={`p-4 border ${stat.border} hover:shadow-md transition-all cursor-pointer`}>
                            <div className="flex items-center justify-between mb-3">
                                <div className={`p-2 rounded-xl ${stat.color}`}>{stat.icon}</div>
                            </div>
                            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</p>
                        </Card>
                    ))}
                </div>

                {/* Two Column: Recent Projects + Skill Progress */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Recent Projects */}
                    <Card className="p-5 border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                <Rocket size={16} className="text-sky-500" /> Recent Projects
                            </h2>
                            <button onClick={() => navigate('/projects')} className="text-[10px] font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                                View All <ArrowRight size={12} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {recentProjects.map((proj, i) => (
                                <div key={i} className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                                    <div className="flex items-start justify-between mb-1.5">
                                        <p className="text-xs font-bold text-slate-800">{proj.title}</p>
                                        <span className={`text-[8px] font-bold ${proj.statusColor} px-1.5 py-0.5 rounded-full`}>{proj.status}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mb-2">Mentor: {proj.mentor}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {proj.skills.map(s => (
                                            <span key={s} className="text-[8px] font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Skill Progress */}
                    <Card className="p-5 border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                <Star size={16} className="text-amber-500" /> Skill Progress
                            </h2>
                            <button onClick={() => navigate('/ai-insights')} className="text-[10px] font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                                AI Insights <ArrowRight size={12} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {skillProgress.map((item, i) => (
                                <div key={i}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <p className="text-[11px] font-semibold text-slate-700">{item.skill}</p>
                                        <span className="text-[10px] font-bold text-slate-500">{item.level}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.level}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Upcoming Deadlines */}
                <Card className="p-5 border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <Target size={16} className="text-rose-500" /> Upcoming Deadlines
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {upcomingDeadlines.map((item, i) => (
                            <div key={i} className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-[8px] font-bold ${item.typeColor} px-1.5 py-0.5 rounded-full`}>{item.type}</span>
                                    <span className="text-[10px] font-bold text-slate-400">{item.date}</span>
                                </div>
                                <p className="text-[11px] font-bold text-slate-800">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </MainLayout>
    );
};

export default Dashboard;
