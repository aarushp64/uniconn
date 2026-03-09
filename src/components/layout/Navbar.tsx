import { Bell, Search } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
    const { user } = useAuth();

    return (
        <header className="top-navbar animate-fade-in-down">
            <div className="flex items-center gap-8 flex-1">
                <h1 className="text-xl font-bold text-gradient shrink-0">UniConn</h1>

                <div className="w-64">
                    <Input
                        placeholder="Search..."
                        leftIcon={<Search size={16} />}
                        className="mb-0"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </Button>

                <div className="flex items-center gap-3 pl-4 border-l border-border-soft">
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
