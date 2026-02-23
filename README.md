# 🎓 UniConn - Campus Collaboration

UniConn is a modern campus collaboration platform designed to connect students, faculty, and clubs in a seamless, high-performance environment. Built as a Progressive Web App (PWA), UniConn offers a premium, mobile-first experience with a focus on professional readiness and verified contributions.

![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2-646cff?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Core Features
- **Interactive Dashboard** — Real-time campus activity with Tech Pulse, Live Bulletin, and trending insights
- **Social Feed** — LinkedIn-style post feed with 12+ filter tags, images, likes, comments, and reposts
- **Opportunity Marketplace** — Browse & apply for research, club roles, projects, and jobs across MIT ADTU
- **AI Growth Intelligence** — Star-based skill ratings, SVG growth trajectory graph, and 30-day action plans
- **NEP 4-Year Roadmap** — Visual tree/branch layout showing semester milestones and progress
- **16+ Campus Clubs** — Real MIT ADTU clubs (GDSC, IEEE, ACM, NSS, Robotics, E-Cell, etc.)
- **Profile Building** — Verifiable professional profiles with project portfolios and skill tags
- **Projects Tracker** — Manage and showcase academic and personal projects

### 🛠️ Technical Features
- **React 19** with TypeScript for type-safe development
- **Vite** for lightning-fast development and optimized builds
- **React Router** for seamless navigation
- **Framer Motion** for smooth animations
- **Lucide Icons** for modern iconography
- **Tailwind CSS** for responsive, utility-first styling
- **ESLint** configured for code quality

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm 9+
- Modern web browser

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd uniconn

# Install frontend dependencies
npm install

# Install backend dependencies (optional)
cd server
npm install
cd ..

# Start development server (frontend)
npm run dev

# Start backend server (in separate terminal, optional)
cd server
npm run dev
```

The frontend will be running at `http://localhost:5173`  
The backend will be running at `http://localhost:5000` (if started)

## 📜 Available Scripts

### Frontend Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (TypeScript check + Vite build) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

### Backend Scripts (in `/server` directory)
| Command | Description |
|---------|-------------|
| `npm start` | Start backend server |
| `npm run dev` | Start backend with nodemon (auto-reload) |

## 📁 Project Structure

```
uniconn/
├── src/
│   ├── components/
│   │   ├── common/           # Button, Card, Input, Badge
│   │   ├── features/
│   │   │   ├── auth/         # StudentDetailsForm
│   │   │   ├── dashboard/    # LiveActivity
│   │   │   ├── feed/         # Social Feed with tags & images
│   │   │   └── opportunities/# OpportunityCard
│   │   └── layout/           # Navbar, MainLayout, AuthLayout
│   ├── pages/                # Dashboard, Feed, Explore, Profile,
│   │                         # AIInsights, Projects, Clubs, etc.
│   ├── context/              # AuthContext, UIContext
│   ├── mock/                 # Mock API helpers
│   ├── utils/                # API utilities
│   ├── App.tsx               # Routing
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles & animations
├── server/                   # Express + MongoDB backend
│   ├── models/               # User, Post, etc.
│   └── index.js              # Server entry
├── public/                   # Static assets
├── LICENSE
├── CONTRIBUTING.md
└── index.html
```

## 🎨 Tech Stack

### Frontend
- **Framework:** React 19.2
- **Language:** TypeScript 5.9
- **Build Tool:** Vite 7.2
- **Routing:** React Router DOM 7.12
- **Styling:** Tailwind CSS 3.4 + Custom CSS
- **Animations:** Framer Motion 12.27
- **Icons:** Lucide React 0.562
- **Linting:** ESLint 9 with TypeScript support

### Backend (Optional)
- **Runtime:** Node.js
- **Framework:** Express.js 4.18
- **Database:** MongoDB with Mongoose 8.0
- **Middleware:** CORS, dotenv

## 🏗️ Development

### Code Quality
This project uses ESLint with TypeScript support and React-specific rules:
- Strict TypeScript checking
- React Hooks rules enforcement
- Fast Refresh compatibility checks
- No `any` types allowed

### Component Guidelines
- Use functional components with TypeScript
- Implement proper prop typing
- Use React hooks (useState, useEffect, useContext, etc.)
- Ensure components are properly memoized when needed

### Styling Approach
- Tailwind CSS for utility-first styling
- Custom CSS modules for component-specific styles
- Consistent design system with CSS variables
- Responsive design for mobile, tablet, and desktop

## 🌟 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | Authentication with dummy bypass |
| Dashboard | `/dashboard` | Activity feed, Tech Pulse, Live Bulletin |
| Feed | `/feed` | Social posts with 12+ tags & images |
| Explore | `/explore` | 15+ opportunity listings with filters |
| AI Insights | `/ai-insights` | Star ratings, growth graph, action plan |
| Profile | `/profile` | NEP roadmap tree, skills, timeline |
| Projects | `/projects` | Personal project portfolio |
| Clubs | `/clubs` | 16 real MIT ADTU clubs |
| Applications | `/applications` | Track application status |

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint rules
- `tailwind.config.js` - Tailwind CSS customization
- `postcss.config.js` - PostCSS processing

## 📦 Build & Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The production build will be in the `dist/` directory, optimized and minified.

### Deployment Options
- **Vercel** - Recommended for React apps
- **Netlify** - Easy deployment with Git integration
- **GitHub Pages** - Free hosting for static sites
- **Traditional hosting** - Serve the `dist` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code formatting
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Build process or auxiliary tool changes

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

UniConn Team

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for blazing fast build tooling
- The open-source community

---

**Built with ❤️ for campus communities**
