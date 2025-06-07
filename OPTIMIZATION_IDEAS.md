# Future Optimization Ideas

## Tree-Shaking Individual Animations

Currently, all 19 animations are bundled together. For users who only need specific animations, consider supporting individual imports:

```tsx
// Current approach (imports all animations)
import { useReward } from 'partycles';

// Future optimization (only imports needed animations)
import { useReward } from 'partycles/core';
import { confetti } from 'partycles/animations/confetti';
import { sparkles } from 'partycles/animations/sparkles';

// Register only the animations you need
const { reward } = useReward('id', confetti, config);
```

This would reduce bundle size for users who only need a few animations.

## Testing Strategy

Consider adding tests for:
- Animation particle creation
- Physics calculations
- Mobile device detection
- Safari compatibility
- React hook behavior

## Performance Monitoring

Consider adding:
- FPS monitoring during animations
- Memory usage tracking
- Performance budgets for animations