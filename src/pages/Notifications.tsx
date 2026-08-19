import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { INITIAL_NOTIFICATIONS, type NotificationItem } from '../mock/notifications';
import {
  Bell,
  CheckCheck,
  Trash2,
  Search,
  CalendarDays,
  GraduationCap,
  Users,
  ShieldCheck,
  Info,
  ChevronRight,
} from 'lucide-react';

export const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)),
    );
  };

  const getCategoryIcon = (category: NotificationItem['category']) => {
    switch (category) {
      case 'academic':
        return <GraduationCap size={16} className="text-sky-600" />;
      case 'events':
        return <CalendarDays size={16} className="text-purple-600" />;
      case 'clubs':
        return <Users size={16} className="text-emerald-600" />;
      case 'verifications':
        return <ShieldCheck size={16} className="text-amber-600" />;
      case 'system':
      default:
        return <Info size={16} className="text-slate-500" />;
    }
  };

  const getCategoryBg = (category: NotificationItem['category']) => {
    switch (category) {
      case 'academic':
        return 'bg-sky-50 border-sky-100';
      case 'events':
        return 'bg-purple-50 border-purple-100';
      case 'clubs':
        return 'bg-emerald-50 border-emerald-100';
      case 'verifications':
        return 'bg-amber-50 border-amber-100';
      case 'system':
      default:
        return 'bg-slate-50 border-slate-100';
    }
  };

  // Filtered list
  const filtered = notifications.filter((n) => {
    if (activeCategory === 'unread' && n.read) return false;
    if (activeCategory !== 'all' && activeCategory !== 'unread' && n.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q);
    }
    return true;
  });

  const grouped = {
    today: filtered.filter((n) => n.group === 'today'),
    yesterday: filtered.filter((n) => n.group === 'yesterday'),
    this_week: filtered.filter((n) => n.group === 'this_week'),
    earlier: filtered.filter((n) => n.group === 'earlier'),
  };

  const renderGroupSection = (title: string, items: NotificationItem[]) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-6">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 mb-2.5 flex items-center justify-between">
          <span>{title}</span>
          <span className="text-[9px] font-bold text-slate-300">{items.length} notifications</span>
        </h3>
        <div className="space-y-2">
          {items.map((n) => (
            <Card
              key={n.id}
              onClick={() => handleToggleRead(n.id)}
              className={`
                p-4 border transition-all cursor-pointer group relative overflow-hidden
                ${!n.read ? 'bg-sky-50/40 border-sky-100 shadow-xs' : 'bg-white border-slate-100 hover:border-slate-200'}
              `}
            >
              {!n.read && (
                <div className="absolute top-0 left-0 w-1 h-full bg-sky-500 rounded-l-xl" />
              )}
              <div className="flex items-start justify-between gap-3 pl-1">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl border shrink-0 ${getCategoryBg(n.category)}`}>
                    {getCategoryIcon(n.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                        {n.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">• {n.timeAgo}</span>
                      {!n.read && (
                        <Badge variant="primary" className="text-[8px] py-0 px-1.5 font-bold">
                          NEW
                        </Badge>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug mb-1">
                      {n.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{n.description}</p>

                    {n.link && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(n.link!);
                        }}
                        className="mt-2.5 flex items-center gap-1 text-[10px] font-bold text-sky-600 hover:text-sky-700 bg-white border border-sky-100 hover:border-sky-200 px-2.5 py-1 rounded-lg transition-all active:scale-95 w-fit"
                      >
                        <span>View Details</span>
                        <ChevronRight size={12} />
                      </button>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleRead(n.id);
                  }}
                  className="text-[10px] text-slate-300 hover:text-slate-500 shrink-0 p-1"
                  title={n.read ? 'Mark as Unread' : 'Mark as Read'}
                >
                  {n.read ? 'Read' : 'Unread'}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6 pb-12 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
                <Bell size={18} />
              </div>
              <h1 className="text-xl font-extrabold text-slate-900">Notifications</h1>
              {unreadCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} unread
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 pl-0.5">
              Stay updated with your campus alerts, events, academic announcements, and past history.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<CheckCheck size={14} />}
                onClick={handleMarkAllRead}
                className="text-sky-600 hover:bg-sky-50"
              >
                Mark All Read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Trash2 size={14} />}
                onClick={handleClearAll}
                className="text-rose-500 hover:bg-rose-50 hover:text-rose-600"
              >
                Clear History
              </Button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All' },
              { id: 'unread', label: 'Unread' },
              { id: 'academic', label: 'Academic' },
              { id: 'events', label: 'Events' },
              { id: 'clubs', label: 'Clubs' },
              { id: 'verifications', label: 'Verifications' },
              { id: 'system', label: 'System' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`
                  px-3 py-1.5 rounded-xl text-xs font-bold transition-all
                  ${activeCategory === tab.id
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full md:w-64">
            <Input
              placeholder="Filter notifications..."
              leftIcon={<Search size={14} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-0 text-xs"
            />
          </div>
        </div>

        {/* Notification List Sections */}
        {filtered.length > 0 ? (
          <div>
            {renderGroupSection('Today', grouped.today)}
            {renderGroupSection('Yesterday', grouped.yesterday)}
            {renderGroupSection('This Week', grouped.this_week)}
            {renderGroupSection('Past Notifications', grouped.earlier)}
          </div>
        ) : (
          <Card className="p-12 text-center border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-3 text-slate-300">
              <Bell size={24} />
            </div>
            <h3 className="text-sm font-bold text-slate-700 mb-1">No Notifications Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery || activeCategory !== 'all'
                ? 'No notifications match your current filter or search query.'
                : 'You are all caught up! All your past notifications have been cleared.'}
            </p>
            {(searchQuery || activeCategory !== 'all') && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </Button>
            )}
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Notifications;
