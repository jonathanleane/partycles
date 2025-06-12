import React from 'react';
import { AnimationConfig, Particle } from '../types';
import {
  randomInRange,
  degreesToRadians,
  generateId,
  getRandomColor,
} from '../utils';

const defaultColors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
];

export const createConfettiParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 50,
    startVelocity = 20,
    colors = defaultColors,
    elementSize = 20,
  } = config;

  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = randomInRange(0, 360);
    const velocity = randomInRange(startVelocity * 0.5, startVelocity);
    const color = getRandomColor(colors);

    particles.push({
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.cos(degreesToRadians(angle)) * velocity,
      vy: Math.sin(degreesToRadians(angle)) * velocity - 30,
      life: config.lifetime || 150,
      opacity: 1,
      size: randomInRange(elementSize * 0.7, elementSize * 1.5),
      rotation: randomInRange(0, 360),
      color,
    });
  }

  return particles;
};

export const renderConfettiParticle = (particle: Particle): React.ReactNode => {
  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size * 0.6}px`,
        backgroundColor: particle.color,
        borderRadius: '3px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      }}
    />
  );
};
