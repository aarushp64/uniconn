import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/common/Card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto pb-12">
                <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 mb-4 transition-colors">
                    <ArrowLeft size={14} /> Back
                </button>

                <Card className="p-6 sm:p-8 border-slate-100">
                    <h1 className="text-xl font-bold text-slate-900 mb-1">Privacy Policy</h1>
                    <p className="text-xs text-slate-400 mb-6">Last updated: August 19, 2026</p>

                    <div className="prose prose-sm prose-slate max-w-none space-y-5 text-[13px] leading-relaxed text-slate-600">
                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">1. Information We Collect</h2>
                            <p>UniConn collects information you provide when creating your campus profile, including your name, college email address, department, year of study, and academic details. We also collect information about your activity on the platform, such as posts, project submissions, club memberships, and verification requests.</p>
                        </section>

                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">2. How We Use Your Information</h2>
                            <p>We use your information to provide and improve the UniConn platform, including personalizing your feed, generating skill assessments through our AI insights engine, matching you with relevant opportunities, and facilitating faculty verification of your academic achievements and projects.</p>
                        </section>

                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">3. Information Sharing</h2>
                            <p>Your profile information is visible to other authenticated users within the MIT ADTU campus network. Faculty members can view student profiles for verification purposes. We do not sell your personal information to third parties. Aggregated, anonymized data may be used for institutional reporting and platform improvement.</p>
                        </section>

                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">4. Data Security</h2>
                            <p>We implement industry-standard security measures to protect your data, including encrypted connections (HTTPS), secure authentication, and access controls. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
                        </section>

                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">5. Your Rights</h2>
                            <p>You have the right to access, correct, or delete your personal information at any time through your account settings. You can also request a copy of your data or ask us to restrict processing. To exercise these rights, contact us at privacy@uniconn.in.</p>
                        </section>

                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">6. Cookies and Analytics</h2>
                            <p>UniConn uses essential cookies for authentication and session management. We use analytics to understand platform usage patterns and improve the user experience. You can manage cookie preferences through your browser settings.</p>
                        </section>

                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">7. Changes to This Policy</h2>
                            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes through the platform notification system. Continued use of UniConn after changes constitutes acceptance of the updated policy.</p>
                        </section>

                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">8. Contact</h2>
                            <p>For questions about this Privacy Policy, contact us at privacy@uniconn.in or visit the Student Affairs Office, MIT ADTU, Pune 412201.</p>
                        </section>
                    </div>
                </Card>
            </div>
        </MainLayout>
    );
};

export default PrivacyPolicy;
