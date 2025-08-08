import React from 'react';
import { AnimationConfig, Particle } from '../types';
import {
  randomInRange,
  degreesToRadians,
  generateId,
  getRandomColor,
} from '../utils';
import { createPooledParticles } from '../particlePool';

const geometricColors = [
  '#00D9FF', // Cyan
  '#FF006E', // Pink
  '#FFB700', // Gold
  '#8338EC', // Purple
  '#3A86FF', // Blue
  '#06FFA5', // Mint
  '#FF4365', // Coral
  '#FFEE32', // Yellow
  '#9B5DE5', // Violet
  '#00F5FF', // Aqua
  '#F15BB5', // Magenta
  '#00BBF9', // Sky Blue
];

type ShapeType = 'triangle' | 'square' | 'diamond' | 'hexagon' | 'star';

export const createGeometricParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 30,
    startVelocity = 25,
    colors = geometricColors,
    elementSize = 25,
    lifetime = 120,
  } = config;

  const shapes: ShapeType[] = ['triangle', 'square', 'diamond', 'hexagon', 'star'];

  return createPooledParticles(particleCount, () => {
    const angle = randomInRange(0, 360);
    const velocity = randomInRange(startVelocity * 0.5, startVelocity);
    const color = getRandomColor(colors);
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    return {
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.cos(degreesToRadians(angle)) * velocity,
      vy: Math.sin(degreesToRadians(angle)) * velocity - 15, // Slight upward bias
      life: lifetime,
      opacity: 1,
      size: randomInRange(elementSize * 0.6, elementSize * 1.2),
      rotation: randomInRange(0, 360),
      color,
      element: JSON.stringify({
        shape,
        spinSpeed: randomInRange(-5, 5),
        pulseSpeed: randomInRange(0.05, 0.1),
      }),
    };
  });
};

const createShapePath = (shape: ShapeType): string => {
  switch (shape) {
    case 'triangle':
      return 'polygon(50% 0%, 0% 100%, 100% 100%)';
    case 'square':
      return 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
    case 'diamond':
      return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
    case 'hexagon':
      return 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)';
    case 'star':
      return 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
    default:
      return 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
  }
};

export const renderGeometricParticle = (particle: Particle): React.ReactNode => {
  let shapeData: any = {};
  try {
    if (particle.element && typeof particle.element === 'string') {
      shapeData = JSON.parse(particle.element);
    }
  } catch (e) {
    // Fallback
  }

  const {
    shape = 'square',
    spinSpeed = 3,
    pulseSpeed = 0.08,
  } = shapeData;

  const lifeRatio = particle.life / (particle.config?.lifetime || 120);
  const rotation = particle.rotation + (particle.life * spinSpeed);
  
  // Pulse effect
  const pulse = 1 + Math.sin(particle.life * pulseSpeed) * 0.1;

  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size * pulse}px`,
        height: `${particle.size * pulse}px`,
        background: `linear-gradient(135deg, ${particle.color} 0%, ${particle.color}CC 50%, ${particle.color}99 100%)`,
        clipPath: createShapePath(shape),
        opacity: particle.opacity * lifeRatio,
        transform: `rotate(${rotation}deg)`,
        boxShadow: `0 0 ${10 * lifeRatio}px ${particle.color}66`,
        filter: `brightness(${1 + lifeRatio * 0.5})`,
      }}
    />
  );
};