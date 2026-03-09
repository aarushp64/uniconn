import { useState } from 'react';
import { BadgeCheck, MessageSquare, Share2, Bookmark, Send, X, ThumbsUp, Repeat2 } from 'lucide-react';

type TagType = 'All' | 'Research' | 'Verification' | 'Curriculum' | 'Placement' | 'Announcement' | 'Achievement' | 'Workshop' | 'Policy' | 'Collaboration';

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

const TAG_STYLE: Record<string, { bg: string; text: string; border: string; activeBg: string }> = {
    'All': { bg: 'bg-slate-900', text: 'text-white', border: 'border-slate-900', activeBg: 'bg-slate-900' },
    'Research': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', activeBg: 'bg-emerald-500' },
    'Verification': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', activeBg: 'bg-amber-500' },
    'Curriculum': { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', activeBg: 'bg-violet-500' },
    'Placement': { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200', activeBg: 'bg-sky-500' },
    'Announcement': { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', activeBg: 'bg-rose-500' },
    'Achievement': { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', activeBg: 'bg-indigo-500' },
    'Workshop': { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', activeBg: 'bg-teal-500' },
    'Policy': { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', activeBg: 'bg-orange-500' },
    'Collaboration': { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', activeBg: 'bg-cyan-500' },
};

const TAGS: TagType[] = ['All', 'Research', 'Verification', 'Curriculum', 'Placement', 'Announcement', 'Achievement', 'Workshop', 'Policy', 'Collaboration'];

const POSTS: Post[] = [
    {
        id: 'f1', timeAgo: '1h', likes: 78, comments: 12, reposts: 5, tag: 'Research',
        name: 'Dr. Meera Joshi', headline: 'Dept. of Computer Science • MIT ADTU', initials: 'MJ', gradient: 'from-violet-600 to-indigo-500',
        content: 'Excited to announce that our NLP lab paper on "Transformer-based Code Summarization for Indian Languages" has been accepted at ACL 2026! 🎉 Huge thanks to Aarush, Riya, and Rahul for their contributions.',
        img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
    },
    {
        id: 'f2', timeAgo: '3h', likes: 45, comments: 8, reposts: 3, tag: 'Verification',
        name: 'Dr. Rajesh Patil', headline: 'HOD, Electronics • MIT ADTU', initials: 'RP', gradient: 'from-amber-500 to-orange-500',
        content: '✅ Verified 12 student projects this week across IoT and Embedded Systems. The quality of submissions from 3rd-year students has been outstanding. Vikram Desai\'s EV thermal management work is publication-worthy.',
        img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=400&fit=crop',
    },
    {
        id: 'f3', timeAgo: '5h', likes: 156, comments: 24, reposts: 18, tag: 'Announcement',
        name: 'MIT ADTU Admin', headline: 'Administrative Office', initials: 'AD', gradient: 'from-sky-600 to-blue-600',
        content: '📢 Faculty meeting tomorrow at 2 PM — Agenda: NEP 2026 implementation, new credit framework for research projects, and inter-departmental collaboration guidelines. Attendance is mandatory.',
        img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop',
    },
    {
        id: 'f4', timeAgo: '6h', likes: 234, comments: 31, reposts: 22, tag: 'Placement',
        name: 'Prof. Sneha Kulkarni', headline: 'Training & Placement Officer', initials: 'SK', gradient: 'from-sky-500 to-teal-500',
        content: '🚀 Record placements update: Google, Microsoft, and Amazon have collectively hired 28 students from 2026 batch. Average CTC up 22% from last year. Special shoutout to mentoring faculty who prepared students!',
        img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop',
    },
    {
        id: 'f5', timeAgo: '8h', likes: 67, comments: 9, reposts: 4, tag: 'Curriculum',
        name: 'Dr. Anil Sharma', headline: 'Curriculum Committee Chair', initials: 'AS', gradient: 'from-emerald-600 to-green-500',
        content: '📚 New elective proposal approved: "Generative AI & Prompt Engineering" for 3rd-year CS students starting next semester. Syllabus includes hands-on with LLMs, RAG systems, and AI safety frameworks.',
        img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=400&fit=crop',
    },
    {
        id: 'f6', timeAgo: '10h', likes: 189, comments: 42, reposts: 15, tag: 'Achievement',
        name: 'MIT ADTU Official', headline: 'Official Campus Page', initials: 'MI', gradient: 'from-sky-600 to-sky-500',
        content: '🏆 MIT ADTU ranks #3 among Pune private universities in NIRF 2026! Up 7 positions from last year. Faculty research output increased by 40%. Congratulations to all departments!',
        img: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&h=400&fit=crop',
    },
    {
        id: 'f7', timeAgo: '12h', likes: 92, comments: 16, reposts: 7, tag: 'Workshop',
        name: 'Dr. Priya Deshmukh', headline: 'AI & ML Research Lab', initials: 'PD', gradient: 'from-rose-500 to-pink-500',
        content: '🧠 FDP on "Teaching with AI Tools" starts next Monday. 5-day program covering ChatGPT for assessment design, AI-assisted grading, and ethical AI in education. Open to all faculty. Register on portal.',
        img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop',
    },
    {
        id: 'f8', timeAgo: '14h', likes: 56, comments: 7, reposts: 2, tag: 'Collaboration',
        name: 'Dr. Vikrant Nair', headline: 'Mechanical Engineering • MIT ADTU', initials: 'VN', gradient: 'from-slate-600 to-slate-800',
        content: '🤝 Signed MoU with Siemens India for joint R&D on digital twin technology. 5 faculty + 10 students will work on smart manufacturing simulation. Funded positions available.',
        img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
    },
    {
        id: 'f9', timeAgo: '1d', likes: 123, comments: 18, reposts: 9, tag: 'Policy',
        name: 'AICTE Updates', headline: 'All India Council for Technical Education', initials: 'AI', gradient: 'from-orange-500 to-amber-600',
        content: '📋 AICTE mandates 20% experiential learning credits in all engineering programs from 2026-27. Industry internships, research projects, and community service qualify. Curriculum committees: start aligning syllabi.',
        img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    },
    {
        id: 'f10', timeAgo: '1d', likes: 345, comments: 28, reposts: 19, tag: 'Achievement',
        name: 'Dr. Meera Joshi', headline: 'Dept. of Computer Science • MIT ADTU', initials: 'MJ', gradient: 'from-violet-600 to-indigo-500',
        content: '🎯 Priya Patil (my mentee) just cracked Google L4 — highest package from CS dept this year at ₹52 LPA! From first-year doubt to top placement. Faculty mentoring programs DO work. Incredibly proud. 👏',
        img: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop',
    },
    {
        id: 'f11', timeAgo: '2d', likes: 88, comments: 11, reposts: 6, tag: 'Research',
        name: 'Dr. Sunil Rao', headline: 'Data Science & Analytics Lab', initials: 'SR', gradient: 'from-teal-500 to-cyan-600',
        content: '📊 DST-SERB grant of ₹42 Lakhs sanctioned for our "AI for Precision Agriculture" project. Looking for 3 JRF positions — M.Tech/PhD candidates with ML + remote sensing background. Spread the word!',
        img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=400&fit=crop',
    },
    {
        id: 'f12', timeAgo: '2d', likes: 145, comments: 20, reposts: 12, tag: 'Workshop',
        name: 'IEEE MIT ADTU', headline: 'IEEE Faculty Advisor', initials: 'IE', gradient: 'from-blue-600 to-indigo-600',
        content: '💡 IEEE TechX Hackathon results are in! 45 teams participated, 3 projects selected for incubation. Faculty mentors — your evaluation sheets due by Friday. Outstanding student innovation this year.',
        img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop',
    },
    {
        id: 'f13', timeAgo: '3d', likes: 201, comments: 25, reposts: 14, tag: 'Research',
        name: 'Dr. Kavita Iyer', headline: 'Dept. of Civil Engineering • MIT ADTU', initials: 'KI', gradient: 'from-emerald-500 to-green-600',
        content: '🏗️ Our Smart Concrete research using self-healing bio-materials got featured in Construction World magazine! Patent filed last week. Looking for 2 PhD scholars — fully funded positions through DST.',
        img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=400&fit=crop',
    },
    {
        id: 'f14', timeAgo: '3d', likes: 167, comments: 19, reposts: 10, tag: 'Curriculum',
        name: 'Dr. Rajesh Patil', headline: 'HOD, Electronics • MIT ADTU', initials: 'RP', gradient: 'from-amber-500 to-orange-500',
        content: '📖 BoS meeting outcome: Approved 4 new industry-aligned electives for Electronics — VLSI Design with Cadence, IoT System Architecture, Embedded AI, and Power Electronics for EVs. Implementation from July 2026.',
        img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=400&fit=crop',
    },
    {
        id: 'f15', timeAgo: '3d', likes: 289, comments: 33, reposts: 18, tag: 'Collaboration',
        name: 'Dr. Anil Sharma', headline: 'Curriculum Committee Chair', initials: 'AS', gradient: 'from-emerald-600 to-green-500',
        content: '🌐 Signed academic exchange agreement with TU Munich for joint research in Autonomous Systems. 2 faculty + 4 students will visit their lab this summer. Funded by DAAD. Applications open for eligible faculty.',
        img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop',
    },
    {
        id: 'f16', timeAgo: '4d', likes: 112, comments: 14, reposts: 7, tag: 'Announcement',
        name: 'MIT ADTU Admin', headline: 'Administrative Office', initials: 'AD', gradient: 'from-sky-600 to-blue-600',
        content: '📣 Annual Faculty Performance Review submissions due by March 10. Self-appraisal forms available on the HR portal. Research publications, patents, and mentorship activities carry additional weightage this year.',
        img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    },
    {
        id: 'f17', timeAgo: '4d', likes: 78, comments: 9, reposts: 4, tag: 'Verification',
        name: 'Prof. Sneha Kulkarni', headline: 'Training & Placement Officer', initials: 'SK', gradient: 'from-sky-500 to-teal-500',
        content: '✅ Verified 8 internship completion certificates this week. Reminder to all faculty advisors: please validate student internship reports within 48 hours of submission. Timely verification helps placement records.',
        img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop',
    },
    {
        id: 'f18', timeAgo: '5d', likes: 234, comments: 27, reposts: 15, tag: 'Achievement',
        name: 'Dr. Priya Deshmukh', headline: 'AI & ML Research Lab', initials: 'PD', gradient: 'from-rose-500 to-pink-500',
        content: '🏅 Selected as Program Committee member for NeurIPS 2027! Honored to review cutting-edge AI research alongside global experts. This is a testament to MIT ADTU\'s growing reputation in the AI research community.',
        img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop',
    },
    {
        id: 'f19', timeAgo: '5d', likes: 156, comments: 21, reposts: 11, tag: 'Policy',
        name: 'UGC Updates', headline: 'University Grants Commission', initials: 'UG', gradient: 'from-orange-600 to-red-500',
        content: '📋 UGC approves new PhD admission guidelines: candidates must clear a research aptitude test + interview. Supervisors limited to 8 scholars max. All universities must comply by academic year 2026-27.',
        img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop',
    },
    {
        id: 'f20', timeAgo: '6d', likes: 98, comments: 12, reposts: 6, tag: 'Workshop',
        name: 'Dr. Vikrant Nair', headline: 'Mechanical Engineering • MIT ADTU', initials: 'VN', gradient: 'from-slate-600 to-slate-800',
        content: '🔧 Conducted a 3-day FDP on "Industry 4.0 & Digital Manufacturing" with Siemens engineers. 45 faculty from 8 departments attended. Hands-on with PLM, MES, and digital twin platforms. Certificates distributed.',
        img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
    },
    {
        id: 'f21', timeAgo: '6d', likes: 312, comments: 38, reposts: 22, tag: 'Collaboration',
        name: 'Dr. Sunil Rao', headline: 'Data Science & Analytics Lab', initials: 'SR', gradient: 'from-teal-500 to-cyan-600',
        content: '🤝 TCS iON has selected MIT ADTU as a "Center of Excellence" for Data Science education. Joint certification programs launching next semester. 3 TCS mentors will co-teach advanced analytics courses.',
        img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=400&fit=crop',
    },
    {
        id: 'f22', timeAgo: '1w', likes: 187, comments: 22, reposts: 13, tag: 'Research',
        name: 'Dr. Kavita Iyer', headline: 'Dept. of Civil Engineering • MIT ADTU', initials: 'KI', gradient: 'from-emerald-500 to-green-600',
        content: '📝 Call for papers: MIT ADTU is hosting ICSTE 2026 (International Conference on Sustainable Technology & Engineering) in September. Tracks: Green Energy, Smart Infrastructure, AI in Construction. Submit by June 30.',
        img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=400&fit=crop',
    },
];

const FacultyFeed = () => {
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

            {/* Filter Tags */}
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
                                onClick={() => { setSaved(p => { const n = new Set(p); if (n.has(post.id)) { n.delete(post.id); } else { n.add(post.id); } return n; }); }}
                                className="self-start p-1.5 rounded-full hover:bg-slate-50 transition-colors"
                            >
                                <Bookmark size={16} className={isSaved ? 'fill-sky-500 text-sky-500' : 'text-slate-300'} />
                            </button>
                        </div>

                        <div className="px-4 pb-2">
                            <p className="text-[13px] text-slate-800 leading-[1.55]">{post.content}</p>
                        </div>

                        <div className="cursor-pointer group/img">
                            <img
                                src={post.img}
                                alt=""
                                className="w-full h-56 object-cover group-hover/img:brightness-95 transition-all"
                                loading="lazy"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                        </div>

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

                        <div className="flex border-t border-slate-100 mx-4">
                            {[
                                { icon: <ThumbsUp size={16} className={isLiked ? 'fill-sky-600' : ''} />, label: 'Like', active: isLiked, onClick: () => setLiked(p => { const n = new Set(p); if (n.has(post.id)) { n.delete(post.id); } else { n.add(post.id); } return n; }) },
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

                        {commenting === post.id && (
                            <div className="px-4 py-3 bg-slate-50/80 border-t border-slate-100 animate-fade-in">
                                <div className="flex gap-2 items-center">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-[9px] font-bold shrink-0">MJ</div>
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

export default FacultyFeed;
