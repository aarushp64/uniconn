
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Folder, GitBranch, Star } from 'lucide-react';

const Projects = () => {
    return (
        <MainLayout>
            <div className="flex flex-col gap-6 animate-fade-in">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Folder className="text-primary" /> My Projects
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Project 1 */}
                    <Card className="p-6 group cursor-pointer hover:-translate-y-1 transition-transform">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex-center text-purple-400">
                                <GitBranch size={24} />
                            </div>
                            <Badge variant="success">Completed</Badge>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">Campus Event System</h3>
                        <p className="text-secondary text-sm mb-4 line-clamp-3">
                            A full-stack MERN application to manage college events, registrations, and feedback. Used by 500+ students during the annual fest.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {['React', 'Node.js', 'MongoDB'].map(t => (
                                <span key={t} className="text-xs font-bold text-white/60 bg-white/5 px-2 py-1 rounded-md">{t}</span>
                            ))}
                        </div>
                    </Card>

                    {/* Project 2 */}
                    <Card className="p-6 group cursor-pointer hover:-translate-y-1 transition-transform border-l-4 border-l-yellow-500">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex-center text-yellow-400">
                                <Star size={24} />
                            </div>
                            <Badge variant="warning">In Progress</Badge>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">AI Content Moderator</h3>
                        <p className="text-secondary text-sm mb-4 line-clamp-3">
                            Building an automated content moderation tool for the college forum using Python and OpenAI API.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {['Python', 'AI', 'FastAPI'].map(t => (
                                <span key={t} className="text-xs font-bold text-white/60 bg-white/5 px-2 py-1 rounded-md">{t}</span>
                            ))}
                        </div>
                    </Card>

                    {/* Project 3 */}
                    <Card className="p-6 border-dashed border-2 border-white/10 bg-transparent flex-center flex-col min-h-[300px] hover:border-primary/50 hover:bg-white/5 cursor-pointer transition-all">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex-center mb-4 text-white/50 group-hover:text-primary transition-colors">
                            <span className="text-4xl">+</span>
                        </div>
                        <h3 className="font-bold text-white mb-1">Add New Project</h3>
                        <p className="text-sm text-secondary">Document your work</p>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
};

export default Projects;
