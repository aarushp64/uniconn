# UniConn

UniConn is a modern campus collaboration platform for students, faculty, and clubs. The app combines a React + TypeScript frontend with optional Express-based backend services and is designed to be easy to run locally and deploy on GitHub-friendly platforms.

![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2-646cff?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

## What this project includes

- Student and faculty-facing dashboard experience
- Calendar and event workflow support
- Opportunity and club discovery views
- Mocked and extensible data layers for rapid UI development
- Optional server-side API scaffolding under the server folder

## Quick start

### Prerequisites
- Node.js 18+
- npm 9+

### Install and run

```bash
git clone <repository-url>
cd uniconn
npm install
npm run dev
```

The frontend will be available at http://localhost:5173.

### Useful commands

```bash
npm run dev      # start the Vite development server
npm run build    # create a production build
npm run preview  # preview the built app locally
npm run lint     # run ESLint checks
```

## Repository structure

```text
.
├── docs/                 # Project documentation
├── public/               # Static assets
├── scripts/              # Utility scripts for data processing
├── server/               # Optional backend API scaffold
├── src/                  # React application source files
│   ├── components/       # UI components
│   ├── context/          # App context providers
│   ├── mock/             # Mock data and API helpers
│   ├── pages/            # Route-level pages
│   └── utils/            # Helper utilities
├── .env.example          # Example environment file
├── .github/workflows/    # CI automation
├── package.json          # Frontend scripts and dependencies
└── README.md             # Project overview
```

## Documentation

- [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)

## Deployment notes

The app is a static Vite frontend, so it can be deployed on Vercel, Netlify, GitHub Pages, or any static hosting provider.

## License

This project is licensed under the MIT License.
