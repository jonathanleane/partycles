import {
  useCallback,
  useRef,
  useState,
  useEffect,
  RefObject,
  useMemo,
} from 'react';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import {
  AnimationType,
  AnimationConfig,
  Particle,
  AnimationControls,
} from './types';
import { animations } from './animations';
import { createParticleStyle } from './utils';
import { optimizeConfigForMobile } from './mobileOptimizations';
import { animationManager } from './animationManager';

interface UseRewardReturn extends AnimationControls {
  reward: () => Promise<void>;
  isAnimating: boolean;
  targetRef?: RefObject<HTMLElement>;
}

// Overload signatures for better TypeScript support
export function useReward(
  elementId: string,
  animationType: AnimationType,
  config?: AnimationConfig
): UseRewardReturn;

export function useReward(
  targetRef: RefObject<HTMLElement>,
  animationType: AnimationType,
  config?: AnimationConfig
): UseRewardReturn;

export function useReward(
  elementIdOrRef: string | RefObject<HTMLElement>,
  animationType: AnimationType,
  config?: AnimationConfig
): UseRewardReturn {
  const [isAnimating, setIsAnimating] = useState(false);
  const animationIdRef = useRef<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<Root | null>(null);

  // Create internal ref if string ID is provided
  const internalRef = useRef<HTMLElement>(null);
  const isUsingStringId = typeof elementIdOrRef === 'string';
  const targetRef = isUsingStringId ? internalRef : elementIdOrRef;

  const animate = useCallback(() => {
    return new Promise<void>((resolve) => {
      // Get element from ref or ID
      let element: HTMLElement | null = null;

      if (isUsingStringId) {
        // SSR safety check
        if (typeof document === 'undefined') return;
        element = document.getElementById(elementIdOrRef as string);
      } else {
        element = targetRef.current;
      }

      if (!element) {
        // Development warning - will be stripped by minifiers in production
        console.warn?.(
          `[Partycles] Element ${isUsingStringId ? `with ID "${elementIdOrRef}"` : 'from ref'} not found. ` +
            'Make sure the element exists when reward() is called.'
        );
        resolve();
        return;
      }

      const rect = element.getBoundingClientRect();
      const origin = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const animationHandler = animations[animationType];
      if (!animationHandler) {
        console.error(`Animation type "${animationType}" not found`);
        resolve();
        return;
      }

      // Apply mobile performance optimizations
      const optimizedConfig = config
        ? optimizeConfigForMobile(config)
        : undefined;

      // Create particles
      const particles = animationHandler
        .createParticles(origin, optimizedConfig || {})
        .map((particle) => ({
          ...particle,
          config: optimizedConfig || config, // Store config in particle for render functions
        }));

      // Create container
      // SSR safety check
      if (typeof document === 'undefined') {
        resolve();
        return;
      }

      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.pointerEvents = 'none';
      container.style.zIndex = '9999';
      document.body.appendChild(container);
      containerRef.current = container;

      // Create React root
      const root = createRoot(container);
      rootRef.current = root;

      const containerRect = container.getBoundingClientRect();

      // Default gravity varies by animation type
      const defaultGravity =
        animationType === 'bubbles'
          ? -0.1
          : animationType === 'snow'
            ? 0.05
            : animationType === 'embers'
              ? -0.06
              : 0.35;
      const gravity =
        optimizedConfig?.physics?.gravity ??
        config?.physics?.gravity ??
        defaultGravity;
      const friction =
        optimizedConfig?.physics?.friction ?? config?.physics?.friction ?? 0.98;
      const wind = optimizedConfig?.physics?.wind ?? config?.physics?.wind ?? 0;

      // Create animation instance ID
      const animationId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      animationIdRef.current = animationId;

      // Update callback to render particles
      const updateCallback = (updatedParticles: Particle[]) => {
        if (rootRef.current) {
          rootRef.current.render(
            <React.Fragment>
              {updatedParticles
                .filter((p) => p.life > 0)
                .map((particle) => (
                  <div
                    key={particle.id}
                    style={createParticleStyle(particle, containerRect)}
                  >
                    {animationHandler.renderParticle(particle)}
                  </div>
                ))}
            </React.Fragment>
          );
        }
      };

      // Add animation to manager
      animationManager.addAnimation({
        id: animationId,
        particles,
        containerElement: container,
        renderFunction: animationHandler.renderParticle,
        updateCallback,
        onComplete: () => {
          // Cleanup
          if (rootRef.current) {
            rootRef.current.unmount();
            rootRef.current = null;
          }
          containerRef.current = null;
          animationIdRef.current = null;
          setIsAnimating(false);
          resolve();
        },
        physics: { gravity, friction, wind },
        animationType,
        config: optimizedConfig || config,
        frameCount: 0,
      });

      setIsAnimating(true);
    });
  }, [elementIdOrRef, animationType, config, isUsingStringId, targetRef]);

  const reward = useCallback(() => {
    if (!isAnimating) {
      return animate();
    }
    return Promise.resolve();
  }, [animate, isAnimating]);

  // Imperative control methods
  const pause = useCallback(() => {
    if (animationIdRef.current) {
      animationManager.pauseAnimation(animationIdRef.current);
    }
  }, []);

  const resume = useCallback(() => {
    if (animationIdRef.current) {
      animationManager.resumeAnimation(animationIdRef.current);
    }
  }, []);

  const replay = useCallback(() => {
    // First clean up existing animation if any
    if (animationIdRef.current) {
      animationManager.removeAnimation(animationIdRef.current);
      animationIdRef.current = null;
    }
    setIsAnimating(false);

    // Then start a new animation
    return animate();
  }, [animate]);

  const [animationId, setAnimationId] = useState<string | null>(null);

  // Update animation ID in state when it changes
  useEffect(() => {
    setAnimationId(animationIdRef.current);
  }, [isAnimating]);

  const isPaused = useMemo(() => {
    if (!animationId) return false;
    return animationManager.isAnimationPaused(animationId);
  }, [animationId]); // Re-compute when animation ID changes

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        animationManager.removeAnimation(animationIdRef.current);
      }
      if (rootRef.current) {
        rootRef.current.unmount();
        rootRef.current = null;
      }
      if (
        containerRef.current &&
        document.body.contains(containerRef.current)
      ) {
        document.body.removeChild(containerRef.current);
        containerRef.current = null;
      }
    };
  }, []);

  // Return ref only for ref-based API
  if (!isUsingStringId) {
    return { reward, isAnimating, targetRef, pause, resume, replay, isPaused };
  }

  return { reward, isAnimating, pause, resume, replay, isPaused };
}
