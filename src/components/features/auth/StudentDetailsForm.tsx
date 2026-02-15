import React, { useState } from 'react';
import { BookOpen, Calendar, Code2, Heart } from 'lucide-react';
import { Input } from '../../common/Input';
import { Badge } from '../../common/Badge';

interface StudentFormData {
    skills?: string[];
    interests?: string[];
    year?: string;
    branch?: string;
    [key: string]: unknown;
}

interface StudentDetailsFormProps {
    data: StudentFormData;
    onChange: (data: StudentFormData) => void;
}

export const StudentDetailsForm: React.FC<StudentDetailsFormProps> = ({ data, onChange }) => {
    const [skillInput, setSkillInput] = useState('');
    const [interestInput, setInterestInput] = useState('');

    const handleAddSkill = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            if (!data.skills?.includes(skillInput.trim())) {
                onChange({ ...data, skills: [...(data.skills || []), skillInput.trim()] });
            }
            setSkillInput('');
        }
    };

    const handleAddInterest = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && interestInput.trim()) {
            e.preventDefault();
            if (!data.interests?.includes(interestInput.trim())) {
                onChange({ ...data, interests: [...(data.interests || []), interestInput.trim()] });
            }
            setInterestInput('');
        }
    };

    const removeSkill = (skill: string) => {
        onChange({ ...data, skills: data.skills?.filter((s: string) => s !== skill) || [] });
    };

    const removeInterest = (interest: string) => {
        onChange({ ...data, interests: data.interests?.filter((i: string) => i !== interest) || [] });
    };

    return (
        <div className="flex flex-col gap-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="College Year"
                    type="number"
                    min="1"
                    max="5"
                    placeholder="e.g. 1"
                    leftIcon={<Calendar size={18} />}
                    value={data.year || ''}
                    onChange={(e) => onChange({ ...data, year: e.target.value })}
                    required
                />
                <Input
                    label="Branch/Major"
                    type="text"
                    placeholder="e.g. CSE"
                    leftIcon={<BookOpen size={18} />}
                    value={data.branch || ''}
                    onChange={(e) => onChange({ ...data, branch: e.target.value })}
                    required
                />
            </div>

            <div className="space-y-2">
                <Input
                    label="Top Skills (Press Enter to add)"
                    type="text"
                    placeholder="React, Python, Design..."
                    leftIcon={<Code2 size={18} />}
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                />
                <div className="flex flex-wrap gap-2">
                    {data.skills?.map((skill: string) => (
                        <Badge key={skill} variant="primary" className="cursor-pointer" onClick={() => removeSkill(skill)}>
                            {skill} ×
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <Input
                    label="Interests (Press Enter to add)"
                    type="text"
                    placeholder="Hackathons, AI, Open Source..."
                    leftIcon={<Heart size={18} />}
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                    onKeyDown={handleAddInterest}
                />
                <div className="flex flex-wrap gap-2">
                    {data.interests?.map((interest: string) => (
                        <Badge key={interest} variant="secondary" className="cursor-pointer" onClick={() => removeInterest(interest)}>
                            {interest} ×
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
};
