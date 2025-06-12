# Partycles - Claude AI Context

## Project Overview

Partycles is a lightweight, performant React library for adding delightful animation effects to applications. It provides 19 beautiful animations (confetti, sparkles, hearts, etc.) through a simple `useReward` hook API.

## Key Features

- **Single Hook API**: `useReward` handles all animations
- **19 Animations**: confetti, sparkles, hearts, stars, fireworks, bubbles, snow, emoji, coins, petals, aurora, fireflies, paint, balloons, galaxy, glitch, magicdust, crystals, leaves
- **Zero Dependencies**: Pure React implementation
- **TypeScript Support**: Fully typed
- **Mobile Optimized**: Automatic performance optimizations
- **Enhanced Effects** (v1.1.5): Optional realistic effects like flutter, twinkle, pulse, spin3D, wobble, windDrift

## Project Structure

```
partycles/
├── src/                    # Library source code
│   ├── animations/         # Individual animation implementations
│   ├── useReward.tsx      # Main hook implementation
│   ├── types.ts           # TypeScript definitions
│   └── utils.ts           # Utility functions
├── demo/                   # Demo application
│   ├── src/
│   │   ├── App.tsx        # Main demo interface
│   │   └── react-surprise/ # Local copy for testing
│   └── public/            # Static assets
├── dist/                   # Built library files
├── README.md              # Main documentation
├── CONTRIBUTING.md        # Contribution guidelines
├── TODO.md                # Development roadmap and tasks
└── package.json           # NPM configuration
```

## Recent Updates

- **v1.1.5**: Added optional enhanced effects (flutter, twinkle, pulse, etc.)
- **v1.1.4**: Updated npm metadata with all animations
- **v1.1.3**: Mobile optimizations and Safari fixes
- Working on: AI-suggested improvements, performance enhancements, documentation

## Development Workflow

1. Library code is in `/src`
2. Demo app is in `/demo` for testing
3. The demo contains a local copy of the library in `/demo/src/react-surprise` for rapid testing
4. Build with `npm run build`
5. Test with `npm run demo`

## Important Considerations

- **Performance**: Focus on mobile optimization and frame skipping
- **Browser Support**: Ensure Safari compatibility
- **Bundle Size**: Keep under 10KB minified + gzipped
- **Accessibility**: Support reduced motion preferences
- **Testing**: Manual testing across browsers and devices

## Current Focus Areas

See [TODO.md](./TODO.md) for the complete roadmap and task list.

## API Design Philosophy

- Simple, intuitive API that "just works"
- Sensible defaults with extensive customization options
- Performance-first approach with automatic optimizations
- Progressive enhancement with optional effects

## Key Technical Decisions

1. **No Dependencies**: Keeps bundle small and avoids version conflicts
2. **Hook-based API**: Modern React patterns, easy to use
3. **Canvas Rendering**: Better performance than DOM manipulation
4. **Automatic Cleanup**: Particles are removed after animation
5. **Mobile Detection**: Automatic optimizations for better performance

## Testing Guidelines

When making changes:
1. Test all 19 animations in the demo
2. Check mobile performance (use Chrome DevTools device emulation)
3. Verify Safari compatibility
4. Test with reduced motion preferences enabled
5. Check bundle size impact

## Common Patterns

```tsx
// Basic usage
const { reward, isAnimating } = useReward('elementId', 'confetti');

// With configuration
const { reward } = useReward('elementId', 'confetti', {
  particleCount: 30,
  colors: ['#ff0000', '#00ff00'],
  effects: { flutter: true }
});

// Dynamic configuration
const config = isMobile ? mobileConfig : desktopConfig;
const { reward } = useReward('elementId', 'confetti', config);
```

## Performance Considerations

- Particle counts are automatically reduced on mobile (60% of desktop)
- Frame skipping on mobile (every 3rd frame)
- Tab visibility detection pauses animations
- Automatic cleanup after animation lifetime
- Optional effects are disabled by default

## Future Considerations

- WebGL renderer for complex animations
- Animation sequences and chaining
- Custom particle shapes
- React Native support
- Server-side rendering optimizations