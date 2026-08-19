import { useState, useEffect } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { ClipboardCheck, Users, FlaskConical, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { getFacultyStats, getVerificationRequests, getSupervisedStudents, type FacultyStats, type VerificationRequest, type SupervisedStudent } from '../../mock/facultyApi';
import { useNavigate } from 'react-router-dom';

const FacultyDashboard = () => {
    const [stats, setStats] = useState<FacultyStats | null>(null);
    const [recentRequests, setRecentRequests] = useState<VerificationRequest[]>([]);
    const [topStudents, setTopStudents] = useState<SupervisedStudent[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getFacultyStats().then(setStats);
        getVerificationRequests().then(r => setRecentRequests(r.filter(v => v.status === 'PENDING').slice(0, 3)));
        getSupervisedStudents().then(s => setTopStudents(s.sort((a, b) => b.readinessScore - a.readinessScore).slice(0, 4)));
    }, []);

    const statCards = stats ? [
        { label: 'Pending Verifications', value: stats.pendingVerifications, icon: <ClipboardCheck size={20} />, color: 'text-amber-600 bg-amber-50', border: 'border-amber-100' },
        { label: 'Active Students', value: stats.activeStudents, icon: <Users size={20} />, color: 'text-sky-600 bg-sky-50', border: 'border-sky-100' },
        { label: 'Workspace Listings', value: stats.researchOpportunities, icon: <FlaskConical size={20} />, color: 'text-emerald-600 bg-emerald-50', border: 'border-emerald-100' },
        { label: 'Verified This Month', value: stats.verifiedThisMonth, icon: <ShieldCheck size={20} />, color: 'text-violet-600 bg-violet-50', border: 'border-violet-100' },
    ] : [];

    return (
        <MainLayout>
            <div className="flex flex-col gap-6 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-xl font-bold text-slate-900 mb-1">Faculty Dashboard</h1>
                    <p className="text-xs text-slate-500">Welcome back, Dr. Patil — here's your overview</p>
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

                {/* Two Column: Recent Requests + Top Students */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Recent Verification Requests */}
                    <Card className="p-5 border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                <Clock size={16} className="text-amber-500" /> Recent Requests
                            </h2>
                            <button onClick={() => navigate('/faculty/verifications')} className="text-[10px] font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                                View All <ArrowRight size={12} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {recentRequests.map(req => (
                                <div key={req.id} className="p-3 bg-slate-50/80 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all cursor-pointer" onClick={() => navigate('/faculty/verifications')}>
                                    <div className="flex items-start justify-between mb-1.5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-teal-400 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                                                {req.studentAvatar}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{req.studentName}</p>
                                                <p className="text-[10px] text-slate-400">{req.studentDept} • Year {req.studentYear}</p>
                                            </div>
                                        </div>
                                        <Badge variant="warning" className="text-[8px]">PENDING</Badge>
                                    </div>
                                    <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-1">{req.projectTitle}</p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {req.skills.slice(0, 3).map(s => (
                                            <span key={s} className="text-[8px] font-bold text-sky-600 bg-sky-50 dark:bg-sky-900/40 dark:text-sky-300 px-1.5 py-0.5 rounded">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {recentRequests.length === 0 && (
                                <p className="text-xs text-slate-400 text-center py-6">No pending requests</p>
                            )}
                        </div>
                    </Card>

                    {/* Top Students */}
                    <Card className="p-5 border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                <Users size={16} className="text-sky-500" /> Top Students
                            </h2>
                            <button onClick={() => navigate('/faculty/students')} className="text-[10px] font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                                View All <ArrowRight size={12} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {topStudents.map(student => (
                                <div key={student.id} className="p-3 bg-slate-50/80 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all cursor-pointer" onClick={() => navigate('/faculty/students')}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-pink-400 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                                                {student.avatar}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{student.name}</p>
                                                <p className="text-[10px] text-slate-400">{student.department} • Year {student.year}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-slate-900 dark:text-slate-100">{student.readinessScore}%</p>
                                            <p className="text-[8px] text-slate-400 font-bold">READINESS</p>
                                        </div>
                                    </div>
                                    {student.currentProject && (
                                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-2 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded">
                                            Working on: {student.currentProject}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
};

export default FacultyDashboard;
