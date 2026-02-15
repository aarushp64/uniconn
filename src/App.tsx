import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import VerifyQueue from './pages/VerifyQueue';
import Projects from './pages/Projects';
import Clubs from './pages/Clubs';
import OpportunityDetail from './pages/OpportunityDetail';
import Applications from './pages/Applications';

function App() {
  return (
    <div className="min-h-screen bg-darker text-primary">
      <Routes>
        <Route path="/" element={<div className="p-10 min-h-screen flex-center flex-col gap-6 text-center">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold text-gradient mb-6 leading-tight">CampusConnect</h1>
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify" element={<VerifyQueue />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/opportunity/:id" element={<OpportunityDetail />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </div>
  );
}
export default App;
