import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Folder, Code2, Brain, Globe, Zap, X, Github, ExternalLink, Calendar, Plus, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_PROJECTS = [
    { id: 1, title: 'UniConn App', desc: 'The official campus platform for MIT ADTU. Built with React, Node.js, and PostgreSQL.', fullDesc: 'A comprehensive campus management system integrating academic, social, and professional tools for students and faculty. Features include a real-time feed, dynamic calendar, club management, and AI-powered insights.', tags: ['React', 'PostgreSQL', 'Tailwind'], status: 'Active', statusVariant: 'primary' as const, icon: Globe, iconBg: 'bg-sky-50 text-sky-600 border-sky-100', border: 'border border-slate-100', date: 'Jan 2026', collaborators: ['Aarush Parate', 'Vedant Dande'], github: 'https://github.com', live: 'https://uniconn.app' },
    { id: 2, title: 'AI Content Moderator', desc: 'Automated content moderation for the college forum using Python and OpenAI API. Filters spam and toxic content.', fullDesc: 'A backend service that utilizes LLMs to analyze text and flag inappropriate content in real-time. Achieved 98% accuracy on the campus forum dataset.', tags: ['Python', 'AI', 'FastAPI'], status: 'In Progress', statusVariant: 'warning' as const, icon: Brain, iconBg: 'bg-amber-50 text-amber-600 border-amber-100', border: 'border border-slate-100', date: 'Feb 2026', collaborators: ['Vedant Dande'], github: 'https://github.com' },
    { id: 3, title: 'Smart Attendance System', desc: 'Computer Vision based attendance using face recognition. Deployed in 3 classrooms at MIT-SOE.', fullDesc: 'Uses OpenCV and dlib to detect and recognize faces from a live CCTV feed, automatically updating the attendance database via a Flask API. Reduces attendance time by 80%.', tags: ['OpenCV', 'Python', 'Flask'], status: 'Completed', statusVariant: 'success' as const, icon: Code2, iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100', border: 'border border-slate-100', date: 'Nov 2025', collaborators: ['Omkar P', 'Aditya M'] },
    { id: 4, title: 'Formula Bharat Aerodynamics', desc: 'CFD simulations and aerodynamic package design for Speedtail Racing 2026 car.', fullDesc: 'Complete aerodynamic analysis including front wing, rear wing, and undertray design. Simulated in ANSYS CFX to achieve a 15% increase in downforce while minimizing drag.', tags: ['SolidWorks', 'CFD', 'Aero'], status: 'In Progress', statusVariant: 'warning' as const, icon: Zap, iconBg: 'bg-slate-100 text-slate-600 border-slate-200', border: 'border border-slate-100', date: 'Dec 2025', collaborators: ['Speedtail Racing Team'] },
];

const Projects = () => {
    const [projects, setProjects] = useState(INITIAL_PROJECTS);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [isAddOpen, setIsAddOpen] = useState(false);

    // Form state
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newTags, setNewTags] = useState('');

    const handleAddProject = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim() || !newDesc.trim()) return;

        const newProject = {
            id: Date.now(),
            title: newTitle,
            desc: newDesc,
            fullDesc: newDesc,
            tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
            status: 'In Progress',
            statusVariant: 'warning' as const,
            icon: Folder,
            iconBg: 'bg-sky-50 text-sky-600 border-sky-100',
            border: 'border border-slate-100',
            date: 'Just now',
            collaborators: ['You']
        };

        setProjects([newProject, ...projects]);
        setIsAddOpen(false);
        setNewTitle('');
        setNewDesc('');
        setNewTags('');
    };

    return (
        <MainLayout>
            <div className="flex flex-col gap-5 pb-10">
                <div className="text-left flex justify-between items-end">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Folder size={20} className="text-sky-500" /> My Projects
                        </h1>
                        <p className="text-xs text-slate-500 mt-0.5">{projects.length} projects • {projects.filter(p => p.status === 'In Progress').length} in progress</p>
                    </div>
                    <Button onClick={() => setIsAddOpen(true)} className="flex items-center gap-1.5 text-xs">
                        <Plus size={14} /> Add Project
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map(p => {
                        const Icon = p.icon;
                        return (
                            <Card key={p.id} onClick={() => setSelectedProject(p)} className={`p-5 group cursor-pointer hover:border-sky-200 transition-colors text-left ${p.border}`}>
                                <div className="flex justify-between items-start mb-3">
                                    <div className={`w-10 h-10 rounded-lg ${p.iconBg} flex items-center justify-center border`}>
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

                    {/* Add New Card */}
                    <Card onClick={() => setIsAddOpen(true)} className="p-5 border-dashed border-2 border-slate-200 bg-slate-50/50 flex items-center justify-center flex-col min-h-[200px] hover:border-sky-300 hover:bg-sky-50/50 cursor-pointer transition-all">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-400 group-hover:bg-sky-100 group-hover:text-sky-500 transition-colors">
                            <span className="text-2xl">+</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-700 mb-0.5">Add New Project</h3>
                        <p className="text-[10px] text-slate-400">Document your work</p>
                    </Card>
                </div>
            </div>

            {/* Modals / Drawers */}
            <AnimatePresence>
                {/* Project Details Modal */}
                {selectedProject && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]"
                            >
                            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50">
                                <div className="flex gap-4">
                                    <div className={`w-12 h-12 rounded-lg ${selectedProject.iconBg} flex items-center justify-center border shrink-0 bg-white`}>
                                        <selectedProject.icon size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900 leading-tight mb-2">{selectedProject.title}</h2>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={selectedProject.statusVariant}>{selectedProject.status}</Badge>
                                            <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar size={12}/> {selectedProject.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedProject(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="p-6 overflow-y-auto">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Description</h3>
                                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                    {selectedProject.fullDesc}
                                </p>

                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3">Team</h3>
                                        <div className="flex flex-col gap-2.5">
                                            {selectedProject.collaborators?.map((c: string) => (
                                                <div key={c} className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                                                    <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] text-slate-500 shrink-0">
                                                        {c.charAt(0)}
                                                    </div>
                                                    {c}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3">Tech Stack</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tags.map((t: string) => (
                                                <span key={t} className="text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {(selectedProject.github || selectedProject.live) && (
                                    <div className="pt-5 border-t border-slate-100 flex gap-3">
                                        {selectedProject.github && (
                                            <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors">
                                                <Github size={14} /> Repository
                                            </a>
                                        )}
                                        {selectedProject.live && (
                                            <a href={selectedProject.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-600 border border-sky-200 text-xs font-bold rounded-lg hover:bg-sky-100 transition-colors">
                                                <ExternalLink size={14} /> Live Demo
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                        </motion.div>
                    </>
                )}

                {/* Add Project Modal */}
                {isAddOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddOpen(false)}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden flex flex-col"
                            >
                            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                    <Folder size={16} className="text-sky-500"/> Create New Project
                                </h2>
                                <button onClick={() => setIsAddOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
                                    <X size={16} />
                                </button>
                            </div>
                            
                            <form onSubmit={handleAddProject} className="p-6 flex flex-col gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Project Title</label>
                                    <Input 
                                        placeholder="e.g. Campus Navigation App" 
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Description</label>
                                    <textarea 
                                        className="w-full h-24 px-3 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-none placeholder:text-slate-400"
                                        placeholder="What is this project about?"
                                        value={newDesc}
                                        onChange={(e) => setNewDesc(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Tags / Tech Stack (comma separated)</label>
                                    <Input 
                                        placeholder="e.g. React, Node.js, Firebase" 
                                        value={newTags}
                                        onChange={(e) => setNewTags(e.target.value)}
                                    />
                                </div>
                                
                                <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-slate-100">
                                    <Button type="button" variant="ghost" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                                    <Button type="submit" className="flex items-center gap-2"><Save size={16}/> Save Project</Button>
                                </div>
                            </form>
                        </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </MainLayout>
    );
};

export default Projects;
