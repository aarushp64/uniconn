import { useState, useEffect } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Mail, MapPin, GraduationCap, Share2, Settings, ExternalLink, BookOpen, Award, Users, FlaskConical, FileText, ArrowRight } from 'lucide-react';
import { getSupervisedStudents, getVerificationRequests, getResearchOpportunities, type SupervisedStudent } from '../../mock/facultyApi';
import { useNavigate } from 'react-router-dom';

const FacultyProfile = () => {
    const [shareToast, setShareToast] = useState(false);
    const [activeTab, setActiveTab] = useState<'publications' | 'mentorship'>('publications');
    const [students, setStudents] = useState<SupervisedStudent[]>([]);
    const [verifiedCount, setVerifiedCount] = useState(0);
    const [oppCount, setOppCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getSupervisedStudents().then(setStudents);
        getVerificationRequests().then(r => setVerifiedCount(r.filter(v => v.status === 'VERIFIED').length));
        getResearchOpportunities().then(o => setOppCount(o.filter(x => x.status === 'OPEN').length));
    }, []);

    const faculty = {
        name: 'Dr. Meera Joshi',
        username: 'meera.joshi',
        email: 'meera.joshi@mitadtu.ac.in',
        designation: 'Associate Professor',
        department: 'Dept. of Computer Science & Engineering',
        university: 'MIT ADT University',
        location: 'Pune, Maharashtra',
        specialization: 'Natural Language Processing, AI/ML, Deep Learning',
        experience: '12 Years',
        hIndex: 18,
        citations: 1240,
    };

    const publications = [
        { title: 'Transformer-based Code Summarization for Indian Languages', venue: 'ACL 2026', year: '2026', type: 'Conference', status: 'Published' },
        { title: 'Federated Learning for Privacy-Preserving Healthcare AI', venue: 'IEEE TNNLS', year: '2025', type: 'Journal', status: 'Published' },
        { title: 'Attention Mechanisms in Low-Resource NLP: A Survey', venue: 'EMNLP 2025', year: '2025', type: 'Conference', status: 'Published' },
        { title: 'Marathi Language Model with Contextual Embeddings', venue: 'LREC-COLING 2024', year: '2024', type: 'Conference', status: 'Published' },
        { title: 'Edge AI for Real-time Anomaly Detection in IoT Networks', venue: 'Elsevier JNCA', year: '2024', type: 'Journal', status: 'Published' },
        { title: 'Multi-modal Learning for Indian Sign Language Recognition', venue: 'CVPR Workshop 2024', year: '2024', type: 'Workshop', status: 'Published' },
        { title: 'Quantum-Enhanced NLP: Exploring Hybrid Models', venue: 'Under Review — NeurIPS 2026', year: '2026', type: 'Conference', status: 'Under Review' },
    ];

    const grants = [
        { title: 'AI for Precision Agriculture', funder: 'DST-SERB', amount: '₹42 Lakhs', duration: '2025-2027', status: 'Active' },
        { title: 'NLP for Regional Languages', funder: 'MEITY', amount: '₹28 Lakhs', duration: '2024-2026', status: 'Active' },
        { title: 'Smart Campus IoT Framework', funder: 'MIT ADTU Internal', amount: '₹8 Lakhs', duration: '2024-2025', status: 'Completed' },
    ];

    const awards = [
        { title: 'Best Faculty Researcher Award', org: 'MIT ADTU', year: '2025' },
        { title: 'Young Scientist Award', org: 'DST India', year: '2024' },
        { title: 'Outstanding Mentor Award', org: 'IEEE Pune Section', year: '2024' },
        { title: 'ACM India Eminent Speaker', org: 'ACM India', year: '2023' },
    ];

    const handleShare = () => {
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2000);
    };

    const topStudents = students.sort((a, b) => b.readinessScore - a.readinessScore).slice(0, 6);

    return (
        <MainLayout>
            <div className="pb-10 animate-fade-in text-left relative">
                {shareToast && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl z-50 animate-fade-in">
                        ✅ Profile link copied!
                    </div>
                )}

                {/* Hero Section */}
                <div className="relative bg-white rounded-2xl mb-4 overflow-hidden border border-slate-100 shadow-sm">
                    {/* Banner */}
                    <div className="h-24 sm:h-28 bg-gradient-to-r from-violet-600 via-indigo-500 to-sky-500 relative">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2260%22%20height%3D%2260%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22%20fill%3D%22rgba(255%2C255%2C255%2C0.15)%22/%3E%3C/svg%3E')] opacity-50" />
                    </div>

                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 relative">
                        {/* Avatar */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shadow-lg border-4 border-white -mt-10 sm:-mt-12 relative z-10">
                            MJ
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-violet-500 rounded-full flex items-center justify-center border-3 border-white text-white text-[10px] sm:text-xs">🎓</div>
                        </div>

                        <div className="mt-3 flex flex-col gap-3 sm:gap-4">
                            <div>
                                <h1 className="text-lg sm:text-xl font-bold text-slate-900">{faculty.name}</h1>
                                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">@{faculty.username}</p>
                                <p className="text-[11px] sm:text-xs text-slate-600 mt-1">{faculty.designation} • {faculty.department}</p>
                                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1.5 sm:gap-3 mt-2 text-[10px] text-slate-400 font-medium">
                                    <span className="flex items-center gap-1"><GraduationCap size={11} /> {faculty.university}</span>
                                    <span className="flex items-center gap-1"><MapPin size={11} /> {faculty.location}</span>
                                    <span className="flex items-center gap-1"><Mail size={11} /> {faculty.email}</span>
                                </div>
                                <div className="flex gap-1.5 sm:gap-2 mt-3 flex-wrap">
                                    <span className="text-[8px] sm:text-[9px] font-bold px-2 py-1 rounded-md bg-violet-50 text-violet-600 border border-violet-100">🎓 Ph.D. Computer Science</span>
                                    <span className="text-[8px] sm:text-[9px] font-bold px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100">📊 h-index: {faculty.hIndex}</span>
                                    <span className="text-[8px] sm:text-[9px] font-bold px-2 py-1 rounded-md bg-amber-50 text-amber-600 border border-amber-100">📝 {faculty.citations} Citations</span>
                                    <span className="text-[8px] sm:text-[9px] font-bold px-2 py-1 rounded-md bg-sky-50 text-sky-600 border border-sky-100">⏱️ {faculty.experience}</span>
                                </div>
                            </div>
                            <div className="flex gap-2 shrink-0 flex-wrap">
                                <Button variant="primary" size="sm" leftIcon={<FileText size={14} />} onClick={() => {}}>CV / Resume</Button>
                                <Button variant="secondary" size="sm" leftIcon={<Share2 size={14} />} onClick={handleShare}>Share</Button>
                                <Button variant="ghost" size="sm" leftIcon={<Settings size={14} />} onClick={() => {}}>Edit</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Research Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {[
                        { label: 'Publications', value: publications.length, icon: <BookOpen size={18} />, color: 'text-violet-600 bg-violet-50', border: 'border-violet-100' },
                        { label: 'Research Grants', value: grants.filter(g => g.status === 'Active').length, icon: <Award size={18} />, color: 'text-emerald-600 bg-emerald-50', border: 'border-emerald-100' },
                        { label: 'Mentored Students', value: students.length, icon: <Users size={18} />, color: 'text-sky-600 bg-sky-50', border: 'border-sky-100' },
                        { label: 'Open Opportunities', value: oppCount, icon: <FlaskConical size={18} />, color: 'text-amber-600 bg-amber-50', border: 'border-amber-100' },
                    ].map((stat, i) => (
                        <Card key={i} className={`p-4 border ${stat.border} hover:shadow-md transition-all cursor-pointer`}>
                            <div className={`p-2 rounded-xl ${stat.color} w-fit mb-2`}>{stat.icon}</div>
                            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</p>
                        </Card>
                    ))}
                </div>

                {/* Specialization & Research Interests */}
                <Card className="p-4 sm:p-5 mb-4 border-slate-100">
                    <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                        🔬 Research Interests & Specialization
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {['Natural Language Processing', 'Deep Learning', 'Transformer Architectures', 'Low-Resource NLP', 'Federated Learning', 'AI Ethics', 'Computer Vision', 'Edge AI'].map(topic => (
                            <span key={topic} className="text-[10px] font-bold text-violet-600 bg-violet-50 px-3 py-1.5 rounded-lg border border-violet-100">{topic}</span>
                        ))}
                    </div>
                </Card>

                {/* Publications & Mentorship Tabs */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 sm:gap-6">
                    <div className="flex flex-col gap-4 sm:gap-6">
                        {/* Tab Switcher */}
                        <div className="flex gap-2 border-b border-slate-100 pb-0">
                            {(['publications', 'mentorship'] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all border-b-2 -mb-[1px] ${activeTab === tab
                                        ? 'text-violet-600 border-violet-600'
                                        : 'text-slate-400 border-transparent hover:text-slate-600'
                                    }`}
                                >
                                    {tab === 'publications' ? '📝 Publications' : '👥 Mentorship'}
                                </button>
                            ))}
                        </div>

                        {/* Publications Tab */}
                        {activeTab === 'publications' && (
                            <Card className="p-4 sm:p-5 animate-fade-in">
                                <div className="space-y-3">
                                    {publications.map((pub, i) => (
                                        <div key={i} className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-violet-200 hover:bg-white transition-all cursor-pointer group">
                                            <div className="flex items-start justify-between mb-1.5">
                                                <h4 className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-violet-600 transition-colors leading-snug flex-1">{pub.title}</h4>
                                                <Badge variant={pub.status === 'Published' ? 'success' : 'warning'} className="text-[8px] ml-2 shrink-0">{pub.status}</Badge>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[9px] font-bold text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded">{pub.type}</span>
                                                <span className="text-[10px] text-slate-500 font-medium">{pub.venue}</span>
                                                <span className="text-[10px] text-slate-400 ml-auto">{pub.year}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Mentorship Tab */}
                        {activeTab === 'mentorship' && (
                            <Card className="p-4 sm:p-5 animate-fade-in">
                                <div className="space-y-3">
                                    {topStudents.map(student => (
                                        <div key={student.id} className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 hover:bg-white hover:shadow-sm transition-all cursor-pointer" onClick={() => navigate('/faculty/students')}>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-teal-400 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                                                    {student.avatar}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-xs font-bold text-slate-800 truncate">{student.name}</p>
                                                        <span className="text-[10px] font-bold text-sky-600">{student.readinessScore}%</span>
                                                    </div>
                                                    <p className="text-[10px] text-slate-400">{student.department} • Year {student.year}</p>
                                                    {student.currentProject && (
                                                        <p className="text-[9px] text-violet-500 font-medium mt-0.5">Working on: {student.currentProject}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {student.skills.slice(0, 4).map(s => (
                                                    <span key={s} className="text-[8px] font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => navigate('/faculty/students')} className="w-full text-center text-[10px] font-bold text-violet-600 hover:text-violet-700 py-2 flex items-center justify-center gap-1">
                                        View All Students <ArrowRight size={12} />
                                    </button>
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                        {/* Grants & Funding */}
                        <Card className="p-3 sm:p-4 border-slate-100">
                            <h3 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2">
                                <Award size={14} className="text-emerald-500" /> Research Grants
                            </h3>
                            <div className="space-y-2.5">
                                {grants.map((grant, i) => (
                                    <div key={i} className="p-2.5 bg-slate-50/50 rounded-lg border border-slate-100 hover:bg-white transition-all">
                                        <div className="flex items-start justify-between mb-1">
                                            <p className="text-[11px] font-bold text-slate-800 leading-snug">{grant.title}</p>
                                            <Badge variant={grant.status === 'Active' ? 'success' : 'secondary'} className="text-[7px] shrink-0 ml-1">{grant.status}</Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-[9px] text-slate-400 font-medium">
                                            <span className="font-bold text-emerald-600">{grant.amount}</span>
                                            <span>•</span>
                                            <span>{grant.funder}</span>
                                        </div>
                                        <p className="text-[8px] text-slate-400 mt-0.5">{grant.duration}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Awards */}
                        <Card className="p-3 sm:p-4 border-l-4 border-l-amber-400">
                            <h3 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2">
                                🏆 Awards & Recognition
                            </h3>
                            <div className="space-y-2">
                                {awards.map((award, i) => (
                                    <div key={i} className="p-2 bg-amber-50/50 rounded-lg border border-amber-100">
                                        <p className="text-[11px] font-bold text-slate-800">{award.title}</p>
                                        <p className="text-[9px] text-slate-400 font-medium">{award.org} • {award.year}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Quick Links */}
                        <Card className="p-3 sm:p-4 border-slate-100">
                            <h3 className="text-xs font-bold text-slate-700 mb-3">Quick Actions</h3>
                            <div className="space-y-2">
                                {[
                                    { label: 'Verify Student Projects', path: '/faculty/verifications' },
                                    { label: 'View All Students', path: '/faculty/students' },
                                    { label: 'Manage Opportunities', path: '/faculty/opportunities' },
                                ].map(link => (
                                    <button key={link.path} onClick={() => navigate(link.path)} className="w-full flex items-center justify-between p-2 bg-slate-50 rounded-lg hover:bg-violet-50 hover:border-violet-100 border border-slate-100 transition-all text-[11px] sm:text-xs font-semibold text-slate-600 hover:text-violet-600 group">
                                        {link.label}
                                        <ExternalLink size={11} className="text-slate-300 group-hover:text-violet-400" />
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* Verified Projects Count */}
                        <Card className="p-3 sm:p-4 border-slate-100 bg-gradient-to-br from-violet-50/50 to-transparent">
                            <div className="text-center">
                                <p className="text-3xl font-black text-violet-600">{verifiedCount}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Projects Verified</p>
                                <p className="text-[9px] text-slate-400 mt-1">this academic year</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default FacultyProfile;
