# Contributing to React Surprise

First off, thank you for considering contributing to React Surprise! It's people like you that make React Surprise such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Development Setup

1. Fork and clone the repository
```bash
git clone https://github.com/your-username/react-surprise.git
cd react-surprise
```

2. Install dependencies
```bash
npm install
```

3. Start development mode
```bash
npm run dev
```

4. Run the demo app
```bash
npm run demo
```

## Development Workflow

1. Create a new branch
```bash
git checkout -b feature/my-new-feature
```

2. Make your changes and commit them
```bash
git add .
git commit -m "feat: add amazing new feature"
```

We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only changes
- `style:` Code style changes (formatting, missing semicolons, etc)
- `refactor:` Code change that neither fixes a bug nor adds a feature
- `perf:` Performance improvements
- `test:` Adding missing tests
- `chore:` Changes to the build process or auxiliary tools

3. Run checks before pushing
```bash
npm run lint
npm run type-check
npm run format:check
npm run build
```

4. Push your branch and create a pull request
```bash
git push origin feature/my-new-feature
```

## Adding New Animations

To add a new animation:

1. Create a new file in `src/animations/` (e.g., `rainbows.tsx`)
2. Implement the animation following the existing pattern:

```typescript
import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';

export const createRainbowParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  // Implementation
};

export const renderRainbowParticle = (particle: Particle): React.ReactNode => {
  // Implementation
};
```

3. Add the animation to `src/animations/index.ts`
4. Update the `AnimationType` in `src/types.ts`
5. Add documentation and examples to the README
6. Create a demo in the demo app

## Code Style

- Use TypeScript for all new code
- Follow the existing code style (enforced by ESLint and Prettier)
- Write meaningful commit messages
- Add comments for complex logic
- Keep functions small and focused
- Prefer composition over inheritance

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for high code coverage
- Test across different browsers and devices

## Questions?

Feel free to open an issue with your question or reach out to the maintainers directly.

Thank you for contributing! 🎉