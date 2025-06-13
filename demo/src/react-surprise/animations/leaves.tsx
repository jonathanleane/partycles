import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId, getRandomColor } from '../utils';
import { createPooledParticles } from '../particlePool';

const defaultColors = [
  '#D2691E',
  '#CD853F',
  '#8B4513',
  '#A0522D',
  '#FF8C00',
  '#FF6347',
];

export const createLeafParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 10,
    colors = defaultColors,
    elementSize = 25,
  } = config;

  return createPooledParticles(particleCount, () => {
    return {
      id: generateId(),
      x: origin.x + randomInRange(-100, 100),
      y: origin.y + randomInRange(-50, 0),
      vx: randomInRange(-1, 1),
      vy: randomInRange(0.5, 2),
      life: config.lifetime || 300,
      opacity: 1,
      size: randomInRange(elementSize * 0.6, elementSize),
      // Encode tumble phase (0-360), sway phase (0-360), and sway amount (20-40) + rotation speed (-3 to 3)
      rotation:
        Math.floor(randomInRange(0, 360)) +
        Math.floor(randomInRange(0, 360)) * 1000 +
        Math.floor(randomInRange(20, 40)) * 1000000 +
        (Math.floor(randomInRange(-3, 3)) + 3) * 100000000,
      color: getRandomColor(colors),
    }
  });
};

export const renderLeafParticle = (particle: Particle): React.ReactNode => {
  // Extract encoded values
  const tumblePhase = particle.rotation % 1000;
  const swayPhase = Math.floor((particle.rotation % 1000000) / 1000);
  const swayAmount = Math.floor((particle.rotation % 100000000) / 1000000);
  const rotationSpeed = Math.floor(particle.rotation / 100000000) - 3;

  // Calculate tumbling and swaying
  const tumble =
    Math.sin(((Date.now() * 0.002 + tumblePhase) * Math.PI) / 180) * 30;
  const swayX =
    Math.sin(((Date.now() * 0.001 + swayPhase) * Math.PI) / 180) * swayAmount;
  const rotation = (Date.now() * rotationSpeed * 0.01 + tumble) % 360;

  return (
    <div
      key={particle.id}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transform: `translateX(${swayX}px) rotate(${rotation}deg)`,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`-${particle.size / 2} -${particle.size / 2} ${particle.size} ${particle.size}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {/* Leaf shape */}
        <path
          d={`
            M 0,-${particle.size / 2}
            C -${particle.size / 3},-${particle.size / 3} -${particle.size / 3},${particle.size / 3} 0,${particle.size / 2}
            C ${particle.size / 3},${particle.size / 3} ${particle.size / 3},-${particle.size / 3} 0,-${particle.size / 2}
          `}
          fill={particle.color}
          opacity="0.9"
        />

        {/* Leaf vein */}
        <line
          x1="0"
          y1={-particle.size / 2}
          x2="0"
          y2={particle.size / 2}
          stroke="#8B4513"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Side veins */}
        <line
          x1="0"
          y1={-particle.size / 4}
          x2={-particle.size / 4}
          y2={-particle.size / 8}
          stroke="#8B4513"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <line
          x1="0"
          y1={-particle.size / 4}
          x2={particle.size / 4}
          y2={-particle.size / 8}
          stroke="#8B4513"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <line
          x1="0"
          y1={particle.size / 4}
          x2={-particle.size / 4}
          y2={particle.size / 8}
          stroke="#8B4513"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <line
          x1="0"
          y1={particle.size / 4}
          x2={particle.size / 4}
          y2={particle.size / 8}
          stroke="#8B4513"
          strokeWidth="0.5"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};
