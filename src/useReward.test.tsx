import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { useReward } from './useReward';

// Jest will automatically use __mocks__/animations.tsx
jest.mock('./animations');
jest.mock('./animationManager');
jest.mock('./mobileOptimizations');

describe('useReward', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ref-based API', () => {
    it('should return reward function and isAnimating state', () => {
      const ref = React.createRef<HTMLButtonElement>();
      const { result } = renderHook(() => useReward(ref, 'confetti'));

      expect(result.current.reward).toBeInstanceOf(Function);
      expect(result.current.isAnimating).toBe(false);
      expect(result.current.targetRef).toBe(ref);
    });

    it('should trigger animation when reward is called', () => {
      const TestComponent = () => {
        const buttonRef = React.useRef<HTMLButtonElement>(null);
        const { reward, isAnimating } = useReward(buttonRef, 'confetti');

        return (
          <button ref={buttonRef} onClick={reward}>
            {isAnimating ? 'Animating' : 'Click me'}
          </button>
        );
      };

      render(<TestComponent />);
      const button = screen.getByRole('button');

      expect(button).toHaveTextContent('Click me');

      act(() => {
        button.click();
      });

      expect(animations.confetti.createParticles).toHaveBeenCalled();
    });

    it('should warn when element is not found', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const ref = React.createRef<HTMLButtonElement>();
      const { result } = renderHook(() => useReward(ref, 'confetti'));

      act(() => {
        result.current.reward();
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[Partycles] Element from ref not found')
      );

      consoleSpy.mockRestore();
    });
  });

  describe('string ID API (legacy)', () => {
    it('should work with element IDs for backward compatibility', () => {
      const TestComponent = () => {
        const { reward, isAnimating } = useReward('test-button', 'confetti');

        return (
          <button id="test-button" onClick={reward}>
            {isAnimating ? 'Animating' : 'Click me'}
          </button>
        );
      };

      render(<TestComponent />);
      const button = screen.getByRole('button');

      act(() => {
        button.click();
      });

      expect(animations.confetti.createParticles).toHaveBeenCalled();
    });

    it('should not return targetRef for string ID API', () => {
      const { result } = renderHook(() => useReward('test-id', 'confetti'));

      expect(result.current.reward).toBeInstanceOf(Function);
      expect(result.current.isAnimating).toBe(false);
      expect(result.current.targetRef).toBeUndefined();
    });
  });

  describe('animation configuration', () => {
    it('should accept custom configuration', () => {
      const ref = React.createRef<HTMLButtonElement>();
      const config = {
        particleCount: 100,
        spread: 90,
        colors: ['#ff0000', '#00ff00', '#0000ff'],
        physics: {
          gravity: 0.5,
          wind: 0.1,
          friction: 0.95,
        },
      };

      const { result } = renderHook(() => useReward(ref, 'confetti', config));

      expect(result.current.reward).toBeInstanceOf(Function);
    });

    it('should handle invalid animation types gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const ref = React.createRef<HTMLButtonElement>();

      // @ts-expect-error - Testing invalid animation type
      const { result } = renderHook(() => useReward(ref, 'invalid-animation'));

      // Create a mock element
      const button = document.createElement('button');
      document.body.appendChild(button);
      Object.defineProperty(ref, 'current', {
        writable: true,
        value: button,
      });

      act(() => {
        result.current.reward();
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Animation type "invalid-animation" not found')
      );

      document.body.removeChild(button);
      consoleSpy.mockRestore();
    });
  });

  describe('SSR safety', () => {
    it('should handle missing document gracefully', () => {
      const originalDocument = global.document;
      // @ts-expect-error - Testing SSR scenario
      delete global.document;

      const ref = React.createRef<HTMLButtonElement>();
      const { result } = renderHook(() => useReward(ref, 'confetti'));

      // Should not throw
      expect(() => {
        act(() => {
          result.current.reward();
        });
      }).not.toThrow();

      global.document = originalDocument;
    });
  });

  describe('cleanup', () => {
    it('should clean up when component unmounts', () => {
      const ref = React.createRef<HTMLButtonElement>();
      const { unmount } = renderHook(() => useReward(ref, 'confetti'));

      unmount();

      // Should not have any lingering elements
      const containers = document.querySelectorAll(
        'div[style*="position: fixed"]'
      );
      expect(containers.length).toBe(0);
    });
  });
});
