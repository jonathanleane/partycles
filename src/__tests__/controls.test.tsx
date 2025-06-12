import { renderHook, act, waitFor } from '@testing-library/react';
import { useReward } from '../useReward';

// Mock the animations module
jest.mock('../animations', () => ({
  animations: {
    confetti: {
      createParticles: jest.fn(() => [
        {
          id: 'particle-1',
          x: 50,
          y: 50,
          vx: 1,
          vy: -5,
          life: 100,
          opacity: 1,
          size: 20,
          rotation: 0,
          color: '#ff0000',
        },
      ]),
      renderParticle: jest.fn((particle) => `Particle ${particle.id}`),
    },
  },
}));

describe('Animation Controls', () => {
  let mockElement: HTMLDivElement;

  beforeEach(() => {
    // Create a mock element
    mockElement = document.createElement('div');
    mockElement.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      right: 100,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));
    document.body.appendChild(mockElement);
  });

  afterEach(() => {
    document.body.removeChild(mockElement);
    jest.clearAllMocks();
  });

  describe('pause and resume', () => {
    it('should provide pause and resume functions', async () => {
      const ref = { current: mockElement };
      const { result } = renderHook(() => useReward(ref, 'confetti'));

      await waitFor(() => {
        expect(result.current).toBeDefined();
      });

      expect(result.current.pause).toBeInstanceOf(Function);
      expect(result.current.resume).toBeInstanceOf(Function);
    });

    it('should pause animation when pause is called', async () => {
      const ref = { current: mockElement };
      const { result } = renderHook(() => useReward(ref, 'confetti'));

      await waitFor(() => {
        expect(result.current).toBeDefined();
      });

      // Start animation
      act(() => {
        result.current.reward();
      });

      await waitFor(() => {
        expect(result.current.isAnimating).toBe(true);
      });

      // Pause animation
      act(() => {
        result.current.pause();
      });

      await waitFor(() => {
        expect(result.current.isPaused).toBe(true);
      });
    });

    it('should resume animation when resume is called', async () => {
      const ref = { current: mockElement };
      const { result } = renderHook(() => useReward(ref, 'confetti'));

      await waitFor(() => {
        expect(result.current).toBeDefined();
      });

      // Start and pause animation
      act(() => {
        result.current.reward();
      });

      await waitFor(() => {
        expect(result.current.isAnimating).toBe(true);
      });

      act(() => {
        result.current.pause();
      });

      await waitFor(() => {
        expect(result.current.isPaused).toBe(true);
      });

      // Resume animation
      act(() => {
        result.current.resume();
      });

      await waitFor(() => {
        expect(result.current.isPaused).toBe(false);
      });
    });
  });

  describe('replay', () => {
    it('should provide replay function', async () => {
      const ref = { current: mockElement };
      const { result } = renderHook(() => useReward(ref, 'confetti'));

      await waitFor(() => {
        expect(result.current).toBeDefined();
      });

      expect(result.current.replay).toBeInstanceOf(Function);
    });

    it('should restart animation when replay is called', async () => {
      const ref = { current: mockElement };
      const { result } = renderHook(() => useReward(ref, 'confetti'));

      await waitFor(() => {
        expect(result.current).toBeDefined();
      });

      // Start animation
      act(() => {
        result.current.reward();
      });

      await waitFor(() => {
        expect(result.current.isAnimating).toBe(true);
      });

      // Replay animation
      let replayPromise: Promise<void>;
      act(() => {
        replayPromise = result.current.replay();
      });

      // Replay should return a promise
      expect(replayPromise!).toBeInstanceOf(Promise);

      await waitFor(() => {
        expect(result.current.isAnimating).toBe(true);
      });
    });
  });

  describe('isPaused state', () => {
    it('should initially be false', async () => {
      const ref = { current: mockElement };
      const { result } = renderHook(() => useReward(ref, 'confetti'));

      await waitFor(() => {
        expect(result.current).toBeDefined();
      });

      expect(result.current.isPaused).toBe(false);
    });

    it('should update when animation is paused and resumed', async () => {
      const ref = { current: mockElement };
      const { result } = renderHook(() => useReward(ref, 'confetti'));

      await waitFor(() => {
        expect(result.current).toBeDefined();
      });

      // Start animation
      act(() => {
        result.current.reward();
      });

      await waitFor(() => {
        expect(result.current.isAnimating).toBe(true);
      });

      expect(result.current.isPaused).toBe(false);

      // Pause
      act(() => {
        result.current.pause();
      });

      await waitFor(() => {
        expect(result.current.isPaused).toBe(true);
      });

      // Resume
      act(() => {
        result.current.resume();
      });

      await waitFor(() => {
        expect(result.current.isPaused).toBe(false);
      });
    });
  });

  describe('control methods with string ID API', () => {
    it('should provide control methods with string ID API', async () => {
      const elementId = 'test-element';
      mockElement.id = elementId;

      const { result } = renderHook(() => useReward(elementId, 'confetti'));

      await waitFor(() => {
        expect(result.current).toBeDefined();
      });

      expect(result.current.pause).toBeInstanceOf(Function);
      expect(result.current.resume).toBeInstanceOf(Function);
      expect(result.current.replay).toBeInstanceOf(Function);
      expect(result.current.isPaused).toBe(false);
    });
  });
});