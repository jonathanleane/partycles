import { Particle } from './types';
import { particlePool, PooledParticle } from './particlePool';
import { shouldSkipFrame } from './mobileOptimizations';
import { randomInRange } from './utils';

export interface AnimationInstance {
  id: string;
  particles: Particle[];
  containerElement: HTMLDivElement;
  renderFunction: (particle: Particle) => React.ReactNode;
  updateCallback?: (particles: Particle[]) => void;
  onComplete?: () => void;
  physics: {
    gravity: number;
    friction: number;
    wind: number;
  };
  animationType: string;
  config?: {
    effects?: {
      flutter?: boolean;
      windDrift?: boolean;
      wobble?: boolean;
      twinkle?: boolean;
    };
  };
  frameCount: number;
  isPaused?: boolean;
  pausedAt?: number;
}

class AnimationManager {
  private animations: Map<string, AnimationInstance> = new Map();
  private rafId: number | null = null;
  private isRunning: boolean = false;
  private lastFrameTime: number = 0;
  private frameInterval: number = 1000 / 60; // 60 FPS target

  // Performance metrics
  private frameCount: number = 0;
  private fpsUpdateInterval: number = 1000; // Update FPS every second
  private lastFpsUpdate: number = 0;
  private currentFps: number = 0;

  constructor() {
    // Bind methods
    this.update = this.update.bind(this);
  }

  addAnimation(animation: AnimationInstance): void {
    this.animations.set(animation.id, animation);

    // Start the loop if not already running
    if (!this.isRunning && this.animations.size > 0) {
      this.start();
    }
  }

  removeAnimation(id: string): void {
    const animation = this.animations.get(id);
    if (animation) {
      // Release particles back to pool
      particlePool.releaseAll(animation.particles as Particle[]);

      // Remove container
      if (
        animation.containerElement &&
        document.body.contains(animation.containerElement)
      ) {
        document.body.removeChild(animation.containerElement);
      }

      this.animations.delete(id);
    }

    // Stop the loop if no more animations
    if (this.animations.size === 0) {
      this.stop();
    }
  }

