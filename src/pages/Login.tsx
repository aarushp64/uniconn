import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock login delay
        setTimeout(() => {
            setLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to your authentic campus profile"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
