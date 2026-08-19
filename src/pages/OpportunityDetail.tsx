import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Calendar, MapPin, Share2, CheckCircle2 } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';

const OpportunityDetail = () => {
    // In a real app, use useParams to fetch data
    // const { id } = useParams();
    const [hasApplied, setHasApplied] = useState(false);

    const opportunity = {
        title: 'Frontend Developer',
        organization: 'Coding Club',
        type: 'Club Role',
        posted: '2 days ago',
        location: 'Campus Center',
        deadline: 'Oct 15, 2026',
        description: 'We are looking for a motivated Frontend Developer to help build the new club website. You will work with React and TypeScript to deliver a responsive experience.',
        deliverables: [
            'Revamp the events page with a new calendar view',
            'Optimize active member dashboard',
            'Ensure mobile responsiveness across all pages'
        ],
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'Git'],
        verificationMethod: 'Code Review by Club Lead',
    };

    const handleApply = () => {
        setHasApplied(true);
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-10">

                <Link to="/explore" className="text-slate-500 hover:text-sky-600 flex items-center gap-2 mb-2 w-fit">
                    <ArrowLeft size={18} /> Back to Explore
                </Link>

                {/* Header */}
                <Card className="p-6 md:p-8 text-left">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex gap-4">
                            <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex-center text-slate-500">
                                <Building2 size={32} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 mb-1">{opportunity.title}</h1>
                                <p className="text-lg text-slate-600 mb-3">{opportunity.organization} • <span className="text-sky-600">{opportunity.type}</span></p>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> Posted {opportunity.posted}</span>
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {opportunity.location}</span>
                                    <span className="flex items-center gap-1 text-amber-600"><Calendar size={14} /> Deadline: {opportunity.deadline}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 min-w-[200px]">
                            {hasApplied ? (
                                <Button variant="secondary" disabled className="w-full" leftIcon={<CheckCircle2 size={18} />}>
                                    Applied
                                </Button>
                            ) : (
                                <Button size="lg" className="w-full" onClick={handleApply}>
                                    Apply Now
                                </Button>
                            )}
                            <Button variant="outline" size="sm" className="w-full" leftIcon={<Share2 size={16} />}>
                                Share
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Content Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Main Info */}
                    <div className="md:col-span-2 flex flex-col gap-6 text-left">
                        <Card className="p-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">About the Role</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                {opportunity.description}
                            </p>

                            <h3 className="text-lg font-semibold text-slate-900 mb-3">Key Deliverables</h3>
                            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6 ml-2">
                                {opportunity.deliverables.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </Card>
                    </div>

                    {/* Sidebar Info */}
                    <div className="flex flex-col gap-6 text-left">
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Required Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {opportunity.skills.map(skill => (
                                    <Badge key={skill} variant="neutral">{skill}</Badge>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-sky-50 to-transparent border-sky-100">
                            <h3 className="text-sm font-semibold text-sky-700 mb-2 uppercase tracking-wider">Verification</h3>
                            <p className="text-sm text-slate-600">
                                This role will be verified by <span className="text-slate-900 font-medium">{opportunity.organization}</span> upon completion of deliverables.
                                <br /><br />
                                <span className="text-xs text-slate-400">Method: {opportunity.verificationMethod}</span>
                            </p>
                        </Card>
                    </div>
                </div>

            </div>
        </MainLayout>
    );
};

export default OpportunityDetail;
