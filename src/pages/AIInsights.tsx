import { useState } from 'react';
import { Card } from '../components/common/Card';
import { MainLayout } from '../components/layout/MainLayout';
import { Star, TrendingUp, Zap, ChevronRight, Lightbulb, Rocket, Shield } from 'lucide-react';

/* ─── Star Rating Helper ─── */
const Stars = ({ rating, max = 5, size = 14 }: { rating: number; max?: number; size?: number }) => (
    <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, i) => {
            const filled = i < Math.floor(rating);
            const half = !filled && i < rating;
            return (
                <div key={i} className="relative">
                    {/* Empty star */}
                    <Star size={size} className="text-slate-200" />
                    {/* Filled overlay */}
                    {(filled || half) && (
                        <div className="absolute inset-0 overflow-hidden" style={{ width: filled ? '100%' : '50%' }}>
                            <Star size={size} className="text-amber-400 fill-amber-400" />
                        </div>
                    )}
                </div>
            );
        })}
    </div>
);

/* ─── Data ─── */
const skills = [
    { name: 'Python', stars: 4.5, icon: '' },
    { name: 'ML / AI', stars: 4, icon: '' },
    { name: 'Databases', stars: 4.5, icon: '' },
    { name: 'APIs & Backend', stars: 4, icon: '' },
    { name: 'System Design', stars: 3.5, icon: '' },
    { name: 'Frontend', stars: 3, icon: '' },
    { name: 'Docker / Cloud', stars: 2.5, icon: '' },
    { name: 'DevOps / CI-CD', stars: 2, icon: '' },
];

const growthData = [
    { month: 'Sep', val: 2 },
    { month: 'Oct', val: 2.5 },
    { month: 'Nov', val: 3 },
    { month: 'Dec', val: 3 },
    { month: 'Jan', val: 3.5 },
    { month: 'Feb', val: 4 },
    { month: 'Mar', val: 4.3 },
    { month: 'Apr', val: 4.5 },
];