  private start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.lastFpsUpdate = this.lastFrameTime;
    this.frameCount = 0;
    this.rafId = requestAnimationFrame(this.update);
  }

  private stop(): void {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private update(currentTime: number): void {
    // Calculate delta time
    const deltaTime = currentTime - this.lastFrameTime;

    // Frame rate limiting
    if (deltaTime < this.frameInterval) {
      this.rafId = requestAnimationFrame(this.update);
      return;
    }

    this.lastFrameTime = currentTime - (deltaTime % this.frameInterval);
    this.frameCount++;

    // Update FPS counter
    if (currentTime - this.lastFpsUpdate >= this.fpsUpdateInterval) {
      this.currentFps = this.frameCount;
      this.frameCount = 0;
      this.lastFpsUpdate = currentTime;
    }

    // Check if tab is visible
    const isTabVisible = !document.hidden;
    if (!isTabVisible) {
      this.rafId = requestAnimationFrame(this.update);
      return;
    }

    // Update all animations
    const completedAnimations: string[] = [];

    this.animations.forEach((animation, id) => {
      // Skip update if animation is paused
      if (animation.isPaused) {
        return;
      }

      animation.frameCount++;
      const skipFrame = shouldSkipFrame(animation.frameCount);

      let activeParticles = 0;
      const newParticles: PooledParticle[] = []; // Collect new particles to add

      // Update particles
      animation.particles = animation.particles.map((particle) => {
        if (particle.life <= 0) return particle;

        activeParticles++;

        // Physics update
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += animation.physics.gravity;
        particle.vx += animation.physics.wind;
        particle.vx *= animation.physics.friction;
        particle.vy *= animation.physics.friction;

        // Update rotation - make sparkles spin more
        if (animation.animationType === 'sparkles') {
          particle.rotation += 5; // Constant spin for sparkles
        } else {
          particle.rotation += particle.vx * 2;
        }

        particle.life -= 1.2;

        // Apply animation-specific effects
        this.applyEffects(particle, animation);

        // Handle mortar explosions
        this.handleMortarExplosion(particle, animation, newParticles);

        // Update opacity
        this.updateOpacity(particle, animation);

        return particle;
      });

      // Add any new particles created during the update (e.g., explosion particles)
      if (newParticles.length > 0) {
        animation.particles.push(...newParticles);
      }

      // Call update callback if provided
      if (animation.updateCallback && !skipFrame) {
        animation.updateCallback(animation.particles);
      }

      // Mark for removal if no active particles
      if (activeParticles === 0) {
        completedAnimations.push(id);
        if (animation.onComplete) {
          animation.onComplete();
        }
      }
    });

    // Remove completed animations
    completedAnimations.forEach((id) => this.removeAnimation(id));

    // Continue loop if animations remain
    if (this.isRunning) {
      this.rafId = requestAnimationFrame(this.update);
    }
  }

  private applyEffects(particle: Particle, animation: AnimationInstance): void {
    const effects = animation.config?.effects;
    if (!effects) return;

    const { animationType } = animation;

    // Flutter effect for confetti
    if (effects.flutter && animationType === 'confetti') {
      particle.x += Math.sin(particle.life * 0.1) * 0.5;
      particle.rotation += Math.sin(particle.life * 0.05) * 2;
    }

    // Wind drift for snow/leaves
    if (
      effects.windDrift &&
      (animationType === 'snow' || animationType === 'leaves')
    ) {
      particle.x +=
        Math.sin(particle.life * 0.05 + particle.id.charCodeAt(0)) * 0.8;
    }

    // Wobble effect for bubbles
    if (effects.wobble && animationType === 'bubbles') {
      particle.x += Math.sin(particle.life * 0.08) * 0.3;
      particle.y += Math.cos(particle.life * 0.08) * 0.2;
    }
  }

  private handleMortarExplosion(
    particle: Particle,
    animation: AnimationInstance,
    newParticles: PooledParticle[]
  ): void {
    if (animation.animationType !== 'mortar' || !particle.element) return;

    try {
      const elementData = JSON.parse(particle.element as string);

      // Handle shell particles
      if (elementData.isShell && !elementData.hasExploded) {
        // Create trail particles as the shell rises
        if (animation.frameCount % 3 === 0) {
          const trailParticle = particlePool.acquire();
          Object.assign(trailParticle, {
            id: `${particle.id}-trail-${Date.now()}`,
            x: particle.x + randomInRange(-2, 2),
            y: particle.y + randomInRange(-2, 2),
            vx: randomInRange(-1, 1),
            vy: randomInRange(0, 2),
            life: 30,
            opacity: 0.8,
            size: particle.size * 0.7,
            rotation: 0,
            color: particle.color,
            element: JSON.stringify({ isTrail: true }),
            config: particle.config,
          });
          newParticles.push(trailParticle);
        }

        // Check if it's time to explode based on fixed timer
        const totalLife = particle.config?.lifetime ?? 200;
        const flightTime = totalLife - particle.life;
        const shouldExplode = flightTime >= (elementData.timeToExplode || 25);

        if (shouldExplode) {
          // Mark as exploded
          elementData.hasExploded = true;
          particle.element = JSON.stringify(elementData);

          // Create galaxy-style explosion with fewer particles for performance
          const isMobile = window.innerWidth < 768;
          const burstCount = isMobile ? 20 : 30; // Reduced particle count
          const explosionParticles: PooledParticle[] = [];

          // Galaxy colors for the explosion
          const galaxyColors = [
            '#FFFFFF',
            '#FFF9C4',
            '#BBDEFB',
            '#C5CAE9',
            '#D1C4E9',
            '#FFE082',
            '#FFCCBC',
          ];

          // Create spiral galaxy explosion
          for (let i = 0; i < burstCount; i++) {
            const progress = i / burstCount;
            const spiralAngle = progress * Math.PI * 6; // 3 full rotations
            const radius = progress * 80; // Explosion radius

            // Add randomness for natural look
            const angleOffset = randomInRange(-0.4, 0.4);
            const radiusOffset = randomInRange(-15, 15);

            const finalAngle = spiralAngle + angleOffset;
            const finalRadius = (radius + radiusOffset) * 0.5; // Smaller explosion

            // Velocity follows spiral tangent
            const tangentAngle = finalAngle + Math.PI / 2;
            const speed = 3 * (1 - progress * 0.3); // Outer particles slower

            const burstParticle = particlePool.acquire();
            Object.assign(burstParticle, {
              id: `${particle.id}-burst-${i}`,
              x: particle.x + Math.cos(finalAngle) * finalRadius * 0.1,
              y: particle.y + Math.sin(finalAngle) * finalRadius * 0.1,
              vx: Math.cos(tangentAngle) * speed + Math.cos(finalAngle) * 2,
              vy: Math.sin(tangentAngle) * speed + Math.sin(finalAngle) * 2,
              life: 120 - progress * 40, // Inner particles live longer
              opacity: 1,
              size: randomInRange(2, 5) * (1 - progress * 0.5),
              rotation: randomInRange(0, 360),
              color:
                galaxyColors[Math.floor(Math.random() * galaxyColors.length)],
              element: JSON.stringify({
                isBurst: true,
                isGalaxy: true,
                twinkle: Math.random() > 0.7,
              }),
              config: particle.config,
            });
            explosionParticles.push(burstParticle);
          }

          // Add fewer bright core particles
          const coreCount = isMobile ? 5 : 8;
          for (let i = 0; i < coreCount; i++) {
            const angle = (Math.PI * 2 * i) / coreCount;
            const coreParticle = particlePool.acquire();
            Object.assign(coreParticle, {
              id: `${particle.id}-core-${i}`,
              x: particle.x,
              y: particle.y,
              vx: Math.cos(angle) * randomInRange(1, 2),
              vy: Math.sin(angle) * randomInRange(1, 2),
              life: 60, // Shorter life
              opacity: 1,
              size: randomInRange(3, 5),
              rotation: 0,
              color: '#FFFFFF',
              element: JSON.stringify({
                isBurst: true,
                isCore: true,
              }),
              config: particle.config,
            });
            explosionParticles.push(coreParticle);
          }

          // Add center flash
          const flashParticle = particlePool.acquire();
          Object.assign(flashParticle, {
            id: `${particle.id}-flash`,
            x: particle.x,
            y: particle.y,
            vx: 0,
            vy: 0,
            life: 20,
            opacity: 1,
            size: 30,
            rotation: 0,
            color: '#ffffff',
            element: JSON.stringify({ isBurst: true }),
            config: particle.config,
          });
          explosionParticles.push(flashParticle);

          newParticles.push(...explosionParticles);
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
  }

  private updateOpacity(
    particle: Particle,
    animation: AnimationInstance
  ): void {
    const { animationType, config } = animation;
    const effects = config?.effects;

    if (animationType === 'sparkles') {
      if (particle.life > 70) {
        particle.opacity = (100 - particle.life) / 30;
      } else if (particle.life < 30) {
        particle.opacity = particle.life / 30;
      }
      // Twinkle effect
      if (effects?.twinkle) {
        particle.opacity *= 0.5 + Math.sin(particle.life * 0.3) * 0.5;
      }
    } else if (animationType === 'stars' && effects?.twinkle) {
      // Twinkle effect for stars
      particle.opacity =
        (particle.life / 100) * (0.5 + Math.sin(particle.life * 0.3) * 0.5);
    } else {
      particle.opacity = particle.life / 100;
    }
  }

  getStats() {
    return {
      activeAnimations: this.animations.size,
      currentFps: this.currentFps,
      isRunning: this.isRunning,
      totalParticles: Array.from(this.animations.values()).reduce(
        (sum, anim) => sum + anim.particles.filter((p) => p.life > 0).length,
        0
      ),
    };
  }

  // Adjust target frame rate for performance
  setTargetFPS(fps: number): void {
    this.frameInterval = 1000 / fps;
  }

  // Pause a specific animation
  pauseAnimation(id: string): void {
    const animation = this.animations.get(id);
    if (animation && !animation.isPaused) {
      animation.isPaused = true;
      animation.pausedAt = performance.now();
    }
  }

  // Resume a specific animation
  resumeAnimation(id: string): void {
    const animation = this.animations.get(id);
    if (animation && animation.isPaused) {
      animation.isPaused = false;

      // Restart RAF loop if needed
      if (this.animations.size > 0 && !this.isRunning) {
        this.start();
      }
    }
  }

  // Check if an animation is paused
  isAnimationPaused(id: string): boolean {
    const animation = this.animations.get(id);
    return animation ? !!animation.isPaused : false;
  }

  // Get animation by ID
  getAnimation(id: string): AnimationInstance | undefined {
    return this.animations.get(id);
  }
}

// Singleton instance
export const animationManager = new AnimationManager();
