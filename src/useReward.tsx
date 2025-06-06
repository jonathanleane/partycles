import { useCallback, useRef, useState, useEffect } from 'react';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { AnimationType, AnimationConfig, Particle } from './types';
import { animations } from './animations';
import { createParticleStyle } from './utils';
import {
  optimizeConfigForMobile,
  shouldSkipFrame,
} from './mobileOptimizations';

interface UseRewardReturn {
  reward: () => void;
  isAnimating: boolean;
}

export const useReward = (
  elementId: string,
  animationType: AnimationType,
  config?: AnimationConfig
): UseRewardReturn => {
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<Root | null>(null);
  const isTabVisible = useRef(true);

  // Monitor tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      isTabVisible.current = !document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const animate = useCallback(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const origin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    const animationHandler = animations[animationType];
    if (!animationHandler) {
      console.error(`Animation type "${animationType}" not found`);
      return;
    }

    // Apply mobile performance optimizations
    const optimizedConfig = config
      ? optimizeConfigForMobile(config)
      : undefined;

    // Create particles
    particlesRef.current = animationHandler.createParticles(
      origin,
      optimizedConfig || {}
    ).map(particle => ({
      ...particle,
      config: optimizedConfig || config // Store config in particle for render functions
    }));

    // Create container
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
          : 0.35;
    const gravity = config?.physics?.gravity ?? defaultGravity;
    const friction = config?.physics?.friction ?? 0.98;
    const wind = config?.physics?.wind ?? 0;

    // Track frame count for mobile optimization
    let frameCount = 0;

    const updateParticles = () => {
      let activeParticles = 0;
      frameCount++;

      // Skip frame rendering on mobile to improve performance
      const skipFrame = shouldSkipFrame(frameCount);

      particlesRef.current = particlesRef.current.map((particle) => {
        if (particle.life <= 0) return particle;

        activeParticles++;

        // Update physics
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += gravity;
        particle.vx += wind;
        particle.vx *= friction;
        particle.vy *= friction;
        particle.rotation += particle.vx * 2;
        particle.life -= 1.2;

        // Apply optional effects
        const effects = config?.effects;
        
        // Flutter effect for confetti
        if (effects?.flutter && animationType === 'confetti') {
          particle.x += Math.sin(particle.life * 0.1) * 0.5;
          particle.rotation += Math.sin(particle.life * 0.05) * 2;
        }
        
        // Wind drift for snow/leaves
        if (effects?.windDrift && (animationType === 'snow' || animationType === 'leaves')) {
          particle.x += Math.sin(particle.life * 0.05 + particle.id.charCodeAt(0)) * 0.8;
        }
        
        // Wobble effect for bubbles
        if (effects?.wobble && animationType === 'bubbles') {
          particle.x += Math.sin(particle.life * 0.08) * 0.3;
          particle.y += Math.cos(particle.life * 0.08) * 0.2;
        }

        // Special opacity handling for sparkles
        if (animationType === 'sparkles') {
          if (particle.life > 70) {
            particle.opacity = (100 - particle.life) / 30;
          } else if (particle.life < 30) {
            particle.opacity = particle.life / 30;
          }
          // Twinkle effect
          if (effects?.twinkle) {
            particle.opacity *= 0.5 + Math.sin(particle.life * 0.3) * 0.5;
          }
        } else if (animationType === 'stars' && effects?.twinkle) {
          // Twinkle effect for stars
          particle.opacity = (particle.life / 100) * (0.5 + Math.sin(particle.life * 0.3) * 0.5);
        } else {
          particle.opacity = particle.life / 100;
        }

        return particle;
      });

      // Render particles (skip rendering on mobile for some frames)
      if (rootRef.current && !skipFrame) {
        rootRef.current.render(
          <React.Fragment>
            {particlesRef.current
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

      if (activeParticles > 0 && isTabVisible.current) {
        animationFrameRef.current = requestAnimationFrame(updateParticles);
      } else {
        // Cleanup
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
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
        setIsAnimating(false);
      }
    };

    setIsAnimating(true);
    updateParticles();
  }, [elementId, animationType, config]);

  const reward = useCallback(() => {
    if (!isAnimating) {
      animate();
    }
  }, [animate, isAnimating]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
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

  return { reward, isAnimating };
};
