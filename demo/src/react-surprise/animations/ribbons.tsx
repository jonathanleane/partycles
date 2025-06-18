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
    particleCount = 20,
    spread = 100,
    startVelocity = 18,
    colors = ribbonColors,
    elementSize = 80,
    lifetime = 250,
  } = config;

  return createPooledParticles(particleCount, () => {
    const angle = randomInRange(-spread / 2, spread / 2) - 90; // Upward bias
    const velocity = randomInRange(startVelocity * 0.6, startVelocity);
    const color = getRandomColor(colors);

    return {
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.cos(degreesToRadians(angle)) * velocity,
      vy: Math.sin(degreesToRadians(angle)) * velocity - 8, // Slight upward boost
      life: lifetime,
      opacity: 1,
      size: elementSize,
      rotation: randomInRange(-45, 45),
      color,
      element: JSON.stringify({
        segments: 8,
        waveSpeed: randomInRange(0.08, 0.15),
        phaseOffset: randomInRange(0, Math.PI * 2),
        thickness: randomInRange(0.08, 0.12),
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
    segments = 8,
    waveSpeed = 0.1,
    phaseOffset = 0,
    thickness = 0.1,
  } = ribbonData;

  const lifeRatio = particle.life / (particle.config?.lifetime || 250);
  const segmentHeight = particle.size / segments;

  // Create flowing path for ribbon
  const path = [];
  for (let i = 0; i <= segments; i++) {
    const segmentProgress = i / segments;
    // Wave gets stronger towards the bottom of the ribbon
    const waveAmplitude = segmentProgress * 30 * lifeRatio;
    const wavePhase = particle.life * waveSpeed + phaseOffset + segmentProgress * 2;
    const xOffset = Math.sin(wavePhase) * waveAmplitude;
    
    const x = xOffset;
    const y = i * segmentHeight;
    
    if (i === 0) {
      path.push(`M ${x} ${y}`);
    } else {
      // Use quadratic bezier curves for smooth flow
      const prevX = path[i - 1] ? parseFloat(path[i - 1].split(' ')[1]) : 0;
      const cpX = (prevX + x) / 2;
      const cpY = y - segmentHeight / 2;
      path.push(`Q ${cpX} ${cpY} ${x} ${y}`);
    }
  }

  // Create the ribbon shape with thickness
  const pathString = path.join(' ');
  
  return (
    <div
      key={particle.id}
      style={{
        position: 'absolute',
        width: particle.size * thickness * 2,
        height: particle.size,
        opacity: particle.opacity * lifeRatio,
        transform: `rotate(${particle.rotation}deg)`,
        transformOrigin: 'center top',
        filter: `drop-shadow(0 2px 4px ${particle.color}44)`,
      }}
    >
      <svg
        width={particle.size * thickness * 2}
        height={particle.size}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          overflow: 'visible',
        }}
      >
        <defs>
          <linearGradient id={`ribbon-gradient-${particle.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={particle.color} stopOpacity="1" />
            <stop offset="50%" stopColor={particle.color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={particle.color} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d={pathString}
          stroke={`url(#ribbon-gradient-${particle.id})`}
          strokeWidth={particle.size * thickness}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};