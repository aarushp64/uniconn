import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleDemoLogin = () => {
        setFormData({
            email: 'demo@uniconn.edu',
            password: 'password123'
        });
        // Trigger submit after state update
        setTimeout(() => {
            const form = document.getElementById('login-form') as HTMLFormElement;
            form?.requestSubmit();
        }, 100);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await api.post('/auth/login', formData);
            login(data.token, data.user);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
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
                <p className="text-xs text-slate-500 text-left">Use the demo account to explore all features instantly without a database setup.</p>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-white border-sky-200 text-sky-600 hover:bg-sky-50"
                    onClick={handleDemoLogin}
                    disabled={loading}
                >
                    🚀 Log in as Demo Explorer
                </Button>
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
