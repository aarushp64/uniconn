/* ─── Faculty Mock Data ─── */

export interface VerificationRequest {
    id: string;
    studentName: string;
    studentDept: string;
    studentYear: number;
    studentAvatar: string;
    projectTitle: string;
    description: string;
    skills: string[];
    evidenceLinks: string[];
    submittedAt: string;
    status: 'PENDING' | 'VERIFIED' | 'REJECTED';
    verifiedAt?: string;
}

export interface SupervisedStudent {
    id: string;
    name: string;
    department: string;
    year: number;
    avatar: string;
    verifiedProjects: number;
    readinessScore: number;
    skills: string[];
    currentProject?: string;
}

export interface ResearchOpportunity {
    id: string;
    title: string;
    description: string;
    requiredSkills: string[];
    duration: string;
    maxStudents: number;
    department: string;
    status: 'OPEN' | 'CLOSED';
    applicants: number;
    createdAt: string;
}

export interface FacultyStats {
    pendingVerifications: number;
    activeStudents: number;
    researchOpportunities: number;
    verifiedThisMonth: number;
}

/* ─── In-memory stores ─── */

const verificationRequests: VerificationRequest[] = [
    {
        id: 'vr1', studentName: 'Aarush Parate', studentDept: 'Computer Science', studentYear: 3, studentAvatar: 'AP',
        projectTitle: 'AI Chatbot for Campus Queries', description: 'Built a GPT-powered chatbot integrated with campus FAQ database using RAG pipeline and LangChain. Deployed on campus portal with 500+ active users.',
        skills: ['Python', 'LangChain', 'React', 'FastAPI'], evidenceLinks: ['github.com/aarush/campus-bot', 'demo.campusbot.in'],
        submittedAt: '2026-03-07', status: 'PENDING'
    },
    {
        id: 'vr2', studentName: 'Riya Sharma', studentDept: 'Electronics', studentYear: 3, studentAvatar: 'RS',
        projectTitle: 'Smart Irrigation ML Model', description: 'Developed a sensor-based irrigation prediction system using Random Forest and real-time soil moisture data. Achieved 94% accuracy on field trials.',
        skills: ['Python', 'scikit-learn', 'IoT', 'Arduino'], evidenceLinks: ['github.com/riya/smart-irrigate'],
        submittedAt: '2026-03-06', status: 'PENDING'
    },
    {
        id: 'vr3', studentName: 'Vikram Desai', studentDept: 'Mechanical', studentYear: 4, studentAvatar: 'VD',
        projectTitle: 'EV Battery Thermal Management', description: 'Designed a liquid cooling system for Li-ion battery packs in Formula Student car. Reduced peak temperature by 18°C under race conditions.',
        skills: ['ANSYS Fluent', 'SolidWorks', 'MATLAB', 'CFD'], evidenceLinks: ['drive.google.com/ev-thermal-report'],
        submittedAt: '2026-03-05', status: 'PENDING'
    },
    {
        id: 'vr4', studentName: 'Ananya Kulkarni', studentDept: 'Computer Science', studentYear: 2, studentAvatar: 'AK',
        projectTitle: 'Flutter Campus Events App', description: 'Built a cross-platform mobile app for campus event management with push notifications, RSVP tracking, and QR check-in.',
        skills: ['Flutter', 'Dart', 'Firebase', 'Figma'], evidenceLinks: ['github.com/ananya/campus-events', 'play.google.com/campusapp'],
        submittedAt: '2026-03-04', status: 'PENDING'
    },
    {
        id: 'vr5', studentName: 'Rahul Mehta', studentDept: 'Data Science', studentYear: 3, studentAvatar: 'RM',
        projectTitle: 'Plagiarism Detection System', description: 'Created an NLP-based plagiarism checker using BERT embeddings and cosine similarity. Integrated with college submission portal.',
        skills: ['Python', 'NLP', 'BERT', 'Flask'], evidenceLinks: ['github.com/rahul/plagcheck'],
        submittedAt: '2026-03-03', status: 'PENDING'
    },
    {
        id: 'vr6', studentName: 'Sneha Iyer', studentDept: 'Computer Science', studentYear: 3, studentAvatar: 'SI',
        projectTitle: 'Real-time Sign Language Translator', description: 'Built a CNN + LSTM model that translates Indian Sign Language gestures to text in real-time using a webcam. Achieved 91% accuracy on custom dataset.',
        skills: ['Python', 'TensorFlow', 'OpenCV', 'MediaPipe'], evidenceLinks: ['github.com/sneha/sign-lang-translator'],
        submittedAt: '2026-03-08', status: 'PENDING'
    },
    {
        id: 'vr7', studentName: 'Aditya Bhosale', studentDept: 'Information Technology', studentYear: 4, studentAvatar: 'AB',
        projectTitle: 'Blockchain-based Certificate Verification', description: 'Decentralized certificate verification system using Ethereum smart contracts. Eliminates fake degree fraud with tamper-proof records.',
        skills: ['Solidity', 'React', 'Node.js', 'Web3.js'], evidenceLinks: ['github.com/aditya/cert-chain', 'certverify.demo.in'],
        submittedAt: '2026-03-07', status: 'PENDING'
    },
    {
        id: 'vr8', studentName: 'Pooja Deshmukh', studentDept: 'Mechanical', studentYear: 3, studentAvatar: 'PD',
        projectTitle: 'Solar-Powered Water Purifier', description: 'Designed a portable solar-powered water purification unit using UV-C LEDs. Field-tested in Loni Kalbhor village with 99.2% pathogen removal.',
        skills: ['SolidWorks', 'Renewable Energy', 'Prototyping', 'Testing'], evidenceLinks: ['drive.google.com/solar-purifier-report'],
        submittedAt: '2026-03-06', status: 'PENDING'
    },
    {
        id: 'vr9', studentName: 'Harsh Patwardhan', studentDept: 'Data Science', studentYear: 2, studentAvatar: 'HP',
        projectTitle: 'Sentiment Analysis Dashboard', description: 'Web dashboard that analyzes social media sentiment around MIT ADTU events in real-time using Twitter API and VADER. Used during Persona Fest for live tracking.',
        skills: ['Python', 'Streamlit', 'NLP', 'API Integration'], evidenceLinks: ['github.com/harsh/sentiment-dash'],
        submittedAt: '2026-03-05', status: 'PENDING'
    },
    {
        id: 'vr10', studentName: 'Tanvi Shah', studentDept: 'Electronics', studentYear: 3, studentAvatar: 'TS',
        projectTitle: 'Software-Defined Radio Receiver', description: 'Built a custom SDR receiver using RTL-SDR dongle with GNU Radio. Can decode FM, AM, and ADS-B aircraft signals. Presented at IEEE student conference.',
        skills: ['GNU Radio', 'Python', 'Signal Processing', 'C++'], evidenceLinks: ['github.com/tanvi/sdr-receiver'],
        submittedAt: '2026-03-04', status: 'PENDING'
    },
    {
        id: 'vr11', studentName: 'Rohan Kulkarni', studentDept: 'Computer Science', studentYear: 3, studentAvatar: 'RK',
        projectTitle: 'Distributed File Storage System', description: 'Implemented a peer-to-peer distributed file storage system with chunking, replication, and fault tolerance. Handles up to 50 concurrent nodes.',
        skills: ['Go', 'gRPC', 'Docker', 'Distributed Systems'], evidenceLinks: ['github.com/rohan/distfs'],
        submittedAt: '2026-03-02', status: 'PENDING'
    },
    {
        id: 'vr12', studentName: 'Meera Reddy', studentDept: 'Data Science', studentYear: 4, studentAvatar: 'MR',
        projectTitle: 'Medical Image Analysis Pipeline', description: 'Deep learning pipeline for detecting diabetic retinopathy from retinal scans using EfficientNet. AUC of 0.97 on Kaggle benchmark.',
        skills: ['PyTorch', 'Computer Vision', 'MLOps', 'Docker'], evidenceLinks: ['github.com/meera/retina-detect', 'kaggle.com/meera'],
        submittedAt: '2026-03-01', status: 'PENDING'
    },
];

