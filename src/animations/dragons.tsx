import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, degreesToRadians, generateId, getRandomColor } from '../utils';

const defaultColors = ['#FF4500', '#DC143C', '#B22222', '#8B0000', '#FF6347', '#FF8C00'];

export const createDragonParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 6,
    startVelocity = 12,
    colors = defaultColors,
    elementSize = 40
  } = config;

  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    // Dragons fly in various directions with swooping motion
    const angle = randomInRange(0, 360);
    const velocity = randomInRange(startVelocity * 0.7, startVelocity);
    const color = getRandomColor(colors);
    
    particles.push({
      id: generateId(),
      x: origin.x + randomInRange(-30, 30),
      y: origin.y + randomInRange(-30, 30),
      vx: Math.cos(degreesToRadians(angle)) * velocity,
      vy: Math.sin(degreesToRadians(angle)) * velocity,
      life: config.lifetime || 180,
      opacity: 1,
      size: randomInRange(elementSize * 0.8, elementSize),
      rotation: angle,
      color,
    });
  }

  return particles;
};

export const renderDragonParticle = (particle: Particle): React.ReactNode => {
  // Calculate wing flap animation
  const wingFlap = Math.sin(Date.now() * 0.01 + particle.x) * 10;
  // Calculate fire breath pulse
  const firePulse = (Math.sin(Date.now() * 0.005 + particle.y) + 1) / 2;
  
  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        position: 'relative',
        transform: `rotate(${particle.rotation}deg)`,
      }}
    >
      {/* Dragon body */}
      <div
        style={{
          position: 'absolute',
          width: '60%',
          height: '40%',
          top: '30%',
          left: '20%',
          backgroundColor: particle.color,
          borderRadius: '50% 40% 40% 50%',
          boxShadow: `0 2px 10px rgba(0, 0, 0, 0.3)`,
        }}
      />
      
      {/* Dragon head */}
      <div
        style={{
          position: 'absolute',
          width: '35%',
          height: '35%',
          top: '25%',
          right: '15%',
          backgroundColor: particle.color,
          borderRadius: '40% 50% 50% 40%',
          transform: 'rotate(-10deg)',
        }}
      >
        {/* Eye */}
        <div
          style={{
            position: 'absolute',
            width: '20%',
            height: '20%',
            top: '30%',
            right: '25%',
            backgroundColor: '#FFD700',
            borderRadius: '50%',
            boxShadow: '0 0 4px #FFD700',
          }}
        />
      </div>
      
      {/* Wings */}
      <div
        style={{
          position: 'absolute',
          width: '40%',
          height: '50%',
          top: '15%',
          left: '30%',
          backgroundColor: `${particle.color}CC`,
          clipPath: 'polygon(0% 100%, 50% 0%, 100% 30%, 90% 60%, 100% 90%, 50% 100%)',
          transform: `rotateX(${wingFlap}deg)`,
          transformOrigin: 'bottom center',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '40%',
          height: '50%',
          top: '35%',
          left: '30%',
          backgroundColor: `${particle.color}AA`,
          clipPath: 'polygon(0% 0%, 50% 0%, 100% 30%, 90% 60%, 100% 90%, 50% 100%)',
          transform: `rotateX(${-wingFlap}deg)`,
          transformOrigin: 'top center',
        }}
      />
      
      {/* Tail */}
      <div
        style={{
          position: 'absolute',
          width: '40%',
          height: '15%',
          top: '35%',
          left: '5%',
          backgroundColor: particle.color,
          clipPath: 'polygon(0% 50%, 70% 0%, 100% 20%, 100% 80%, 70% 100%, 0% 50%)',
        }}
      />
      
      {/* Fire breath */}
      <div
        style={{
          position: 'absolute',
          width: '30%',
          height: '20%',
          top: '35%',
          right: '5%',
          background: `radial-gradient(ellipse, #FFD700 0%, #FF4500 50%, transparent 100%)`,
          transform: `scale(${0.8 + firePulse * 0.4})`,
          opacity: 0.8 + firePulse * 0.2,
          filter: 'blur(1px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '25%',
          height: '15%',
          top: '37%',
          right: '0%',
          background: `radial-gradient(ellipse, #FFA500 0%, #FF6347 50%, transparent 100%)`,
          transform: `scale(${0.6 + firePulse * 0.6})`,
          opacity: 0.6 + firePulse * 0.4,
          filter: 'blur(2px)',
        }}
      />
    </div>
  );
};