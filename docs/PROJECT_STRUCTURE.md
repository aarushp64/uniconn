# Project structure

This document describes the main folders in the repository and their purpose.

## Root folders

- `src/` contains the React application.
- `server/` contains the optional backend scaffold.
- `public/` stores static assets copied directly to the build output.
- `scripts/` contains helper scripts for data processing tasks.
- `docs/` holds repository documentation.

## Frontend overview

- `src/components/common/` contains shared UI primitives such as buttons, cards, badges, and inputs.
- `src/components/features/` contains feature-specific UI components such as calendar and auth flows.
- `src/pages/` contains route-level screens.
- `src/context/` contains app-wide React contexts.
- `src/mock/` stores mock data and API helpers.
- `src/utils/` contains reusable utility functions.

## Backend overview

The server folder contains an Express-style starter setup for future API integration. It is optional for the frontend and can be extended as needed.
