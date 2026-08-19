import { useState, useRef, useEffect } from 'react';
import { Bell, Search, CalendarDays, Settings } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const isFaculty = location.pathname.startsWith('/faculty');
    const [showNotifications, setShowNotifications] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const notifications = [
        { id: 1, title: 'New TechPulse posted: AI in Robotics', time: '10 mins ago', read: false },
        { id: 2, title: 'Persona Fest 2026 registration is open!', time: '1 hour ago', read: false },
        { id: 3, title: 'Your verification request was approved', time: 'Yesterday', read: true },
    ];

    return (
        <header className="top-navbar animate-fade-in-down sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-xs">
            <div className="flex items-center gap-8 flex-1">
                <h1 className="text-xl font-bold text-sky-700 shrink-0 cursor-pointer" onClick={() => navigate(isFaculty ? '/faculty/home' : '/home')}>UniConn</h1>

                <div className="w-64">
                    <Input
                        placeholder="Search..."
                        leftIcon={<Search size={16} />}
                        className="mb-0"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-sky-600" onClick={() => navigate(isFaculty ? '/faculty/settings' : '/settings')} title="Settings">
                    <Settings size={20} />
                </Button>

                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-sky-600" onClick={() => navigate(isFaculty ? '/faculty/calendar' : '/calendar')} title="Calendar">
                    <CalendarDays size={20} />
                </Button>

                <div className="relative" ref={dropdownRef}>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="relative"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <Bell size={20} />
                        <span className="absolute top-2 right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    </Button>
                    
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fade-in-down">
                            <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <h3 className="font-semibold text-slate-800">Notifications</h3>
                                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider cursor-pointer">Mark all read</span>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.map(notif => (
                                    <div key={notif.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${notif.read ? 'opacity-70' : 'bg-sky-50/30'}`}>
                                        <p className="text-sm text-slate-800 font-medium mb-1">{notif.title}</p>
                                        <p className="text-xs text-slate-400">{notif.time}</p>
                                    </div>
                                ))}
                            </div>
                            <div
                                onClick={() => {
                                    setShowNotifications(false);
                                    navigate('/notifications');
                                }}
                                className="p-3 text-center border-t border-slate-100 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
                            >
                                <p className="text-xs font-semibold text-sky-600 hover:text-sky-700">View All Notifications</p>
                            </div>
                        </div>
                    )}
                </div>

                <div
                    className="flex items-center gap-3 pl-4 border-l border-border-soft cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => navigate(isFaculty ? '/faculty/profile' : '/profile')}
                >
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-slate-900">{user?.name || 'Explorer'}</p>
                        <p className="text-xs text-secondary">@{user?.username || 'user'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold border-2 border-border-soft">
                        {user?.name ? user.name.substring(0, 2).toUpperCase() : '??'}
                    </div>
                </div>
            </div>
        </header>
    );
};
