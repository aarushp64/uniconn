import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Building2, Calendar, ChevronRight, Clock } from 'lucide-react';

interface Application {
    id: string;
    role: string;
    organization: string;
    status: 'Applied' | 'In Progress' | 'Under Review' | 'Verified';
    appliedDate: string;
    nextStep?: string;
}

const Applications = () => {
    const [activeTab, setActiveTab] = useState('All');

    const applications: Application[] = [
        {
            id: '1',
            role: 'Frontend Developer',
            organization: 'Coding Club',
            status: 'In Progress',
            appliedDate: 'Oct 1, 2026',
            nextStep: 'Submit Module 1 by Oct 20'
        },
        {
            id: '2',
            role: 'AI Research Assistant',
            organization: 'Prof. Sharma Lab',
            status: 'Applied',
            appliedDate: 'Oct 5, 2026',
            nextStep: 'Awaiting Shortlist'
        },
        {
            id: '3',
            role: 'Event Volunteer',
            organization: 'NSS Unit',
            status: 'Verified',
            appliedDate: 'Sep 15, 2026',
        }
    ];

    const filteredApps = activeTab === 'All'
        ? applications
        : applications.filter(app => app.status === activeTab);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Applied': return 'neutral';
            case 'In Progress': return 'primary';
            case 'Under Review': return 'warning';
            case 'Verified': return 'success';
            default: return 'neutral';
        }
    };

    const tabs = ['All', 'Applied', 'In Progress', 'Verified'];

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-10">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">My Applications</h1>
                    <Button variant="primary" size="sm">Find More</Button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 text-sm font-medium transition-colors relative
                ${activeTab === tab ? 'text-primary' : 'text-secondary hover:text-white'}
              `}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_-2px_8px_rgba(79,70,229,0.5)]" />
                            )}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="flex flex-col gap-4">
                    {filteredApps.length > 0 ? (
                        filteredApps.map(app => (
                            <Card key={app.id} className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-6" hover>
                                <div className="w-12 h-12 rounded-lg bg-white/5 flex-center shrink-0">
                                    <Building2 size={24} className="text-secondary" />
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-lg font-bold text-white">{app.role}</h3>
                                    <p className="text-secondary text-sm">{app.organization}</p>
                                </div>

                                <div className="flex flex-col items-center md:items-end gap-1 min-w-[140px]">
                                    <Badge variant={getStatusColor(app.status) as 'primary' | 'success' | 'warning' | 'danger' | 'neutral'} verified={app.status === 'Verified'}>
                                        {app.status}
                                    </Badge>
                                    <span className="text-xs text-muted flex items-center gap-1">
                                        <Calendar size={12} /> {app.appliedDate}
                                    </span>
                                </div>

                                {app.nextStep && (
                                    <div className="bg-primary/10 px-3 py-2 rounded-lg border border-primary/20 text-xs text-primary min-w-[200px] text-center">
                                        <span className="block font-semibold mb-0.5">Next Step:</span>
                                        {app.nextStep}
                                    </div>
                                )}

                                <Button variant="ghost" size="sm" className="text-secondary hover:text-white shrink-0">
                                    <ChevronRight size={20} />
                                </Button>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-20 text-muted">
                            <Clock size={48} className="mx-auto mb-4 opacity-50" />
                            <p>No applications found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default Applications;
