import { Card } from '../components/common/Card';
import { MainLayout } from '../components/layout/MainLayout';
import { Target, Zap, Server, Activity, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

const AIInsights = () => {
    return (
        <MainLayout>
            <div className="container mx-auto pb-12 animate-fade-in">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">UNICONN Monthly Growth Insight</h1>
                    <p className="text-secondary">AI-driven analysis of your professional trajectory.</p>
                </div>

                {/* Top Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="p-6 border-l-4 border-primary bg-primary/5">
                        <div className="mb-2 text-secondary text-sm font-medium">Student</div>
                        <h3 className="text-xl font-bold text-white">Aarush Parate</h3>
                    </Card>
                    <Card className="p-6 border-l-4 border-accent bg-accent/5">
                        <div className="mb-2 text-secondary text-sm font-medium">Target Role</div>
                        <h3 className="text-xl font-bold text-white">AI Systems Engineer</h3>
                    </Card>
                    <Card className="p-6 border-l-4 border-yellow-500 bg-yellow-500/5">
                        <div className="mb-2 text-secondary text-sm font-medium">Current Stage</div>
                        <h3 className="text-xl font-bold text-white">Emerging → Competitive</h3>
                    </Card>
                    <Card className="p-6 border-l-4 border-success bg-success/5">
                        <div className="mb-2 text-secondary text-sm font-medium">Differentiation</div>
                        <h3 className="text-xl font-bold text-white">Top 15% (Building)</h3>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
                    {/* Left Column: Deep Analysis */}
                    <div className="flex flex-col gap-8">

                        {/* Where You Stand */}
                        <Card className="p-8">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Activity className="text-primary" /> 📍 Where You Stand Right Now
                            </h2>
                            <div className="space-y-6">
                                <p className="text-secondary leading-relaxed">
                                    You are in the <strong className="text-white">Emerging → Competitive</strong> transition stage.
                                    You are stronger than the average AI student because:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        "You think in systems, not just models",
                                        "You build APIs around ML",
                                        "You understand deployment basics",
                                        "You care about architecture"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                                            <CheckCircle2 size={18} className="text-success shrink-0" />
                                            <span className="text-sm font-medium text-white">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                                    <p className="text-orange-200 text-sm italic">
                                        "However, you are not yet clearly differentiated from the large AI student cluster.
                                        You are capable, but not yet distinct."
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Bottleneck & Focus */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="p-8 border border-red-500/30 bg-gradient-to-br from-red-500/5 to-transparent">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <AlertTriangle className="text-red-500" /> 🚧 Biggest Bottleneck
                                </h3>
                                <p className="text-2xl font-black text-white mb-4">Engineering Maturity Depth</p>
                                <p className="text-secondary text-sm mb-4">
                                    Right now your profile signals "Strong AI builder", but not yet "Reliable AI Systems Engineer".
                                </p>
                                <ul className="space-y-2 text-sm text-muted">
                                    <li className="flex gap-2">❌ Missing CI/CD pipelines</li>
                                    <li className="flex gap-2">❌ Basic Monitoring</li>
                                    <li className="flex gap-2">❌ Clean Production Arch</li>
                                </ul>
                            </Card>

                            <Card className="p-8 border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-transparent">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <Target className="text-emerald-500" /> 🎯 One High-Leverage Focus
                                </h3>
                                <div className="space-y-4">
                                    <div className="text-center p-3 bg-white/5 rounded-lg">
                                        <div className="text-xs text-muted uppercase font-bold mb-1">Shift From</div>
                                        <div className="text-white font-medium">"Building smart AI projects"</div>
                                    </div>
                                    <div className="flex justify-center text-emerald-500">↓</div>
                                    <div className="text-center p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                        <div className="text-xs text-emerald-300 uppercase font-bold mb-1">Shift To</div>
                                        <div className="text-white font-bold">"Engineering production-grade AI systems"</div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Action Plan */}
                        <Card className="p-8">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Zap className="text-yellow-400" /> 🛠️ WHAT To Do (Next 30 Days)
                            </h2>
                            <div className="space-y-8">
                                <div className="relative pl-8 border-l-2 border-white/10 space-y-8">
                                    {/* Step 1 */}
                                    <div className="relative">
                                        <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-bg-card border-4 border-primary flex-center text-xs font-bold text-primary">1</div>
                                        <h4 className="text-lg font-bold text-white mb-2">Production-Harden One Project</h4>
                                        <p className="text-sm text-secondary mb-3">Take your ML Deployment API and add:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['Authentication', 'Structured Logging', 'Health Check Endpoint', 'Versioning', 'Error Handling'].map(tag => (
                                                <span key={tag} className="px-3 py-1 bg-white/5 rounded text-xs text-white border border-white/10">{tag}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="relative">
                                        <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-bg-card border-4 border-accent flex-center text-xs font-bold text-accent">2</div>
                                        <h4 className="text-lg font-bold text-white mb-2">Implement Real CI/CD</h4>
                                        <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-accent/80">
                                            .github/workflows/deploy.yml<br />
                                            ├── Install dependencies<br />
                                            ├── Run tests<br />
                                            ├── Build Docker Image<br />
                                            └── Deploy automatically
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="relative">
                                        <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-bg-card border-4 border-success flex-center text-xs font-bold text-success">3</div>
                                        <h4 className="text-lg font-bold text-white mb-2">Add Observability</h4>
                                        <p className="text-sm text-secondary">Basic logging dashboard, error tracking, and performance timing logs. This is where you differentiate.</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Strategy & Identity */}
                    <div className="flex flex-col gap-6">

                        {/* HOW to Execute */}
                        <Card className="p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Server size={20} className="text-purple-400" /> 🔎 Execution Guide
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-2">Technicals</h4>
                                    <p className="text-xs text-secondary leading-relaxed mb-2">
                                        Use <strong>GitHub Actions</strong> for the pipeline. Write a technical breakdown: "How I Designed a Production-Ready AI System", explaining your architecture choices.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-2">Refactoring</h4>
                                    <div className="bg-white/5 rounded p-3">
                                        <code className="text-xs text-accent block">
                                            /services<br />
                                            /models<br />
                                            /routers<br />
                                            /config
                                        </code>
                                    </div>
                                    <p className="text-xs text-secondary mt-2">Make it look like enterprise production code.</p>
                                </div>
                            </div>
                        </Card>

                        {/* Projection */}
                        <Card className="p-6 bg-gradient-to-b from-primary/10 to-transparent border-primary/20">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <TrendingUp size={20} className="text-primary" /> 📈 Projection
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs text-primary font-bold uppercase mb-1">Within 3 Months</div>
                                    <p className="text-sm text-white">You move into the <strong>Competitive Tier</strong>.</p>
                                </div>
                                <div>
                                    <div className="text-xs text-primary font-bold uppercase mb-1">Within 6 Months</div>
                                    <p className="text-sm text-white">Strong candidate for <strong>MLOps Associate</strong> or <strong>Backend AI Engineer</strong>.</p>
                                </div>
                            </div>
                        </Card>

                        {/* Identity Shift */}
                        <Card className="p-6 border-t-4 border-t-white/20">
                            <h3 className="text-lg font-bold text-white mb-2">🧠 Identity Shift</h3>
                            <div className="flex items-center gap-3 text-sm mb-4">
                                <span className="text-muted line-through">AI Builder</span>
                                <span className="text-white">→</span>
                                <span className="text-success font-bold">AI Infra Engineer</span>
                            </div>
                            <p className="text-xs text-secondary leading-relaxed">
                                A smaller, stronger competitive space. Less crowded. More respected. Higher leverage.
                            </p>
                        </Card>

                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default AIInsights;
