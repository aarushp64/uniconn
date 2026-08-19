import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  SunMoon,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  RotateCcw,
  Save,
  Globe,
  Eye,
  Building,
  GraduationCap,
} from 'lucide-react';

export const Settings = () => {
  const { user, updateUser } = useAuth();
  const { settings, updateSettings, resetSettings } = useSettings();

  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'notifications' | 'privacy' | 'calendar'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Profile Form state
  const [name, setName] = useState(user?.name || 'Vedant Dande');
  const [username, setUsername] = useState(user?.username || 'vedant_dande');
  const [email, setEmail] = useState(user?.email || 'vedant.dande@mituniversity.edu.in');
  const [department, setDepartment] = useState(settings.department);
  const [academicYear, setAcademicYear] = useState(settings.academicYear);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, username, email });
    updateSettings({ department, academicYear });
    showToast();
  };

  const showToast = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6 pb-14 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex items-center gap-3">
            <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl border border-sky-100">
              <SettingsIcon size={22} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">Settings & Preferences</h1>
              <p className="text-xs text-slate-500">
                Customize your UniConn experience, manage real profile data, notification triggers, and theme settings.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<RotateCcw size={14} />}
              onClick={() => {
                resetSettings();
                showToast();
              }}
              className="text-slate-600"
            >
              Reset Defaults
            </Button>
          </div>
        </div>

        {/* Success Toast */}
        {savedSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center justify-between text-xs font-bold shadow-xs animate-fade-in-down">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Settings updated successfully! Changes take immediate effect.</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-emerald-600">Saved</span>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          {[
            { id: 'profile', label: 'Profile & Account', icon: <User size={15} /> },
            { id: 'appearance', label: 'Appearance & Theme', icon: <SunMoon size={15} /> },
            { id: 'notifications', label: 'Notifications', icon: <Bell size={15} /> },
            { id: 'privacy', label: 'Privacy & Visibility', icon: <ShieldCheck size={15} /> },
            { id: 'calendar', label: 'Calendar Rules', icon: <Calendar size={15} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all
                ${activeTab === tab.id
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Profile & Account */}
        {activeTab === 'profile' && (
          <Card className="p-6 border-slate-100 space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <User size={18} className="text-sky-500" /> Personal Details
              </h2>
              <p className="text-xs text-slate-500">
                Update your display name, email address, and academic department details.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Display Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    fullWidth
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Username</label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    fullWidth
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Campus Email Address</label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@mituniversity.edu.in"
                    fullWidth
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1">
                    <Building size={14} className="text-slate-400" /> Department / School
                  </label>
                  <Input
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Department"
                    fullWidth
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1">
                    <GraduationCap size={14} className="text-slate-400" /> Academic Batch / Year
                  </label>
                  <Input
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    placeholder="Year"
                    fullWidth
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button variant="primary" size="sm" leftIcon={<Save size={14} />} type="submit">
                  Save Account Profile
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Tab 2: Appearance & Theme */}
        {activeTab === 'appearance' && (
          <Card className="p-6 border-slate-100 space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <SunMoon size={18} className="text-amber-500" /> Theme & Interface
              </h2>
              <p className="text-xs text-slate-500">
                Choose light/dark mode and interface density for optimal viewing comfort.
              </p>
            </div>

            <div className="space-y-5">
              {/* Theme Mode Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-3">Color Mode</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'light', label: 'Light Mode', desc: 'Default bright theme', bg: 'bg-white border-slate-200' },
                    { id: 'dark', label: 'Dark Mode', desc: 'Sleek dark theme', bg: 'bg-slate-900 text-white border-slate-800' },
                    { id: 'system', label: 'System Theme', desc: 'Follows OS preference', bg: 'bg-slate-100 border-slate-200' },
                  ].map((mode) => (
                    <div
                      key={mode.id}
                      onClick={() => {
                        updateSettings({ theme: mode.id as any });
                        showToast();
                      }}
                      className={`
                        p-4 rounded-xl border-2 cursor-pointer transition-all ${mode.bg}
                        ${settings.theme === mode.id ? 'border-sky-500 ring-2 ring-sky-200 shadow-xs' : 'hover:border-slate-300'}
                      `}
                    >
                      <p className="text-xs font-bold mb-1 flex items-center justify-between">
                        <span>{mode.label}</span>
                        {settings.theme === mode.id && <CheckCircle2 size={14} className="text-sky-500" />}
                      </p>
                      <p className="text-[10px] text-slate-400 font-normal">{mode.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compact Mode Toggle */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Compact Layout Density</h4>
                  <p className="text-[11px] text-slate-500">Reduce spacing and padding across cards for high-density viewing.</p>
                </div>
                <button
                  onClick={() => {
                    updateSettings({ compactMode: !settings.compactMode });
                    showToast();
                  }}
                  className={`
                    w-12 h-6 rounded-full transition-colors relative p-1
                    ${settings.compactMode ? 'bg-sky-500' : 'bg-slate-200'}
                  `}
                >
                  <div
                    className={`
                      w-4 h-4 rounded-full bg-white transition-transform
                      ${settings.compactMode ? 'translate-x-6' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Tab 3: Notifications */}
        {activeTab === 'notifications' && (
          <Card className="p-6 border-slate-100 space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Bell size={18} className="text-purple-500" /> Real Notification Triggers
              </h2>
              <p className="text-xs text-slate-500">
                Configure real-time reminders, digest emails, and event popup behavior.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  key: 'emailAlerts',
                  title: 'Email Notifications',
                  desc: 'Receive instant email digests for verification requests and club event registrations.',
                },
                {
                  key: 'pushNotifications',
                  title: 'In-App Live Alerts',
                  desc: 'Show real-time toast alerts when new announcements or TechPulse posts are published.',
                },
                {
                  key: 'eventReminders',
                  title: 'Event Calendar Reminders',
                  desc: 'Trigger automatic popovers before bookmarked calendar events start.',
                },
                {
                  key: 'weeklyDigest',
                  title: 'Weekly Campus Digest',
                  desc: 'Send a weekly summary of upcoming hackathons, workshops, and placement drives.',
                },
              ].map((item) => {
                const isChecked = settings[item.key as keyof typeof settings] as boolean;
                return (
                  <div
                    key={item.key}
                    className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => {
                        updateSettings({ [item.key]: !isChecked });
                        showToast();
                      }}
                      className={`
                        w-12 h-6 rounded-full transition-colors relative p-1 shrink-0 ml-4
                        ${isChecked ? 'bg-sky-500' : 'bg-slate-200'}
                      `}
                    >
                      <div
                        className={`
                          w-4 h-4 rounded-full bg-white transition-transform
                          ${isChecked ? 'translate-x-6' : 'translate-x-0'}
                        `}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Tab 4: Privacy & Security */}
        {activeTab === 'privacy' && (
          <Card className="p-6 border-slate-100 space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-500" /> Privacy & Profile Control
              </h2>
              <p className="text-xs text-slate-500">
                Control who can view your verified student badge, projects, and direct message permissions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Globe size={14} className="text-slate-400" /> Public Student Profile
                  </h4>
                  <p className="text-[11px] text-slate-500">Allow recruiters and peers to search your verified portfolio.</p>
                </div>
                <button
                  onClick={() => {
                    updateSettings({ publicProfile: !settings.publicProfile });
                    showToast();
                  }}
                  className={`
                    w-12 h-6 rounded-full transition-colors relative p-1 shrink-0
                    ${settings.publicProfile ? 'bg-emerald-500' : 'bg-slate-200'}
                  `}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.publicProfile ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Eye size={14} className="text-slate-400" /> Online Activity Status
                  </h4>
                  <p className="text-[11px] text-slate-500">Show online indicator badge to fellow students in your department.</p>
                </div>
                <button
                  onClick={() => {
                    updateSettings({ showOnlineStatus: !settings.showOnlineStatus });
                    showToast();
                  }}
                  className={`
                    w-12 h-6 rounded-full transition-colors relative p-1 shrink-0
                    ${settings.showOnlineStatus ? 'bg-emerald-500' : 'bg-slate-200'}
                  `}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.showOnlineStatus ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Tab 5: Calendar Rules */}
        {activeTab === 'calendar' && (
          <Card className="p-6 border-slate-100 space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Calendar size={18} className="text-sky-500" /> Calendar Rules & Reminders
              </h2>
              <p className="text-xs text-slate-500">
                Set default reminder timing for campus workshops, placement drives, and exams.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Default Reminder Offset</label>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { value: '10m', label: '10 Mins Before' },
                    { value: '30m', label: '30 Mins Before' },
                    { value: '1h', label: '1 Hour Before' },
                    { value: '1d', label: '1 Day Before' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        updateSettings({ defaultReminderTiming: option.value as any });
                        showToast();
                      }}
                      className={`
                        p-3 rounded-xl border text-xs font-bold transition-all text-center
                        ${settings.defaultReminderTiming === option.value
                          ? 'bg-sky-500 text-white border-sky-500 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Settings;
