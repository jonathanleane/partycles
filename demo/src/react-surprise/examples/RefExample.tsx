import React, { useRef } from 'react';
import { useReward } from '../useReward';

// Example: Using the ref-based API (recommended)
export function RefExample() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { reward, isAnimating } = useReward(buttonRef, 'confetti');

  return (
    <button ref={buttonRef} onClick={reward} disabled={isAnimating}>
      Click me for confetti! 🎉
    </button>
  );
}

// Example: Using the legacy string ID API (for backward compatibility)
export function StringIdExample() {
  const { reward, isAnimating } = useReward('my-button', 'confetti');

  return (
    <button id="my-button" onClick={reward} disabled={isAnimating}>
      Click me for confetti! 🎉
    </button>
  );
}

// Example: Advanced usage with configuration
export function AdvancedExample() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { reward, isAnimating } = useReward(buttonRef, 'stars', {
    particleCount: 100,
    spread: 120,
    startVelocity: 25,
    colors: ['#FFD700', '#FFA500', '#FF6347'],
    physics: {
      gravity: 0.3,
      wind: 0.1,
      friction: 0.97,
    },
    effects: {
      twinkle: true,
    },
  });

  return (
    <button
      ref={buttonRef}
      onClick={reward}
      disabled={isAnimating}
      style={{
        padding: '12px 24px',
        fontSize: '16px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: isAnimating ? '#ccc' : '#4CAF50',
        color: 'white',
        cursor: isAnimating ? 'not-allowed' : 'pointer',
      }}
    >
      {isAnimating ? 'Animating...' : 'Trigger Stars ⭐'}
    </button>
  );
}
