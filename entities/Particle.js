//@flow
import { Vector } from './Vector';
import type { VectorType } from './Vector';

export type ParticleType = {
  position: VectorType,
  velocity: VectorType,
  acceleration: VectorType,
  id: number
};

export const Particle = (
  velocity: VectorType = Vector(0, 0),
  acceleration: VectorType = Vector(0, 0),
  id: number,
  position?: VectorType = Vector(0, 0)
): ParticleType => ({
  position,
  velocity,
  acceleration,
  id
});
