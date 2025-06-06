import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';

const musicColors = ['#FF006E', '#8338EC', '#3A86FF', '#FB5607', '#FFBE0B'];

export const createMusicParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 20,
    spread = 100,
    startVelocity = 8,
    colors = musicColors,
    elementSize = 25
  } = config;

  const particles: Particle[] = [];
  const notes = ['♪', '♫', '♬', '♩', '♭', '♯'];

  for (let i = 0; i < particleCount; i++) {
    const angle = randomInRange(-spread / 2, spread / 2) * (Math.PI / 180);
    const velocity = randomInRange(startVelocity * 0.5, startVelocity);
    
    particles.push({
      id: generateId(),
      x: origin.x + randomInRange(-20, 20),
      y: origin.y,
      vx: Math.sin(angle) * velocity * 0.3,
      vy: -Math.abs(Math.cos(angle)) * velocity * 0.5, // Always go up slowly
      life: config.lifetime || 200,
      opacity: 1,
      size: randomInRange(elementSize * 0.8, elementSize * 1.2),
      rotation: i % notes.length, // Store which note to use
      color: colors[Math.floor(Math.random() * colors.length)] || colors[0],
    });
  }

  return particles;
};

export const renderMusicParticle = (particle: Particle): React.ReactNode => {
  const notes = ['♪', '♫', '♬', '♩', '♭', '♯'];
  const note = notes[Math.floor(particle.rotation)];
  
  // Wave motion as notes float up
  const waveX = Math.sin(particle.life * 0.05) * 20;
  const wobble = Math.sin(particle.life * 0.1) * 10;
  
  // Fade in/out based on actual particle life
  const progress = 1 - (particle.life / (particle.life + (300 - particle.life))); // 0 to 1 as particle ages
  const fadeIn = Math.min(1, progress * 10); // Quick fade in
  const fadeOut = particle.life < 50 ? particle.life / 50 : 1; // Fade out at end
  const opacity = Math.min(fadeIn, fadeOut) * particle.opacity;
  
  return (
    <div
      key={particle.id}
      style={{
        fontSize: `${particle.size}px`,
        fontWeight: 'bold',
        position: 'relative',
        transform: `
          translateX(${waveX}px) 
          rotate(${wobble}deg)
          scale(${0.8 + opacity * 0.2})
        `,
        color: particle.color,
        opacity,
        textShadow: `
          0 0 10px ${particle.color}88,
          0 0 20px ${particle.color}44,
          2px 2px 3px rgba(0,0,0,0.3)
        `,
        transition: 'transform 0.3s ease',
        userSelect: 'none',
      }}
    >
      {note}
      
      {/* Musical staff lines effect */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '-20%',
          width: '140%',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${particle.color}33, transparent)`,
          opacity: opacity * 0.5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '60%',
          left: '-20%',
          width: '140%',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${particle.color}33, transparent)`,
          opacity: opacity * 0.3,
        }}
      />
    </div>
  );
};