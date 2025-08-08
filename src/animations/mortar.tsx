import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId, degreesToRadians } from '../utils';
import { createPooledParticles } from '../particlePool';

const mortarColors = [
  '#ff6b6b',
  '#4ecdc4',
  '#45b7d1',
  '#f7dc6f',
  '#bb8fce',
  '#85c1f5',
  '#ffd93d',
  '#6bcf7f',
];

export const createMortarParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 3, // Number of firework shells
    spread = 60, // Total spread angle
    startVelocity = 12, // Much lower velocity
    colors = mortarColors,
    elementSize = 8,
  } = config;

  const particles: Particle[] = [];

  // Create firework shells that fire at angles
  const shells = createPooledParticles(particleCount, (index) => {
    // Distribute shells across the spread angle - more horizontal
    const baseAngle = -90; // Start from straight up
    const angleStep = particleCount > 1 ? spread / (particleCount - 1) : 0;
    const angle = baseAngle - spread / 2 + angleStep * index;

    const velocity = randomInRange(startVelocity * 0.9, startVelocity * 1.1);
    const targetColor = colors[Math.floor(Math.random() * colors.length)];
    const rad = degreesToRadians(angle);

    // Calculate when to explode based on trajectory
    const totalLife = config.lifetime || 200;
    const timeToExplode = Math.min(randomInRange(20, 35), Math.max(15, totalLife * 0.45)); // Scale to lifetime

    return {
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.cos(rad) * velocity,
      vy: Math.sin(rad) * velocity,
      life: config.lifetime || 200,
      opacity: 1,
      size: elementSize,
      rotation: 0,
      color: targetColor,
      config: config, // Add config to particle
      // Store explosion data
      element: JSON.stringify({
        isShell: true,
        hasExploded: false,
        timeToExplode: timeToExplode, // Fixed explosion time
        burstCount: randomInRange(30, 45),
        burstColor: targetColor,
      }),
    };
  });

  particles.push(...shells);

  // Create launch sparks at the base
  for (let i = 0; i < 8; i++) {
    const sparkArray = createPooledParticles(1, () => ({
      id: generateId(),
      x: origin.x + randomInRange(-5, 5),
      y: origin.y,
      vx: randomInRange(-2, 2),
      vy: randomInRange(-10, -3),
      life: randomInRange(10, 20),
      opacity: 1,
      size: randomInRange(2, 3),
      rotation: 0,
      color: '#ffaa00',
      element: JSON.stringify({
        isLaunchSpark: true,
      }),
    }));
    particles.push(...sparkArray);
  }

  return particles;
};

interface MortarElementData {
  isShell?: boolean;
  hasExploded?: boolean;
  timeToExplode?: number;
  burstCount?: number;
  burstColor?: string;
  isTrail?: boolean;
  isBurst?: boolean;
  isLaunchSpark?: boolean;
  isGalaxy?: boolean;
  isCore?: boolean;
  twinkle?: boolean;
}

export const renderMortarParticle = (
  particle: Particle & { config?: AnimationConfig }
): React.ReactNode => {
  let elementData: MortarElementData = {};
  try {
    if (particle.element && typeof particle.element === 'string') {
      elementData = JSON.parse(particle.element);
    }
  } catch (e) {
    // Fallback
  }

  // Render launch sparks
  if (elementData.isLaunchSpark) {
    return (
      <div
        key={particle.id}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: particle.color,
          borderRadius: '50%',
          opacity: particle.opacity,
          boxShadow: `0 0 3px ${particle.color}`,
        }}
      />
    );
  }

  // Render trail particles
  if (elementData.isTrail) {
    const trailOpacity = particle.opacity * (particle.life / 30) * 0.4;
    return (
      <div
        key={particle.id}
        style={{
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle, ${particle.color}88 0%, transparent 60%)`,
          borderRadius: '50%',
          opacity: trailOpacity,
          filter: 'blur(1px)',
        }}
      />
    );
  }

  // Render burst particles
  if (elementData.isBurst) {
    const burstOpacity = particle.opacity * Math.pow(particle.life / 120, 0.5);

    // Galaxy-style burst particles
    if (elementData.isGalaxy) {
      const twinkleOpacity = elementData.twinkle
        ? 0.3 + Math.sin(particle.life * 0.3) * 0.7
        : 1;

      return (
        <div
          key={particle.id}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: particle.color,
            borderRadius: '50%',
            opacity: burstOpacity * twinkleOpacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transform: `rotate(${particle.rotation}deg)`,
          }}
        />
      );
    }

    // Core particles
    if (elementData.isCore) {
      return (
        <div
          key={particle.id}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: '50%',
            opacity: burstOpacity,
            boxShadow: `0 0 ${particle.size * 3}px #FFFFFF`,
          }}
        />
      );
    }

    // Default burst (shouldn't reach here with new code)
    return (
      <div
        key={particle.id}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: particle.color,
          borderRadius: '50%',
          opacity: burstOpacity,
          boxShadow: `
            0 0 ${particle.size}px ${particle.color},
            0 0 ${particle.size * 2}px ${particle.color}88
          `,
          filter: particle.life > 80 ? 'blur(0px)' : 'blur(1px)',
        }}
      />
    );
  }

  // Render shell
  if (elementData.isShell) {
    // Hide shell after explosion
    if (elementData.hasExploded) {
      return null;
    }

    // Calculate rotation based on movement direction
    const rotation = (Math.atan2(particle.vy, particle.vx) * 180) / Math.PI;

    return (
      <div
        key={particle.id}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {/* Glowing shell */}
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            boxShadow: `
              0 0 ${particle.size * 0.5}px #ffffff,
              0 0 ${particle.size}px ${particle.color},
              0 0 ${particle.size * 2}px ${particle.color}88
            `,
          }}
        />
      </div>
    );
  }

  // Default particle
  return (
    <div
      key={particle.id}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: particle.color,
        borderRadius: '50%',
        opacity: particle.opacity,
      }}
    />
  );
};
