import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, Briefcase, Building2, ChevronRight, Check } from 'lucide-react';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { StudentDetailsForm } from '../components/features/auth/StudentDetailsForm';

type UserRole = 'student' | 'faculty' | 'club' | 'recruiter' | null;

const Onboarding = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0); // 0: Role Selection, 1: Details
    const [role, setRole] = useState<UserRole>(null);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({
        year: '',
        branch: '',
        skills: [],
        interests: []
    });

    const roles = [
        { id: 'student', title: 'Student', icon: <GraduationCap size={24} />, desc: 'Build your profile & find opportunities' },
        { id: 'faculty', title: 'Faculty', icon: <Users size={24} />, desc: 'Post projects & verify contributions' },
        { id: 'club', title: 'Club Lead', icon: <Building2 size={24} />, desc: 'Recruit members & manage events' },
        { id: 'recruiter', title: 'Recruiter', icon: <Briefcase size={24} />, desc: 'Hire verified campus talent' },
    ];

    const handleRoleSelect = (selectedRole: string) => {
        setRole(selectedRole as UserRole);
    };

    const handleNext = () => {
        if (step === 0 && role) {
            setStep(1);
        } else {
            // Complete onboarding
            setLoading(true);
            // Here we would submit 'details' along with 'role'
            setTimeout(() => {
                setLoading(false);
                navigate('/dashboard');
            }, 1500);
        }
    };

    const renderStepContent = () => {
        if (step === 0) {
            return (
                <div className="grid grid-cols-1 gap-3">
                    {roles.map((r) => (
                        <Card
                            key={r.id}
                            onClick={() => handleRoleSelect(r.id)}
                            className={`cursor-pointer border-2 transition-all duration-200 flex items-center gap-4 p-4
                  ${role === r.id
                                    ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(79,70,229,0.3)]'
                                    : 'border-transparent hover:border-glass-border'
                                }
                `}
                            glass={true}
                            hover={role !== r.id}
                        >
                            <div className={`p-3 rounded-full ${role === r.id ? 'bg-primary text-white' : 'bg-glass-surface text-secondary'}`}>
                                {r.icon}
                            </div>
                            <div className="flex-1 text-left">
                                <h3 className={`font-semibold ${role === r.id ? 'text-white' : 'text-gray-200'}`}>{r.title}</h3>
                                <p className="text-xs text-muted">{r.desc}</p>
                            </div>
                            {role === r.id && <Check className="text-primary" size={20} />}
                        </Card>
                    ))}
                </div>
            );
        }

        if (step === 1) {
            if (role === 'student') {
                return <StudentDetailsForm data={details} onChange={(data) => setDetails(data as typeof details)} />;
            }
            return (
                <div className="text-center py-10 animate-fade-in">
                    <p className="text-muted">Form for {role} coming soon...</p>
                </div>
            );
        }
    };

    return (
        <AuthLayout
            title={step === 0 ? "Choose your Role" : "Complete Profile"}
            subtitle={step === 0 ? "How will you use UniConn?" : `Setting up as ${role}`}
        >
            <div className="flex flex-col gap-6">
                {renderStepContent()}

                <div className="flex justify-between pt-4">
                    {step > 0 && (
                        <Button variant="ghost" onClick={() => setStep(step - 1)}>Back</Button>
                    )}
                    <Button
                        onClick={handleNext}
                        disabled={!role || (step === 1 && role === 'student' && (!details.year || !details.branch))}
                        isLoading={loading}
                        rightIcon={<ChevronRight size={18} />}
                        size="lg"
                        className={step === 0 ? "w-full" : "ml-auto"}
                    >
                        {step === 0 ? 'Continue' : 'Finish Setup'}
                    </Button>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Onboarding;
