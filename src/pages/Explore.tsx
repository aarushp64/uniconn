import { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { OpportunityCard, type OpportunityProps } from '../components/features/opportunities/OpportunityCard';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

const Explore = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const activeFilters = ['Remote', 'Paid']; // Mock active filters

    const opportunities: OpportunityProps[] = [
        {
            id: '1',
            title: 'Frontend Developer',
            organization: 'Coding Club',
            type: 'Club Role',
            skills: ['React', 'CSS', 'Figma'],
            postedDaysAgo: 2,
            featured: true
        },
        {
            id: '2',
            title: 'AI Research Assistant',
            organization: 'Prof. Sharma Lab',
            type: 'Research',
            skills: ['Python', 'PyTorch', 'Data Science'],
            postedDaysAgo: 5
        },
        {
            id: '3',
            title: 'Event Manager',
            organization: 'Cultural Fest',
            type: 'Club Role',
            skills: ['Management', 'Communication'],
            postedDaysAgo: 1
        },
        {
            id: '4',
            title: 'Full Stack Intern',
            organization: 'EdTech Startup',
            type: 'Job',
            skills: ['Node.js', 'React', 'MongoDB'],
            postedDaysAgo: 7
        },
        {
            id: '5',
            title: 'Robot Control Systems',
            organization: 'Robotics Group',
            type: 'Project',
            skills: ['C++', 'ROS', 'Embedded'],
            postedDaysAgo: 3
        },
        {
            id: '6',
            title: 'Blockchain Developer',
            organization: 'Web3 Society',
            type: 'Project',
            skills: ['Solidity', 'Ethereum', 'Smart Contracts'],
            postedDaysAgo: 1,
            featured: true
        },
        {
            id: '7',
            title: 'Technical Content Writer',
            organization: 'Campus Mag',
            type: 'Club Role',
            skills: ['Writing', 'Tech', 'Journalism'],
            postedDaysAgo: 4
        },
        {
            id: '8',
            title: 'Cybersecurity Analyst',
            organization: 'InfoSec Team',
            type: 'Job',
            skills: ['Network Security', 'Linux', 'Ethical Hacking'],
            postedDaysAgo: 6
        },
        {
            id: '9',
            title: 'Game Designer',
            organization: 'Indie Game Club',
            type: 'Project',
            skills: ['Unity', 'C#', 'Blender'],
            postedDaysAgo: 2
        },
        {
            id: '10',
            title: 'Data Analyst Intern',
            organization: 'FinTech Corp',
            type: 'Job',
            skills: ['SQL', 'Python', 'Tableau'],
            postedDaysAgo: 5
        }
    ];

    const tabs = ['All', 'Club Role', 'Research', 'Project', 'Job'];

    const filteredOpps = opportunities.filter(opp => {
        const matchesTab = activeTab === 'All' || opp.type === activeTab;
        const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            opp.organization.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <MainLayout>
            <div className="flex flex-col gap-6 pb-10">

                {/* Header & Search */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">Explore Opportunities</h1>
                        <p className="text-secondary">Discover roles that match your skills and interests</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" leftIcon={<Filter size={18} />}>Filter</Button>
                        <Button variant="primary" leftIcon={<SlidersHorizontal size={18} />}>Sort</Button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Input
                        placeholder="Search by role, club, or skill..."
                        leftIcon={<Search size={20} />}
                        className="mb-0"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        fullWidth
                    />
                </div>

                {/* Filters & Tags */}
                <div className="flex flex-col gap-4">
                    <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                            ${activeTab === tab
                                        ? 'bg-primary text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]'
                                        : 'bg-glass-surface text-secondary hover:text-white border border-glass-border hover:border-gray-500'
                                    }
                        `}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2 items-center text-sm text-secondary">
                        <span>Active Filters:</span>
                        {activeFilters.map(filter => (
                            <Badge key={filter} variant="neutral" className="px-2 py-1">
                                {filter} <span className="ml-1 cursor-pointer hover:text-white">×</span>
                            </Badge>
                        ))}
                        <span className="text-primary hover:underline cursor-pointer ml-2">Clear All</span>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
                    {filteredOpps.length > 0 ? (
                        filteredOpps.map(opp => (
                            <OpportunityCard key={opp.id} {...opp} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-muted">
                            <p className="text-lg">No opportunities found matching your criteria.</p>
                        </div>
                    )}
                </div>

            </div>
        </MainLayout>
    );
};

export default Explore;
