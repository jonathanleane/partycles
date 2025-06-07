import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';

const paintColors = ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF', '#06FFB4'];

export const createPaintParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 25,
    spread = 120,
    startVelocity = 35,
    colors = paintColors,
    elementSize = 30
  } = config;

  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = randomInRange(-spread / 2, spread / 2) * (Math.PI / 180);
    const velocity = randomInRange(startVelocity * 0.5, startVelocity);
    const isMainSplat = i < 5; // First few particles are bigger splats
    
    particles.push({
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.sin(angle) * velocity * (isMainSplat ? 0.3 : 1),
      vy: -Math.cos(angle) * velocity * 0.7 + (isMainSplat ? 5 : 0),
      life: config.lifetime || 150,
      opacity: 1,
      size: isMainSplat 
        ? randomInRange(elementSize * 1.5, elementSize * 2.5)
        : randomInRange(elementSize * 0.3, elementSize),
      rotation: randomInRange(0, 360),
      color: colors[Math.floor(Math.random() * colors.length)] || colors[0] || '#ffffff',
    });
  }

  return particles;
};

export const renderPaintParticle = (particle: Particle): React.ReactNode => {
  // Paint splatter gets more stretched as it flies
  const stretch = 1 + (Math.abs(particle.vx) + Math.abs(particle.vy)) * 0.01;
  const squish = 1 / stretch;
  
  // Drip effect for some particles
  const isDripping = particle.size > 15 && particle.rotation > 180;
  const dripLength = isDripping ? particle.size * 0.5 : 0;
  
  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        position: 'relative',
        transform: `
          scaleX(${stretch}) 
          scaleY(${squish}) 
          rotate(${Math.atan2(particle.vy, particle.vx) * 180 / Math.PI}deg)
        `,
      }}
    >
      {/* Main paint splat */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: particle.color,
          borderRadius: '50%',
          position: 'relative',
          boxShadow: `inset -2px -2px 4px rgba(0,0,0,0.2)`,
        }}
      >
        {/* Splatter details */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: '30%',
            height: '30%',
            background: particle.color,
            borderRadius: '50%',
            opacity: 0.8,
            transform: `translate(${randomInRange(-5, 5)}px, ${randomInRange(-5, 5)}px)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '15%',
            width: '25%',
            height: '25%',
            background: particle.color,
            borderRadius: '50%',
            opacity: 0.7,
          }}
        />
      </div>
      
      {/* Paint drip */}
      {isDripping && (
        <div
          style={{
            position: 'absolute',
            bottom: `-${dripLength}px`,
            left: '40%',
            width: '20%',
            height: `${dripLength}px`,
            background: particle.color,
            borderRadius: '0 0 50% 50%',
            opacity: 0.9,
          }}
        />
      )}
    </div>
  );
};