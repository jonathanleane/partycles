import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId, degreesToRadians } from '../utils';
import { createPooledParticles } from '../particlePool';

const artilleryColors = [
  '#ff6b6b',
  '#4ecdc4',
  '#45b7d1',
  '#f7dc6f',
  '#bb8fce',
  '#85c1f5',
];
const smokeColors = ['#cccccc', '#bbbbbb', '#aaaaaa', '#999999'];

export const createArtilleryParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 5, // Number of mortar shells
    spread = 30,
    startVelocity = 30, // Reduced default velocity
    colors = artilleryColors,
    elementSize = 12,
  } = config;

  const particles: Particle[] = [];

  // Create mortar shells (primary particles)
  const shells = createPooledParticles(particleCount, () => {
    const angle = randomInRange(-spread / 2, spread / 2);
    const velocity = randomInRange(startVelocity * 0.8, startVelocity);

    return {
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.sin(degreesToRadians(angle)) * velocity * 0.2, // Slight horizontal movement
      vy: -velocity, // Upward launch
      life: config.lifetime || 100,
      opacity: 1,
      size: randomInRange(elementSize * 0.8, elementSize),
      rotation: 0,
      color:
        colors[Math.floor(Math.random() * colors.length)] ||
        colors[0] ||
        '#ffffff',
      // Store explosion data in particle
      element: JSON.stringify({
        isShell: true,
        explodeAt: randomInRange(20, 40), // When to explode
        burstCount: randomInRange(20, 30), // How many particles in burst
      }),
    };
  });

  particles.push(...shells);

  // Create smoke trail particles for each shell
  shells.forEach((shell) => {
    const smokeCount = 5; // Reduced smoke particles
    const smoke = createPooledParticles(smokeCount, (j) => ({
      id: generateId(),
      x: shell.x + randomInRange(-5, 5),
      y: shell.y,
      vx: randomInRange(-1, 1),
      vy: randomInRange(0, 2), // Smoke drifts down/sideways
      life: config.lifetime || 30,
      opacity: 0.4,
      size: randomInRange(elementSize * 1.5, elementSize * 2),
      rotation: randomInRange(0, 360),
      color: smokeColors[Math.floor(Math.random() * smokeColors.length)],
      element: JSON.stringify({
        isSmoke: true,
        parentId: shell.id,
        delay: j * 2, // Stagger smoke particles
      }),
    }));
    particles.push(...smoke);
  });

  return particles;
};

interface ArtilleryElementData {
  isShell?: boolean;
  isSmoke?: boolean;
  explodeAt?: number;
  burstCount?: number;
  parentId?: string;
  delay?: number;
}

export const renderArtilleryParticle = (
  particle: Particle & { config?: AnimationConfig }
): React.ReactNode => {
  let elementData: ArtilleryElementData = {};
  try {
    if (particle.element && typeof particle.element === 'string') {
      elementData = JSON.parse(particle.element);
    }
  } catch (e) {
    // Fallback for regular particles
  }

  // Render smoke particles
  if (elementData.isSmoke) {
    const smokeOpacity = particle.opacity * (particle.life / 30);
    return (
      <div
        key={particle.id}
        style={{
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle, ${particle.color}88 0%, transparent 70%)`,
          borderRadius: '50%',
          opacity: smokeOpacity,
          filter: `blur(${2 + (1 - particle.life / 30) * 3}px)`,
          transform: `scale(${1 + (1 - particle.life / 30) * 0.5})`,
        }}
      />
    );
  }

  // Render shell particles
  if (elementData.isShell) {
    // Check if we should hide the shell (after explosion)
    const shouldHide = particle.life <= (elementData.explodeAt || 30);
    
    if (shouldHide) {
      return null; // Hide the shell after explosion
    }
    
    return (
      <div
        key={particle.id}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Main shell body */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${particle.color}, ${particle.color}dd)`,
            borderRadius: '40% 40% 50% 50%',
            boxShadow: `0 0 ${particle.size * 0.5}px ${particle.color}`,
            position: 'relative',
            transform: `rotate(${(Math.atan2(particle.vy, particle.vx) * 180) / Math.PI + 90}deg)`,
          }}
        >
          {/* Glowing tip */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '30%',
              height: '30%',
              background: '#ffaa00',
              borderRadius: '50%',
              boxShadow: '0 0 10px #ff6600',
              filter: 'blur(1px)',
            }}
          />
        </div>
      </div>
    );
  }

  // Render explosion particles (created dynamically in animationManager)
  return (
    <div
      key={particle.id}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: particle.color,
        borderRadius: '50%',
        boxShadow: `
          0 0 ${particle.size * 0.5}px ${particle.color},
          0 0 ${particle.size}px ${particle.color}88
        `,
        opacity: particle.opacity,
      }}
    />
  );
};