const actionPlan = [
    { step: 1, title: 'Apply for MIT-SOE AI Lab', desc: 'Prepare your portfolio for the upcoming research assistant selections', color: 'border-sky-500', iconBg: 'bg-sky-50', iconColor: 'text-sky-600', icon: Shield, tags: ['Research', 'Portfolio', 'AI Lab'] },
    { step: 2, title: 'Smart India Hackathon Prep', desc: 'Form a cross-disciplinary team and finalize your problem statement', color: 'border-violet-500', iconBg: 'bg-violet-50', iconColor: 'text-violet-600', icon: Rocket, tags: ['SIH 2026', 'Team Building', 'Ideation'] },
    { step: 3, title: 'Publish IEEE Paper', desc: 'Draft the findings from your ML project for the TechX Conference', color: 'border-emerald-500', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', icon: Lightbulb, tags: ['IEEE', 'TechX', 'Publication'] },
];

const AIInsights = () => {
    const [expandedStep, setExpandedStep] = useState<number | null>(null);

    // SVG line chart calculations
    const chartW = 600;
    const chartH = 160;
    const padX = 40;
    const padY = 20;
    const maxVal = 5;
    const points = growthData.map((d, i) => ({
        x: padX + (i / (growthData.length - 1)) * (chartW - padX * 2),
        y: padY + (1 - d.val / maxVal) * (chartH - padY * 2),
        ...d,
    }));
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartH - padY} L ${points[0].x} ${chartH - padY} Z`;

    // Overall rating
    const avgRating = skills.reduce((a, s) => a + s.stars, 0) / skills.length;

    return (
        <MainLayout>
            <div className="container mx-auto pb-12">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-xl font-bold text-slate-900 mb-1">Growth Intelligence</h1>
                    <p className="text-xs text-slate-500">AI-powered analysis • Updated Feb 2026</p>
                </div>

                {/* Overall Rating Hero */}
                <Card className="p-5 mb-6 border-slate-100 bg-gradient-to-r from-amber-50/50 to-transparent">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="text-center md:text-left">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Overall Rating</p>
                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-black text-slate-900">{avgRating.toFixed(1)}</span>
                                <Stars rating={avgRating} size={22} />
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">Based on {skills.length} skill areas</p>
                        </div>
                        <div className="flex-1 w-full md:w-auto">
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { label: 'Peer Rank', value: 'Top 15%', emoji: '' },
                                    { label: 'Stage', value: 'Emerging', emoji: '' },
                                    { label: 'Next Level', value: 'Competitive', emoji: '' },
                                ].map(stat => (
                                    <div key={stat.label} className="text-center p-3 bg-white rounded-lg border border-slate-100">
                                        <span className="text-lg">{stat.emoji}</span>
                                        <p className="text-xs font-bold text-slate-800 mt-1">{stat.value}</p>
                                        <p className="text-[8px] font-bold text-slate-400 uppercase">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
                    {/* Left Column */}
                    <div className="flex flex-col gap-6">

                        {/* Skill Ratings - Stars */}
                        <Card className="p-5 border-slate-100">
                            <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Star size={16} className="text-amber-500 fill-amber-500" /> Skill Ratings
                            </h2>
                            <div className="space-y-3">
                                {skills.map(skill => (
                                    <div key={skill.name} className="flex items-center gap-3 group">
                                        <span className="text-lg w-7 text-center">{skill.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <span className="text-xs font-semibold text-slate-700">{skill.name}</span>
                                                <span className="text-[10px] font-bold text-amber-600">{skill.stars}/5</span>
                                            </div>
                                            <Stars rating={skill.stars} size={13} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Growth Trajectory - SVG Line Graph */}
                        <Card className="p-5 border-slate-100">
                            <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <TrendingUp size={16} className="text-emerald-600" /> Growth Trajectory
                            </h2>
                            <div className="w-full overflow-hidden">
                                <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-40">
                                    <defs>
                                        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#38bdf8" />
                                            <stop offset="100%" stopColor="#34d399" />
                                        </linearGradient>
                                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
                                            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>

                                    {/* Grid lines */}
                                    {[1, 2, 3, 4, 5].map(v => {
                                        const y = padY + (1 - v / maxVal) * (chartH - padY * 2);
                                        return (
                                            <g key={v}>
                                                <line x1={padX} y1={y} x2={chartW - padX} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                                                <text x={padX - 8} y={y + 3} textAnchor="end" className="text-[10px] fill-slate-300 font-medium">{v}★</text>
                                            </g>
                                        );
                                    })}

                                    {/* Area fill */}
                                    <path d={areaPath} fill="url(#areaGrad)" />

                                    {/* Line */}
                                    <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                                    {/* Data points + labels */}
                                    {points.map((p, i) => (
                                        <g key={i}>
                                            <circle cx={p.x} cy={p.y} r={i === points.length - 1 ? 5 : 3} fill={i === points.length - 1 ? '#34d399' : '#38bdf8'} stroke="white" strokeWidth="2" />
                                            {i >= points.length - 3 && (
                                                <text x={p.x} y={p.y - 10} textAnchor="middle" className="text-[9px] fill-emerald-600 font-bold">{p.val}★</text>
                                            )}
                                            <text x={p.x} y={chartH - 4} textAnchor="middle" className="text-[9px] fill-slate-400 font-medium">{p.month}</text>
                                        </g>
                                    ))}

                                    {/* Projected dashed */}
                                    {points.length >= 2 && (
                                        <line
                                            x1={points[points.length - 1].x} y1={points[points.length - 1].y}
                                            x2={chartW - padX + 10} y2={padY + (1 - 4.8 / maxVal) * (chartH - padY * 2)}
                                            stroke="#34d399" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"
                                        />
                                    )}
                                </svg>
                            </div>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                                <span className="text-[10px] text-slate-400">8-month trajectory</span>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">↑ 2 stars growth</span>
                            </div>
                        </Card>

                        {/* Focus Areas */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="p-4 border-rose-100 bg-rose-50/30">
                                <h3 className="text-xs font-bold text-rose-700 mb-3">Needs Work</h3>
                                <div className="space-y-2">
                                    {[
                                        { name: 'DevOps / CI-CD', stars: 2 },
                                        { name: 'Docker / Cloud', stars: 2.5 },
                                    ].map(s => (
                                        <div key={s.name}>
                                            <p className="text-[10px] font-semibold text-slate-700 mb-0.5">{s.name}</p>
                                            <Stars rating={s.stars} size={11} />
                                        </div>
                                    ))}
                                </div>
                            </Card>
                            <Card className="p-4 border-emerald-100 bg-emerald-50/30">
                                <h3 className="text-xs font-bold text-emerald-700 mb-3">Strengths</h3>
                                <div className="space-y-2">
                                    {[
                                        { name: 'Python', stars: 4.5 },
                                        { name: 'Databases', stars: 4.5 },
                                    ].map(s => (
                                        <div key={s.name}>
                                            <p className="text-[10px] font-semibold text-slate-700 mb-0.5">{s.name}</p>
                                            <Stars rating={s.stars} size={11} />
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-6">

                        {/* 30-Day Action Plan */}
                        <Card className="p-5 border-slate-100">
                            <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Zap size={16} className="text-amber-500" /> 30-Day Action Plan
                            </h2>
                            <div className="space-y-2">
                                {actionPlan.map(item => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.step}
                                            onClick={() => setExpandedStep(expandedStep === item.step ? null : item.step)}
                                            className={`w-full text-left p-3 rounded-lg border-l-4 ${item.color} transition-all ${expandedStep === item.step ? `${item.iconBg} shadow-sm` : 'bg-white hover:bg-slate-50'
                                                }`}
                                        >
                                            <div className="flex items-start gap-2.5">
                                                <div className={`w-7 h-7 rounded-lg ${item.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                                                    <Icon size={14} className={item.iconColor} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-1.5 mb-0.5">
                                                        <span className="text-[8px] font-black text-slate-400">STEP {item.step}</span>
                                                        <ChevronRight size={10} className={`text-slate-300 transition-transform ${expandedStep === item.step ? 'rotate-90' : ''}`} />
                                                    </div>
                                                    <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                                                    {expandedStep === item.step && (
                                                        <div className="mt-2">
                                                            <p className="text-[10px] text-slate-500 mb-2">{item.desc}</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {item.tags.map(tag => (
                                                                    <span key={tag} className="px-2 py-0.5 bg-white rounded text-[9px] font-bold text-slate-500 border border-slate-100">{tag}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </Card>

                        {/* Projected Ratings */}
                        <Card className="p-5 bg-gradient-to-br from-sky-50/50 to-transparent border-sky-100">
                            <h3 className="text-xs font-bold text-slate-700 mb-4 flex items-center gap-2">
                                Projected Ratings
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-sm"></div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-slate-800">In 3 Months</p>
                                        <Stars rating={4.2} size={12} />
                                    </div>
                                    <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">Competitive</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-sm"></div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-slate-800">In 6 Months</p>
                                        <Stars rating={4.7} size={12} />
                                    </div>
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Industry Ready</span>
                                </div>
                            </div>
                        </Card>

                        {/* Identity Shift */}
                        <Card className="p-4 border-slate-100">
                            <h3 className="text-xs font-bold text-slate-700 mb-3">Identity Evolution</h3>
                            <div className="flex items-center gap-3 text-xs">
                                <div className="text-center p-2 bg-slate-50 rounded-lg flex-1">
                                    <p className="text-slate-400 line-through text-[10px]">AI Builder</p>
                                    <Stars rating={3} size={10} />
                                </div>
                                <span className="text-slate-300 font-bold">→</span>
                                <div className="text-center p-2 bg-emerald-50 rounded-lg flex-1 border border-emerald-100">
                                    <p className="text-emerald-700 font-bold text-[10px]">AI Infra Engineer</p>
                                    <Stars rating={4.5} size={10} />
                                </div>
                            </div>
                            <p className="text-[9px] text-slate-400 mt-2 text-center">Higher leverage. More impact.</p>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default AIInsights;
