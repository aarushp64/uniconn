import { LayoutDashboard, Brain, Briefcase, Rocket, Landmark, User, CalendarDays } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Home', path: '/dashboard' },
    { icon: <Brain size={20} />, label: 'Insights', path: '/ai-insights' },
    { icon: <Briefcase size={20} />, label: 'Explore', path: '/explore' },
    { icon: <Rocket size={20} />, label: 'Projects', path: '/projects' },
    { icon: <CalendarDays size={20} />, label: 'Calendar', path: '/calendar' },
    { icon: <Landmark size={20} />, label: 'Clubs', path: '/clubs' },
    { icon: <User size={20} />, label: 'Profile', path: '/profile' },
];

export const MobileNav = () => {
    return (
        <nav className="mobile-bottom-nav">
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `mobile-nav-item ${isActive ? 'mobile-nav-item--active' : ''}`
                    }
                >
                    {item.icon}
                    <span>{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
};
