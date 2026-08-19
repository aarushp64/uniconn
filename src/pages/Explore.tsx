import { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { OpportunityCard, type OpportunityProps } from '../components/features/opportunities/OpportunityCard';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

const OPPS: OpportunityProps[] = [
    { id: 'o1', title: 'SDE Intern – Backend', organization: 'Microsoft (On-Campus Drive)', type: 'Job', skills: ['C++', 'DSA', 'System Design'], postedDaysAgo: 1, featured: true },
    { id: 'o2', title: 'Aerodynamics Design Lead', organization: 'Speedtail Racing – MIT ADTU', type: 'Club Role', skills: ['CFD', 'SolidWorks', 'Aero'], postedDaysAgo: 1, featured: true },
    {
        id: 'o3', title: 'ML Research Assistant', organization: "Dr. Patil's AI Lab – MIT-SOE", type: 'Research', skills: ['PyTorch', 'NLP', 'Python'], postedDaysAgo: 2, featured: true
    },
    { id: 'o4', title: 'Full Stack Developer', organization: 'MIT ADTU E-Cell Incubator', type: 'Job', skills: ['React', 'Node.js', 'MongoDB'], postedDaysAgo: 2, featured: false },
    { id: 'o5', title: 'Persona Fest 2026 – Tech Head', organization: 'Persona Fest OC', type: 'Club Role', skills: ['Event Mgmt', 'Leadership', 'Tech'], postedDaysAgo: 3, featured: true },
    { id: 'o6', title: 'IoT Smart Campus Project', organization: 'MIT Innovation Hub', type: 'Project', skills: ['Arduino', 'Sensors', 'Cloud'], postedDaysAgo: 3, featured: false },
    { id: 'o7', title: 'EV Battery Research Intern', organization: 'MIT-SOE Electrical Dept', type: 'Research', skills: ['EV Systems', 'MATLAB', 'Testing'], postedDaysAgo: 4, featured: false },
    { id: 'o8', title: 'UI/UX Design Intern', organization: 'MIT Institute of Design (MID)', type: 'Job', skills: ['Figma', 'Prototyping', 'UX Research'], postedDaysAgo: 4, featured: false },
    { id: 'o9', title: 'Video Editor & Filmmaker', organization: 'Raj Kapoor Film Club', type: 'Club Role', skills: ['Premiere Pro', 'Cinematography'], postedDaysAgo: 5, featured: false },
    { id: 'o10', title: 'Data Analyst Intern', organization: 'Deloitte (On-Campus Partner)', type: 'Job', skills: ['SQL', 'Python', 'Tableau'], postedDaysAgo: 5, featured: true },
    { id: 'o11', title: 'Drone Swarm Researcher', organization: 'MIT ADTU Robotics Lab', type: 'Research', skills: ['ROS', 'Python', 'Embedded'], postedDaysAgo: 6, featured: false },
    { id: 'o12', title: 'Social Media Manager', organization: 'NSS MIT ADTU', type: 'Club Role', skills: ['Content', 'Canva', 'Analytics'], postedDaysAgo: 6, featured: false },
    { id: 'o13', title: 'Mobile App Developer', organization: 'GDSC MIT ADTU', type: 'Project', skills: ['Flutter', 'Dart', 'Firebase'], postedDaysAgo: 7, featured: false },
    { id: 'o14', title: 'Cybersecurity Analyst Trainee', organization: 'MIT CBC × CyberPeace', type: 'Job', skills: ['Pentesting', 'Linux', 'Networking'], postedDaysAgo: 7, featured: false },
    { id: 'o15', title: 'Campus App Backend Lead', organization: 'UniConn Project Team', type: 'Project', skills: ['Express', 'PostgreSQL', 'Docker'], postedDaysAgo: 8, featured: false },
];

const Explore = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    const tabs = ['All', 'Club Role', 'Research', 'Project', 'Job'];

    const filteredOpps = OPPS
        .filter(opp => {
            const matchesTab = activeTab === 'All' || opp.type === activeTab;
            const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                opp.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesTab && matchesSearch;
        })
        .sort((a, b) => sortOrder === 'newest' ? a.postedDaysAgo - b.postedDaysAgo : b.postedDaysAgo - a.postedDaysAgo);

    return (
        <MainLayout>
            <div className="flex flex-col gap-5 pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div className="text-left">
                        <h1 className="text-xl font-bold text-slate-900 mb-0.5">Explore Opportunities</h1>
                        <p className="text-xs text-slate-500">Discover roles that match your skills • {OPPS.length} listings</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" size="sm" leftIcon={<Filter size={14} />} onClick={() => { setSearchQuery(''); setActiveTab('All'); }}>Reset</Button>
                        <Button variant="primary" size="sm" leftIcon={<SlidersHorizontal size={14} />} onClick={() => setSortOrder(p => p === 'newest' ? 'oldest' : 'newest')}>
                            {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
                        </Button>
                    </div>
                </div>

                {/* Search */}
                <Input
                    placeholder="Search by role, organization, or skill..."
                    leftIcon={<Search size={16} />}
                    className="mb-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    fullWidth
                />

                {/* Tabs */}
                <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar">
                    {tabs.map(tab => {
                        const colors: Record<string, { active: string; inactive: string }> = {
                            'All': { active: 'bg-slate-800 text-white border-slate-800', inactive: 'bg-white text-slate-600 border-slate-200 hover:border-slate-400' },
                            'Club Role': { active: 'bg-slate-600 text-white border-slate-600', inactive: 'bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-400' },
                            'Research': { active: 'bg-emerald-600 text-white border-emerald-600', inactive: 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:border-emerald-400' },
                            'Project': { active: 'bg-amber-600 text-white border-amber-600', inactive: 'bg-amber-50 text-amber-600 border-amber-200 hover:border-amber-400' },
                            'Job': { active: 'bg-sky-600 text-white border-sky-600', inactive: 'bg-sky-50 text-sky-600 border-sky-200 hover:border-sky-400' },
                        };
                        const c = colors[tab] || colors['All'];
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all whitespace-nowrap border active:scale-95 uppercase tracking-wider ${activeTab === tab ? c.active : c.inactive}`}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </div>

                {/* Count */}
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    {filteredOpps.length} {filteredOpps.length === 1 ? 'opportunity' : 'opportunities'} found
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredOpps.length > 0 ? (
                        filteredOpps.map(opp => (
                            <OpportunityCard key={opp.id} {...opp} />
                        ))
                    ) : (
                        <div className="col-span-full py-16 text-center">
                            <p className="text-sm text-slate-400 mb-3">No opportunities found.</p>
                            <button onClick={() => { setSearchQuery(''); setActiveTab('All'); }} className="text-xs text-sky-600 font-bold hover:underline">Clear all filters</button>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default Explore;
