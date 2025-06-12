import { useCallback, useRef, useState, useEffect } from 'react';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { AnimationType, AnimationConfig, Particle } from './types';
import { animations } from './animations';
import { createParticleStyle, randomInRange } from './utils';
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
    
    // Store origin for use in update loop
    const originRef = { x: origin.x, y: origin.y };

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
    let particles = animationHandler
      .createParticles(origin, optimizedConfig || {})
      .map((particle) => ({
        ...particle,
        config: optimizedConfig || config, // Store config in particle for render functions
      }));

    // Apply radial movement if enabled
    const radialConfig = optimizedConfig?.radial || config?.radial;
    if (radialConfig?.enabled) {
      particles = particles.map((particle, index) => {
        const angleVariation = radialConfig.angleVariation ?? 0.2;
        const velocityVariation = radialConfig.velocityVariation ?? 0.3;
        
        // Calculate base angle for even distribution
        let angle: number;
        if (radialConfig.pattern === 'cone') {
          // Cone pattern - particles spread within a cone angle
          const coneAngle = 90; // degrees
          angle = (index / particles.length) * coneAngle - coneAngle / 2 - 90;
          angle += randomInRange(-angleVariation * 45, angleVariation * 45);
        } else if (radialConfig.pattern === 'random') {
          // Random pattern - fully random angles
          angle = randomInRange(0, 360);
        } else if (radialConfig.pattern === 'spiral') {
          // Spiral pattern - particles follow a spiral path
          const spiralTurns = radialConfig.spiralTurns ?? 2;
          const progress = index / particles.length;
          angle = progress * 360 * spiralTurns;
          angle += randomInRange(-angleVariation * 15, angleVariation * 15);
          
          // Store spiral info in particle for update function
          (particle as any).spiralProgress = progress;
          (particle as any).spiralTurns = spiralTurns;
        } else if (radialConfig.pattern === 'vortex') {
          // Vortex pattern - particles burst out then spiral inward
          angle = (index / particles.length) * 360;
          angle += randomInRange(-angleVariation * 30, angleVariation * 30);
          
          // Store initial angle for vortex motion
          (particle as any).vortexAngle = angle;
          (particle as any).vortexPull = radialConfig.vortexPull ?? 0.02;
        } else if (radialConfig.pattern === 'pinwheel') {
          // Pinwheel pattern - particles emit from rotating arms
          const arms = radialConfig.pinwheelArms ?? 4;
          const particlesPerArm = Math.floor(particles.length / arms);
          const armIndex = Math.floor(index / particlesPerArm) % arms;
          
          // Base angle for this arm
          const baseAngle = (armIndex / arms) * 360;
          
          // Add spiral offset based on particle's position in the sequence
          const spiralOffset = (index / particles.length) * 360 * 3; // 3 full rotations of spread
          
          angle = baseAngle + spiralOffset;
          angle += randomInRange(-angleVariation * 5, angleVariation * 5);
          
          // Store info for continuous rotation
          (particle as any).pinwheelStartAngle = angle;
        } else {
          // Circular pattern (default) - evenly distributed around circle
          angle = (index / particles.length) * 360;
          angle += randomInRange(-angleVariation * 30, angleVariation * 30);
        }
        
        // Convert to radians
        const angleRad = (angle * Math.PI) / 180;
        
        // Calculate velocity with variation
        const baseVelocity = optimizedConfig?.startVelocity || config?.startVelocity || 20;
        const velocity = baseVelocity * randomInRange(1 - velocityVariation, 1 + velocityVariation);
        
        // Set radial velocity
        particle.vx = Math.cos(angleRad) * velocity;
        particle.vy = Math.sin(angleRad) * velocity;
        
        return particle;
      });
    }

    particlesRef.current = particles;

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
        
        // Only apply special physics every few frames for performance
        const shouldApplySpecialPhysics = frameCount % 2 === 0;
        
        if (shouldApplySpecialPhysics && radialConfig?.enabled) {
          // Special handling for spiral pattern
          if (radialConfig.pattern === 'spiral' && (particle as any).spiralProgress !== undefined) {
            const lifeProgress = 1 - (particle.life / (config?.lifetime || 100));
            const spiralAngle = ((particle as any).spiralProgress + lifeProgress) * 360 * ((particle as any).spiralTurns || 2);
            const angleRad = (spiralAngle * Math.PI) / 180;
            const currentVelocity = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            
            particle.vx = Math.cos(angleRad) * currentVelocity * 0.98;
            particle.vy = Math.sin(angleRad) * currentVelocity * 0.98;
          }
          
          // Special handling for vortex pattern
          else if (radialConfig.pattern === 'vortex' && (particle as any).vortexAngle !== undefined) {
            const dx = particle.x - originRef.x;
            const dy = particle.y - originRef.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            (particle as any).vortexAngle += 2 + (200 / (distance + 50));
            
            const angleRad = ((particle as any).vortexAngle * Math.PI) / 180;
            const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            const pullStrength = (particle as any).vortexPull * 2;
            
            particle.vx = -Math.sin(angleRad) * currentSpeed * 0.7 - (dx / (distance + 1)) * pullStrength;
            particle.vy = Math.cos(angleRad) * currentSpeed * 0.7 - (dy / (distance + 1)) * pullStrength;
          }
          
          // Special handling for pinwheel pattern
          else if (radialConfig.pattern === 'pinwheel' && (particle as any).pinwheelStartAngle !== undefined) {
            const rotSpeed = radialConfig.rotationSpeed || 0.2;
            const currentAngle = Math.atan2(particle.vy, particle.vx);
            const perpAngle = currentAngle + Math.PI / 2;
            
            particle.vx += Math.cos(perpAngle) * rotSpeed * 2;
            particle.vy += Math.sin(perpAngle) * rotSpeed * 2;
          }
        }
        
        // Apply physics (reduce gravity for pinwheel to maintain pattern)
        const adjustedGravity = radialConfig?.enabled && radialConfig?.pattern === 'pinwheel' 
          ? gravity * 0.3 
          : gravity;
        
        particle.vy += adjustedGravity;
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
        if (
          effects?.windDrift &&
          (animationType === 'snow' || animationType === 'leaves')
        ) {
          particle.x +=
            Math.sin(particle.life * 0.05 + particle.id.charCodeAt(0)) * 0.8;
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
          particle.opacity =
            (particle.life / 100) * (0.5 + Math.sin(particle.life * 0.3) * 0.5);
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