const supervisedStudents: SupervisedStudent[] = [
    { id: 's1', name: 'Aarush Parate', department: 'Computer Science', year: 3, avatar: 'AP', verifiedProjects: 4, readinessScore: 87, skills: ['React', 'Python', 'AI/ML', 'Node.js'], currentProject: 'AI Campus Assistant' },
    { id: 's2', name: 'Riya Sharma', department: 'Electronics', year: 3, avatar: 'RS', verifiedProjects: 3, readinessScore: 78, skills: ['IoT', 'Python', 'ML', 'Arduino'], currentProject: 'Smart Irrigation v2' },
    { id: 's3', name: 'Vikram Desai', department: 'Mechanical', year: 4, avatar: 'VD', verifiedProjects: 5, readinessScore: 92, skills: ['CFD', 'SolidWorks', 'MATLAB', 'EV Systems'], currentProject: 'Formula Student 2026' },
    { id: 's4', name: 'Ananya Kulkarni', department: 'Computer Science', year: 2, avatar: 'AK', verifiedProjects: 2, readinessScore: 65, skills: ['Flutter', 'Firebase', 'UI/UX', 'Dart'] },
    { id: 's5', name: 'Rahul Mehta', department: 'Data Science', year: 3, avatar: 'RM', verifiedProjects: 3, readinessScore: 74, skills: ['NLP', 'Python', 'BERT', 'SQL'] },
    { id: 's6', name: 'Priya Patil', department: 'Computer Science', year: 4, avatar: 'PP', verifiedProjects: 6, readinessScore: 95, skills: ['System Design', 'Java', 'AWS', 'Kubernetes'] },
    { id: 's7', name: 'Siddharth Joshi', department: 'Electronics', year: 2, avatar: 'SJ', verifiedProjects: 1, readinessScore: 52, skills: ['Embedded C', 'PCB Design', 'VHDL'] },
    { id: 's8', name: 'Neha Gupta', department: 'Information Technology', year: 3, avatar: 'NG', verifiedProjects: 4, readinessScore: 81, skills: ['React', 'TypeScript', 'GraphQL', 'Docker'], currentProject: 'UniConn Platform' },
    { id: 's9', name: 'Arjun Nair', department: 'Mechanical', year: 3, avatar: 'AN', verifiedProjects: 2, readinessScore: 68, skills: ['AutoCAD', 'Ansys', '3D Printing', 'GD&T'] },
    { id: 's10', name: 'Meera Reddy', department: 'Data Science', year: 4, avatar: 'MR', verifiedProjects: 5, readinessScore: 89, skills: ['Deep Learning', 'PyTorch', 'Computer Vision', 'MLOps'], currentProject: 'Medical Image Analysis' },
    { id: 's11', name: 'Karan Singh', department: 'Computer Science', year: 2, avatar: 'KS', verifiedProjects: 1, readinessScore: 45, skills: ['C++', 'DSA', 'Git'] },
    { id: 's12', name: 'Tanvi Shah', department: 'Electronics', year: 3, avatar: 'TS', verifiedProjects: 3, readinessScore: 76, skills: ['FPGA', 'Verilog', 'Signal Processing', 'Python'], currentProject: 'SDR Receiver' },
    { id: 's13', name: 'Sneha Iyer', department: 'Computer Science', year: 3, avatar: 'SI', verifiedProjects: 2, readinessScore: 72, skills: ['TensorFlow', 'Python', 'Computer Vision', 'MediaPipe'], currentProject: 'Sign Language Translator' },
    { id: 's14', name: 'Aditya Bhosale', department: 'Information Technology', year: 4, avatar: 'AB', verifiedProjects: 4, readinessScore: 85, skills: ['Solidity', 'React', 'Web3', 'Node.js'], currentProject: 'CertChain' },
    { id: 's15', name: 'Pooja Deshmukh', department: 'Mechanical', year: 3, avatar: 'PD', verifiedProjects: 2, readinessScore: 63, skills: ['SolidWorks', 'Renewable Energy', 'Prototyping', '3D Printing'] },
    { id: 's16', name: 'Harsh Patwardhan', department: 'Data Science', year: 2, avatar: 'HP', verifiedProjects: 1, readinessScore: 48, skills: ['Python', 'Streamlit', 'NLP', 'Pandas'] },
    { id: 's17', name: 'Rohan Kulkarni', department: 'Computer Science', year: 3, avatar: 'RK', verifiedProjects: 3, readinessScore: 79, skills: ['Go', 'Docker', 'Distributed Systems', 'Kubernetes'], currentProject: 'DistFS' },
    { id: 's18', name: 'Shruti Jain', department: 'Electronics', year: 4, avatar: 'SJ2', verifiedProjects: 5, readinessScore: 91, skills: ['VLSI', 'Cadence', 'Verilog', 'FPGA'], currentProject: 'RISC-V Processor' },
];

