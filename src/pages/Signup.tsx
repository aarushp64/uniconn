import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock signup logic will go here
        setTimeout(() => {
            setLoading(false);
            navigate('/onboarding');
        }, 1500);
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Start building your verifiable identity"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    leftIcon={<User size={18} />}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                />

                <Input
                    label="College Email"
                    type="email"
                    placeholder="student@university.edu"
                    leftIcon={<Mail size={18} />}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    leftIcon={<Lock size={18} />}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    leftIcon={<Lock size={18} />}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                />

                <Button
                    type="submit"
                    size="lg"
                    className="w-full mt-4"
                    isLoading={loading}
                    rightIcon={<ArrowRight size={18} />}
                >
                    Get Started
                </Button>

                <div className="text-center text-sm text-muted">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary font-medium hover:underline">
                        Sign In
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Signup;
