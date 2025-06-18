# Partycles 🎉

A lightweight, performant React library for adding delightful animation effects to your applications. Perfect for celebrating user achievements, form submissions, or any moment worth highlighting.

[**→ Try the Live Demo**](https://jonathanleane.github.io/partycles)

[![npm version](https://img.shields.io/npm/v/partycles.svg)](https://www.npmjs.com/package/partycles)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/partycles)](https://bundlephobia.com/package/partycles)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Simple API** - Just one hook to rule them all
- 🎨 **21 Beautiful Animations** - Confetti, sparkles, hearts, stars, fireworks, bubbles, snow, emoji, coins, petals, aurora, fireflies, paint, balloons, galaxy, glitch, magicdust, crystals, leaves, mortar, and bokeh
- 📦 **Tiny Bundle** - Zero dependencies, optimized for performance
- 🚀 **Performant** - Optimized animations using requestAnimationFrame
- 🎮 **Full Control** - Customize colors, particle count, physics, and more
- 📱 **Mobile Optimized** - Automatic performance optimizations for mobile devices
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
import { useRef } from 'react';
import { useReward } from 'partycles';

function App() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { reward, isAnimating } = useReward(buttonRef, 'confetti');

  return (
    <button ref={buttonRef} onClick={reward} disabled={isAnimating}>
      Click me for a surprise! 🎉
    </button>
  );
}
```

That's it! No configuration needed - it just works. 🎊

### Using String IDs (Legacy)

For backward compatibility, you can still use element IDs:

```tsx
const { reward, isAnimating } = useReward('my-button', 'confetti');

<button id="my-button" onClick={reward}>
  Click me! 🎉
</button>
```

## 🤔 Why Partycles?

- **Zero Dependencies** - No bloat, just pure React code
- **One Hook** - Simple `useReward` hook handles everything  
- **21 Animations** - From confetti to dreamy bokeh effects, we've got you covered
- **Fully Typed** - Great TypeScript support out of the box
- **Customizable** - Tweak colors, physics, particle count, and more
- **Performant** - Optimized animations that won't slow down your app

## 📖 API Reference

### `useReward(targetRef, animationType, config?)` (Recommended)
### `useReward(elementId, animationType, config?)` (Legacy)

The main hook for creating reward animations.

#### Parameters

- `targetRef` (RefObject<HTMLElement>): A React ref to the element to animate from (recommended)
- `elementId` (string): The ID of the element to animate from (legacy, for backward compatibility)
- `animationType` (string): One of: `'confetti'`, `'sparkles'`, `'hearts'`, `'stars'`, `'fireworks'`, `'bubbles'`, `'snow'`, `'emoji'`, `'coins'`, `'petals'`, `'aurora'`, `'fireflies'`, `'paint'`, `'balloons'`, `'galaxy'`, `'glitch'`, `'magicdust'`, `'crystals'`, `'leaves'`, `'mortar'`, `'bokeh'`
- `config` (optional): Animation configuration object

#### Returns

- `reward` (function): Triggers the animation, returns a Promise that resolves when complete
- `isAnimating` (boolean): Whether the animation is currently running
- `pause` (function): Pauses the current animation
- `resume` (function): Resumes a paused animation
- `replay` (function): Stops current animation and starts a new one
- `isPaused` (boolean): Whether the animation is currently paused
- `targetRef` (RefObject<HTMLElement>): The ref object (only returned when using ref-based API)

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
  // NEW: Optional enhanced effects
  effects?: {
    flutter?: boolean;         // Paper-like floating for confetti
    twinkle?: boolean;         // Brightness variation for stars/sparkles
    pulse?: boolean;           // Heartbeat effect for hearts
    spin3D?: boolean;          // 3D rotation for coins
    wobble?: boolean;          // Realistic wobble for bubbles
    windDrift?: boolean;       // Horizontal drift for snow/leaves
  };
}
```

## 🎨 Animation Types

### Confetti 🎊
Classic celebration effect with colorful paper pieces.

```tsx
const buttonRef = useRef<HTMLButtonElement>(null);
const { reward } = useReward(buttonRef, 'confetti', {
  particleCount: 30,
  spread: 60,
  colors: ['#ff0000', '#00ff00', '#0000ff'],
  // NEW: Enable paper flutter effect
  effects: { flutter: true }
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

### Glitch 📺
Digital glitch effect for tech themes.

```tsx
const { reward } = useReward('buttonId', 'glitch', {
  particleCount: 30,
  elementSize: 40
});
```

### Magic Dust ✨
Magical sparkling dust particles.

```tsx
const { reward } = useReward('buttonId', 'magicdust', {
  particleCount: 35,
  colors: ['#9c27b0', '#673ab7', '#3f51b5']
});
```

### Crystals 💎
Shimmering crystal fragments.

```tsx
const { reward } = useReward('buttonId', 'crystals', {
  particleCount: 20,
  elementSize: 25
});
```

### Leaves 🍃
Falling autumn leaves with natural movement.

```tsx
const { reward } = useReward('buttonId', 'leaves', {
  particleCount: 30,
  physics: { gravity: 0.05, wind: 0.2 }
});
```

### Mortar 💥
Explosive mortar-style bursts with galaxy-like explosions.

```tsx
const { reward } = useReward('buttonId', 'mortar', {
  particleCount: 2,
  spread: 45,
  physics: { gravity: 0.35 }
});
```

### Bokeh 🔮
Soft, dreamy light orbs with depth-of-field effect. Inspired by photography bokeh.

```tsx
const { reward } = useReward('buttonId', 'bokeh', {
  particleCount: 25,
  elementSize: 40,
  lifetime: 400,
  physics: { gravity: -0.02 }
});
```

## 💡 Examples

### Animation Controls

Control your animations with pause, resume, and replay:

```tsx
import { useRef } from 'react';
import { useReward } from 'partycles';

function ControlledAnimation() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { reward, isAnimating, pause, resume, replay, isPaused } = useReward(
    buttonRef,
    'confetti',
    { particleCount: 50 }
  );

  return (
    <div>
      <button ref={buttonRef} onClick={reward}>
        Start Animation
      </button>
      
      <button onClick={pause} disabled={!isAnimating || isPaused}>
        Pause
      </button>
      
      <button onClick={resume} disabled={!isAnimating || !isPaused}>
        Resume
      </button>
      
      <button onClick={replay}>
        Replay
      </button>
      
      <p>Status: {isAnimating ? (isPaused ? 'Paused' : 'Playing') : 'Idle'}</p>
    </div>
  );
}
```

### Promise-based Completion

Chain actions after animations complete:

```tsx
const { reward } = useReward(buttonRef, 'confetti');

const handleSuccess = async () => {
  await reward(); // Wait for animation to complete
  console.log('Animation finished!');
  // Navigate, show message, etc.
};

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

## ✨ Enhanced Effects (v1.1.5+)

Make animations more realistic with optional effects:

```tsx
// Confetti with paper flutter
const { reward } = useReward('confetti-btn', 'confetti', {
  effects: { flutter: true }
});

// Stars with twinkling
const { reward } = useReward('star-btn', 'stars', {
  effects: { twinkle: true }
});

// Hearts with pulse/heartbeat
const { reward } = useReward('heart-btn', 'hearts', {
  effects: { pulse: true }
});

// Coins with 3D spin
const { reward } = useReward('coin-btn', 'coins', {
  effects: { spin3D: true }
});

// Snow with wind drift
const { reward } = useReward('snow-btn', 'snow', {
  effects: { windDrift: true }
});

// Bubbles with wobble
const { reward } = useReward('bubble-btn', 'bubbles', {
  effects: { wobble: true }
});

// Combine multiple effects
const { reward } = useReward('magic-btn', 'sparkles', {
  effects: { 
    twinkle: true,
    // Other effects work too!
  },
  physics: {
    gravity: 0.2,
    wind: 0.1
  }
});
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

## 📈 Changelog

### v1.2.3 (Latest)
- 🔮 Updated bokeh animation defaults for better visual impact
- 📊 Increased default particle count from 25 to 50
- ⏱️ Reduced lifetime from 400 to 200 for snappier animations
- 🎯 Adjusted physics for more natural movement

### v1.2.2
- 🔮 Added new `bokeh` animation with soft, dreamy light orbs
- 🙏 Added credits section to acknowledge contributors
- 📱 Optimized bokeh effect for smooth performance

### v1.2.1
- 🎆 Added new `mortar` animation with galaxy-style explosions
- 🐛 Fixed particle rendering issues with dynamic particle creation
- 🎨 Updated emoji assignments for better consistency (fireflies: 🌟, coins: 💰)
- ⚡ Optimized mortar explosion performance for mobile devices
- 🔧 Improved animation manager to handle particles created during updates

### v1.1.5
- ✨ Added optional enhanced effects (flutter, twinkle, pulse, spin3D, wobble, windDrift)
- 📱 Improved mobile performance with automatic optimizations

### v1.1.3
- 🚀 Added automatic mobile performance optimizations
- 🐛 Fixed Safari compatibility issues
- 📦 Streamlined bundle size by removing 7 animations
- 🔧 Fixed CI/CD pipeline and npm publishing

### v1.0.0
- 🎉 Initial release with 26 animations

## 🙏 Credits

- **Bokeh effect** inspired by [Sergio A. Carrasco Chavez](https://codepen.io/sergio-carrasco)'s beautiful bokeh implementation

## 📄 License

MIT © Jonathan Leane

---

<p align="center">
  Made with ❤️ by developers, for developers
</p>