const researchOpportunities: ResearchOpportunity[] = [
    { id: 'ro1', title: 'NLP for Regional Languages', description: 'Research on building NLP models for Marathi and Hindi text classification using transformer architectures.', requiredSkills: ['Python', 'NLP', 'PyTorch', 'Transformers'], duration: '6 months', maxStudents: 3, department: 'Computer Science', status: 'OPEN', applicants: 8, createdAt: '2026-02-15' },
    { id: 'ro2', title: 'IoT-Based Smart Campus Monitoring', description: 'Design and deploy IoT sensor networks across campus for environmental monitoring and energy optimization.', requiredSkills: ['IoT', 'Arduino', 'Cloud', 'Data Analytics'], duration: '4 months', maxStudents: 4, department: 'Electronics', status: 'OPEN', applicants: 5, createdAt: '2026-02-20' },
    { id: 'ro3', title: 'Autonomous Drone Navigation', description: 'Develop computer vision algorithms for indoor drone navigation without GPS using SLAM and depth sensors.', requiredSkills: ['ROS', 'Python', 'Computer Vision', 'C++'], duration: '8 months', maxStudents: 2, department: 'Mechanical', status: 'OPEN', applicants: 12, createdAt: '2026-01-10' },
    { id: 'ro4', title: 'Federated Learning for Healthcare', description: 'Build privacy-preserving ML models for hospital data using federated learning. Collaboration with KEM Hospital Pune.', requiredSkills: ['Python', 'PyTorch', 'Federated Learning', 'Healthcare AI'], duration: '6 months', maxStudents: 3, department: 'Data Science', status: 'OPEN', applicants: 9, createdAt: '2026-02-25' },
    { id: 'ro5', title: 'RISC-V Processor Design', description: 'Design and verify a custom RISC-V processor core on FPGA with pipelining and branch prediction. Target: Xilinx Artix-7.', requiredSkills: ['Verilog', 'FPGA', 'Computer Architecture', 'Cadence'], duration: '8 months', maxStudents: 2, department: 'Electronics', status: 'OPEN', applicants: 6, createdAt: '2026-02-10' },
    { id: 'ro6', title: 'AI-Powered Waste Segregation', description: 'Computer vision system for automated waste classification and sorting in campus cafeteria. Real-time edge deployment.', requiredSkills: ['TensorFlow Lite', 'Python', 'Raspberry Pi', 'Edge AI'], duration: '4 months', maxStudents: 4, department: 'Computer Science', status: 'OPEN', applicants: 15, createdAt: '2026-03-01' },
    { id: 'ro7', title: 'Green Concrete from Industrial Waste', description: 'Research on developing sustainable concrete using fly ash and slag from local industries. Mechanical testing and durability analysis.', requiredSkills: ['Material Science', 'Lab Testing', 'Data Analysis', 'Technical Writing'], duration: '6 months', maxStudents: 3, department: 'Civil Engineering', status: 'OPEN', applicants: 4, createdAt: '2026-02-18' },
    { id: 'ro8', title: 'Quantum Computing Algorithms', description: 'Explore quantum algorithms for optimization problems using Qiskit. Focus on QAOA and VQE for combinatorial optimization.', requiredSkills: ['Python', 'Qiskit', 'Linear Algebra', 'Quantum Mechanics'], duration: '6 months', maxStudents: 2, department: 'Computer Science', status: 'OPEN', applicants: 7, createdAt: '2026-03-05' },
];

