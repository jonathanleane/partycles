import { AnimationType, AnimationConfig, Particle } from '../types';
import { createConfettiParticles, renderConfettiParticle } from './confetti';
import { createSparkleParticles, renderSparkleParticle } from './sparkles';
import { createHeartParticles, renderHeartParticle } from './hearts';
import { createFireworkParticles, renderFireworkParticle } from './fireworks';
import { createBubbleParticles, renderBubbleParticle } from './bubbles';
import { createStarParticles, renderStarParticle } from './stars';
import { createSnowParticles, renderSnowParticle } from './snow';
import { createEmojiParticles, renderEmojiParticle } from './emoji';
import { createCoinParticles, renderCoinParticle } from './coins';
import { createLightningParticles, renderLightningParticle } from './lightning';
import { createPetalParticles, renderPetalParticle } from './petals';
import { createAuroraParticles, renderAuroraParticle } from './aurora';
import { createFireflyParticles, renderFireflyParticle } from './fireflies';
import { createPaintParticles, renderPaintParticle } from './paint';
import { createMusicParticles, renderMusicParticle } from './music';
import { createBalloonParticles, renderBalloonParticle } from './balloons';
import { createGalaxyParticles, renderGalaxyParticle } from './galaxy';

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
  snow: {
    createParticles: createSnowParticles,
    renderParticle: renderSnowParticle,
  },
  emoji: {
    createParticles: createEmojiParticles,
    renderParticle: renderEmojiParticle,
  },
  coins: {
    createParticles: createCoinParticles,
    renderParticle: renderCoinParticle,
  },
  lightning: {
    createParticles: createLightningParticles,
    renderParticle: renderLightningParticle,
  },
  petals: {
    createParticles: createPetalParticles,
    renderParticle: renderPetalParticle,
  },
  aurora: {
    createParticles: createAuroraParticles,
    renderParticle: renderAuroraParticle,
  },
  fireflies: {
    createParticles: createFireflyParticles,
    renderParticle: renderFireflyParticle,
  },
  paint: {
    createParticles: createPaintParticles,
    renderParticle: renderPaintParticle,
  },
  music: {
    createParticles: createMusicParticles,
    renderParticle: renderMusicParticle,
  },
  balloons: {
    createParticles: createBalloonParticles,
    renderParticle: renderBalloonParticle,
  },
  galaxy: {
    createParticles: createGalaxyParticles,
    renderParticle: renderGalaxyParticle,
  },
};