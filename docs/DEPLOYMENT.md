# Deployment guide

## Frontend deployment

UniConn is a Vite-based React application, so it can be deployed as a static site.

### Recommended options

- Vercel
- Netlify
- GitHub Pages

### Build step

```bash
npm run build
```

The output will be generated in the `dist/` directory.

## Environment variables

Copy [.env.example](../.env.example) to `.env.local` and adjust values as needed.

## Backend deployment

If the optional server API is used, deploy it separately behind a Node.js host that supports Express.
