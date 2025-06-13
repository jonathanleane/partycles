import { renderHook } from '@testing-library/react';
import { useReward } from './useReward';
import React from 'react';

// Simple tests that don't require full rendering
describe('useReward - Simple Tests', () => {
  it('should return the expected hook interface', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useReward(ref, 'confetti'));

    // Check that the hook returns the expected shape
    expect(result.current).toHaveProperty('reward');
    expect(result.current).toHaveProperty('isAnimating');
    expect(result.current).toHaveProperty('targetRef');

    // Check types
    expect(typeof result.current.reward).toBe('function');
    expect(typeof result.current.isAnimating).toBe('boolean');
    expect(result.current.targetRef).toBe(ref);
  });

  it('should handle string ID API', () => {
    const { result } = renderHook(() => useReward('test-id', 'confetti'));

    // String ID API should not return targetRef
    expect(result.current).toHaveProperty('reward');
    expect(result.current).toHaveProperty('isAnimating');
    expect(result.current).not.toHaveProperty('targetRef');
  });

  it('should accept configuration', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const config = {
      particleCount: 100,
      spread: 90,
      colors: ['#ff0000'],
    };

    const { result } = renderHook(() => useReward(ref, 'confetti', config));

    expect(result.current).toHaveProperty('reward');
    expect(typeof result.current.reward).toBe('function');
  });

  it('should handle different animation types', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const animationTypes = [
      'confetti',
      'sparkles',
      'hearts',
      'stars',
      'fireworks',
      'bubbles',
      'snow',
      'emoji',
      'coins',
      'petals',
    ] as const;

    animationTypes.forEach((type) => {
      const { result } = renderHook(() => useReward(ref, type));
      expect(result.current).toHaveProperty('reward');
      expect(typeof result.current.reward).toBe('function');
    });
  });

  it('should start with isAnimating as false', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useReward(ref, 'confetti'));

    expect(result.current.isAnimating).toBe(false);
  });
});
