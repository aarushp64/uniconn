import { useState, useEffect } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ShieldCheck, ShieldX, ExternalLink, Search } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { getVerificationRequests, approveVerification, rejectVerification, type VerificationRequest } from '../../mock/facultyApi';

const FacultyVerifications = () => {
    const [requests, setRequests] = useState<VerificationRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [actingId, setActingId] = useState<string | null>(null);
    const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'VERIFIED' | 'REJECTED'>('ALL');
    const [search, setSearch] = useState('');

    useEffect(() => {
        getVerificationRequests().then(r => { setRequests(r); setLoading(false); });
    }, []);

    const handleApprove = async (id: string) => {
        setActingId(id);
        await approveVerification(id);
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'VERIFIED' as const, verifiedAt: new Date().toISOString() } : r));
        setActingId(null);
    };

    const handleReject = async (id: string) => {
        setActingId(id);
        await rejectVerification(id);
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'REJECTED' as const } : r));
        setActingId(null);
    };

    const filtered = requests.filter(r => {
        const matchesFilter = filter === 'ALL' || r.status === filter;
        const matchesSearch = r.studentName.toLowerCase().includes(search.toLowerCase()) ||
            r.projectTitle.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const statusColor = (s: string) => {
        if (s === 'VERIFIED') return 'success';
        if (s === 'REJECTED') return 'danger';
        return 'warning';
    };

    return (
        <MainLayout>
            <div className="flex flex-col gap-5 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-xl font-bold text-slate-900 mb-1">Verification Queue</h1>
                    <p className="text-xs text-slate-500">Review and verify student project submissions</p>
                </div>

                {/* Search + Filters */}
                <div className="flex flex-col md:flex-row gap-3">
                    <Input
                        placeholder="Search by student or project..."
                        leftIcon={<Search size={16} />}
                        className="mb-0 flex-1"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <div className="flex gap-2">
                        {(['ALL', 'PENDING', 'VERIFIED', 'REJECTED'] as const).map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all whitespace-nowrap border uppercase tracking-wider active:scale-95
                                    ${filter === f
                                        ? 'bg-slate-800 text-white border-slate-800'
                                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Count */}
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    {filtered.length} {filtered.length === 1 ? 'request' : 'requests'}
                </p>

                {/* Requests List */}
                {loading ? (
                    <p className="text-sm text-slate-400 text-center py-10">Loading...</p>
                ) : filtered.length === 0 ? (
                    <Card className="p-10 text-center">
                        <p className="text-sm text-slate-400">No verification requests found.</p>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {filtered.map(req => (
                            <Card key={req.id} className="p-5 border-slate-100 hover:shadow-md transition-all">
                                {/* Top Row */}
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-teal-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                            {req.studentAvatar}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{req.studentName}</p>
                                            <p className="text-[10px] text-slate-400">{req.studentDept} • Year {req.studentYear}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant={statusColor(req.status)} className="text-[9px]">{req.status}</Badge>
                                        <span className="text-[10px] text-slate-400">Submitted {req.submittedAt}</span>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <h3 className="text-sm font-bold text-slate-800 mb-1">{req.projectTitle}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed mb-3">{req.description}</p>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {req.skills.map(s => (
                                        <span key={s} className="text-[9px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">{s}</span>
                                    ))}
                                </div>

                                {/* Evidence */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {req.evidenceLinks.map((link, i) => (
                                        <span key={i} className="text-[10px] text-violet-600 bg-violet-50 px-2 py-1 rounded-lg flex items-center gap-1 border border-violet-100">
                                            <ExternalLink size={10} /> {link}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions */}
                                {req.status === 'PENDING' && (
                                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            leftIcon={<ShieldX size={14} />}
                                            onClick={() => handleReject(req.id)}
                                            disabled={actingId === req.id}
                                        >
                                            {actingId === req.id ? 'Rejecting...' : 'Reject'}
                                        </Button>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            leftIcon={<ShieldCheck size={14} />}
                                            onClick={() => handleApprove(req.id)}
                                            disabled={actingId === req.id}
                                        >
                                            {actingId === req.id ? 'Approving...' : 'Approve'}
                                        </Button>
                                    </div>
                                )}

                                {req.status === 'VERIFIED' && req.verifiedAt && (
                                    <p className="text-[10px] text-emerald-600 font-semibold mt-2 pt-3 border-t border-slate-100">
                                        Verified on {new Date(req.verifiedAt).toLocaleDateString()}
                                    </p>
                                )}
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default FacultyVerifications;
