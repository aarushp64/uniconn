import { useState } from 'react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Mail, MapPin, GraduationCap, Download, Share2, Settings, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';

/* ─── NEP Roadmap Data ─── */
type SemStatus = 'done' | 'active' | 'upcoming';

interface Semester {
    sem: number;
    label: string;
    credits: number;
    milestones: string[];
    status: SemStatus;
}

interface YearBlock {
    year: number;
    title: string;
    nepExit: string;
    color: string;
    gradient: string;
    dotColor: string;
    semesters: Semester[];
}

const NEP_ROADMAP: YearBlock[] = [
    {
        year: 1, title: 'Foundation Year', nepExit: 'Certificate', color: 'sky', gradient: 'from-sky-500 to-sky-600',
        dotColor: 'bg-sky-500',
        semesters: [
            { sem: 1, label: 'Sem 1 – Core', credits: 22, status: 'done', milestones: ['Python Basics', 'Math-I & Physics', 'Engineering Drawing', 'Communication Skills'] },
            { sem: 2, label: 'Sem 2 – Explore', credits: 22, status: 'done', milestones: ['Data Structures', 'Math-II', 'Elective: Intro to AI', 'Sports / NSS / NCC'] },
        ]
    },
    {
        year: 2, title: 'Diploma Year', nepExit: 'Diploma', color: 'violet', gradient: 'from-violet-500 to-violet-600',
        dotColor: 'bg-violet-500',
        semesters: [
            { sem: 3, label: 'Sem 3 – Depth', credits: 23, status: 'done', milestones: ['OOP & Java', 'DBMS & SQL', 'Discrete Math', 'Minor Project-I'] },
            { sem: 4, label: 'Sem 4 – Specialize', credits: 23, status: 'done', milestones: ['Operating Systems', 'Computer Networks', 'ML Foundations', 'Internship-I (2 weeks)'] },
        ]
    },
    {
        year: 3, title: 'Degree Year', nepExit: "Bachelor's Degree", color: 'emerald', gradient: 'from-emerald-500 to-emerald-600',
        dotColor: 'bg-emerald-500',
        semesters: [
            { sem: 5, label: 'Sem 5 – Industry', credits: 21, status: 'done', milestones: ['Deep Learning', 'Cloud Computing', 'NLP Elective', 'Capstone Proposal'] },
            { sem: 6, label: 'Sem 6 – Build', credits: 21, status: 'active', milestones: ['AI Systems Design', 'MLOps & DevOps', 'Research Methodology', 'Internship-II (8 weeks)'] },
        ]
    },
    {
        year: 4, title: 'Honours Year', nepExit: "B.Tech (Honours) / Research", color: 'amber', gradient: 'from-amber-500 to-amber-600',
        dotColor: 'bg-amber-500',
        semesters: [
            { sem: 7, label: 'Sem 7 – Capstone', credits: 18, status: 'upcoming', milestones: ['Major Project Phase-I', 'Advanced Elective-I', 'Industry Seminar', 'Research Paper Draft'] },
            { sem: 8, label: 'Sem 8 – Launch', credits: 14, status: 'upcoming', milestones: ['Major Project Phase-II', 'Advanced Elective-II', 'Placement / Higher Studies', 'Thesis / Patent Filing'] },
        ]
    },
];

