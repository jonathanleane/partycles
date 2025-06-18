import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';
import { createPooledParticles } from '../particlePool';

// Fire color gradient from hot to cool
const fireColors = [
  '#FFFFFF', // White hot core
  '#FFFAF0', // Floral white
  '#FFF8DC', // Cornsilk
  '#FFEB3B', // Bright yellow
  '#FFC107', // Amber
  '#FF9800', // Orange
  '#FF5722', // Deep orange
  '#D84315', // Burnt orange
];

// Smoke colors
const smokeColors = [
  'rgba(60, 60, 60, 0.4)',
  'rgba(80, 80, 80, 0.3)',
  'rgba(100, 100, 100, 0.2)',
  'rgba(120, 120, 120, 0.1)',
];

export const createFireParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 60,
    spread = 30,
    startVelocity = 3,
    colors = fireColors,
    elementSize = 15,
    lifetime = 100,
  } = config;

  // Mix of flame particles and smoke particles
  const flameCount = Math.floor(particleCount * 0.7);
  const smokeCount = Math.floor(particleCount * 0.2);
  const sparkCount = particleCount - flameCount - smokeCount;

  const particles: Particle[] = [];

  // Create flame particles
  for (let i = 0; i < flameCount; i++) {
    const life = randomInRange(lifetime * 0.5, lifetime);
    const xOffset = randomInRange(-spread * 0.3, spread * 0.3);
    
    particles.push({
      id: generateId(),
      x: origin.x + xOffset,
      y: origin.y,
      vx: randomInRange(-0.5, 0.5) + (xOffset * 0.02), // Slight outward velocity
      vy: -randomInRange(startVelocity * 0.8, startVelocity * 1.5), // Upward velocity
      life: life,
      opacity: 1,
      size: randomInRange(elementSize * 0.5, elementSize * 1.2),
      rotation: randomInRange(0, 360),
      color: colors[Math.floor(randomInRange(0, colors.length * 0.6))], // Favor hotter colors
      element: JSON.stringify({
        type: 'flame',
        turbulence: randomInRange(0.5, 1.5),
        flickerSpeed: randomInRange(0.1, 0.3),
        initialLife: life,
      }),
    });
  }

  // Create smoke particles (rise from the top of flames)
  for (let i = 0; i < smokeCount; i++) {
    const xOffset = randomInRange(-spread * 0.5, spread * 0.5);
    
    particles.push({
      id: generateId(),
      x: origin.x + xOffset,
      y: origin.y - randomInRange(10, 20), // Start above the fire origin
      vx: randomInRange(-0.3, 0.3),
      vy: -randomInRange(startVelocity * 0.3, startVelocity * 0.5), // Slower rise
      life: lifetime * 1.5, // Smoke lasts longer
      opacity: 0.5,
      size: randomInRange(elementSize * 1.5, elementSize * 2.5),
      rotation: randomInRange(0, 360),
      color: smokeColors[Math.floor(Math.random() * smokeColors.length)],
      element: JSON.stringify({
        type: 'smoke',
        expansionRate: randomInRange(0.01, 0.03),
      }),
    });
  }

  // Create spark particles
  for (let i = 0; i < sparkCount; i++) {
    const angle = randomInRange(-Math.PI / 4, Math.PI / 4) - Math.PI / 2; // Upward cone
    const velocity = randomInRange(startVelocity * 1.5, startVelocity * 2.5);
    
    particles.push({
      id: generateId(),
      x: origin.x + randomInRange(-spread * 0.2, spread * 0.2),
      y: origin.y,
      vx: Math.cos(angle) * velocity * 0.5,
      vy: Math.sin(angle) * velocity,
      life: randomInRange(lifetime * 0.3, lifetime * 0.6),
      opacity: 1,
      size: randomInRange(elementSize * 0.1, elementSize * 0.3),
      rotation: 0,
      color: randomInRange(0, 1) > 0.7 ? '#FFFFFF' : '#FFEB3B', // Hot sparks
      element: JSON.stringify({
        type: 'spark',
        gravity: randomInRange(0.05, 0.1),
      }),
    });
  }

  return particles;
};

export const renderFireParticle = (particle: Particle): React.ReactNode => {
  let elementData: any = {};
  try {
    if (particle.element && typeof particle.element === 'string') {
      elementData = JSON.parse(particle.element);
    }
  } catch (e) {
    // Fallback
  }

  const { type = 'flame', turbulence = 1, flickerSpeed = 0.2, expansionRate = 0.02, gravity = 0.05, initialLife = 100 } = elementData;

  if (type === 'flame') {
    // Calculate flicker effect
    const flicker = Math.sin(particle.life * flickerSpeed) * 0.2 + 0.8;
    
    // Color transition based on life (hot to cool)
    const lifeRatio = particle.life / initialLife;
    let colorIndex = Math.floor((1 - lifeRatio) * fireColors.length);
    colorIndex = Math.min(colorIndex, fireColors.length - 1);
    const color = fireColors[colorIndex];
    
    // Size decreases as it rises
    const sizeMultiplier = 0.5 + lifeRatio * 0.5;
    
    return (
      <div
        key={particle.id}
        style={{
          width: `${particle.size * sizeMultiplier}px`,
          height: `${particle.size * sizeMultiplier * 1.5}px`, // Tall flames
          background: `radial-gradient(ellipse at center bottom, ${color} 0%, transparent 70%)`,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          opacity: particle.opacity * flicker * lifeRatio,
          filter: `blur(${1 - lifeRatio}px)`,
          transform: `scale(${flicker})`,
        }}
      />
    );
  } else if (type === 'smoke') {
    // Smoke expands as it rises
    const expansion = 1 + (1 - particle.life / (particle.config?.lifetime || 150)) * expansionRate * 100;
    
    return (
      <div
        key={particle.id}
        style={{
          width: `${particle.size * expansion}px`,
          height: `${particle.size * expansion}px`,
          background: `radial-gradient(circle, ${particle.color} 0%, transparent 60%)`,
          borderRadius: '50%',
          opacity: particle.opacity * (particle.life / (particle.config?.lifetime || 150)) * 0.5,
          filter: 'blur(3px)',
        }}
      />
    );
  } else if (type === 'spark') {
    // Sparks are small bright points
    const sparkOpacity = particle.life / (particle.config?.lifetime || 60);
    
    return (
      <div
        key={particle.id}
        style={{
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          background: particle.color,
          borderRadius: '50%',
          opacity: sparkOpacity,
          boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
        }}
      />
    );
  }

  // Fallback
  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        background: particle.color,
        borderRadius: '50%',
        opacity: particle.opacity,
      }}
    />
  );
};