/* ─── API Helpers ─── */
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export async function getFacultyStats(): Promise<FacultyStats> {
    await delay(100);
    return {
        pendingVerifications: verificationRequests.filter(v => v.status === 'PENDING').length,
        activeStudents: supervisedStudents.length,
        researchOpportunities: researchOpportunities.filter(r => r.status === 'OPEN').length,
        verifiedThisMonth: 21,
    };
}

export async function getVerificationRequests(): Promise<VerificationRequest[]> {
    await delay(100);
    return [...verificationRequests];
}

export async function approveVerification(id: string): Promise<VerificationRequest | undefined> {
    await delay(200);
    const req = verificationRequests.find(v => v.id === id);
    if (req) {
        req.status = 'VERIFIED';
        req.verifiedAt = new Date().toISOString();
    }
    return req;
}

export async function rejectVerification(id: string): Promise<VerificationRequest | undefined> {
    await delay(200);
    const req = verificationRequests.find(v => v.id === id);
    if (req) {
        req.status = 'REJECTED';
    }
    return req;
}

export async function getSupervisedStudents(): Promise<SupervisedStudent[]> {
    await delay(100);
    return [...supervisedStudents];
}

export async function getResearchOpportunities(): Promise<ResearchOpportunity[]> {
    await delay(100);
    return [...researchOpportunities];
}

