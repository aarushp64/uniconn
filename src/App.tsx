import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import StudentHome from './pages/StudentHome';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import VerifyQueue from './pages/VerifyQueue';
import Projects from './pages/Projects';
import Clubs from './pages/Clubs';
import Calendar from './pages/Calendar';
import OpportunityDetail from './pages/OpportunityDetail';
import Applications from './pages/Applications';
import AIInsights from './pages/AIInsights';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import FacultyHome from './pages/faculty/FacultyHome';
import FacultyVerifications from './pages/faculty/FacultyVerifications';
import FacultyStudents from './pages/faculty/FacultyStudents';
import FacultyOpportunities from './pages/faculty/FacultyOpportunities';
import FacultyProfile from './pages/faculty/FacultyProfile';

function App() {
  return (
    <div className="min-h-screen bg-darker text-primary">
      <Routes>
        <Route path="/" element={<div className="p-10 min-h-screen flex-center flex-col gap-6 text-center">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold text-gradient mb-6 leading-tight">UniConn</h1>
            <p className="text-xl text-secondary mb-8">
              The authentic, campus-centric platform for building verifiable professional identities.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/login" className="btn btn-primary btn-lg">Start Now</Link>
              <Link to="/signup" className="btn btn-outline btn-lg">Learn More</Link>
            </div>
          </div>
        </div>} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/home" element={<StudentHome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify" element={<VerifyQueue />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/opportunity/:id" element={<OpportunityDetail />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/ai-insights" element={<AIInsights />} />
        <Route path="/faculty/home" element={<FacultyHome />} />
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty/verifications" element={<FacultyVerifications />} />
        <Route path="/faculty/students" element={<FacultyStudents />} />
        <Route path="/faculty/opportunities" element={<FacultyOpportunities />} />
        <Route path="/faculty/calendar" element={<Calendar />} />
        <Route path="/faculty/profile" element={<FacultyProfile />} />
      </Routes>
    </div>
  );
}
export default App;
