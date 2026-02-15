# UniConn - Contributing Guide

Thank you for considering contributing to UniConn! 🎉

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/YOUR_USERNAME/uniconn.git
   cd uniconn
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Create a branch** for your changes
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the App
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Check code quality
npm run preview    # Preview production build
```

### Code Standards

#### TypeScript
- Use strict TypeScript types
- Avoid `any` - use proper types or `unknown`
- Define interfaces for all props and data structures

#### React
- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use proper prop typing with TypeScript

#### Styling
- Use Tailwind CSS utility classes
- Follow existing design patterns
- Ensure responsive design (mobile-first)
- Use CSS modules for component-specific styles

#### Naming Conventions
- **Components:** PascalCase (e.g., `UserProfile.tsx`)
- **Files:** PascalCase for components, camelCase for utilities
- **Variables:** camelCase
- **Constants:** UPPER_SNAKE_CASE
- **CSS classes:** kebab-case or Tailwind utilities

## Commit Guidelines

Use conventional commit messages:

```
feat: Add user authentication
fix: Resolve navigation bug on mobile
docs: Update README with deployment steps
style: Format code with prettier
refactor: Simplify Dashboard component
test: Add tests for Input component
chore: Update dependencies
```

### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (not CSS)
- `refactor`: Code restructuring
- `test`: Adding or updating tests
- `chore`: Build process or tooling changes
- `perf`: Performance improvements

## Pull Request Process

1. **Update documentation** if needed
2. **Ensure all tests pass** and linting is clean
3. **Write a clear PR description** explaining:
   - What changes were made
   - Why they were needed
   - How to test them
4. **Link related issues** if applicable
5. **Request review** from maintainers

### PR Title Format
```
feat: Add new feature description
fix: Bug fix description
docs: Documentation update description
```

## Code Review

- Be respectful and constructive
- Address all review comments
- Update your PR based on feedback
- Squash commits if requested

## Testing

- Test your changes thoroughly
- Ensure responsive design works
- Check browser compatibility
- Test edge cases

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about the codebase
- General discussions

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Collaborate positively

Thank you for contributing! 🚀
