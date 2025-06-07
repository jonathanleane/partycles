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
import { createMatrixParticles, renderMatrixParticle } from './matrix';
import { createPixelParticles, renderPixelParticle } from './pixels';
import { createGlitchParticles, renderGlitchParticle } from './glitch';
import { createDiceParticles, renderDiceParticle } from './dice';
import { createLevelUpParticles, renderLevelUpParticle } from './levelup';
import { createMagicDustParticles, renderMagicDustParticle } from './magicdust';
import { createGhostParticles, renderGhostParticle } from './ghosts';
import { createCrystalParticles, renderCrystalParticle } from './crystals';
import { createDragonParticles, renderDragonParticle } from './dragons';
import { createRuneParticles, renderRuneParticle } from './runes';
import { createButterflyParticles, renderButterflyParticle } from './butterflies';
import { createLeafParticles, renderLeafParticle } from './leaves';
import { createRainParticles, renderRainParticle } from './rain';
import { createDandelionParticles, renderDandelionParticle } from './dandelion';
import { createBeeParticles, renderBeeParticle } from './bees';
import { createPopcornParticles, renderPopcornParticle } from './popcorn';
import { createChampagneParticles, renderChampagneParticle } from './champagne';
import { createCandyParticles, renderCandyParticle } from './candy';
import { createDonutParticles, renderDonutParticle } from './donuts';
import { createPizzaParticles, renderPizzaParticle } from './pizza';

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
  matrix: {
    createParticles: createMatrixParticles,
    renderParticle: renderMatrixParticle,
  },
  pixels: {
    createParticles: createPixelParticles,
    renderParticle: renderPixelParticle,
  },
  glitch: {
    createParticles: createGlitchParticles,
    renderParticle: renderGlitchParticle,
  },
  dice: {
    createParticles: createDiceParticles,
    renderParticle: renderDiceParticle,
  },
  levelup: {
    createParticles: createLevelUpParticles,
    renderParticle: renderLevelUpParticle,
  },
  magicdust: {
    createParticles: createMagicDustParticles,
    renderParticle: renderMagicDustParticle,
  },
  ghosts: {
    createParticles: createGhostParticles,
    renderParticle: renderGhostParticle,
  },
  crystals: {
    createParticles: createCrystalParticles,
    renderParticle: renderCrystalParticle,
  },
  dragons: {
    createParticles: createDragonParticles,
    renderParticle: renderDragonParticle,
  },
  runes: {
    createParticles: createRuneParticles,
    renderParticle: renderRuneParticle,
  },
  butterflies: {
    createParticles: createButterflyParticles,
    renderParticle: renderButterflyParticle,
  },
  leaves: {
    createParticles: createLeafParticles,
    renderParticle: renderLeafParticle,
  },
  rain: {
    createParticles: createRainParticles,
    renderParticle: renderRainParticle,
  },
  dandelion: {
    createParticles: createDandelionParticles,
    renderParticle: renderDandelionParticle,
  },
  bees: {
    createParticles: createBeeParticles,
    renderParticle: renderBeeParticle,
  },
  popcorn: {
    createParticles: createPopcornParticles,
    renderParticle: renderPopcornParticle,
  },
  champagne: {
    createParticles: createChampagneParticles,
    renderParticle: renderChampagneParticle,
  },
  candy: {
    createParticles: createCandyParticles,
    renderParticle: renderCandyParticle,
  },
  donuts: {
    createParticles: createDonutParticles,
    renderParticle: renderDonutParticle,
  },
  pizza: {
    createParticles: createPizzaParticles,
    renderParticle: renderPizzaParticle,
  },
};