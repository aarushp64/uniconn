# Contributing to UniConn

Thank you for helping improve UniConn.

## Development workflow

1. Fork the repository and create a branch.
2. Install dependencies with `npm install`.
3. Make your changes and verify them with `npm run build`.
4. Open a pull request with a clear description.

## Branch naming

Use short, descriptive branch names such as:

- `feature/calendar-improvements`
- `fix/mobile-nav`
- `docs/project-setup`

## Commit conventions

Use conventional commit messages, for example:

```text
feat: add dashboard filter controls
fix: resolve sidebar overflow on mobile
docs: update deployment instructions
chore: add CI workflow
```

## Code guidelines

- Prefer TypeScript and functional React components.
- Keep components focused and reusable.
- Avoid introducing unnecessary dependencies.
- Keep styling consistent with the existing UI patterns.

## Validation checklist

Before opening a PR, confirm:

- `npm run build` succeeds
- The UI still works locally in the browser
- Documentation reflects any new behavior or setup steps

## Pull request expectations

A good pull request should include:

- What changed
- Why it changed
- Any setup or testing steps
- Screenshots when UI changes are involved
