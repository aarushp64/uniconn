# 🎓 UniConn - Campus Collaboration Platform

**UniConn** is a modern campus collaboration platform that connects students, faculty, and clubs for authentic professional development and networking.

![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2-646cff?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Core Features
- **Interactive Dashboard** - Real-time campus activity feed with personalized insights
- **Opportunity Marketplace** - Browse and apply for research projects, club positions, and student collaborations
- **Verification System** - Faculty-verified project timeline and skill authentication
- **Smart Matching** - AI-powered recommendations based on skills and interests
- **Profile Building** - Create verifiable professional profiles with project portfolios
- **Club Management** - Comprehensive tools for campus organizations

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
├── src/                  # Frontend source code
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Basic components (Button, Card, Input, etc.)
│   │   ├── features/     # Feature-specific components
│   │   └── layout/       # Layout components (Navbar, Sidebar, etc.)
│   ├── pages/            # Page components
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── mock/             # Mock data and API
│   ├── App.tsx           # Main app component with routing
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── server/               # Backend API (Node.js + Express + MongoDB)
│   ├── models/           # Database models
│   ├── index.js          # Server entry point
│   ├── package.json      # Backend dependencies
│   └── .env.example      # Backend environment variables template
├── public/               # Static assets
├── legacy/               # Legacy HTML prototypes
├── dist/                 # Production build output
├── .env.example          # Frontend environment variables template
├── LICENSE               # MIT License
├── CONTRIBUTING.md       # Contributing guidelines
└── index.html            # HTML entry point
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
| Home | `/` | Landing page with call-to-action |
| Login | `/login` | User authentication |
| Signup | `/signup` | New user registration |
| Dashboard | `/dashboard` | Main activity feed and insights |
| Profile | `/profile` | User profile and timeline |
| Explore | `/explore` | Browse opportunities |
| Projects | `/projects` | Project listings |
| Clubs | `/clubs` | Campus clubs directory |
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

CampusConnect Team

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for blazing fast build tooling
- The open-source community

---

**Built with ❤️ for campus communities**
