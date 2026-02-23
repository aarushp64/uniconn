import React from 'react';
import { ArrowRight, Clock, Building2 } from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';

export interface OpportunityProps {
    id: string;
    title: string;
    organization: string;
    type: 'Project' | 'Job' | 'Club Role' | 'Research';
    skills: string[];
    postedDaysAgo: number;
    featured?: boolean;
}

export const OpportunityCard: React.FC<OpportunityProps> = ({
    id,
    title,
    organization,
    type,
    skills,
    postedDaysAgo,
    featured = false
}) => {
    return (
        <Card
            className={`flex flex-col h-full bg-white border-border-soft ${featured ? 'border-sky-300 ring-4 ring-sky-50' : ''}`}
            hover={true}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-sky-50 rounded-lg border border-sky-100">
                    <Building2 size={24} className="text-sky-600" />
                </div>
                {featured && <Badge variant="primary" verified={true}>Featured</Badge>}
            </div>

            <div className="flex-1">
                <h3 className="text-lg font-bold text-primary mb-1 line-clamp-1">{title}</h3>
                <p className="text-sm text-secondary mb-4">{organization} • {type}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="neutral">{skill}</Badge>
                    ))}
                    {skills.length > 3 && <Badge variant="outline">+{skills.length - 3}</Badge>}
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border-soft mt-auto">
                <div className="flex items-center text-xs text-muted">
                    <Clock size={12} className="mr-1" />
                    {postedDaysAgo}d ago
                </div>
                <a href={`/opportunity/${id}`}>
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                        View <ArrowRight size={14} className="ml-1" />
                    </Button>
                </a>
            </div>
        </Card>
    );
};
