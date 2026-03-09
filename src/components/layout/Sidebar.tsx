import { LayoutDashboard, Brain, Briefcase, Rocket, Landmark, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Home', path: '/dashboard' },
    { icon: <Brain size={18} />, label: 'Insights', path: '/ai-insights' },
    { icon: <Briefcase size={18} />, label: 'Explore', path: '/explore' },
    { icon: <Rocket size={18} />, label: 'Projects', path: '/projects' },
    { icon: <Landmark size={18} />, label: 'Clubs', path: '/clubs' },
    { icon: <User size={18} />, label: 'Profile', path: '/profile' },
];

export const Sidebar = () => {
    return (
        <aside className="flex flex-col h-full">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col h-full w-full">
                <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-3 mb-3">
                    Navigation
                </h3>
                <nav className="flex flex-col justify-between flex-1">
                    <div className="flex flex-col gap-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all w-full
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
                    <div className="pt-3 border-t border-slate-100 mt-3">
                        <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest px-3">UniConn v1.0</p>
                    </div>
                </nav>
            </div>
        </aside>
    );
};
