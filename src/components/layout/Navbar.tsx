import { Bell, Search } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export const Navbar = () => {
    return (
        <header className="top-navbar animate-fade-in-down">
            <div className="w-96">
                <Input
                    placeholder="Search opportunities, clubs..."
                    leftIcon={<Search size={18} />}
                    className="mb-0"
                />
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </Button>

                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-white">Alex Johnson</p>
                        <p className="text-xs text-secondary">CSE • Year 2</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex-center text-white font-bold border-2 border-glass-border">
                        AJ
                    </div>
                </div>
            </div>
        </header>
    );
};