export async function createResearchOpportunity(data: Omit<ResearchOpportunity, 'id' | 'status' | 'applicants' | 'createdAt'>): Promise<ResearchOpportunity> {
    await delay(200);
    const opp: ResearchOpportunity = {
        ...data,
        id: `ro${researchOpportunities.length + 1}`,
        status: 'OPEN',
        applicants: 0,
        createdAt: new Date().toISOString().split('T')[0],
    };
    researchOpportunities.push(opp);
    return opp;
}

/* ─── Live Feed System ─── */

export interface BulletinItem {
    id: string;
    type: 'Announcement' | 'Alert' | 'Update' | 'Achievement';
    text: string;
    timestamp: number;
}

export interface TechPulseItem {
    id: string;
    category: string;
    catColor: string;
    text: string;
    timeAgo: string;
}

const bulletinPool: Omit<BulletinItem, 'id' | 'timestamp'>[] = [
    { type: 'Alert', text: '⚠️ 5 verification requests awaiting your review since 48h.' },
    { type: 'Announcement', text: '📋 Senate Meeting rescheduled to Thursday, 3 PM, Board Room.' },
    { type: 'Update', text: '🎓 Convocation 2026 — Degree certificates submitted for print.' },
    { type: 'Achievement', text: '🏆 Priya Patil placed at Google — highest CTC this season.' },
    { type: 'Alert', text: '🔬 Lab Book submissions overdue for 8 students in Batch C.' },
    { type: 'Announcement', text: '📢 UGC curriculum revision proposal — feedback due by Mar 14.' },
    { type: 'Update', text: '📊 Mid-semester exam results uploaded for 3rd-year CS batch.' },
    { type: 'Achievement', text: '🚀 Formula Bharat team qualifies for international finals.' },
    { type: 'Alert', text: '🛡️ NAAC peer-team visit confirmed for April 22-24.' },
    { type: 'Announcement', text: '📝 FDP on "AI in Education" — register by this Friday.' },
    { type: 'Update', text: '💻 Moodle server upgrade scheduled for midnight tonight.' },
    { type: 'Achievement', text: '📄 Prof. Deshmukh paper accepted at IEEE ICML 2026.' },
    { type: 'Alert', text: '📉 Attendance below 75% for 12 students — advisory needed.' },
    { type: 'Announcement', text: '🤝 Industry MoU with Siemens signed for R&D collaboration.' },
    { type: 'Update', text: '🧪 Chemistry lab safety audit report now available on portal.' },
    { type: 'Achievement', text: '🎯 3 students selected for MITACS Globalink Research Internship.' },
];

