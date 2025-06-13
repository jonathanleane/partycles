import { Particle } from './types';
import { particlePool, PooledParticle } from './particlePool';
import { shouldSkipFrame } from './mobileOptimizations';

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
        particle.rotation += particle.vx * 2;
        particle.life -= 1.2;

        // Apply animation-specific effects
        this.applyEffects(particle, animation);

        // Handle artillery explosions
        this.handleArtilleryExplosion(particle, animation);

        // Update opacity
        this.updateOpacity(particle, animation);

        return particle;
      });

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

  private handleArtilleryExplosion(
    particle: Particle,
    animation: AnimationInstance
  ): void {
    if (animation.animationType !== 'artillery' || !particle.element) return;

    try {
      const elementData = JSON.parse(particle.element as string);

      // Check if this is a shell that should explode
      if (
        elementData.isShell &&
        particle.life <= elementData.explodeAt &&
        !elementData.hasExploded
      ) {
        // Mark as exploded to prevent multiple explosions
        elementData.hasExploded = true;
        particle.element = JSON.stringify(elementData);

        // Create explosion particles
        const burstCount = elementData.burstCount || 20;
        const explosionParticles: PooledParticle[] = [];

        for (let i = 0; i < burstCount; i++) {
          const angle = (360 / burstCount) * i + (Math.random() - 0.5) * 30;
          const velocity = Math.random() * 12 + 8;
          const rad = (angle * Math.PI) / 180;

          const burstParticle = particlePool.acquire();
          Object.assign(burstParticle, {
            id: `${particle.id}-burst-${i}`,
            x: particle.x,
            y: particle.y,
            vx: Math.cos(rad) * velocity,
            vy: Math.sin(rad) * velocity,
            life: 80,
            opacity: 1,
            size: Math.random() * 6 + 3,
            rotation: Math.random() * 360,
            color: particle.color,
            config: particle.config,
          });

          explosionParticles.push(burstParticle);
        }

        // Add explosion particles to the animation
        animation.particles.push(...explosionParticles);
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
