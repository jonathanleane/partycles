import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';
import { createPooledParticles } from '../particlePool';

const balloonColors = [
  '#FF006E',
  '#FB5607',
  '#FFBE0B',
  '#8338EC',
  '#3A86FF',
  '#06FFB4',
  '#FF4081',
];

export const createBalloonParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 15,
    spread = 80,
    startVelocity = 10,
    colors = balloonColors,
    elementSize = 35,
  } = config;

  return createPooledParticles(particleCount, () => {
    const angle = randomInRange(-spread / 2, spread / 2) * (Math.PI / 180);
    const velocity = randomInRange(startVelocity * 0.7, startVelocity);

    return {
      id: generateId(),
      x: origin.x + randomInRange(-spread * 0.8, spread * 0.8), // Spread balloons out more
      y: origin.y + randomInRange(-10, 30),
      vx: Math.sin(angle) * velocity * 0.3 + randomInRange(-1, 1), // Add horizontal drift
      vy: -velocity * 0.4, // Balloons float up slowly
      life: config.lifetime || 250,
      opacity: 0.9,
      size: randomInRange(elementSize * 0.8, elementSize * 1.2),
      rotation: randomInRange(-10, 10),
      color:
        colors[Math.floor(Math.random() * colors.length)] ||
        colors[0] ||
        '#ffffff',
    }
  });
};

export const renderBalloonParticle = (particle: Particle): React.ReactNode => {
  // Gentle swaying motion
  const sway = Math.sin(particle.life * 0.03) * 15;
  const bob = Math.sin(particle.life * 0.05) * 5;

  // Fade out near the end
  const fadeOut = particle.life > 50 ? 1 : particle.life / 50;

  return (
    <div
      key={particle.id}
      style={{
        width: '100%',
        height: '120%',
        position: 'relative',
        transform: `
          translateX(${sway}px) 
          translateY(${bob}px)
          rotate(${sway * 0.2}deg)
        `,
        opacity: particle.opacity * fadeOut,
      }}
    >
      {/* Balloon body */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 30% 30%, ${particle.color}ee, ${particle.color})`,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          position: 'relative',
          boxShadow: `
            inset -5px -5px 10px rgba(0,0,0,0.2),
            0 4px 8px rgba(0,0,0,0.2)
          `,
        }}
      >
        {/* Highlight */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '20%',
            width: '25%',
            height: '30%',
            background:
              'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'rotate(-20deg)',
          }}
        />

        {/* Balloon knot */}
        <div
          style={{
            position: 'absolute',
            bottom: '-5px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: `8px solid ${particle.color}`,
          }}
        />
      </div>

      {/* String */}
      <svg
        style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '2px',
          height: `${particle.size * 2}px`,
          opacity: 0.6,
        }}
      >
        <path
          d={`M1 0 Q ${1 + Math.sin(particle.life * 0.1) * 3} ${particle.size} 1 ${particle.size * 2}`}
          stroke={particle.color}
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
      </svg>
    </div>
  );
};
