import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';
import { createPooledParticles } from '../particlePool';

const rainColors = ['#9ecaf9', '#b5d6ff', '#a8cfff', '#c7e1ff'];

export const createRainParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 80,
    startVelocity = 10,
    colors = rainColors,
    elementSize = 2,
    spread = 40,
  } = config;

  return createPooledParticles(particleCount, () => {
    // Slight angular spread downward
    const angle = randomInRange(90 - spread / 2, 90 + spread / 2);
    const speed = randomInRange(startVelocity * 0.8, startVelocity * 1.4);
    const vx =
      Math.cos((angle * Math.PI) / 180) * speed + randomInRange(-0.5, 0.5);
    const vy = Math.sin((angle * Math.PI) / 180) * speed;

    return {
      id: generateId(),
      x: origin.x + randomInRange(-30, 30),
      y: origin.y + randomInRange(-30, 0),
      vx,
      vy,
      life: config.lifetime || 90,
      opacity: 1,
      size: elementSize, // thickness; length handled in renderer
      rotation: (Math.atan2(vy, vx) * 180) / Math.PI,
      color: colors[Math.floor(Math.random() * colors.length)],
      config,
    };
  });
};

export const renderRainParticle = (particle: Particle): React.ReactNode => {
  // Compute streak length based on speed
  const speed = Math.sqrt(
    particle.vx * particle.vx + particle.vy * particle.vy
  );
  const length = Math.min(16 + speed * 1.2, 36);
  const thickness = Math.max(1, Math.round(particle.size));

  return (
    <div
      key={particle.id}
      style={{
        width: `${thickness}px`,
        height: `${length}px`,
        opacity: Math.min(0.85, 0.45 + speed * 0.02),
        background: `linear-gradient(to bottom, ${particle.color}, transparent)`,
        borderRadius: `${Math.max(0, thickness - 1)}px`,
        filter: 'blur(0.2px)',
      }}
    />
  );
};
