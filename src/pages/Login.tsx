import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, Sparkles, GraduationCap } from 'lucide-react';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useAuth } from '../context/AuthContext';

/* Demo users — used for Quick Access */
const DEMO_STUDENT = {
    id: 'demo-001',
    name: 'Aarush Parate',
    email: 'aarush@mitadtu.ac.in',
    username: 'aarush.parate',
    role: 'student',
};

const DEMO_FACULTY = {
    id: 'faculty-001',
    name: 'Dr. Meera Joshi',
    email: 'meera.joshi@mitadtu.ac.in',
    username: 'meera.joshi',
    role: 'faculty',
};

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleDemoLogin = (type: 'student' | 'faculty') => {
        setLoading(true);
        setTimeout(() => {
            if (type === 'faculty') {
                login(DEMO_FACULTY);
                navigate('/faculty/home');
            } else {
                login(DEMO_STUDENT);
                navigate('/home');
            }
        }, 400);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Client-side login — accept any credentials, use demo user
        // In production you'd validate against a real backend here
        setTimeout(() => {
            if (!formData.email || !formData.password) {
                setError('Please enter both email and password.');
                setLoading(false);
                return;
            }
            login({
                ...DEMO_STUDENT,
                email: formData.email,
                name: formData.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                username: formData.email.split('@')[0],
            });
            navigate('/home');
        }, 500);
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to your authentic campus profile"
        >
            <div className="mb-6 p-4 bg-sky-50 border border-sky-100 rounded-2xl flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sky-700">
                    <Sparkles size={18} />
                    <span className="font-bold text-sm text-left">Quick Access Mode</span>
                </div>
                <p className="text-xs text-slate-500 text-left">Explore all features instantly — no account needed.</p>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-white border-sky-200 text-sky-600 hover:bg-sky-50"
                        onClick={() => handleDemoLogin('student')}
                        disabled={loading}
                    >
                        🚀 Student Demo
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-white border-amber-200 text-amber-600 hover:bg-amber-50"
                        onClick={() => handleDemoLogin('faculty')}
                        disabled={loading}
                    >
                        <GraduationCap size={14} className="mr-1" />
                        Faculty Demo
                    </Button>
                </div>
            </div>

            <form id="login-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}
                <Input
                    label="College Email"
                    type="email"
                    placeholder="student@university.edu"
                    leftIcon={<Mail size={18} />}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />

                <div className="space-y-1">
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        leftIcon={<Lock size={18} />}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <div className="text-right">
                        <Link to="/forgot-password" className="text-sm text-secondary hover:text-primary transition-colors">
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <Button
                    type="submit"
                    size="lg"
                    className="w-full mt-2"
                    isLoading={loading}
                    rightIcon={<ArrowRight size={18} />}
                >
                    Sign In
                </Button>

                <div className="text-center text-sm text-muted">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary font-medium hover:underline">
                        Create Profile
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;
