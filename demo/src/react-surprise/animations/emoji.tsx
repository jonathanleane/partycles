import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';

// Default emoji sets for different moods
const defaultEmojis = ['🎉', '🎊', '🎈', '🎁', '✨', '🌟', '💫', '🎯'];
const celebrationEmojis = ['🎉', '🎊', '🥳', '🎈', '🎁', '🍾', '🥂', '🎆'];
const loveEmojis = ['❤️', '💕', '💖', '💝', '💗', '💓', '💞', '💘'];
const happyEmojis = ['😊', '😄', '🥰', '😍', '🤗', '😘', '😁', '🤩'];
const natureEmojis = ['🌸', '🌺', '🌻', '🌹', '🌷', '🌼', '🍀', '🌿'];
const foodEmojis = ['🍕', '🍔', '🍟', '🌮', '🍿', '🍩', '🍪', '🧁'];

export interface EmojiAnimationConfig extends AnimationConfig {
  emojis?: string[];
}

export const createEmojiParticles = (
  origin: { x: number; y: number },
  config: EmojiAnimationConfig
): Particle[] => {
  const {
    particleCount = 30,
    spread = 100,
    startVelocity = 15,
    elementSize = 35,
    emojis = defaultEmojis
  } = config;

  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = randomInRange(-45, -135);
    const velocity = randomInRange(startVelocity * 0.5, startVelocity * 1.2);
    
    particles.push({
      id: generateId(),
      x: origin.x + randomInRange(-spread, spread),
      y: origin.y,
      vx: Math.cos((angle * Math.PI) / 180) * velocity,
      vy: Math.sin((angle * Math.PI) / 180) * velocity,
      life: config.lifetime || 180,
      opacity: 1,
      size: randomInRange(elementSize * 0.7, elementSize * 1.3),
      rotation: randomInRange(-45, 45),
      color: '', // Not used for emojis
      element: emojis[Math.floor(Math.random() * emojis.length)]
    });
  }

  return particles;
};

export const renderEmojiParticle = (particle: Particle): React.ReactNode => {
  return (
    <div
      key={particle.id}
      style={{
        fontSize: `${particle.size}px`,
        lineHeight: 1,
        userSelect: 'none',
        filter: particle.opacity < 0.5 ? 'blur(1px)' : undefined,
      }}
    >
      {particle.element}
    </div>
  );
};

// Export preset emoji sets for easy use
export const emojiPresets = {
  celebration: celebrationEmojis,
  love: loveEmojis,
  happy: happyEmojis,
  nature: natureEmojis,
  food: foodEmojis,
  default: defaultEmojis
};