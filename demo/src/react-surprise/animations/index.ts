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
import { createPetalParticles, renderPetalParticle } from './petals';
import { createAuroraParticles, renderAuroraParticle } from './aurora';
import { createFireflyParticles, renderFireflyParticle } from './fireflies';
import { createPaintParticles, renderPaintParticle } from './paint';
import { createBalloonParticles, renderBalloonParticle } from './balloons';
import { createGalaxyParticles, renderGalaxyParticle } from './galaxy';
import { createGlitchParticles, renderGlitchParticle } from './glitch';
import { createMagicDustParticles, renderMagicDustParticle } from './magicdust';
import { createCrystalParticles, renderCrystalParticle } from './crystals';
import { createLeafParticles, renderLeafParticle } from './leaves';

// React component animations
// These don't exist in the demo
// export { default as Confetti } from './confetti';
// export { default as Sparkles } from './sparkles';
// export { default as Hearts } from './hearts';
// export { default as Fireworks } from './fireworks';
// export { default as Bubbles } from './bubbles';
// export { default as Stars } from './stars';
// export { default as Popcorn } from './popcorn';
// export { default as Champagne } from './champagne';
// export { default as Candy } from './candy';
// export { default as Donuts } from './donuts';
// export { default as Pizza } from './pizza';

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
  balloons: {
    createParticles: createBalloonParticles,
    renderParticle: renderBalloonParticle,
  },
  galaxy: {
    createParticles: createGalaxyParticles,
    renderParticle: renderGalaxyParticle,
  },
  glitch: {
    createParticles: createGlitchParticles,
    renderParticle: renderGlitchParticle,
  },
  magicdust: {
    createParticles: createMagicDustParticles,
    renderParticle: renderMagicDustParticle,
  },
  crystals: {
    createParticles: createCrystalParticles,
    renderParticle: renderCrystalParticle,
  },
  leaves: {
    createParticles: createLeafParticles,
    renderParticle: renderLeafParticle,
  },
};