import { useState, useEffect } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Input } from '../../components/common/Input';
import { Search, GraduationCap, CheckCircle2, ChevronRight } from 'lucide-react';
import { getSupervisedStudents, type SupervisedStudent } from '../../mock/facultyApi';

const FacultyStudents = () => {
    const [students, setStudents] = useState<SupervisedStudent[]>([]);
    const [search, setSearch] = useState('');
    const [deptFilter, setDeptFilter] = useState('All');
    const [sortBy, setSortBy] = useState<'readiness' | 'name' | 'projects'>('readiness');

    useEffect(() => {
        getSupervisedStudents().then(setStudents);
    }, []);

    const departments = ['All', ...new Set(students.map(s => s.department))];

    const filtered = students
        .filter(s => {
            const matchesDept = deptFilter === 'All' || s.department === deptFilter;
            const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                s.skills.some(sk => sk.toLowerCase().includes(search.toLowerCase()));
            return matchesDept && matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === 'readiness') return b.readinessScore - a.readinessScore;
            if (sortBy === 'projects') return b.verifiedProjects - a.verifiedProjects;
            return a.name.localeCompare(b.name);
        });

    const scoreColor = (score: number) => {
        if (score >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
        if (score >= 65) return 'text-sky-600 bg-sky-50 border-sky-200';
        if (score >= 50) return 'text-amber-600 bg-amber-50 border-amber-200';
        return 'text-rose-600 bg-rose-50 border-rose-200';
    };

    return (
        <MainLayout>
            <div className="flex flex-col gap-5 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-xl font-bold text-slate-900 mb-1">Student Supervision</h1>
                    <p className="text-xs text-slate-500">Students you've supervised, verified, or are currently working with</p>
                </div>

                {/* Search + Filters */}
                <div className="flex flex-col md:flex-row gap-3">
                    <Input
                        placeholder="Search by name or skill..."
                        leftIcon={<Search size={16} />}
                        className="mb-0 flex-1"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <div className="flex gap-2 flex-wrap">
                        {departments.map(d => (
                            <button
                                key={d}
                                onClick={() => setDeptFilter(d)}
                                className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all whitespace-nowrap border uppercase tracking-wider active:scale-95
                                    ${deptFilter === d
                                        ? 'bg-slate-800 text-white border-slate-800'
                                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                                    }`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sort + Count */}
                <div className="flex items-center justify-between">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                        {filtered.length} {filtered.length === 1 ? 'student' : 'students'}
                    </p>
                    <div className="flex gap-1.5">
                        {([['readiness', 'Readiness'], ['projects', 'Projects'], ['name', 'Name']] as const).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setSortBy(key)}
                                className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all border
                                    ${sortBy === key ? 'bg-sky-50 text-sky-600 border-sky-200' : 'text-slate-400 border-slate-100 hover:border-slate-300'}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Students Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filtered.map(student => (
                        <Card key={student.id} className="p-4 border-slate-100 hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-violet-500 to-pink-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                        {student.avatar}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors flex items-center gap-1">
                                            {student.name}
                                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </p>
                                        <p className="text-[10px] text-slate-400">{student.department} • Year {student.year}</p>
                                    </div>
                                </div>
                                <div className={`px-2.5 py-1.5 rounded-xl border text-center ${scoreColor(student.readinessScore)}`}>
                                    <p className="text-sm font-black leading-none">{student.readinessScore}%</p>
                                    <p className="text-[7px] font-bold uppercase mt-0.5">Ready</p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex gap-4 mb-3">
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 size={12} className="text-emerald-500" />
                                    <span className="text-[10px] font-bold text-slate-600">{student.verifiedProjects} verified</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <GraduationCap size={12} className="text-violet-500" />
                                    <span className="text-[10px] font-bold text-slate-600">Year {student.year}</span>
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-1 mb-2">
                                {student.skills.map(s => (
                                    <Badge key={s} variant="neutral" className="text-[8px]">{s}</Badge>
                                ))}
                            </div>

                            {/* Current Project */}
                            {student.currentProject && (
                                <p className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1.5 rounded-lg mt-1">
                                    Currently working on: {student.currentProject}
                                </p>
                            )}
                        </Card>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <Card className="p-10 text-center">
                        <p className="text-sm text-slate-400">No students found matching your criteria.</p>
                    </Card>
                )}
            </div>
        </MainLayout>
    );
};

export default FacultyStudents;
