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
    particleCount = 15,
    spread = 80,
    startVelocity = 20,
    colors = ribbonColors,
    elementSize = 100,
    lifetime = 200,
  } = config;

  return createPooledParticles(particleCount, () => {
    const angle = randomInRange(-spread / 2, spread / 2) - 90; // Upward bias
    const velocity = randomInRange(startVelocity * 0.5, startVelocity);
    const color = getRandomColor(colors);

    return {
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.cos(degreesToRadians(angle)) * velocity,
      vy: Math.sin(degreesToRadians(angle)) * velocity - 10,
      life: lifetime,
      opacity: 1,
      size: elementSize,
      rotation: randomInRange(-180, 180),
      color,
      element: JSON.stringify({
        curliness: randomInRange(2, 4), // How many curls
        curlTightness: randomInRange(0.3, 0.6), // How tight the curls are
        thickness: randomInRange(8, 12), // Ribbon thickness in pixels
        windEffect: randomInRange(0.02, 0.05), // Additional sway
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
    curliness = 3,
    curlTightness = 0.4,
    thickness = 10,
    windEffect = 0.03,
  } = ribbonData;

  const lifeRatio = particle.life / (particle.config?.lifetime || 200);
  
  // Create curly ribbon path
  const segments = 50; // More segments for smoother curves
  const path: string[] = [];
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    
    // Base spiral/curl motion
    const spiralAngle = t * Math.PI * 2 * curliness;
    const spiralRadius = t * particle.size * curlTightness;
    
    // Add some wobble that increases over time
    const wobble = Math.sin(particle.life * windEffect + t * 4) * (1 - lifeRatio) * 20;
    
    // Calculate position
    const x = Math.cos(spiralAngle) * spiralRadius + wobble;
    const y = t * particle.size;
    
    if (i === 0) {
      path.push(`M ${x} ${y}`);
    } else {
      // Use line segments for smoother rendering
      path.push(`L ${x} ${y}`);
    }
  }
  
  const pathString = path.join(' ');
  
  return (
    <div
      key={particle.id}
      style={{
        position: 'absolute',
        width: particle.size,
        height: particle.size,
        opacity: particle.opacity * lifeRatio,
        transform: `rotate(${particle.rotation}deg)`,
        transformOrigin: 'center top',
      }}
    >
      <svg
        width={particle.size}
        height={particle.size}
        style={{
          position: 'absolute',
          left: '50%',
          top: '0',
          transform: 'translateX(-50%)',
          overflow: 'visible',
        }}
        viewBox={`-${particle.size / 2} 0 ${particle.size} ${particle.size}`}
      >
        <defs>
          <linearGradient id={`ribbon-gradient-${particle.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={particle.color} stopOpacity="1" />
            <stop offset="30%" stopColor={particle.color} stopOpacity="0.9" />
            <stop offset="70%" stopColor={particle.color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={particle.color} stopOpacity="0.2" />
          </linearGradient>
          <filter id={`ribbon-shadow-${particle.id}`}>
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feFlood floodColor="#000000" floodOpacity="0.2"/>
            <feComposite in2="offsetblur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path
          d={pathString}
          stroke={`url(#ribbon-gradient-${particle.id})`}
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#ribbon-shadow-${particle.id})`}
        />
      </svg>
    </div>
  );
};