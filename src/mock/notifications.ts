export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  timestamp: string;
  category: 'academic' | 'events' | 'system' | 'verifications' | 'clubs';
  read: boolean;
  link?: string;
  group: 'today' | 'yesterday' | 'this_week' | 'earlier';
}

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New TechPulse posted: AI in Robotics',
    description: 'Dr. Shete published a new insight on autonomous drone navigation in campus lab 4.',
    timeAgo: '10 mins ago',
    timestamp: '2026-08-19 17:05',
    category: 'academic',
    read: false,
    link: '/home',
    group: 'today',
  },
  {
    id: 'notif-2',
    title: 'Persona Fest 2026 registration is open!',
    description: 'Early bird passes for Pune\'s largest techno-cultural festival are now live for MIT ADTU students.',
    timeAgo: '1 hour ago',
    timestamp: '2026-08-19 16:15',
    category: 'events',
    read: false,
    link: '/calendar',
    group: 'today',
  },
  {
    id: 'notif-3',
    title: 'Speedtail Racing Formula Bharat Victory Celebration',
    description: 'Join the team at the main quadrangle tomorrow at 4:00 PM for the trophy unveiling.',
    timeAgo: '3 hours ago',
    timestamp: '2026-08-19 14:00',
    category: 'clubs',
    read: false,
    link: '/clubs',
    group: 'today',
  },
  {
    id: 'notif-4',
    title: 'Your verification request was approved',
    description: 'Dr. Rajesh Patil approved your IoT Smart Campus capstone verification request.',
    timeAgo: 'Yesterday at 4:30 PM',
    timestamp: '2026-08-18 16:30',
    category: 'verifications',
    read: true,
    link: '/profile',
    group: 'yesterday',
  },
  {
    id: 'notif-5',
    title: 'Microsoft SDE Intern On-Campus Drive Announced',
    description: 'Applications close Feb 28. Eligible branches: B.Tech CSE, IT, AI & DS.',
    timeAgo: 'Yesterday at 11:00 AM',
    timestamp: '2026-08-18 11:00',
    category: 'academic',
    read: true,
    link: '/explore',
    group: 'yesterday',
  },
  {
    id: 'notif-6',
    title: 'GDSC Flutter & Mobile Dev Workshop Scheduled',
    description: 'Hands-on session on cross-platform mobile apps in Computer Lab 3.',
    timeAgo: '3 days ago',
    timestamp: '2026-08-16 10:00',
    category: 'events',
    read: true,
    link: '/calendar',
    group: 'this_week',
  },
  {
    id: 'notif-7',
    title: 'Smart India Hackathon 2026 Team Registration',
    description: 'Form a 6-member cross-disciplinary team and submit your problem statement by Friday.',
    timeAgo: '4 days ago',
    timestamp: '2026-08-15 15:00',
    category: 'academic',
    read: true,
    link: '/ai-insights',
    group: 'this_week',
  },
  {
    id: 'notif-8',
    title: 'UniConn Security & Privacy Policy Update',
    description: 'We have updated our campus data privacy guidelines for verified student identities.',
    timeAgo: '2 weeks ago',
    timestamp: '2026-08-05 09:00',
    category: 'system',
    read: true,
    group: 'earlier',
  },
  {
    id: 'notif-9',
    title: 'Orientation Day 2026 Schedule Released',
    description: 'Check out the official schedule and campus maps for incoming batch orientation.',
    timeAgo: '3 weeks ago',
    timestamp: '2026-07-28 12:00',
    category: 'events',
    read: true,
    link: '/calendar',
    group: 'earlier',
  },
  {
    id: 'notif-10',
    title: 'Raj Kapoor Film Club Short Film Screening',
    description: 'Screening of award-winning student short films at MIT School of Film & Media auditorium.',
    timeAgo: '1 month ago',
    timestamp: '2026-07-15 18:00',
    category: 'clubs',
    read: true,
    link: '/clubs',
    group: 'earlier',
  },
];
