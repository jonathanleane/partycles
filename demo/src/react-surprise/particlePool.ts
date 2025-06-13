import { Particle } from './types';

export interface PooledParticle extends Particle {
  _pooled?: boolean;
}

export class ParticlePool {
  private pool: PooledParticle[] = [];
  private maxSize: number;
  private created: number = 0;

  constructor(maxSize: number = 1000) {
    this.maxSize = maxSize;
  }

  acquire(): PooledParticle {
    // Try to get a particle from the pool
    const particle = this.pool.pop();

    if (particle) {
      particle._pooled = false;
      return particle;
    }

    // Create a new particle if pool is empty
    this.created++;
    return {
      id: `p${this.created}`,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      opacity: 0,
      size: 0,
      rotation: 0,
      color: '',
      _pooled: false,
    };
  }

  release(particle: PooledParticle): void {
    // Don't add to pool if already pooled or pool is full
    if (particle._pooled || this.pool.length >= this.maxSize) {
      return;
    }

    // Reset particle properties
    particle._pooled = true;
    particle.element = undefined;
    particle.config = undefined;

    // Add back to pool
    this.pool.push(particle);
  }

  releaseAll(particles: PooledParticle[]): void {
    particles.forEach((p) => this.release(p));
  }

  clear(): void {
    this.pool = [];
  }

  getStats() {
    return {
      poolSize: this.pool.length,
      totalCreated: this.created,
      maxSize: this.maxSize,
    };
  }
}

// Create a singleton instance
export const particlePool = new ParticlePool();

// Helper function to create particles using the pool
export function createPooledParticle(props: Partial<Particle>): PooledParticle {
  const particle = particlePool.acquire();

  // Apply properties
  Object.assign(particle, props);

  // Ensure id is unique if not provided
  if (!props.id) {
    particle.id = `p${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  return particle;
}

// Helper function to create multiple particles
export function createPooledParticles(
  count: number,
  factory: (index: number) => Partial<Particle>
): PooledParticle[] {
  const particles: PooledParticle[] = [];

  for (let i = 0; i < count; i++) {
    particles.push(createPooledParticle(factory(i)));
  }

  return particles;
}
