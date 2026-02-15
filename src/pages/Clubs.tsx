
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Users, Calendar, Award } from 'lucide-react';
import { Button } from '../components/common/Button';

const Clubs = () => {
    return (
        <MainLayout>
            <div className="flex flex-col gap-6 animate-fade-in">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Users className="text-accent" /> My Clubs
                    </h1>
                    <Button size="sm" variant="outline">Browse All Clubs</Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Active Club */}
                    <Card className="p-0 overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                            <div className="absolute -bottom-10 left-6">
                                <div className="w-20 h-20 rounded-2xl bg-bg-main border-4 border-bg-main flex-center text-3xl shadow-xl">
                                    💻
                                </div>
                            </div>
                        </div>
                        <div className="pt-12 px-6 pb-6">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Coding Club</h2>
                                    <p className="text-secondary font-medium">Core Member • Tech Lead</p>
                                </div>
                                <Badge variant="success">Active</Badge>
                            </div>

                            <p className="text-muted text-sm mb-6">
                                Organizing hackathons, coding workshops, and peer learning sessions for the campus community.
                            </p>

                            <div className="flex gap-4 border-t border-white/5 pt-4">
                                <div className="flex items-center gap-2 text-sm text-white">
                                    <Calendar size={16} className="text-primary" />
                                    <span>Next Meet: Friday, 4 PM</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-white ml-auto">
                                    <Award size={16} className="text-yellow-500" />
                                    <span>Points: 450</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Joined Club */}
                    <Card className="p-0 overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-orange-500 to-red-500 relative">
                            <div className="absolute -bottom-10 left-6">
                                <div className="w-20 h-20 rounded-2xl bg-bg-main border-4 border-bg-main flex-center text-3xl shadow-xl">
                                    🎭
                                </div>
                            </div>
                        </div>
                        <div className="pt-12 px-6 pb-6">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Drama & Arts</h2>
                                    <p className="text-secondary font-medium">Member</p>
                                </div>
                                <Badge variant="secondary">Member</Badge>
                            </div>

                            <p className="text-muted text-sm mb-6">
                                Participating in annual plays and street plays. Exploring creative expression.
                            </p>

                            <div className="flex gap-4 border-t border-white/5 pt-4">
                                <div className="flex items-center gap-2 text-sm text-white">
                                    <Calendar size={16} className="text-primary" />
                                    <span>Next Meet: Mon, 5 PM</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
};

export default Clubs;
