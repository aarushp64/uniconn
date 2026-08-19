import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/common/Card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
    const navigate = useNavigate();

    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto pb-12">
                <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 mb-4 transition-colors">
                    <ArrowLeft size={14} /> Back
                </button>

                <Card className="p-6 sm:p-8 border-slate-100">
                    <h1 className="text-xl font-bold text-slate-900 mb-1">Terms of Service</h1>
                    <p className="text-xs text-slate-400 mb-6">Effective: August 19, 2026</p>

                    <div className="prose prose-sm prose-slate max-w-none space-y-5 text-[13px] leading-relaxed text-slate-600">
                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">1. Acceptance of Terms</h2>
                            <p>By accessing or using UniConn, you agree to be bound by these Terms of Service. UniConn is a campus networking platform operated for the MIT ADTU community. If you do not agree to these terms, do not use the platform.</p>
                        </section>

                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">2. Eligibility</h2>
                            <p>UniConn is available to current students, faculty, and authorized staff of MIT ADTU. You must use your official institutional email address (@mitadtu.ac.in) to register. Accounts are non-transferable.</p>
                        </section>

                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">3. User Accounts</h2>
                            <p>You are responsible for maintaining the confidentiality of your account credentials. All activity under your account is your responsibility. You must provide accurate, current information in your profile. Impersonation of other users or faculty members is strictly prohibited.</p>
                        </section>

                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">4. Content Standards</h2>
                            <p>You retain ownership of content you post on UniConn. By posting, you grant UniConn a non-exclusive license to display and distribute your content within the platform. Content must be truthful and relevant to campus life. You may not post misleading academic claims, fabricated achievements, or content that violates MIT ADTU's code of conduct.</p>
                        </section>

                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">5. Verification System</h2>
                            <p>UniConn's faculty verification system allows authorized faculty to validate student achievements, projects, and skills. Verified badges indicate faculty endorsement of specific claims. Misrepresenting unverified content as verified is a violation of these terms and may result in account suspension.</p>
                        </section>

                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">6. Prohibited Conduct</h2>
                            <p>You may not: (a) use the platform for commercial solicitation without authorization; (b) attempt to access other users' accounts; (c) distribute malware or harmful code; (d) scrape or bulk-download platform data; (e) harass, bully, or discriminate against other users; (f) post false or misleading academic credentials.</p>
                        </section>

                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">7. Intellectual Property</h2>
                            <p>The UniConn platform, including its design, code, and branding, is the intellectual property of the UniConn development team. The AI insights engine, skill scoring algorithms, and verification workflows are proprietary systems.</p>
                        </section>

                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">8. Termination</h2>
                            <p>We reserve the right to suspend or terminate accounts that violate these terms. Upon graduation or departure from MIT ADTU, your account will transition to alumni status with limited access. You may request account deletion at any time through Settings.</p>
                        </section>

                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">9. Limitation of Liability</h2>
                            <p>UniConn is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the platform, including but not limited to data loss, missed opportunities, or reliance on AI-generated insights.</p>
                        </section>

                        <section>
                            <h2 className="text-sm font-bold text-slate-800 mb-2">10. Contact</h2>
                            <p>For questions about these Terms, contact us at legal@uniconn.in or visit the Student Affairs Office, MIT ADTU, Pune 412201.</p>
                        </section>
                    </div>
                </Card>
            </div>
        </MainLayout>
    );
};

export default TermsOfService;
