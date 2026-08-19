import { LayoutDashboard, Brain, Briefcase, Rocket, Landmark, User, ShieldCheck, ClipboardCheck, Users, FlaskConical, Home, CalendarDays } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { UpcomingEvents } from '../features/calendar/UpcomingEvents';

const studentNav = [
    { icon: <Home size={18} />, label: 'Home', path: '/home' },
    { icon: <Brain size={18} />, label: 'Insights', path: '/ai-insights' },
    { icon: <Briefcase size={18} />, label: 'Explore', path: '/explore' },
    { icon: <Rocket size={18} />, label: 'Projects', path: '/projects' },
    { icon: <Landmark size={18} />, label: 'Clubs', path: '/clubs' },
];

const facultyNav = [
    { icon: <Home size={18} />, label: 'Home', path: '/faculty/home' },
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/faculty/dashboard' },
    { icon: <ClipboardCheck size={18} />, label: 'Verifications', path: '/faculty/verifications' },
    { icon: <Users size={18} />, label: 'Students', path: '/faculty/students' },
    { icon: <FlaskConical size={18} />, label: 'Workspace', path: '/faculty/opportunities' },
    { icon: <CalendarDays size={18} />, label: 'Calendar', path: '/faculty/calendar' },
    { icon: <User size={18} />, label: 'Profile', path: '/faculty/profile' },
];

export const Sidebar = () => {
    const location = useLocation();
    const isFacultySection = location.pathname.startsWith('/faculty');

    const renderNavSection = (label: string, items: typeof studentNav) => (
        <>
            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-3 mb-2">
                {label}
            </h3>
            <div className="flex flex-col gap-0.5 mb-3">
                {items.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all w-full
                            ${isActive
                                ? 'bg-sky-50 text-sky-600 shadow-sm border border-sky-100'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </>
    );

    return (
        <aside className="flex flex-col h-full overflow-hidden">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col h-full w-full overflow-hidden">
                <nav className="flex flex-col h-full overflow-hidden">
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="pb-4 shrink-0">
                            {isFacultySection
                                ? renderNavSection('Faculty Portal', facultyNav)
                                : renderNavSection('Navigation', studentNav)
                            }
                        </div>
                        
                        <div className="pt-4 border-t border-slate-100 hidden md:flex flex-col flex-1 overflow-hidden min-h-0">
                            <UpcomingEvents />
                        </div>
                    </div>
                    
                    <div className="pt-3 border-t border-slate-100 mt-2 shrink-0">
                        <div className="flex items-center gap-2 px-3">
                            <ShieldCheck size={12} className="text-emerald-500" />
                            <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">UniConn v1.0</p>
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};
