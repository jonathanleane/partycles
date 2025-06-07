import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId, getRandomColor, degreesToRadians } from '../utils';

const defaultColors = ['#F0E68C', '#FFD700', '#FFF8DC', '#FFFACD', '#F5DEB3'];

export const createChampagneParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 40,
    startVelocity = 30,
    colors = defaultColors,
    elementSize = 12
  } = config;

  const particles: Particle[] = [];
  
  for (let i = 0; i < particleCount; i++) {
    const isBubble = i < particleCount * 0.7;
    const angle = isBubble 
      ? randomInRange(60, 120) // Mostly upward for bubbles
      : randomInRange(0, 360); // Any direction for cork
    const velocity = randomInRange(startVelocity * 0.5, startVelocity);
    
    particles.push({
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.cos(degreesToRadians(angle)) * velocity,
      vy: Math.sin(degreesToRadians(angle)) * velocity * (isBubble ? -1 : 1),
      life: config.lifetime || 200,
      opacity: isBubble ? 0.6 : 1,
      size: isBubble ? randomInRange(4, 8) : elementSize,
      // Encode: isBubble (0 or 1) + wobble phase * 10
      rotation: (isBubble ? 0 : 1) + Math.floor(randomInRange(0, 360)) * 10,
      color: getRandomColor(colors),
    });
  }
  
  return particles;
};

export const renderChampagneParticle = (particle: Particle): React.ReactNode => {
  const isBubble = (particle.rotation % 10) === 0;
  const wobblePhase = Math.floor(particle.rotation / 10);
  
  if (isBubble) {
    // Render bubble
    const wobble = Math.sin((Date.now() * 0.003 + wobblePhase) * Math.PI / 180) * 10;
    
    return (
      <div
        key={particle.id}
        style={{
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          borderRadius: '50%',
          backgroundColor: particle.color,
          opacity: particle.opacity,
          border: `1px solid ${particle.color}`,
          transform: `translateX(${wobble}px)`,
          boxShadow: `inset -2px -2px 4px rgba(0,0,0,0.1), inset 2px 2px 4px rgba(255,255,255,0.5)`,
        }}
      />
    );
  }
  
  // Render cork (champagne bottle)
  const rotation = (Date.now() * 0.2 + wobblePhase) % 360;
  
  return (
    <div
      key={particle.id}
      style={{
        fontSize: `${particle.size}px`,
        transform: `rotate(${rotation}deg)`,
        opacity: particle.opacity,
        userSelect: 'none',
      }}
    >
      🍾
    </div>
  );
};