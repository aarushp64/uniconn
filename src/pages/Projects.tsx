
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Folder, Code2, Brain, Globe, Zap } from 'lucide-react';

const Projects = () => {
    const projects = [
        { title: 'UniConn App', desc: 'The official campus platform for MIT ADTU. Built with React, Node.js, and PostgreSQL.', tags: ['React', 'PostgreSQL', 'Tailwind'], status: 'Active', statusVariant: 'primary' as const, icon: Globe, iconBg: 'bg-sky-50 text-sky-600 border-sky-100', border: 'border-l-4 border-l-sky-500' },
        { title: 'AI Content Moderator', desc: 'Automated content moderation for the college forum using Python and OpenAI API. Filters spam and toxic content.', tags: ['Python', 'AI', 'FastAPI'], status: 'In Progress', statusVariant: 'warning' as const, icon: Brain, iconBg: 'bg-amber-50 text-amber-600 border-amber-100', border: 'border-l-4 border-l-amber-500' },
        { title: 'Smart Attendance System', desc: 'Computer Vision based attendance using face recognition. Deployed in 3 classrooms at MIT-SOE.', tags: ['OpenCV', 'Python', 'Flask'], status: 'Completed', statusVariant: 'success' as const, icon: Code2, iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100', border: '' },
        { title: 'Formula Bharat Aerodynamics', desc: 'CFD simulations and aerodynamic package design for Speedtail Racing 2026 car.', tags: ['SolidWorks', 'CFD', 'Aero'], status: 'In Progress', statusVariant: 'warning' as const, icon: Zap, iconBg: 'bg-violet-50 text-violet-600 border-violet-100', border: 'border-l-4 border-l-violet-500' },
    ];

    return (
        <MainLayout>
            <div className="flex flex-col gap-5 animate-fade-in pb-10">
                <div className="text-left">
                    <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Folder size={20} className="text-sky-500" /> My Projects
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">{projects.length} projects • 2 in progress</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map(p => {
                        const Icon = p.icon;
                        return (
                            <Card key={p.title} className={`p-5 group cursor-pointer hover:-translate-y-1 transition-transform text-left ${p.border}`}>
                                <div className="flex justify-between items-start mb-3">
                                    <div className={`w-10 h-10 rounded-xl ${p.iconBg} flex items-center justify-center border`}>
                                        <Icon size={20} />
                                    </div>
                                    <Badge variant={p.statusVariant}>{p.status}</Badge>
                                </div>
                                <h3 className="text-sm font-bold text-slate-900 mb-1.5 group-hover:text-sky-600 transition-colors">{p.title}</h3>
                                <p className="text-[11px] text-slate-500 leading-relaxed mb-3 line-clamp-2">{p.desc}</p>
                                <div className="flex flex-wrap gap-1.5 mt-auto">
                                    {p.tags.map(t => (
                                        <span key={t} className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">{t}</span>
                                    ))}
                                </div>
                            </Card>
                        );
                    })}

                    {/* Add New */}
                    <Card className="p-5 border-dashed border-2 border-slate-200 bg-white/50 flex items-center justify-center flex-col min-h-[200px] hover:border-sky-400 hover:bg-white cursor-pointer transition-all">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-400">
                            <span className="text-2xl">+</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-700 mb-0.5">Add New Project</h3>
                        <p className="text-[10px] text-slate-400">Document your work</p>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
};

export default Projects;
