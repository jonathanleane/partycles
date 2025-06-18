import React from 'react';
import { AnimationConfig, Particle } from '../types';
import {
  randomInRange,
  degreesToRadians,
  generateId,
  getRandomColor,
} from '../utils';
import { createPooledParticles } from '../particlePool';

const ribbonColors = [
  '#FF1744', // Red
  '#F50057', // Pink
  '#D500F9', // Purple
  '#651FFF', // Deep Purple
  '#2979FF', // Blue
  '#00E5FF', // Cyan
  '#1DE9B6', // Teal
  '#00E676', // Green
  '#76FF03', // Light Green
  '#FFEA00', // Yellow
  '#FFC400', // Amber
  '#FF9100', // Orange
];

export const createRibbonsParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 25,
    spread = 120,
    startVelocity = 15,
    colors = ribbonColors,
    elementSize = 60,
    lifetime = 200,
  } = config;

  return createPooledParticles(particleCount, () => {
    const angle = randomInRange(-spread / 2, spread / 2) - 90; // Upward bias
    const velocity = randomInRange(startVelocity * 0.7, startVelocity);
    const color = getRandomColor(colors);

    return {
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.cos(degreesToRadians(angle)) * velocity,
      vy: Math.sin(degreesToRadians(angle)) * velocity - 10, // Slight upward boost
      life: lifetime,
      opacity: 1,
      size: elementSize,
      rotation: randomInRange(0, 360),
      color,
      element: JSON.stringify({
        waveSpeed: randomInRange(0.1, 0.2),
        waveAmplitude: randomInRange(20, 40),
        segments: 5,
        twistSpeed: randomInRange(0.05, 0.15),
      }),
    };
  });
};

export const renderRibbonsParticle = (particle: Particle): React.ReactNode => {
  let ribbonData: any = {};
  try {
    if (particle.element && typeof particle.element === 'string') {
      ribbonData = JSON.parse(particle.element);
    }
  } catch (e) {
    // Fallback
  }

  const {
    waveSpeed = 0.15,
    waveAmplitude = 30,
    segments = 5,
    twistSpeed = 0.1,
  } = ribbonData;

  const lifeRatio = particle.life / (particle.config?.lifetime || 200);

  // Create wave effect
  const wave = Math.sin(particle.life * waveSpeed) * waveAmplitude * lifeRatio;
  const twist = Math.sin(particle.life * twistSpeed) * 180;

  // Create gradient for ribbon
  const gradientColors = [
    particle.color,
    `${particle.color}CC`,
    `${particle.color}99`,
    `${particle.color}66`,
    `${particle.color}33`,
  ];

  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size * 0.15}px`,
        height: `${particle.size}px`,
        background: `linear-gradient(to bottom, ${gradientColors.join(', ')})`,
        borderRadius: '2px',
        boxShadow: `0 2px 8px ${particle.color}66`,
        opacity: particle.opacity * lifeRatio,
        transform: `translateX(${wave}px) rotateZ(${twist}deg) rotateY(${particle.rotation}deg)`,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center top',
      }}
    />
  );
};