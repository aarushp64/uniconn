import { useState } from 'react';
import { BadgeCheck, MessageSquare, Share2, Bookmark, Send, X, ThumbsUp, Repeat2 } from 'lucide-react';

/* ─── Types ─── */
type TagType = 'All' | 'Club Role' | 'Research' | 'Project' | 'Job' | 'Event' | 'Achievement' | 'Workshop' | 'Placement' | 'Sports' | 'Cultural' | 'Tech';

interface Post {
    id: string;
    content: string;
    img: string;
    timeAgo: string;
    name: string;
    headline: string;
    initials: string;
    gradient: string;
    likes: number;
    comments: number;
    reposts: number;
    tag: TagType;
}

/* ─── Tag Styles ─── */
const TAG_STYLE: Record<string, { bg: string; text: string; border: string; activeBg: string }> = {
    'All': { bg: 'bg-slate-900', text: 'text-white', border: 'border-slate-900', activeBg: 'bg-slate-900' },
    'Club Role': { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', activeBg: 'bg-violet-500' },
    'Research': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', activeBg: 'bg-emerald-500' },
    'Project': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', activeBg: 'bg-amber-500' },
    'Job': { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200', activeBg: 'bg-sky-500' },
    'Event': { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', activeBg: 'bg-rose-500' },
    'Achievement': { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', activeBg: 'bg-indigo-500' },
    'Workshop': { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', activeBg: 'bg-teal-500' },
    'Placement': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', activeBg: 'bg-blue-500' },
    'Sports': { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', activeBg: 'bg-orange-500' },
    'Cultural': { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200', activeBg: 'bg-pink-500' },
    'Tech': { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', activeBg: 'bg-cyan-500' },
};

const TAGS: TagType[] = ['All', 'Club Role', 'Research', 'Project', 'Job', 'Event', 'Achievement', 'Workshop', 'Placement', 'Sports', 'Cultural', 'Tech'];

/* ─── Posts ─── */
const POSTS: Post[] = [
    {
        id: '1', timeAgo: '2h', likes: 342, comments: 28, reposts: 15, tag: 'Achievement',
        name: 'MIT ADTU Official', headline: 'Official Campus Page', initials: 'MI', gradient: 'from-sky-600 to-sky-500',
        content: 'Congratulations to our students! 🎓 MIT ADTU achieves 94% placement rate for the 2026 batch with the highest package at ₹52 LPA (Google). Average CTC up 22% from last year. Hard work pays off!',
        img: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop',
    },
    {
        id: '2', timeAgo: '3h', likes: 156, comments: 12, reposts: 8, tag: 'Workshop',
        name: 'GDSC MIT ADTU', headline: 'Google Developer Student Clubs', initials: 'GD', gradient: 'from-emerald-500 to-teal-500',
        content: "GDSC is hosting a 'Flutter Forward' workshop this Friday! 🚀 Build cross-platform apps from scratch. Limited seats — MITSOE Lab 4.",
        img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop',
    },
    {
        id: '3', timeAgo: '5h', likes: 520, comments: 45, reposts: 32, tag: 'Cultural',
        name: 'MIT Cultural Committee', headline: 'Cultural Activities • MIT ADTU', initials: 'CC', gradient: 'from-amber-500 to-orange-500',
        content: 'Celebrating Swarajya! ✊ Shiv Jayanti celebrations at MIT ADTU main gate were grand today.',
        img: 'https://images.unsplash.com/photo-1533174072734-9285c5a2d7e1?w=800&h=400&fit=crop',
    },
    {
        id: '4', timeAgo: '6h', likes: 890, comments: 67, reposts: 54, tag: 'Event',
        name: 'Persona Fest 2026', headline: 'Annual Techno-Cultural Festival', initials: 'PF', gradient: 'from-violet-500 to-purple-500',
        content: "Persona Fest 2026 is LIVE! 🎭 Pune's biggest techno-cultural fest. Star performances, hackathons, and global food tech events.",
        img: 'https://images.unsplash.com/photo-1492684223f0-9dc72cd2b7b0?w=800&h=400&fit=crop',
    },
    {
        id: '5', timeAgo: '8h', likes: 234, comments: 19, reposts: 11, tag: 'Sports',
        name: 'Adventure Club', headline: 'Trek N Trail • MIT ADTU', initials: 'TT', gradient: 'from-teal-500 to-cyan-500',
        content: 'Weekend vibes! 🏔️ Rajmachi Fort trek this Sunday. Register at the student center by Thursday. 40 seats only!',
        img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=400&fit=crop',
    },
    {
        id: '6', timeAgo: '10h', likes: 178, comments: 14, reposts: 9, tag: 'Research',
        name: 'Rahul Deshmukh', headline: 'B.Tech CSE Final Year', initials: 'RD', gradient: 'from-rose-500 to-pink-500',
        content: 'Our AI-based Water Management research paper got accepted at IEEE CONECCT 2026! 💧 Thanks to Dr. Patil for the mentorship.',
        img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=400&fit=crop',
    },
    {
        id: '7', timeAgo: '12h', likes: 312, comments: 22, reposts: 18, tag: 'Placement',
        name: 'MIT Placement Cell', headline: 'Training & Placement Office', initials: 'PC', gradient: 'from-sky-500 to-blue-600',
        content: 'Microsoft is hiring! 🚀 On-campus drive on March 5 for SDE roles. Eligible: CSE, IT, AI&ML. Package: 18-44 LPA. Register by Feb 28.',
        img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop',
    },
    {
        id: '8', timeAgo: '14h', likes: 95, comments: 8, reposts: 4, tag: 'Project',
        name: 'Anita Patel', headline: 'Food Technology • MIT ADTU', initials: 'AP', gradient: 'from-indigo-500 to-blue-500',
        content: 'Food Tech Expo project demo! 🍽️ Sustainable packaging from agri-waste. Prototype ready for industry testing.',
        img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop',
    },
    {
        id: '9', timeAgo: '16h', likes: 445, comments: 36, reposts: 21, tag: 'Tech',
        name: 'IEEE MIT ADTU', headline: 'IEEE Student Branch', initials: 'IE', gradient: 'from-blue-600 to-indigo-600',
        content: 'IEEE TechX Hackathon registrations are open! 48-hour hackathon at MITSOE. ₹50K prize pool. Teams of 3-4.',
        img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop',
    },
    {
        id: '10', timeAgo: '1d', likes: 267, comments: 15, reposts: 12, tag: 'Club Role',
        name: 'Robotics Club', headline: 'MIT ADTU Robotics Society', initials: 'RC', gradient: 'from-slate-600 to-slate-800',
        content: 'Looking for new members! 🤖 If you love building robots, join us every Saturday at the mechatronics lab. Arduino × ROS workshop next week.',
        img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
    },
    {
        id: '11', timeAgo: '1d', likes: 198, comments: 11, reposts: 7, tag: 'Achievement',
        name: 'Aarush Parate', headline: 'B.Tech CSE (AI & ML)', initials: 'AP', gradient: 'from-sky-600 to-teal-500',
        content: 'Thrilled to share — our team won 1st place at Smart India Hackathon 2026! 🏅 Built an AI crop disease detector in 36 hours.',
        img: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop',
    },
    {
        id: '12', timeAgo: '2d', likes: 134, comments: 9, reposts: 5, tag: 'Workshop',
        name: 'MIT CBC', headline: 'Cybersecurity & Blockchain Club', initials: 'CB', gradient: 'from-slate-800 to-indigo-900',
        content: 'CTF Workshop this Saturday! 🛡️ Learn pentesting, exploit development, and reverse engineering. Beginners welcome.',
        img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop',
    },
    {
        id: '13', timeAgo: '2d', likes: 678, comments: 52, reposts: 38, tag: 'Placement',
        name: 'MIT Placement Cell', headline: 'Training & Placement Office', initials: 'PC', gradient: 'from-sky-500 to-blue-600',
        content: 'Record placements! 📊 MIT ADTU 2026 batch — 94% placement rate. Highest package: ₹52 LPA (Google). Average: ₹8.2 LPA.',
        img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop',
    },
    {
        id: '14', timeAgo: '3d', likes: 89, comments: 6, reposts: 3, tag: 'Sports',
        name: 'MIT Sports Committee', headline: 'Inter-University Sports', initials: 'SC', gradient: 'from-green-500 to-emerald-600',
        content: "MIT ADTU Basketball team qualifies for Pune University finals! 🏀 Semi-final win against COEP. Let's go Titans!",
        img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=400&fit=crop',
    },
    {
        id: '15', timeAgo: '3d', likes: 256, comments: 18, reposts: 14, tag: 'Club Role',
        name: 'E-Cell MIT ADTU', headline: 'Entrepreneurship Cell', initials: 'EC', gradient: 'from-orange-500 to-red-500',
        content: 'E-Cell Pitch Day is here! 💡 12 student startups pitching to real investors this Saturday. Winner gets ₹2L seed funding + incubation at MIT TBI. Open for audience — learn how to pitch!',
        img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
    },
    {
        id: '16', timeAgo: '3d', likes: 189, comments: 22, reposts: 10, tag: 'Research',
        name: 'Priya Kulkarni', headline: 'M.Tech Data Science • MIT ADTU', initials: 'PK', gradient: 'from-emerald-600 to-teal-600',
        content: 'Published my first research paper! 📝 "Federated Learning for Healthcare Data Privacy" accepted at ICML 2026. Grateful to my guide Dr. Anil Sharma for constant support throughout this journey.',
        img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=400&fit=crop',
    },
    {
        id: '17', timeAgo: '4d', likes: 145, comments: 11, reposts: 8, tag: 'Workshop',
        name: 'Photography Club', headline: 'MIT ADTU Lens Society', initials: 'LS', gradient: 'from-pink-500 to-rose-500',
        content: 'Photography Masterclass this weekend! 📸 Pro photographer Amit Mehra covering composition, lighting, and post-processing. Bring your DSLRs and phones. Open to all years.',
        img: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=400&fit=crop',
    },
    {
        id: '18', timeAgo: '4d', likes: 312, comments: 27, reposts: 16, tag: 'Tech',
        name: 'Coding Club MIT ADTU', headline: 'Competitive Programming Society', initials: 'CP', gradient: 'from-cyan-600 to-blue-600',
        content: 'Weekly CP contest results are out! 🏆 Top 3: Vikram (2100 rating), Sneha (1950), Aarush (1890). Next contest: LeetCode Biweekly #142 — study group at Library Hall B, Thursday 7 PM.',
        img: 'https://images.unsplash.com/photo-1515879218367-8466d910auj7?w=800&h=400&fit=crop',
    },
    {
        id: '19', timeAgo: '4d', likes: 423, comments: 35, reposts: 22, tag: 'Event',
        name: 'NSS MIT ADTU', headline: 'National Service Scheme Unit', initials: 'NS', gradient: 'from-green-600 to-emerald-500',
        content: 'Blood Donation Drive was a huge success! 🩸 187 units collected at MIT campus today. Thank you to every donor and volunteer. Next camp: Tree Plantation at Loni Kalbhor village this Sunday.',
        img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop',
    },
    {
        id: '20', timeAgo: '5d', likes: 167, comments: 13, reposts: 9, tag: 'Project',
        name: 'Vikram Desai', headline: 'B.Tech Electronics • MIT ADTU', initials: 'VD', gradient: 'from-amber-600 to-yellow-500',
        content: 'EV Battery Thermal Management System prototype complete! ⚡ Reduced overheating by 35% using AI-driven cooling. Dr. Patil verified it as publication-worthy. Working on IEEE paper now.',
        img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=400&fit=crop',
    },
    {
        id: '21', timeAgo: '5d', likes: 210, comments: 16, reposts: 11, tag: 'Club Role',
        name: 'Debate Society', headline: 'MIT ADTU MUN & Debate Club', initials: 'DS', gradient: 'from-violet-600 to-purple-600',
        content: 'MIT ADTU MUN 2026 registrations open! 🏛️ 6 committees, 200+ delegates, guest secretary from UN Youth India. Early bird discount ends Feb 25. Prep sessions every Wednesday at Seminar Hall.',
        img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=400&fit=crop',
    },
    {
        id: '22', timeAgo: '5d', likes: 378, comments: 29, reposts: 20, tag: 'Achievement',
        name: 'MIT ADTU Official', headline: 'Official Campus Page', initials: 'MI', gradient: 'from-sky-600 to-sky-500',
        content: '🎯 MIT ADTU ranks #3 among Pune private universities in NIRF 2026! Up 7 positions from last year. Research output grew 40%, placement rate hit 94%. Proud moment for the entire MIT family!',
        img: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&h=400&fit=crop',
    },
    {
        id: '23', timeAgo: '6d', likes: 134, comments: 10, reposts: 6, tag: 'Workshop',
        name: 'Music Club', headline: 'Rhythm & Blues • MIT ADTU', initials: 'MC', gradient: 'from-rose-500 to-pink-600',
        content: 'Open Mic Night this Friday! 🎵 Sign up at the Student Activity Center. Acoustic sets, beatboxing, and spoken word all welcome. Last month we had 25 performers — lets beat that record!',
        img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=400&fit=crop',
    },
    {
        id: '24', timeAgo: '6d', likes: 198, comments: 15, reposts: 9, tag: 'Research',
        name: 'Dr. Meera Joshi Lab', headline: 'NLP Research Group • MIT ADTU', initials: 'NR', gradient: 'from-indigo-600 to-violet-600',
        content: 'Looking for 3 undergrad research interns! 🔬 Working on Transformer-based Code Summarization for Indian Languages. Prereqs: Python, basic NLP, curiosity. Stipend provided. DM or visit CS-304.',
        img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
    },
    {
        id: '25', timeAgo: '1w', likes: 245, comments: 20, reposts: 13, tag: 'Tech',
        name: 'ACM MIT ADTU', headline: 'ACM Student Chapter', initials: 'AC', gradient: 'from-blue-700 to-indigo-700',
        content: 'ACM Tech Talk: "Building Scalable Systems at Netflix" by MIT ADTU alumnus Rohan Mehta (SDE-3, Netflix). 📺 This Saturday, 3 PM, Auditorium B. Free for ACM members, ₹50 for others.',
        img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop',
    },
];

const Feed = () => {
    const [liked, setLiked] = useState<Set<string>>(new Set());
    const [saved, setSaved] = useState<Set<string>>(new Set());
    const [commenting, setCommenting] = useState<string | null>(null);
    const [commentText, setCommentText] = useState('');
    const [toast, setToast] = useState('');
    const [activeTag, setActiveTag] = useState<TagType>('All');

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2000); };

    const filteredPosts = activeTag === 'All' ? POSTS : POSTS.filter(p => p.tag === activeTag);

    return (
        <div className="flex flex-col gap-0 animate-fade-in relative text-left">
            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-semibold px-4 py-2.5 rounded-lg shadow-2xl z-50 animate-fade-in">
                    {toast}
                </div>
            )}

            {/* Scrollable Filter Tags */}
            <div className="bg-white border-b border-slate-100 px-4 py-3 overflow-x-auto no-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div className="flex gap-2 min-w-max">
                    {TAGS.map(tag => {
                        const cfg = TAG_STYLE[tag] || TAG_STYLE['All'];
                        const isActive = activeTag === tag;
                        return (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide border whitespace-nowrap transition-all active:scale-95 ${isActive
                                    ? tag === 'All' ? 'bg-slate-900 text-white border-slate-900' : `${cfg.activeBg} text-white border-transparent`
                                    : `${cfg.bg} ${cfg.text} ${cfg.border} hover:shadow-sm`
                                    }`}
                            >
                                {tag}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Posts */}
            {filteredPosts.length === 0 && (
                <div className="py-16 text-center"><p className="text-sm text-slate-400">No posts for this filter yet</p></div>
            )}

            {filteredPosts.map(post => {
                const isLiked = liked.has(post.id);
                const isSaved = saved.has(post.id);
                const likeCount = post.likes + (isLiked ? 1 : 0);
                const tagCfg = TAG_STYLE[post.tag] || TAG_STYLE['All'];

                return (
                    <article key={post.id} className="bg-white border-b border-slate-100">
                        {/* Author */}
                        <div className="px-4 pt-3 pb-2 flex gap-2.5">
                            <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${post.gradient} flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-sm`}>
                                {post.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1">
                                    <span className="text-[13px] font-semibold text-slate-900 truncate">{post.name}</span>
                                    <BadgeCheck size={14} className="text-sky-500 fill-sky-50 shrink-0" />
                                </div>
                                <p className="text-[11px] text-slate-500 leading-tight truncate">{post.headline}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] text-slate-400">{post.timeAgo}</span>
                                    <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full ${tagCfg.bg} ${tagCfg.text} border ${tagCfg.border}`}>{post.tag}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => { setSaved(p => { const n = new Set(p); n.has(post.id) ? n.delete(post.id) : n.add(post.id); return n; }); }}
                                className="self-start p-1.5 rounded-full hover:bg-slate-50 transition-colors"
                            >
                                <Bookmark size={16} className={isSaved ? 'fill-sky-500 text-sky-500' : 'text-slate-300'} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-4 pb-2">
                            <p className="text-[13px] text-slate-800 leading-[1.55]">{post.content}</p>
                        </div>

                        {/* Image */}
                        <div className="cursor-pointer group/img">
                            <img
                                src={post.img}
                                alt=""
                                className="w-full h-56 object-cover group-hover/img:brightness-95 transition-all"
                                loading="lazy"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                        </div>

                        {/* Stats */}
                        <div className="px-4 py-1.5 flex items-center text-[11px] text-slate-400">
                            <span className="flex items-center gap-1">
                                <span className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center"><ThumbsUp size={9} className="text-white" /></span>
                                {likeCount}
                            </span>
                            <span className="ml-auto flex gap-3">
                                <span>{post.comments} comments</span>
                                <span>{post.reposts} reposts</span>
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex border-t border-slate-100 mx-4">
                            {[
                                { icon: <ThumbsUp size={16} className={isLiked ? 'fill-sky-600' : ''} />, label: 'Like', active: isLiked, onClick: () => setLiked(p => { const n = new Set(p); n.has(post.id) ? n.delete(post.id) : n.add(post.id); return n; }) },
                                { icon: <MessageSquare size={16} />, label: 'Comment', active: commenting === post.id, onClick: () => { setCommenting(commenting === post.id ? null : post.id); setCommentText(''); } },
                                { icon: <Repeat2 size={16} />, label: 'Repost', active: false, onClick: () => showToast('✅ Reposted!') },
                                { icon: <Share2 size={16} />, label: 'Send', active: false, onClick: () => showToast('✅ Link copied!') },
                            ].map(btn => (
                                <button
                                    key={btn.label}
                                    onClick={btn.onClick}
                                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[12px] font-medium transition-all hover:bg-slate-50 active:bg-slate-100 rounded-lg ${btn.active ? 'text-sky-600' : 'text-slate-500'}`}
                                >
                                    {btn.icon} {btn.label}
                                </button>
                            ))}
                        </div>

                        {/* Comment Box */}
                        {commenting === post.id && (
                            <div className="px-4 py-3 bg-slate-50/80 border-t border-slate-100 animate-fade-in">
                                <div className="flex gap-2 items-center">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center text-white text-[9px] font-bold shrink-0">AP</div>
                                    <div className="flex-1 flex items-center bg-white rounded-full border border-slate-200 focus-within:border-sky-300 overflow-hidden">
                                        <input type="text" value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Add a comment..." className="flex-1 px-3 py-2 text-[12px] bg-transparent outline-none" autoFocus />
                                        <button className="px-2 text-slate-300 hover:text-slate-500" onClick={() => { setCommenting(null); setCommentText(''); }}><X size={14} /></button>
                                    </div>
                                    <button
                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${commentText.trim() ? 'bg-sky-500 text-white shadow-sm' : 'bg-slate-100 text-slate-300'}`}
                                        disabled={!commentText.trim()}
                                        onClick={() => { showToast('✅ Comment posted!'); setCommenting(null); setCommentText(''); }}
                                    >
                                        <Send size={13} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </article>
                );
            })}
        </div>
    );
};

export default Feed;
