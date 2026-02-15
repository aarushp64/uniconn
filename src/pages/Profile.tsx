import { useEffect, useState } from 'react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Mail, MapPin, GraduationCap, Building2, Download, Share2, Settings } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { getTimelineEvents, requestVerification, type TimelineEvent } from '../mock/api';

const STUDENT_ID = 'student-1';

const loadEvents = async (studentId: string) => getTimelineEvents(studentId);

const Profile = () => {
    const [events, setEvents] = useState<TimelineEvent[]>([]);
    const [loadingTimeline, setLoadingTimeline] = useState(false);
    const [requestingIds, setRequestingIds] = useState<Record<string, boolean>>({});

    useEffect(() => {
        let isMounted = true;
        const load = async () => {
            setLoadingTimeline(true);
            try {
                const data = await loadEvents(STUDENT_ID);
                if (isMounted) setEvents(data);
            } finally {
                if (isMounted) setLoadingTimeline(false);
            }
        };
        load();
        return () => { isMounted = false; };
    }, []);

    const handleRequestVerification = async (eventId: string) => {
        setRequestingIds((prev) => ({ ...prev, [eventId]: true }));
        try {
            const updated = await requestVerification(eventId, 'faculty-1');
            if (!updated) return;
            setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
        } finally {
            setRequestingIds((prev) => ({ ...prev, [eventId]: false }));
        }
    };

    const verifiedSkills = [
        { name: 'Python', level: 'Expert', val: 90 },
        { name: 'Machine Learning', level: 'Expert', val: 85 },
        { name: 'TensorFlow', level: 'Advanced', val: 75 },
        { name: 'PyTorch', level: 'Advanced', val: 75 },
        { name: 'SQL', level: 'Expert', val: 88 },
        { name: 'FastAPI', level: 'Advanced', val: 78 },
        { name: 'Docker', level: 'Advanced', val: 70 },
        { name: 'Git', level: 'Expert', val: 85 },
        { name: 'REST APIs', level: 'Expert', val: 82 },
        { name: 'Data Structures', level: 'Expert', val: 80 },
        { name: 'Prompt Engineering', level: 'Expert', val: 85 },
        { name: 'CI/CD', level: 'Intermediate', val: 45 },
        { name: 'AWS (Basics)', level: 'Intermediate', val: 40 },
    ];

    const statusLabel = (status: TimelineEvent['verificationStatus']) => {
        if (status === 'VERIFIED') return 'Verified';
        if (status === 'PENDING') return 'Pending Verification';
        if (status === 'REJECTED') return 'Rejected';
        return 'Unverified';
    };

    return (
        <MainLayout>
            <div className="pb-10 animate-fade-in text-left">
                {/* Hero Section */}
                <div className="relative bg-glass-panel rounded-3xl p-8 mb-8 overflow-hidden border border-white/10 shadow-2xl">
                    <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl opacity-50 pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-10 items-start">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-primary to-accent flex-center text-5xl font-bold text-white shadow-[0_0_50px_rgba(167,139,250,0.4)]">
                                AP
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-success rounded-full flex-center border-4 border-bg-card text-white shadow-lg">
                                ✓
                            </div>
                        </div>

                        {/* Info */}
                        <div className="pt-2">
                            <h1 className="text-4xl font-extrabold text-white mb-2">Aarush Parate</h1>
                            <p className="text-xl text-secondary mb-6 font-medium">AI Systems Engineer | Building Scalable Intelligence</p>

                            <div className="flex flex-wrap gap-6 mb-6 text-muted">
                                <div className="flex-center gap-2">
                                    <GraduationCap size={18} /> <span>AI & Data Science</span>
                                </div>
                                <div className="flex-center gap-2">
                                    <Building2 size={18} /> <span>Tech Institute of Advanced Studies</span>
                                </div>
                                <div className="flex-center gap-2">
                                    <MapPin size={18} /> <span>Bangalore, India</span>
                                </div>
                                <div className="flex-center gap-2">
                                    <Mail size={18} /> <span>aarush.parate.dev@gmail.com</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <div className="px-4 py-2 rounded-xl bg-success/10 text-success border border-success/20 font-semibold flex-center gap-2">
                                    ✓ Faculty Verified
                                </div>
                                <div className="px-4 py-2 rounded-xl bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-semibold flex-center gap-2">
                                    ⭐ Top 5% Contributor
                                </div>
                                <div className="px-4 py-2 rounded-xl bg-accent/10 text-accent border border-accent/20 font-semibold flex-center gap-2">
                                    👑 Project Leader (3x)
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 min-w-[200px]">
                            <Button variant="primary" size="lg" className="w-full shadow-lg hover:shadow-primary/50" leftIcon={<Download size={18} />}>
                                Download Portfolio
                            </Button>
                            <Button variant="secondary" className="w-full" leftIcon={<Share2 size={18} />}>
                                Share Profile
                            </Button>
                            <Button variant="ghost" className="w-full" leftIcon={<Settings size={18} />}>
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Readiness Score */}
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-3xl p-10 mb-8 text-center relative overflow-hidden">
                    <h2 className="text-2xl font-bold text-white mb-8">🎯 Professional Readiness Score</h2>

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                        {/* Score Circle */}
                        <div className="relative w-48 h-48 rounded-full flex-center bg-bg-main shadow-[0_0_60px_rgba(45,212,191,0.2)] z-10 before:absolute before:inset-[-2px] before:rounded-full before:bg-gradient-to-r before:from-primary before:to-secondary before:-z-10">
                            <div className="flex flex-col items-center">
                                <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary">72</span>
                                <span className="text-sm font-bold text-muted uppercase tracking-wider mt-2">Emerging Pro</span>
                            </div>
                        </div>

                        {/* Breakdown */}
                        <div className="flex-1 w-full max-w-2xl bg-bg-main/50 p-6 rounded-2xl border border-white/5">
                            {[
                                { label: 'Technical Depth', val: 75 },
                                { label: 'Project Maturity', val: 72 },
                                { label: 'Deployment Score', val: 50 },
                                { label: 'Certification Strength', val: 45 },
                                { label: 'Specialization Clarity', val: 80 }
                            ].map(stat => (
                                <div key={stat.label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                    <span className="font-medium text-white/90 min-w-[140px] text-left">{stat.label}</span>
                                    <div className="flex-1 h-2 bg-white/10 rounded-full mx-4 overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${stat.val}%` }} />
                                    </div>
                                    <span className="font-bold text-primary w-12 text-right">{stat.val}/100</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-muted mt-6 max-w-2xl mx-auto">
                        <strong className="text-primary">You're in the top 15%</strong> of students in your year.
                        Complete 2 more team projects to reach the <strong>70% milestone</strong> (Industry-Ready threshold).
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">

                    {/* Left Column: Skills & Projects */}
                    <div className="flex flex-col gap-8">
                        {/* Verified Skills */}
                        <Card className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <span className="text-3xl">🎯</span> Verified Skills
                                </h2>
                                <Button variant="ghost" size="sm">View All →</Button>
                            </div>

                            {verifiedSkills.length === 0 ? (
                                <div className="text-sm text-secondary">
                                    No verified skills yet. Get your projects verified by faculty to unlock verified skills.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {verifiedSkills.map((skill) => {
                                        const color =
                                            skill.level === 'Expert'
                                                ? 'from-emerald-500 to-emerald-700'
                                                : skill.level === 'Advanced'
                                                    ? 'from-cyan-500 to-cyan-700'
                                                    : 'from-orange-500 to-orange-700';
                                        return (
                                            <div key={skill.name} className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-primary/50 transition-all hover:-translate-y-1">
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="font-bold text-lg text-white">{skill.name}</span>
                                                    <span className={`text-xs px-3 py-1 rounded-lg font-bold text-white bg-gradient-to-r ${color}`}>{skill.level}</span>
                                                </div>
                                                <div className="h-2 bg-white/10 rounded-full mb-3 overflow-hidden">
                                                    <div className={`h-full bg-gradient-to-r ${color}`} style={{ width: `${skill.val}%` }} />
                                                </div>
                                                <div className="flex gap-3 text-xs text-muted font-medium">
                                                    <span className="text-success">✓ Faculty Verified</span>
                                                    <span>Backed by {skill.level.toLowerCase()} event history</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </Card>

                        {/* Timeline */}
                        <Card className="p-8 relative overflow-hidden">
                            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <span className="text-3xl">🚀</span> Journey Timeline
                            </h2>

                            <div className="relative pl-8 border-l-2 border-primary/30 space-y-10">
                                {loadingTimeline && events.length === 0 && (
                                    <div className="text-secondary text-sm">Loading your journey...</div>
                                )}
                                {!loadingTimeline && events.length === 0 && (
                                    <div className="text-secondary text-sm">No timeline events yet.</div>
                                )}
                                {events.map((item) => (
                                    <div key={item.id} className="relative group">
                                        {/* Dot */}
                                        <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-bg-main border-4 border-primary group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(79,70,229,0.5)]" />

                                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-all hover:translate-x-2">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-sm font-bold text-primary block">{item.date}</span>
                                                <span
                                                    className={`ml-auto px-3 py-1 rounded-lg text-xs font-bold border
                                                    ${item.verificationStatus === 'VERIFIED'
                                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-400/40'
                                                            : item.verificationStatus === 'PENDING'
                                                                ? 'bg-yellow-500/10 text-yellow-400 border-yellow-400/40'
                                                                : item.verificationStatus === 'REJECTED'
                                                                    ? 'bg-red-500/10 text-red-400 border-red-400/40'
                                                                    : 'bg-white/5 text-secondary border-white/10'
                                                        }`}
                                                >
                                                    {statusLabel(item.verificationStatus)}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                            <p className="text-secondary font-medium mb-3">{item.role}</p>
                                            <p className="text-muted mb-4 leading-relaxed">{item.description}</p>

                                            <div className="flex flex-wrap gap-2 items-center">
                                                {item.tags.map((tag) => (
                                                    <span key={tag} className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold border border-primary/20">{tag}</span>
                                                ))}
                                                {item.award && (
                                                    <span className="ml-auto px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20">{item.award}</span>
                                                )}
                                            </div>

                                            {item.verificationStatus === 'UNVERIFIED' || item.verificationStatus === 'REJECTED' ? (
                                                <div className="mt-4 flex justify-end">
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={() => handleRequestVerification(item.id)}
                                                        disabled={requestingIds[item.id]}
                                                    >
                                                        {requestingIds[item.id] ? 'Requesting...' : 'Request Verification'}
                                                    </Button>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Stats & Endorsements */}
                    <div className="flex flex-col gap-6">
                        {/* Activity Stats */}
                        <Card className="p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Monthly Activity</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="text-3xl font-black text-white mb-1">24</div>
                                    <div className="text-xs text-muted font-bold uppercase">Profile Views</div>
                                </div>
                                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="text-3xl font-black text-white mb-1">15</div>
                                    <div className="text-xs text-muted font-bold uppercase">Applications</div>
                                </div>
                                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="text-3xl font-black text-white mb-1">8</div>
                                    <div className="text-xs text-muted font-bold uppercase">Interviews</div>
                                </div>
                                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="text-3xl font-black text-success mb-1">↑28%</div>
                                    <div className="text-xs text-muted font-bold uppercase">Growth</div>
                                </div>
                            </div>
                        </Card>

                        {/* Faculty Endorsement */}
                        <Card className="p-6 border-l-4 border-l-primary">
                            <div className="flex gap-4 items-center mb-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-500 flex-center text-white font-bold text-lg">SM</div>
                                <div>
                                    <h4 className="font-bold text-white">Prof. Sharma</h4>
                                    <p className="text-xs text-secondary">HOD, Computer Dept</p>
                                </div>
                            </div>
                            <p className="text-secondary italic text-sm leading-relaxed mb-4">
                                "Pranav demonstrated exceptional problem-solving skills during the IoT project. His approach to data analysis was innovative and thorough."
                            </p>
                            <div className="flex gap-1 text-yellow-500 text-sm">
                                ★★★★★
                            </div>
                        </Card>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
};

export default Profile;
