
import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Users, Search } from 'lucide-react';

interface Club {
    name: string;
    subtitle: string;
    desc: string;
    emoji: string;
    gradient: string;
    members: string;
    badge: string;
    badgeVariant: 'success' | 'primary' | 'secondary' | 'warning';
    cta?: string;
}

const ALL_CLUBS: Club[] = [
    { name: 'MIT Debate Society', subtitle: 'MUN & Parliamentary Debate', desc: 'Inter-college MUN conferences, parliamentary debates, and public speaking workshops. National finalists at IIMUN 2025.', emoji: '🏛️', gradient: 'from-indigo-600 to-blue-600', members: '95+', badge: 'Active', badgeVariant: 'success', cta: 'Join Next MUN' },
    { name: 'GDSC MIT ADTU', subtitle: 'Google Developer Student Clubs', desc: 'Community focused on Google Technologies. Flutter, Cloud, ML workshops every month. Open to all branches.', emoji: '🚀', gradient: 'from-blue-500 via-red-500 to-green-500', members: '300+', badge: 'Member', badgeVariant: 'secondary' },
    { name: 'MIT CBC', subtitle: 'Cybersecurity & Blockchain Club', desc: 'Deep diving into network security, cryptography, and decentralized apps. CTF winners 2025.', emoji: '🛡️', gradient: 'from-slate-800 to-indigo-900', members: '85+', badge: 'Lead', badgeVariant: 'primary' },
    { name: 'IEEE MIT ADTU', subtitle: 'IEEE Student Branch', desc: "One of India's most active IEEE branches. TechX Hackathon, research paper publications, and global networking.", emoji: '⚡', gradient: 'from-blue-700 to-blue-500', members: '200+', badge: 'Active', badgeVariant: 'success' },
    { name: 'ACM MIT ADTU', subtitle: 'Association for Computing Machinery', desc: 'Competitive programming, DSA workshops, and coding contests. ICPC practice sessions every week.', emoji: '💻', gradient: 'from-indigo-600 to-violet-600', members: '150+', badge: 'Member', badgeVariant: 'secondary' },
    { name: 'Speedtail Racing', subtitle: 'Formula SAE Team', desc: 'Designing and building formula-style race cars. Winners of Formula Bharat 2026.', emoji: '🏎️', gradient: 'from-slate-600 to-slate-800', members: '90+', badge: 'Active', badgeVariant: 'success' },
    { name: 'Trek N Trail', subtitle: 'MIT ADTU Adventure Club', desc: 'Exploring Sahyadris one fort at a time. Weekend treks, camping, rappelling, and nature photography.', emoji: '🏔️', gradient: 'from-emerald-500 to-teal-700', members: '250+', badge: 'Joined', badgeVariant: 'success' },
    { name: 'Persona Fest OC', subtitle: 'Annual Techno-Cultural Festival', desc: "Pune's biggest college fest. Star nights, hackathons, dance battles, and 15000+ footfall.", emoji: '🎭', gradient: 'from-violet-500 to-purple-600', members: '500+', badge: 'Volunteer', badgeVariant: 'primary', cta: 'Apply for OC' },
    { name: 'Raj Kapoor Film Club', subtitle: 'MIT School of Film & Media', desc: 'Screening world cinema, short film production, and discussions with industry professionals.', emoji: '🎬', gradient: 'from-amber-500 to-rose-600', members: '70+', badge: 'Member', badgeVariant: 'secondary' },
    { name: 'ELC MIT ADTU', subtitle: 'Electoral Literacy Club', desc: 'Promoting democratic awareness and civic duty among youth. Voter registration drives and awareness campaigns.', emoji: '🗳️', gradient: 'from-blue-700 to-sky-400', members: '60+', badge: 'Volunteer', badgeVariant: 'primary' },
    { name: 'MIT Entrepreneurship Cell', subtitle: 'E-Cell • Startup Incubation', desc: 'Fostering startup culture. Pitch competitions, mentorship programs, and investor networking events.', emoji: '🚀', gradient: 'from-amber-500 to-yellow-500', members: '180+', badge: 'Active', badgeVariant: 'success' },
    { name: 'NSS MIT ADTU', subtitle: 'National Service Scheme', desc: 'Social service and community development. Blood donation drives, village adoption, and awareness campaigns.', emoji: '🤝', gradient: 'from-sky-600 to-sky-400', members: '400+', badge: 'Member', badgeVariant: 'secondary' },
    { name: 'CodeChef MIT ADTU', subtitle: 'Competitive Programming Chapter', desc: 'Daily coding challenges, CodeChef contests, and interview prep. LeetCode grinding sessions.', emoji: '🧑‍💻', gradient: 'from-green-600 to-emerald-500', members: '220+', badge: 'Active', badgeVariant: 'success' },
    { name: 'Panchayati Drama', subtitle: 'MIT ADTU Theatre Group', desc: 'Street plays, one-act competitions, and Firodiya Karandak preparation.', emoji: '🎭', gradient: 'from-pink-500 to-rose-600', members: '100+', badge: 'Member', badgeVariant: 'secondary' },
    { name: 'Vishwanath Sports', subtitle: 'VSM Organizing Committee', desc: 'Organizing the mega Vishwanath Sports Meet every year. Cricket, football, basketball leagues.', emoji: '🏆', gradient: 'from-purple-500 to-indigo-600', members: '130+', badge: 'Member', badgeVariant: 'secondary' },
    { name: 'Dance Club', subtitle: 'MIT ADTU Groove Society', desc: 'Hip-hop, contemporary, classical, and freestyle. Inter-college dance competitions and flash mobs.', emoji: '💃', gradient: 'from-rose-500 to-pink-500', members: '110+', badge: 'Member', badgeVariant: 'secondary' },
];

const Clubs = () => {
    const [search, setSearch] = useState('');

    const filtered = ALL_CLUBS.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.subtitle.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <MainLayout>
            <div className="flex flex-col gap-5 animate-fade-in pb-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-left">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Users size={20} className="text-sky-500" /> Clubs & Communities
                        </h1>
                        <p className="text-xs text-slate-500 mt-0.5">{ALL_CLUBS.length} active clubs at MIT ADTU</p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search clubs..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-sky-300 transition-colors"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filtered.map(club => (
                        <Card key={club.name} className="p-0 overflow-hidden text-left hover:shadow-md transition-shadow cursor-pointer">
                            <div className={`h-24 bg-gradient-to-r ${club.gradient} relative`}>
                                <div className="absolute -bottom-8 left-5">
                                    <div className="w-16 h-16 rounded-2xl bg-white border-4 border-white flex items-center justify-center text-2xl shadow-md">
                                        {club.emoji}
                                    </div>
                                </div>
                            </div>
                            <div className="pt-10 px-5 pb-4">
                                <div className="flex justify-between items-start mb-1.5">
                                    <div>
                                        <h2 className="text-sm font-bold text-slate-900">{club.name}</h2>
                                        <p className="text-[11px] text-slate-500 font-medium">{club.subtitle}</p>
                                    </div>
                                    <Badge variant={club.badgeVariant}>{club.badge}</Badge>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed mb-3 line-clamp-2">{club.desc}</p>
                                <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    <span>{club.members} Members</span>
                                    {club.cta && <span className="text-sky-600 hover:underline cursor-pointer">{club.cta}</span>}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default Clubs;
