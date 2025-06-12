import { useRef } from 'react';
import { renderHook, act } from '@testing-library/react';
import { useReward } from '../useReward';

describe('useReward promise functionality', () => {
  beforeEach(() => {
    // Clear any existing animations
    document.body.innerHTML = '';
  });

  it('reward function returns a promise', async () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useReward(ref, 'confetti');
    });

    const promise = result.current.reward();
    expect(promise).toBeInstanceOf(Promise);
  });

  it('promise resolves when animation completes', async () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useReward(ref, 'confetti', { lifetime: 10 });
    });

    let resolved = false;
    
    await act(async () => {
      const promise = result.current.reward();
      promise.then(() => {
        resolved = true;
      });
      
      // Should not be resolved immediately
      expect(resolved).toBe(false);
      
      // Wait for animation to complete
      await promise;
      expect(resolved).toBe(true);
    });
  });

  it('promise resolves immediately if element not found', async () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useReward(ref, 'confetti');
    });

    await act(async () => {
      const promise = result.current.reward();
      await expect(promise).resolves.toBeUndefined();
    });
  });

  it('consecutive calls return new promises', async () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useReward(ref, 'confetti');
    });

    const promise1 = result.current.reward();
    const promise2 = result.current.reward();
    
    expect(promise1).toBeInstanceOf(Promise);
    expect(promise2).toBeInstanceOf(Promise);
    // Second call should resolve immediately since animation is already running
    await expect(promise2).resolves.toBeUndefined();
  });
});