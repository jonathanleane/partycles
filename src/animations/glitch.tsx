import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';
import { createPooledParticles } from '../particlePool';

export const createGlitchParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const { particleCount = 20, elementSize = 200 } = config;

  const particles: Particle[] = [];
  const channels = ['r', 'g', 'b'];

  for (let i = 0; i < particleCount; i++) {
    const isHorizontal = Math.random() > 0.3;
    const channelIndex = i % 3;
    const channel = channels[channelIndex];

    // Encode all data in rotation:
    // bits 0-1: channel (0=r, 1=g, 2=b)
    // bit 2: isHorizontal (0=false, 1=true)
    // bits 3-10: width (0-255)
    // bits 11-18: height (0-255)
    // bits 19-24: glitchOffset + 32 (to make positive)
    const width = isHorizontal ? randomInRange(50, 200) : randomInRange(2, 8);
    const height = isHorizontal ? randomInRange(2, 8) : randomInRange(50, 200);
    const glitchOffset = randomInRange(-20, 20);

    const encodedData =
      channelIndex +
      (isHorizontal ? 4 : 0) +
      (Math.floor(width) << 3) +
      (Math.floor(height) << 11) +
      ((glitchOffset + 32) << 19);

    particles.push({
      id: generateId(),
      x: origin.x + randomInRange(-elementSize / 2, elementSize / 2),
      y: origin.y + randomInRange(-elementSize / 2, elementSize / 2),
      vx: randomInRange(-50, 50),
      vy: randomInRange(-30, 30),
      life: config.lifetime || 150,
      opacity: randomInRange(0.3, 1),
      size: randomInRange(5, 20), // Store distortionAmount
      rotation: encodedData,
      color:
        channel === 'r' ? '#ff0000' : channel === 'g' ? '#00ff00' : '#0000ff',
    });
  }

  return particles;
};

export const renderGlitchParticle = (particle: Particle): React.ReactNode => {
  // Decode data from rotation
  const channelIndex = particle.rotation & 3;
  const width = (particle.rotation >> 3) & 255;
  const height = (particle.rotation >> 11) & 255;
  const glitchOffset = ((particle.rotation >> 19) & 63) - 32;

  const channel = ['r', 'g', 'b'][channelIndex];
  const distortionAmount = particle.size;

  const colors = {
    r: channel === 'r' ? 255 : 0,
    g: channel === 'g' ? 255 : 0,
    b: channel === 'b' ? 255 : 0,
  };

  const mixBlendMode =
    channel === 'r' ? 'screen' : channel === 'g' ? 'multiply' : 'difference';

  return (
    <div
      key={particle.id}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: `rgba(${colors.r}, ${colors.g}, ${colors.b}, ${particle.opacity})`,
        mixBlendMode,
        filter: `blur(${randomInRange(0, 2)}px)`,
        boxShadow: `${glitchOffset}px 0 ${distortionAmount}px rgba(${colors.r}, ${colors.g}, ${colors.b}, ${particle.opacity * 0.5})`,
      }}
    />
  );
};
