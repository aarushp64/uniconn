import { useState, useEffect } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Plus, Users, Clock, FlaskConical, X } from 'lucide-react';
import { getResearchOpportunities, createResearchOpportunity, type ResearchOpportunity } from '../../mock/facultyApi';

const FacultyOpportunities = () => {
    const [opportunities, setOpportunities] = useState<ResearchOpportunity[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [skillsInput, setSkillsInput] = useState('');
    const [duration, setDuration] = useState('');
    const [maxStudents, setMaxStudents] = useState('');
    const [department, setDepartment] = useState('');

    useEffect(() => {
        getResearchOpportunities().then(setOpportunities);
    }, []);

    const handleCreate = async () => {
        if (!title || !description || !skillsInput || !duration || !maxStudents || !department) return;
        setSubmitting(true);
        const opp = await createResearchOpportunity({
            title,
            description,
            requiredSkills: skillsInput.split(',').map(s => s.trim()).filter(Boolean),
            duration,
            maxStudents: parseInt(maxStudents, 10),
            department,
        });
        setOpportunities(prev => [opp, ...prev]);
        setTitle(''); setDescription(''); setSkillsInput(''); setDuration(''); setMaxStudents(''); setDepartment('');
        setShowForm(false);
        setSubmitting(false);
    };

    return (
        <MainLayout>
            <div className="flex flex-col gap-5 pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 mb-1">Research Opportunities</h1>
                        <p className="text-xs text-slate-500">Manage and create research positions for students</p>
                    </div>
                    <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<Plus size={14} />}
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Cancel' : 'Create New'}
                    </Button>
                </div>

                {/* Create Form */}
                {showForm && (
                    <Card className="p-5 border-sky-100 bg-sky-50/30">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-bold text-slate-900">New Research Opportunity</h2>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Input
                                label="Title"
                                placeholder="e.g., NLP Research Assistant"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                fullWidth
                            />
                            <Input
                                label="Department"
                                placeholder="e.g., Computer Science"
                                value={department}
                                onChange={e => setDepartment(e.target.value)}
                                fullWidth
                            />
                            <div className="md:col-span-2">
                                <Input
                                    label="Description"
                                    placeholder="Describe the research work..."
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    fullWidth
                                />
                            </div>
                            <Input
                                label="Required Skills (comma-separated)"
                                placeholder="Python, PyTorch, NLP"
                                value={skillsInput}
                                onChange={e => setSkillsInput(e.target.value)}
                                fullWidth
                            />
                            <div className="flex gap-3">
                                <Input
                                    label="Duration"
                                    placeholder="e.g., 6 months"
                                    value={duration}
                                    onChange={e => setDuration(e.target.value)}
                                    fullWidth
                                />
                                <Input
                                    label="Max Students"
                                    placeholder="e.g., 3"
                                    type="number"
                                    value={maxStudents}
                                    onChange={e => setMaxStudents(e.target.value)}
                                    fullWidth
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={handleCreate}
                                isLoading={submitting}
                                disabled={!title || !description || !skillsInput || !duration || !maxStudents || !department}
                            >
                                Create Opportunity
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Count */}
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    {opportunities.length} {opportunities.length === 1 ? 'opportunity' : 'opportunities'}
                </p>

                {/* Opportunities List */}
                <div className="space-y-4">
                    {opportunities.map(opp => (
                        <Card key={opp.id} className="p-5 border-slate-100 hover:shadow-md transition-all">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 mb-1">{opp.title}</h3>
                                    <p className="text-[10px] text-slate-400">{opp.department} • Created {opp.createdAt}</p>
                                </div>
                                <Badge variant={opp.status === 'OPEN' ? 'success' : 'neutral'} className="text-[9px] shrink-0">
                                    {opp.status}
                                </Badge>
                            </div>

                            <p className="text-xs text-slate-500 leading-relaxed mb-3">{opp.description}</p>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {opp.requiredSkills.map(s => (
                                    <span key={s} className="text-[9px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">{s}</span>
                                ))}
                            </div>

                            {/* Meta */}
                            <div className="flex flex-wrap gap-4 pt-3 border-t border-slate-100">
                                <div className="flex items-center gap-1.5">
                                    <Clock size={12} className="text-slate-400" />
                                    <span className="text-[10px] font-bold text-slate-500">{opp.duration}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Users size={12} className="text-slate-400" />
                                    <span className="text-[10px] font-bold text-slate-500">Max {opp.maxStudents} students</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <FlaskConical size={12} className="text-slate-400" />
                                    <span className="text-[10px] font-bold text-slate-500">{opp.applicants} applicants</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {opportunities.length === 0 && (
                    <Card className="p-10 text-center">
                        <p className="text-sm text-slate-400 mb-3">No research opportunities yet.</p>
                        <Button variant="primary" size="sm" leftIcon={<Plus size={14} />} onClick={() => setShowForm(true)}>
                            Create Your First
                        </Button>
                    </Card>
                )}
            </div>
        </MainLayout>
    );
};

export default FacultyOpportunities;
