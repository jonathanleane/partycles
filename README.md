# Partycles 🎉

A lightweight, performant React library for adding delightful animation effects to your applications. Perfect for celebrating user achievements, form submissions, or any moment worth highlighting.

[**→ Try the Live Demo**](https://jonathanleane.github.io/partycles)

[![npm version](https://img.shields.io/npm/v/partycles.svg)](https://www.npmjs.com/package/partycles)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/partycles)](https://bundlephobia.com/package/partycles)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Simple API** - Just one hook to rule them all
- 🎨 **17 Beautiful Animations** - Confetti, sparkles, hearts, stars, fireworks, bubbles, snow, emoji, coins, lightning, petals, aurora, fireflies, paint, music, balloons, and galaxy
- 📦 **Tiny Bundle** - Zero dependencies, optimized for performance
- 🚀 **Performant** - Optimized animations using requestAnimationFrame
- 🎮 **Full Control** - Customize colors, particle count, physics, and more
- 📱 **Responsive** - Works seamlessly on all devices
- 🔧 **TypeScript Support** - Fully typed for excellent DX
- ⚡ **React 18 Ready** - Built with the latest React features

## 📦 Installation

```bash
npm install partycles
# or
yarn add partycles
# or
pnpm add partycles
```

## 🚀 Quick Start

```tsx
import { useReward } from 'partycles';

function App() {
  const { reward, isAnimating } = useReward('rewardId', 'confetti');

  return (
    <button id="rewardId" onClick={reward} disabled={isAnimating}>
      Click me for a surprise! 🎉
    </button>
  );
}
```

That's it! No configuration needed - it just works. 🎊

## 🤔 Why Partycles?

- **Zero Dependencies** - No bloat, just pure React code
- **One Hook** - Simple `useReward` hook handles everything  
- **11 Animations** - From confetti to lightning, we've got you covered
- **Fully Typed** - Great TypeScript support out of the box
- **Customizable** - Tweak colors, physics, particle count, and more
- **Performant** - Optimized animations that won't slow down your app

## 📖 API Reference

### `useReward(elementId, animationType, config?)`

The main hook for creating reward animations.

#### Parameters

- `elementId` (string): The ID of the element to animate from
- `animationType` (string): One of: `'confetti'`, `'sparkles'`, `'hearts'`, `'stars'`, `'fireworks'`, `'bubbles'`, `'snow'`, `'emoji'`, `'coins'`, `'lightning'`, `'petals'`
- `config` (optional): Animation configuration object

#### Returns

- `reward` (function): Triggers the animation
- `isAnimating` (boolean): Whether the animation is currently running

### Configuration Options

```typescript
interface AnimationConfig {
  particleCount?: number;      // Number of particles (default: varies by animation)
  spread?: number;             // Spread angle in degrees (default: 50)
  startVelocity?: number;      // Initial velocity (default: 45)
  decay?: number;              // Velocity decay rate (default: 0.9)
  lifetime?: number;           // Particle lifetime (default: 100)
  colors?: string[];           // Array of colors (or emojis for 'emoji' type)
  elementSize?: number;        // Size of particles in pixels
  duration?: number;           // Total animation duration
  physics?: {
    gravity?: number;          // Gravity force (default: 0.5)
    wind?: number;             // Horizontal wind force (default: 0)
    friction?: number;         // Air friction (default: 0.99)
  };
}
```

## 🎨 Animation Types

### Confetti 🎊
Classic celebration effect with colorful paper pieces.

```tsx
const { reward } = useReward('buttonId', 'confetti', {
  particleCount: 30,
  spread: 60,
  colors: ['#ff0000', '#00ff00', '#0000ff']
});
```

### Sparkles ✨
Twinkling star effect perfect for magical moments.

```tsx
const { reward } = useReward('buttonId', 'sparkles', {
  particleCount: 20,
  elementSize: 15
});
```

### Hearts 💕
Floating hearts for likes, favorites, or love actions.

```tsx
const { reward } = useReward('buttonId', 'hearts', {
  particleCount: 15,
  colors: ['#ff1744', '#e91e63', '#ff4569']
});
```

### Stars ⭐
Shooting stars effect for achievements and ratings.

```tsx
const { reward } = useReward('buttonId', 'stars', {
  particleCount: 25,
  physics: { gravity: 0.3 }
});
```

### Fireworks 🎆
Explosive celebration for major milestones.

```tsx
const { reward } = useReward('buttonId', 'fireworks', {
  particleCount: 40,
  spread: 180
});
```

### Bubbles 🫧
Gentle floating bubbles for calm, playful effects.

```tsx
const { reward } = useReward('buttonId', 'bubbles', {
  particleCount: 20,
  physics: { gravity: -0.1 }
});
```

### Snow ❄️
Peaceful falling snowflakes for winter themes.

```tsx
const { reward } = useReward('buttonId', 'snow', {
  particleCount: 50,
  physics: { gravity: 0.05, wind: 0.1 }
});
```

### Emoji 🎉
Customizable emoji explosions for any mood.

```tsx
import { useReward, emojiPresets } from 'partycles';

// Use built-in presets
const { reward } = useReward('buttonId', 'emoji', {
  colors: emojiPresets.celebration  // 🎉🎊🥳🎈🎁🍾🥂🎆
});

// Or custom emojis
const { reward } = useReward('buttonId', 'emoji', {
  particleCount: 30,
  colors: ['🎉', '🎊', '🎈', '🎁', '✨']
});
```

**Available emoji presets:**
- `emojiPresets.celebration` - Party emojis
- `emojiPresets.love` - Heart emojis
- `emojiPresets.happy` - Happy face emojis
- `emojiPresets.nature` - Nature emojis
- `emojiPresets.food` - Food emojis

### Coins 💰
Falling coins for rewards and achievements.

```tsx
const { reward } = useReward('buttonId', 'coins', {
  particleCount: 25,
  physics: { gravity: 0.5 }
});
```

### Lightning ⚡
Electric energy bursts for powerful actions.

```tsx
const { reward } = useReward('buttonId', 'lightning', {
  particleCount: 20,
  spread: 360
});
```

### Petals 🌸
Delicate flower petals floating in the wind.

```tsx
const { reward } = useReward('buttonId', 'petals', {
  particleCount: 40,
  physics: { gravity: 0.08, wind: 0.15 }
});
```

### Aurora 🌌
Northern lights effect with flowing ribbons.

```tsx
const { reward } = useReward('buttonId', 'aurora', {
  particleCount: 15,
  elementSize: 100
});
```

### Fireflies ✨
Glowing fireflies with organic movement.

```tsx
const { reward } = useReward('buttonId', 'fireflies', {
  particleCount: 20,
  lifetime: 300
});
```

### Paint 🎨
Paint splatter effect for creative actions.

```tsx
const { reward } = useReward('buttonId', 'paint', {
  particleCount: 25,
  startVelocity: 35
});
```

### Music 🎵
Musical notes floating upward.

```tsx
const { reward } = useReward('buttonId', 'music', {
  particleCount: 20,
  physics: { gravity: -0.08 }
});
```

### Balloons 🎈
Floating balloons with realistic physics.

```tsx
const { reward } = useReward('buttonId', 'balloons', {
  particleCount: 15,
  lifetime: 400
});
```

### Galaxy 🌟
Spiral star formation with twinkling effects.

```tsx
const { reward } = useReward('buttonId', 'galaxy', {
  particleCount: 60,
  spread: 200
});
```

## 💡 Examples

### Form Submission Success
```tsx
function ContactForm() {
  const { reward } = useReward('submit-btn', 'confetti');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitForm();
    if (success) {
      reward();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button id="submit-btn" type="submit">
        Send Message
      </button>
    </form>
  );
}
```

### Like Button with Hearts
```tsx
function LikeButton() {
  const [liked, setLiked] = useState(false);
  const { reward } = useReward('like-btn', 'hearts', {
    particleCount: 10,
    elementSize: 20
  });

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      reward();
    }
  };

  return (
    <button id="like-btn" onClick={handleLike}>
      {liked ? '❤️' : '🤍'} Like
    </button>
  );
}
```

### Achievement Unlocked
```tsx
function Achievement({ unlocked, name }) {
  const { reward } = useReward('achievement', 'fireworks', {
    particleCount: 50,
    spread: 120
  });

  useEffect(() => {
    if (unlocked) {
      reward();
    }
  }, [unlocked, reward]);

  return (
    <div id="achievement" className="achievement-badge">
      🏆 {name}
    </div>
  );
}
```

## 🎯 Best Practices

1. **Unique IDs**: Ensure each animated element has a unique ID
2. **Performance**: Avoid triggering multiple animations simultaneously
3. **Accessibility**: Provide alternative feedback for users who prefer reduced motion
4. **Mobile**: Partycles automatically optimizes for mobile devices

```tsx
// Respect user preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const { reward } = useReward('buttonId', 'confetti', {
  particleCount: prefersReducedMotion ? 0 : 30
});
```

## 📱 Mobile Optimization

Partycles automatically detects mobile devices and optimizes performance:

- **Reduced particle counts** (60% of desktop)
- **Smaller particle sizes** (80% of desktop)
- **Shorter lifetimes** (80% of desktop)
- **Frame skipping** for smoother performance
- **Tab visibility detection** to pause when inactive

You can also manually check for mobile devices:

```tsx
import { isMobileDevice, optimizeConfigForMobile } from 'partycles';

if (isMobileDevice()) {
  // Custom mobile logic
}

// Or manually optimize a config
const mobileConfig = optimizeConfigForMobile({
  particleCount: 100,
  elementSize: 30
});
```

## 🔧 Advanced Usage

### Custom Physics
```tsx
const { reward } = useReward('buttonId', 'confetti', {
  physics: {
    gravity: 0.2,     // Lower gravity = floatier particles
    wind: 0.1,        // Positive = blow right, negative = blow left
    friction: 0.95    // Higher = more air resistance
  }
});
```

### Dynamic Configuration
```tsx
function DynamicReward() {
  const [intensity, setIntensity] = useState(1);
  
  const { reward } = useReward('buttonId', 'confetti', {
    particleCount: 30 * intensity,
    spread: 50 + (20 * intensity),
    startVelocity: 45 * intensity
  });

  return (
    <>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={intensity}
        onChange={(e) => setIntensity(parseFloat(e.target.value))}
      />
      <button id="buttonId" onClick={reward}>
        Celebrate!
      </button>
    </>
  );
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © Jonathan Leane

---

<p align="center">
  Made with ❤️ by developers, for developers
</p>