const Profile = () => {
    const [activeTab, setActiveTab] = useState<'skills' | 'timeline'>('skills');
    const [shareToast, setShareToast] = useState(false);
    const [expandedYear, setExpandedYear] = useState<number | null>(3); // Current year expanded by default

    const user = {
        name: 'Aarush Parate',
        username: 'aarush_p',
        email: 'aarush.parate@mitadtu.ac.in',
        role: 'B.Tech CSE (AI & ML)',
        university: 'MIT ADT University',
        location: 'Pune, Maharashtra'
    };

    const verifiedSkills = [
        { name: 'Python', val: 90, color: 'bg-sky-500' },
        { name: 'Machine Learning', val: 85, color: 'bg-violet-500' },
        { name: 'TensorFlow', val: 75, color: 'bg-emerald-500' },
        { name: 'PyTorch', val: 75, color: 'bg-teal-500' },
        { name: 'SQL', val: 88, color: 'bg-sky-500' },
        { name: 'FastAPI', val: 78, color: 'bg-indigo-500' },
        { name: 'Docker', val: 70, color: 'bg-amber-500' },
        { name: 'Git', val: 85, color: 'bg-slate-500' },
        { name: 'REST APIs', val: 82, color: 'bg-cyan-500' },
        { name: 'Data Structures', val: 80, color: 'bg-rose-500' },
        { name: 'Prompt Engineering', val: 85, color: 'bg-purple-500' },
        { name: 'CI/CD', val: 45, color: 'bg-orange-500' },
        { name: 'AWS (Basics)', val: 40, color: 'bg-yellow-500' },
    ];

    const timeline = [
        { id: 't1', date: 'Feb 2026', title: 'Formula Bharat 2026', role: 'Software Lead – Team Speedtail', tags: ['Racing', 'Embedded', 'IoT'], status: 'VERIFIED', award: '🏆 Winner' },
        { id: 't2', date: 'Jan 2026', title: 'ML Deployment API', role: 'Solo Project – FastAPI + Docker', tags: ['ML', 'Docker', 'API'], status: 'VERIFIED', award: null },
        { id: 't3', date: 'Dec 2025', title: 'Persona Fest App', role: 'Frontend Lead – React Native', tags: ['React', 'Mobile', 'Events'], status: 'VERIFIED', award: '⭐ Best App Award' },
        { id: 't4', date: 'Nov 2025', title: 'Smart Attendance System', role: 'Team Lead – Computer Vision', tags: ['OpenCV', 'Python', 'AI'], status: 'PENDING', award: null },
        { id: 't5', date: 'Oct 2025', title: 'GDSC Flutter Workshop', role: 'Workshop Facilitator', tags: ['Flutter', 'Teaching', 'GDSC'], status: 'VERIFIED', award: null },
        { id: 't6', date: 'Sep 2025', title: 'Hackathon: AgriTech AI', role: 'Team Lead – Water Management', tags: ['AI', 'Sustainability', 'Hackathon'], status: 'VERIFIED', award: '🥈 Runner Up' },
    ];

    const readinessBreakdown = [
        { label: 'Technical Depth', val: 75, color: 'bg-sky-500' },
        { label: 'Project Maturity', val: 72, color: 'bg-violet-500' },
        { label: 'Deployment Score', val: 50, color: 'bg-amber-500' },
        { label: 'Certification', val: 45, color: 'bg-rose-500' },
        { label: 'Specialization', val: 80, color: 'bg-emerald-500' },
    ];

    const handleShare = () => {
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2000);
    };

    // Calculate overall NEP progress
    const totalSems = NEP_ROADMAP.reduce((a, y) => a + y.semesters.length, 0);
    const doneSems = NEP_ROADMAP.reduce((a, y) => a + y.semesters.filter(s => s.status === 'done').length, 0);
    const activeSems = NEP_ROADMAP.reduce((a, y) => a + y.semesters.filter(s => s.status === 'active').length, 0);
    const progressPercent = Math.round(((doneSems + activeSems * 0.5) / totalSems) * 100);

    const statusStyles: Record<SemStatus, { bg: string; text: string; label: string }> = {
        done: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-600', label: '✓ Completed' },
        active: { bg: 'bg-sky-50 border-sky-200', text: 'text-sky-600', label: '● In Progress' },
        upcoming: { bg: 'bg-slate-50 border-slate-200', text: 'text-slate-400', label: '○ Upcoming' },
    };

    return (
        <MainLayout>
            <div className="pb-10 animate-fade-in text-left relative">
                {/* Share Toast */}
                {shareToast && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl z-50 animate-fade-in">
                        ✅ Profile link copied!
                    </div>
                )}

                {/* Hero Section - Compact LinkedIn-style */}
                <div className="relative bg-white rounded-2xl mb-6 overflow-hidden border border-slate-100 shadow-sm">
                    {/* Banner */}
                    <div className="h-28 bg-gradient-to-r from-sky-500 via-sky-400 to-teal-400 relative">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2260%22%20height%3D%2260%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22%20fill%3D%22rgba(255%2C255%2C255%2C0.15)%22/%3E%3C/svg%3E')] opacity-50" />
                    </div>

                    <div className="px-6 pb-5 relative">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-600 to-teal-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg border-4 border-white -mt-12 relative z-10">
                            {user.name.substring(0, 2).toUpperCase()}
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center border-3 border-white text-white text-xs">✓</div>
                        </div>

                        <div className="mt-3 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div>
                                <h1 className="text-xl font-bold text-slate-900">{user.name}</h1>
                                <p className="text-xs text-slate-500 font-medium">@{user.username}</p>
                                <p className="text-xs text-slate-600 mt-1">{user.role}</p>
                                <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-slate-400 font-medium">
                                    <span className="flex items-center gap-1"><GraduationCap size={11} /> {user.university}</span>
                                    <span className="flex items-center gap-1"><MapPin size={11} /> {user.location}</span>
                                    <span className="flex items-center gap-1"><Mail size={11} /> {user.email}</span>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <span className="text-[9px] font-bold px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100">✓ Faculty Verified</span>
                                    <span className="text-[9px] font-bold px-2 py-1 rounded-md bg-amber-50 text-amber-600 border border-amber-100">⭐ Top 5%</span>
                                    <span className="text-[9px] font-bold px-2 py-1 rounded-md bg-violet-50 text-violet-600 border border-violet-100">👑 3x Leader</span>
                                </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <Button variant="primary" size="sm" leftIcon={<Download size={14} />} onClick={() => { }}>Portfolio</Button>
                                <Button variant="secondary" size="sm" leftIcon={<Share2 size={14} />} onClick={handleShare}>Share</Button>
                                <Button variant="ghost" size="sm" leftIcon={<Settings size={14} />} onClick={() => { }}>Edit</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Readiness Score - Visual Donut + Bars */}
                <Card className="p-5 mb-6 border-slate-100">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* Circular Score */}
                        <div className="relative w-32 h-32 shrink-0">
                            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                                <circle cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGrad)" strokeWidth="8" strokeLinecap="round"
                                    strokeDasharray={`${72 * 2.64} ${100 * 2.64}`} />
                                <defs>
                                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#0ea5e9" />
                                        <stop offset="100%" stopColor="#14b8a6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black text-slate-900">72</span>
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Readiness</span>
                            </div>
                        </div>

                        {/* Breakdown Bars */}
                        <div className="flex-1 w-full space-y-2.5">
                            {readinessBreakdown.map(stat => (
                                <div key={stat.label}>
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="text-[10px] font-semibold text-slate-600">{stat.label}</span>
                                        <span className="text-[9px] font-bold text-slate-400">{stat.val}%</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${stat.val}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-4 text-center">
                        <strong className="text-sky-600">Top 15%</strong> of students in your year • Complete 2 more projects to reach Industry-Ready
                    </p>
                </Card>

                {/* ═══════════════════ NEP 4-YEAR ROADMAP ═══════════════════ */}
                <Card className="p-5 mb-6 border-slate-100 overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                🗺️ Personal Roadmap <span className="text-[8px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">NEP 2020</span>
                            </h2>
                            <p className="text-[10px] text-slate-400 mt-0.5">4-Year B.Tech • CSE (AI & ML) • MIT ADT University</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-black text-slate-900">{progressPercent}%</div>
                            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Complete</div>
                        </div>
                    </div>

                    {/* Overall Progress Bar */}
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
                        <div className="h-full bg-gradient-to-r from-sky-500 via-violet-500 via-emerald-500 to-amber-400 rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }} />
                    </div>

                    {/* Year Pillars - Horizontal Visual */}
                    <div className="grid grid-cols-4 gap-2 mb-6">
                        {NEP_ROADMAP.map(yr => {
                            const yearDone = yr.semesters.every(s => s.status === 'done');
                            const yearActive = yr.semesters.some(s => s.status === 'active');
                            return (
                                <button
                                    key={yr.year}
                                    onClick={() => setExpandedYear(expandedYear === yr.year ? null : yr.year)}
                                    className={`relative p-3 rounded-xl text-center transition-all border-2 active:scale-[0.97] ${expandedYear === yr.year
                                        ? `bg-gradient-to-br ${yr.gradient} text-white border-transparent shadow-lg`
                                        : yearDone
                                            ? `bg-white border-slate-200 hover:border-slate-300`
                                            : yearActive
                                                ? `bg-white border-sky-200 hover:border-sky-300`
                                                : `bg-slate-50 border-slate-100 hover:border-slate-200`
                                        }`}
                                >
                                    {/* Year circle */}
                                    <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-black ${expandedYear === yr.year
                                        ? 'bg-white/20 text-white'
                                        : yearDone
                                            ? `${yr.dotColor} text-white`
                                            : yearActive
                                                ? 'bg-sky-100 text-sky-600'
                                                : 'bg-slate-100 text-slate-400'
                                        }`}>
                                        {yearDone ? '✓' : `Y${yr.year}`}
                                    </div>
                                    <div className={`text-[9px] font-bold ${expandedYear === yr.year ? 'text-white' : 'text-slate-700'}`}>{yr.title}</div>
                                    <div className={`text-[7px] font-bold mt-0.5 ${expandedYear === yr.year ? 'text-white/70' : 'text-slate-400'
                                        }`}>Exit: {yr.nepExit}</div>
                                    {yearActive && expandedYear !== yr.year && (
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-sky-500 rounded-full border-2 border-white animate-pulse" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Connecting Line Visual */}
                    <div className="flex items-center gap-0 mb-6 px-6">
                        {NEP_ROADMAP.map((yr, yi) => {
                            const yearDone = yr.semesters.every(s => s.status === 'done');
                            const yearActive = yr.semesters.some(s => s.status === 'active');
                            return (
                                <div key={yi} className="flex items-center flex-1">
                                    <div className={`w-3 h-3 rounded-full shrink-0 border-2 ${yearDone ? `${yr.dotColor} border-transparent` : yearActive ? 'bg-white border-sky-500' : 'bg-white border-slate-200'
                                        }`} />
                                    {yi < NEP_ROADMAP.length - 1 && (
                                        <div className="flex-1 h-0.5 mx-1">
                                            <div className={`h-full rounded-full ${yearDone ? yr.dotColor : 'bg-slate-200'}`} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Expanded Year – TREE VISUAL */}
                    {expandedYear && (() => {
                        const yr = NEP_ROADMAP.find(y => y.year === expandedYear)!;
                        const dotColor = yr.dotColor;
                        return (
                            <div className="animate-fade-in">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                                        Year {yr.year}: {yr.title}
                                        <span className={`text-[7px] font-black uppercase px-1.5 py-0.5 rounded-full bg-${yr.color}-50 text-${yr.color}-600 border border-${yr.color}-100`}>
                                            {yr.nepExit}
                                        </span>
                                    </h3>
                                    <button onClick={() => setExpandedYear(null)} className="text-[8px] font-bold text-slate-400 hover:text-slate-600 flex items-center gap-0.5">
                                        Collapse <ChevronUp size={10} />
                                    </button>
                                </div>

                                {/* Tree Structure */}
                                <div className="relative">
                                    {/* Central Trunk Line */}
                                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 z-0" />

                                    {yr.semesters.map((sem, si) => {
                                        const isLeft = si === 0;
                                        const style = statusStyles[sem.status];
                                        const statusDot = sem.status === 'done' ? 'bg-emerald-500' : sem.status === 'active' ? 'bg-sky-500' : 'bg-slate-300';

                                        return (
                                            <div key={sem.sem} className={`relative flex items-start ${si > 0 ? 'mt-4' : ''}`}>
                                                {/* Trunk Node */}
                                                <div className="absolute left-1/2 -translate-x-1/2 z-10 mt-3">
                                                    <div className={`w-5 h-5 rounded-full ${dotColor} flex items-center justify-center shadow-sm border-2 border-white`}>
                                                        <span className="text-[7px] text-white font-black">{sem.sem}</span>
                                                    </div>
                                                </div>

                                                {/* Branch Content */}
                                                <div className={`w-[45%] ${isLeft ? 'pr-4 text-right' : 'ml-auto pl-4 text-left'}`}>
                                                    {/* Horizontal Branch Line */}
                                                    <div className={`absolute top-5 ${isLeft ? 'left-[calc(50%+10px)]' : 'right-[calc(50%+10px)]'} ${isLeft ? 'right-[55%]' : 'left-[55%]'} h-0.5 bg-slate-200`} />

                                                    {/* Semester Card */}
                                                    <div className={`relative p-3 rounded-xl border ${style.bg} transition-all hover:shadow-sm`}>
                                                        {/* Semester Header */}
                                                        <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                                                            <span className={`text-[8px] font-bold ${style.text}`}>{style.label}</span>
                                                        </div>
                                                        <h4 className="text-[11px] font-bold text-slate-800 mb-1">{sem.label}</h4>
                                                        <div className={`text-[8px] text-slate-400 font-medium mb-3 ${isLeft ? 'text-right' : 'text-left'}`}>
                                                            {sem.credits} Credits
                                                        </div>

                                                        {/* Milestone Tree Branches */}
                                                        <div className={`space-y-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                                                            {sem.milestones.map((m, mi) => (
                                                                <div key={mi} className={`flex items-center gap-2 ${isLeft ? 'flex-row-reverse' : ''}`}>
                                                                    {/* Branch connector */}
                                                                    <div className="flex items-center gap-1 shrink-0">
                                                                        <div className={`w-3 h-px ${statusDot}`} />
                                                                        <div className={`w-2 h-2 rounded-full ${statusDot} shadow-sm ${sem.status === 'active' && mi === 0 ? 'ring-2 ring-sky-200 ring-offset-1' : ''
                                                                            }`} />
                                                                    </div>
                                                                    <span className={`text-[10px] font-medium ${sem.status === 'done' ? 'text-slate-400 line-through'
                                                                            : sem.status === 'active' ? 'text-slate-700'
                                                                                : 'text-slate-400'
                                                                        }`}>{m}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Bottom trunk cap */}
                                    <div className="absolute left-1/2 bottom-0 -translate-x-1/2 z-10">
                                        <div className={`w-3 h-3 rounded-full ${yr.year < 4 ? 'bg-slate-200' : dotColor} border-2 border-white shadow-sm`} />
                                    </div>
                                    <div className="h-6" /> {/* spacing for bottom cap */}
                                </div>

                                {/* NEP Exit Footer */}
                                <div className="mt-2 p-2 bg-slate-50 rounded-lg border border-slate-100 text-center">
                                    <span className="text-[9px] text-slate-500 font-medium">
                                        🎓 NEP Exit: <strong className={`text-${yr.color}-600`}>{yr.nepExit}</strong>
                                        {yr.year < 4 && ' • Students may exit with this qualification'}
                                    </span>
                                </div>
                            </div>
                        );
                    })()}

                    {!expandedYear && (
                        <div className="text-center py-4">
                            <p className="text-[10px] text-slate-400 mb-2">Click any year to see the semester tree</p>
                            <button onClick={() => setExpandedYear(3)} className="text-[10px] font-bold text-sky-600 hover:underline flex items-center gap-0.5 mx-auto">
                                View Current Year <ChevronDown size={10} />
                            </button>
                        </div>
                    )}
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                    {/* Left Column */}
                    <div className="flex flex-col gap-6">
                        {/* Tab Switcher */}
                        <div className="flex gap-2 border-b border-slate-100 pb-0">
                            {(['skills', 'timeline'] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 -mb-[1px] ${activeTab === tab
                                        ? 'text-sky-600 border-sky-600'
                                        : 'text-slate-400 border-transparent hover:text-slate-600'
                                        }`}
                                >
                                    {tab === 'skills' ? '🎯 Skills' : '🚀 Timeline'}
                                </button>
                            ))}
                        </div>

                        {/* Skills Tab */}
                        {activeTab === 'skills' && (
                            <Card className="p-5 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {verifiedSkills.map(skill => (
                                        <div key={skill.name} className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-sky-200 transition-all group cursor-pointer">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-bold text-slate-800">{skill.name}</span>
                                                <span className="text-[9px] font-bold text-slate-400">{skill.val}%</span>
                                            </div>
                                            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                <div className={`h-full ${skill.color} rounded-full group-hover:opacity-80 transition-opacity`} style={{ width: `${skill.val}%` }} />
                                            </div>
                                            <div className="text-[8px] text-emerald-500 font-bold mt-1.5 flex items-center gap-1">
                                                ✓ Verified
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Timeline Tab */}
                        {activeTab === 'timeline' && (
                            <Card className="p-5 animate-fade-in">
                                <div className="relative pl-6 border-l-2 border-slate-100 space-y-4">
                                    {timeline.map(item => (
                                        <div key={item.id} className="relative group">
                                            <div className={`absolute -left-[29px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm ${item.status === 'VERIFIED' ? 'bg-sky-500' : 'bg-amber-400'
                                                }`} />
                                            <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[9px] font-bold text-sky-600">{item.date}</span>
                                                    <span className={`ml-auto text-[8px] font-bold px-1.5 py-0.5 rounded ${item.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                                        }`}>{item.status === 'VERIFIED' ? '✓ Verified' : '⏳ Pending'}</span>
                                                </div>
                                                <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                                                <p className="text-[10px] text-slate-500 mb-2">{item.role}</p>
                                                <div className="flex gap-1 flex-wrap items-center">
                                                    {item.tags.map(tag => (
                                                        <span key={tag} className="px-1.5 py-0.5 bg-sky-50 border border-sky-100 text-[8px] text-sky-600 font-bold rounded">{tag}</span>
                                                    ))}
                                                    {item.award && (
                                                        <span className="ml-auto text-[8px] font-bold text-amber-500">{item.award}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className="flex flex-col gap-4">
                        {/* Activity Stats - FIXED COLORS */}
                        <Card className="p-4 border-slate-100">
                            <h3 className="text-xs font-bold text-slate-700 mb-3">Monthly Activity</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { val: '24', label: 'Profile Views', color: 'text-sky-600' },
                                    { val: '15', label: 'Applications', color: 'text-violet-600' },
                                    { val: '8', label: 'Interviews', color: 'text-emerald-600' },
                                    { val: '↑28%', label: 'Growth', color: 'text-teal-600' },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-sky-200 transition-colors cursor-pointer">
                                        <div className={`text-xl font-black ${stat.color} mb-0.5`}>{stat.val}</div>
                                        <div className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Faculty Endorsement - FIXED COLORS */}
                        <Card className="p-4 border-l-4 border-l-sky-500">
                            <div className="flex gap-3 items-center mb-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center text-white font-bold text-xs">SM</div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-xs">Prof. Sharma</h4>
                                    <p className="text-[10px] text-slate-500">HOD, Computer Dept</p>
                                </div>
                            </div>
                            <p className="text-slate-600 italic text-[10px] leading-relaxed mb-2">
                                "Aarush demonstrated exceptional problem-solving skills during the IoT project. His approach to data analysis was innovative and thorough."
                            </p>
                            <div className="flex gap-0.5 text-amber-400 text-xs">★★★★★</div>
                        </Card>

                        {/* Quick Links */}
                        <Card className="p-4 border-slate-100">
                            <h3 className="text-xs font-bold text-slate-700 mb-3">Quick Actions</h3>
                            <div className="space-y-2">
                                {[
                                    { label: 'View AI Insights', path: '/ai-insights' },
                                    { label: 'Browse Opportunities', path: '/explore' },
                                    { label: 'My Projects', path: '/projects' },
                                ].map(link => (
                                    <a key={link.path} href={link.path} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg hover:bg-sky-50 hover:border-sky-100 border border-slate-100 transition-all text-xs font-semibold text-slate-600 hover:text-sky-600 group">
                                        {link.label}
                                        <ExternalLink size={11} className="text-slate-300 group-hover:text-sky-400" />
                                    </a>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Profile;
