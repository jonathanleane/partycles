import { useCallback, useRef, useState, useEffect } from 'react';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { AnimationType, AnimationConfig, Particle } from './types';
import { animations } from './animations';
import { createParticleStyle } from './utils';

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

    // Create particles
    particlesRef.current = animationHandler.createParticles(origin, config || {});

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
    const defaultGravity = animationType === 'bubbles' ? -0.1 : animationType === 'snow' ? 0.05 : 0.35;
    const gravity = config?.physics?.gravity ?? defaultGravity;
    const friction = config?.physics?.friction ?? 0.98;
    const wind = config?.physics?.wind ?? 0;

    const updateParticles = () => {
      let activeParticles = 0;

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

        // Special opacity handling for sparkles
        if (animationType === 'sparkles') {
          if (particle.life > 70) {
            particle.opacity = (100 - particle.life) / 30;
          } else if (particle.life < 30) {
            particle.opacity = particle.life / 30;
          }
        } else {
          particle.opacity = particle.life / 100;
        }

        return particle;
      });

      // Render particles
      if (rootRef.current) {
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

      if (activeParticles > 0) {
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
        if (containerRef.current && document.body.contains(containerRef.current)) {
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
      if (containerRef.current && document.body.contains(containerRef.current)) {
        document.body.removeChild(containerRef.current);
        containerRef.current = null;
      }
    };
  }, []);

  return { reward, isAnimating };
};