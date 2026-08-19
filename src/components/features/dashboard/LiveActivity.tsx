import { Card } from '../../common/Card';
import { Megaphone, Bell, Info, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export const LiveActivity = () => {
    const alerts = [
        { type: 'News', text: '🏆 Team Speedtail Racing wins Formula Bharat 2026!', icon: <Megaphone size={14} className="text-sky-600" />, color: 'bg-sky-50', border: 'border-sky-200', accent: 'text-sky-700' },
        { type: 'Notice', text: '🚶‍♂️ Campus Holiday on account of Shiv Jayanti tomorrow.', icon: <Info size={14} className="text-amber-600" />, color: 'bg-amber-50', border: 'border-amber-200', accent: 'text-amber-700' },
        { type: 'Reminder', text: '🎭 Persona Fest registrations close in 2 days.', icon: <Bell size={14} className="text-rose-600" />, color: 'bg-rose-50', border: 'border-rose-200', accent: 'text-rose-700' },
        { type: 'News', text: '🚀 GDSC Workshop: Learn Flutter this Friday at 4 PM.', icon: <Megaphone size={14} className="text-emerald-600" />, color: 'bg-emerald-50', border: 'border-emerald-200', accent: 'text-emerald-700' },
        { type: 'Notice', text: '📢 New MoU signed with Philips for Healthcare Tech.', icon: <Info size={14} className="text-indigo-600" />, color: 'bg-indigo-50', border: 'border-indigo-200', accent: 'text-indigo-700' },
        { type: 'Reminder', text: '📝 Submit your Project Abstracts by Feb 25th.', icon: <Bell size={14} className="text-purple-600" />, color: 'bg-purple-50', border: 'border-purple-200', accent: 'text-purple-700' },
        { type: 'News', text: '💻 Apple visionOS 3 dev kit is out now for students!', icon: <Megaphone size={14} className="text-blue-600" />, color: 'bg-blue-50', border: 'border-blue-200', accent: 'text-blue-700' },
        { type: 'Notice', text: '🏗️ Civil Dept: Site visit to Pune Metro Phase 3 on Monday.', icon: <Info size={14} className="text-orange-600" />, color: 'bg-orange-50', border: 'border-orange-200', accent: 'text-orange-700' },
        { type: 'Reminder', text: '🩺 Bio-med Quiz registration ends tonight at 11:59.', icon: <Bell size={14} className="text-pink-600" />, color: 'bg-pink-50', border: 'border-pink-200', accent: 'text-pink-700' },
        { type: 'News', text: '🏢 Samsung Prism selects 12 students from MITSOE.', icon: <Megaphone size={14} className="text-blue-600" />, color: 'bg-blue-50', border: 'border-blue-200', accent: 'text-blue-700' },
        { type: 'Notice', text: '📡 Wi-Fi maintenance in Hostel 2 from 2 PM to 5 PM today.', icon: <Info size={14} className="text-slate-600" />, color: 'bg-slate-50', border: 'border-slate-200', accent: 'text-slate-700' },
        { type: 'Reminder', text: '🎓 Graduating class: Collect Toga/Caps from Admin office.', icon: <Bell size={14} className="text-teal-600" />, color: 'bg-teal-50', border: 'border-teal-200', accent: 'text-teal-700' },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % alerts.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [alerts.length, isPaused]);

    const currentAlert = alerts[activeIndex];
    const nextAlert = alerts[(activeIndex + 1) % alerts.length];

    return (
        <Card
            className="p-5 bg-white dark:bg-slate-900 border-sky-100 dark:border-slate-800 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> LIVE BULLETIN
                </h3>
                <span className="text-[9px] font-bold text-slate-300 dark:text-slate-500 uppercase">{activeIndex + 1}/{alerts.length}</span>
            </div>

            {/* Current Alert - Main Display */}
            <div
                key={activeIndex}
                className={`p-4 rounded-xl ${currentAlert.color} border ${currentAlert.border} transition-all duration-500 animate-fade-in cursor-pointer group`}
                onClick={() => setActiveIndex((activeIndex + 1) % alerts.length)}
            >
                <div className="flex items-center gap-2 mb-2">
                    <span className="p-1.5 bg-white/80 dark:bg-slate-800/90 rounded-lg shadow-sm">{currentAlert.icon}</span>
                    <span className="text-[8px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {currentAlert.type}
                    </span>
                    <ChevronRight size={10} className="ml-auto text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className={`text-xs ${currentAlert.accent} font-bold leading-relaxed`}>
                    {currentAlert.text}
                </p>
            </div>

            {/* Next Alert Preview */}
            <div
                className="mt-2 p-2.5 rounded-lg bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors opacity-60 hover:opacity-90"
                onClick={() => setActiveIndex((activeIndex + 1) % alerts.length)}
            >
                <span className="p-1 bg-white dark:bg-slate-800 rounded shadow-sm">{nextAlert.icon}</span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold truncate flex-1">
                    {nextAlert.text}
                </p>
            </div>

            {/* Progress Dots */}
            <div className="flex gap-1 justify-center mt-3">
                {alerts.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-1 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-5 bg-sky-500' : 'w-1.5 bg-sky-100 hover:bg-sky-200'}`}
                    />
                ))}
            </div>

            {/* Background Decorative */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-50 blur-2xl rounded-full pointer-events-none" />
        </Card>
    );
};
