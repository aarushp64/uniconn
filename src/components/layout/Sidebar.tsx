import { NavLink } from 'react-router-dom';
import { LayoutDashboard, User, Briefcase, Rocket, Landmark, PieChart, LogOut, Settings } from 'lucide-react';
import { Button } from '../common/Button';
import { useUI } from '../../context/UIContext';

export const Sidebar = () => {
    const { openProfile, isProfileOpen } = useUI();
    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <User size={20} />, label: 'My Profile', path: '/profile' },
        { icon: <Briefcase size={20} />, label: 'Opportunities', path: '/explore' },
        { icon: <Rocket size={20} />, label: 'My Projects', path: '/projects' },
        { icon: <Landmark size={20} />, label: 'Clubs', path: '/clubs' },
        { icon: <PieChart size={20} />, label: 'Analytics', path: '/analytics' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h1 className="text-2xl font-bold text-gradient">UniConn</h1>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    item.path === '/profile' ? (
                        <button
                            key={item.path}
                            onClick={openProfile}
                            className={`nav-item w-full text-left ${isProfileOpen ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ) : (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    )
                ))}
            </nav>

            <div className="p-4 border-t border-white/5 flex flex-col gap-2">
                <NavLink to="/settings" className="nav-item">
                    <Settings size={20} />
                    <span>Settings</span>
                </NavLink>
                <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10" leftIcon={<LogOut size={18} />}>
                    Sign Out
                </Button>
            </div>
        </aside>
    );
};
