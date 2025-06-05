import { AnimationType, AnimationConfig, Particle } from '../types';
import { createConfettiParticles, renderConfettiParticle } from './confetti';
import { createSparkleParticles, renderSparkleParticle } from './sparkles';
import { createHeartParticles, renderHeartParticle } from './hearts';
import { createFireworkParticles, renderFireworkParticle } from './fireworks';
import { createBubbleParticles, renderBubbleParticle } from './bubbles';
import { createStarParticles, renderStarParticle } from './stars';

export type ParticleCreator = (origin: { x: number; y: number }, config: AnimationConfig) => Particle[];
export type ParticleRenderer = (particle: Particle) => React.ReactNode;

interface AnimationHandler {
  createParticles: ParticleCreator;
  renderParticle: ParticleRenderer;
}

export const animations: Record<AnimationType, AnimationHandler> = {
  confetti: {
    createParticles: createConfettiParticles,
    renderParticle: renderConfettiParticle,
  },
  sparkles: {
    createParticles: createSparkleParticles,
    renderParticle: renderSparkleParticle,
  },
  hearts: {
    createParticles: createHeartParticles,
    renderParticle: renderHeartParticle,
  },
  fireworks: {
    createParticles: createFireworkParticles,
    renderParticle: renderFireworkParticle,
  },
  bubbles: {
    createParticles: createBubbleParticles,
    renderParticle: renderBubbleParticle,
  },
  stars: {
    createParticles: createStarParticles,
    renderParticle: renderStarParticle,
  },
};