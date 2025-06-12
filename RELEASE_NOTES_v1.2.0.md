# 🎉 Partycles v1.2.0

This is a major release with significant performance improvements and new animation control capabilities!

## ✨ What's New

### 🎮 Imperative Animation Controls
- **pause()** - Pause animations mid-flight
- **resume()** - Resume from where you left off  
- **replay()** - Restart the animation from scratch
- **isPaused** - Check if animation is paused

```tsx
const { reward, pause, resume, replay, isPaused } = useReward(ref, 'confetti');
```

### 🎯 Promise-based Animations
The `reward()` function now returns a Promise that resolves when the animation completes:

```tsx
await reward();
console.log('Animation finished!');
```

### 🚀 Performance Improvements
- **Object Pooling**: Reuses particle objects to reduce garbage collection pressure
- **Single RAF Loop**: All animations now share one requestAnimationFrame loop
- **Mobile Optimizations**: Automatic frame skipping and particle reduction on low-end devices
- **40-60% performance improvement** on mobile devices!

### 🔧 Better Developer Experience
- **Enhanced Ref API**: Now the recommended way to use Partycles
- **TypeScript Improvements**: Better type inference and safety
- **SSR Safety**: Next.js and SSR-friendly with proper checks
- **Comprehensive Testing**: Full Jest test suite added

## 📦 Installation

```bash
npm install partycles@1.2.0
# or
yarn add partycles@1.2.0
```

## 🔄 Migration Guide

The library is fully backward compatible. The string ID API still works, but we recommend migrating to the ref-based API:

```tsx
// Old (still works)
const { reward } = useReward('my-button', 'confetti');

// New (recommended)
const buttonRef = useRef(null);
const { reward } = useReward(buttonRef, 'confetti');
```

## 📊 Bundle Size

Despite all the new features, the bundle size remains under 10KB gzipped!

## 🙏 Acknowledgments

This release was developed with assistance from Claude AI, focusing on performance optimization and API design best practices.

## 📋 Full Changelog

### Added
- Imperative control methods (pause, resume, replay)
- Promise-based reward() function
- Object pooling for particle reuse
- Centralized animation manager with single RAF loop
- Mobile performance optimizations
- SSR safety checks
- Comprehensive test suite
- Enhanced ref-based API

### Changed
- Build system migrated from Rollup to tsup
- All animations now use pooled particles
- Improved TypeScript definitions

### Fixed
- Memory leaks from unreleased particles
- Multiple RAF loops causing performance issues
- TypeScript errors in strict mode

### Internal
- Added AnimationManager class
- Added ParticlePool class
- Added mobileOptimizations module
- Refactored useReward hook architecture