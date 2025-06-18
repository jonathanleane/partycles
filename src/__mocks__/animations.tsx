import React from 'react';

// Create a mock for each animation type
const createMockAnimation = (name: string) => ({
  createParticles: jest.fn(() => [
    {
      id: `${name}-particle-1`,
      x: 50,
      y: 50,
      vx: 1,
      vy: -5,
      life: 100,
      opacity: 1,
      size: 20,
      rotation: 0,
      color: '#ff0000',
    },
  ]),
  renderParticle: jest.fn(() => <div>{name} Particle</div>),
});

export const animations = {
  confetti: createMockAnimation('confetti'),
  sparkles: createMockAnimation('sparkles'),
  hearts: createMockAnimation('hearts'),
  fireworks: createMockAnimation('fireworks'),
  bubbles: createMockAnimation('bubbles'),
  stars: createMockAnimation('stars'),
  snow: createMockAnimation('snow'),
  emoji: createMockAnimation('emoji'),
  coins: createMockAnimation('coins'),
  petals: createMockAnimation('petals'),
  aurora: createMockAnimation('aurora'),
  fireflies: createMockAnimation('fireflies'),
  paint: createMockAnimation('paint'),
  balloons: createMockAnimation('balloons'),
  galaxy: createMockAnimation('galaxy'),
  glitch: createMockAnimation('glitch'),
  magicdust: createMockAnimation('magicdust'),
  crystals: createMockAnimation('crystals'),
  leaves: createMockAnimation('leaves'),
  mortar: createMockAnimation('mortar'),
  bokeh: createMockAnimation('bokeh'),
  fire: createMockAnimation('fire'),
};
