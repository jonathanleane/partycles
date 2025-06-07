import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId, getRandomColor, degreesToRadians } from '../utils';

const levelUpTexts = ['+1', '+10', '+100', 'XP', '+XP', 'LEVEL UP!', 'CRITICAL!', 'COMBO!', 'PERFECT!'];
const levelUpColors = [
  { text: '#FFD700', glow: '#FFA500' }, // Gold
  { text: '#00FF00', glow: '#00AA00' }, // Green
  { text: '#00FFFF', glow: '#0088FF' }, // Cyan
  { text: '#FF00FF', glow: '#AA00AA' }, // Magenta
  { text: '#FFFF00', glow: '#FFAA00' }, // Yellow
];

export const createLevelUpParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 10,
    startVelocity = 20,
    elementSize = 30
  } = config;

  const particles: Particle[] = [];
  
  for (let i = 0; i < particleCount; i++) {
    const angle = randomInRange(-45, 45);
    const velocity = randomInRange(startVelocity * 0.5, startVelocity * 1.5);
    const colorSetIndex = Math.floor(Math.random() * levelUpColors.length);
    const colorSet = levelUpColors[colorSetIndex];
    const textIndex = Math.floor(Math.random() * levelUpTexts.length);
    const text = levelUpTexts[textIndex];
    const isMainText = text === 'LEVEL UP!' || text === 'CRITICAL!';
    const fontSize = isMainText ? randomInRange(elementSize * 1.3, elementSize * 2) : randomInRange(elementSize * 0.7, elementSize * 1.2);
    
    particles.push({
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.sin(degreesToRadians(angle)) * velocity,
      vy: -Math.cos(degreesToRadians(angle)) * velocity - 10,
      life: config.lifetime || 150,
      opacity: 1,
      size: fontSize, // Store fontSize in size
      // Store textIndex (0-8) + colorSetIndex (0-4) * 10 + delay (0-50) * 100
      rotation: textIndex + (colorSetIndex * 10) + (Math.floor(i * 5) * 100),
      color: colorSet.text,
    });
  }
  
  return particles;
};

export const renderLevelUpParticle = (particle: Particle): React.ReactNode => {
  // Extract encoded values
  const textIndex = particle.rotation % 10;
  const colorSetIndex = Math.floor((particle.rotation % 100) / 10);
  const delay = Math.floor(particle.rotation / 100) / 100;
  
  const text = levelUpTexts[textIndex] || levelUpTexts[0];
  const colorSet = levelUpColors[colorSetIndex] || levelUpColors[0];
  
  return (
    <div
      key={particle.id}
      style={{
        fontSize: `${particle.size}px`,
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        color: particle.color,
        textShadow: `
          0 0 10px ${colorSet.glow},
          0 0 20px ${colorSet.glow},
          0 0 30px ${particle.color},
          0 2px 4px rgba(0,0,0,0.5)
        `,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        animationDelay: `${delay}s`,
      }}
    >
      {text}
    </div>
  );
};