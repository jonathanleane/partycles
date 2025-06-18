import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';
import { createPooledParticles } from '../particlePool';

// Inspired by Sergio A. Carrasco Chavez's bokeh effect
// Original: https://codepen.io/sergio-carrasco/pen/bokeh

const bokehColors = [
  '#FFFFFF', // Pure white
  '#FFF8DC', // Cornsilk
  '#FFFACD', // LemonChiffon
  '#FFE4B5', // Moccasin
  '#FFDEAD', // NavajoWhite
  '#F0E68C', // Khaki
  '#FFD700', // Gold
];

export const createBokehParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 50,
    spread = 300,
    startVelocity = 1,
    colors = bokehColors,
    elementSize = 40,
    lifetime = 200,
  } = config;

  return createPooledParticles(particleCount, (i) => {
    // Create particles at various distances from origin for depth effect
    const angle = Math.random() * Math.PI * 2;
    const distance = randomInRange(0, spread);

    // Vary sizes for depth perception
    const depth = Math.random(); // 0 = close, 1 = far
    const size = elementSize * (0.3 + depth * 0.7); // Bigger = closer

    return {
      id: generateId(),
      x: origin.x + Math.cos(angle) * distance,
      y: origin.y + Math.sin(angle) * distance,
      vx: randomInRange(-0.5, 0.5) * startVelocity,
      vy: randomInRange(-0.5, -1.5) * startVelocity, // Gentle upward drift
      life: lifetime,
      opacity: 0.1 + depth * 0.5, // Closer = more transparent (out of focus)
      size: size,
      rotation: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      element: JSON.stringify({
        depth: depth,
        pulsePhase: Math.random() * Math.PI * 2, // Random starting phase for pulse
        baseSize: size,
      }),
    };
  });
};

export const renderBokehParticle = (particle: Particle): React.ReactNode => {
  let elementData: any = {};
  try {
    if (particle.element && typeof particle.element === 'string') {
      elementData = JSON.parse(particle.element);
    }
  } catch (e) {
    // Fallback
  }

  // Create gentle pulsing effect
  const pulseAmount =
    Math.sin(particle.life * 0.05 + (elementData.pulsePhase || 0)) * 0.1 + 1;
  const currentSize = (elementData.baseSize || particle.size) * pulseAmount;

  // Fade in at start, fade out at end
  const fadeIn = Math.min(
    1,
    (particle.config?.lifetime || 200 - particle.life) / 20
  );
  const fadeOut = Math.min(1, particle.life / 40);
  const opacity = particle.opacity * fadeIn * fadeOut;

  return (
    <div
      key={particle.id}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${currentSize * 3}px`,
          height: `${currentSize * 3}px`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${particle.color}22 0%, transparent 50%)`,
          filter: 'blur(20px)',
          opacity: opacity * 0.6,
        }}
      />

      {/* Middle glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${currentSize * 2}px`,
          height: `${currentSize * 2}px`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${particle.color}44 0%, transparent 60%)`,
          filter: 'blur(10px)',
          opacity: opacity * 0.8,
        }}
      />

      {/* Inner core */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${currentSize}px`,
          height: `${currentSize}px`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${particle.color}88 0%, ${particle.color}44 50%, transparent 100%)`,
          borderRadius: '50%',
          filter: 'blur(2px)',
          opacity: opacity,
        }}
      />
    </div>
  );
};