const techPulsePool: Omit<TechPulseItem, 'id' | 'timeAgo'>[] = [
    { category: 'EdTech', catColor: 'text-sky-600 bg-sky-50', text: 'UNESCO endorses AI-driven adaptive learning for universities.' },
    { category: 'Research', catColor: 'text-violet-600 bg-violet-50', text: 'NIH opens $50M grant for computational biology research 2026.' },
    { category: 'Policy', catColor: 'text-amber-600 bg-amber-50', text: 'NEP 2026 amendment: mandatory research credits for UG programs.' },
    { category: 'AI & ML', catColor: 'text-emerald-600 bg-emerald-50', text: 'Google DeepMind achieves mathematical reasoning AGI benchmark.' },
    { category: 'Funding', catColor: 'text-teal-600 bg-teal-50', text: 'DST SERB releases new fast-track scheme for young faculty.' },
    { category: 'Industry', catColor: 'text-rose-600 bg-rose-50', text: 'TCS iON launches free lab infrastructure for tier-2 colleges.' },
    { category: 'EdTech', catColor: 'text-sky-600 bg-sky-50', text: 'NPTEL adds 200+ new courses with proctored certification 2026.' },
    { category: 'Research', catColor: 'text-violet-600 bg-violet-50', text: 'Nature publishes meta-study on LLM impact in academic writing.' },
    { category: 'Cloud', catColor: 'text-indigo-600 bg-indigo-50', text: 'AWS Academy offers free credits for faculty-led cloud labs.' },
    { category: 'Policy', catColor: 'text-amber-600 bg-amber-50', text: 'AICTE makes experiential learning mandatory for engineering.' },
    { category: 'AI & ML', catColor: 'text-emerald-600 bg-emerald-50', text: 'OpenAI partners with 50 universities for research API access.' },
    { category: 'Funding', catColor: 'text-teal-600 bg-teal-50', text: 'MHRD Hackathon 2026 — ₹5 Cr prize pool across 10 themes.' },
    { category: 'Security', catColor: 'text-rose-600 bg-rose-50', text: 'CERT-In mandates cybersecurity audits for campus networks.' },
    { category: 'Industry', catColor: 'text-orange-600 bg-orange-50', text: 'Infosys launches campus AI co-pilot for placement prep.' },
];

let bulletinIndex = 0;
let techPulseIndex = 0;

function makeTimeAgo(i: number): string {
    const units = ['Just now', '2m ago', '5m ago', '12m ago', '30m ago', '1h ago', '2h ago', '4h ago'];
    return units[i % units.length];
}

/** Returns last N bulletin items, cycling on every call */
export function getFacultyBulletins(count = 1): BulletinItem[] {
    const items: BulletinItem[] = [];
    for (let i = 0; i < count; i++) {
        const src = bulletinPool[(bulletinIndex + i) % bulletinPool.length];
        items.push({ ...src, id: `b-${bulletinIndex + i}`, timestamp: Date.now() - i * 60000 });
    }
    bulletinIndex = (bulletinIndex + count) % bulletinPool.length;
    return items;
}

/** Returns N tech pulse items, cycling on every call */
export function getFacultyTechPulse(count = 3): TechPulseItem[] {
    const items: TechPulseItem[] = [];
    for (let i = 0; i < count; i++) {
        const src = techPulsePool[(techPulseIndex + i) % techPulsePool.length];
        items.push({ ...src, id: `tp-${techPulseIndex + i}`, timeAgo: makeTimeAgo(i) });
    }
    techPulseIndex = (techPulseIndex + 1) % techPulsePool.length;
    return items;
}
