//@flow
import { fromAngle, getAngle, getMagnitude } from './vector-helpers';
import { Particle } from './../entities/Particle';

import type { VectorType } from './../entities/Vector';
import type { ParticleType } from './../entities/Particle';

const emitParticle = function(
  initPosition: VectorType,
  velocity: VectorType,
  spread: number = Math.PI / 32,
  acceleration: VectorType,
  id: number
): ParticleType {
  // Use an angle randomized over the spread so we have more of a "spray"
  const angle = getAngle(velocity) + spread - Math.random() * spread * 2;

  // The magnitude of the emitter's velocity
  const magnitude = getMagnitude(velocity);

  // New velocity based off of the calculated angle and magnitude
  const newVelocity = fromAngle(angle, magnitude);

  // return our new Particle in the initialPosition without acceleration
  return Particle(newVelocity, acceleration, id, initPosition);
};

export default emitParticle;
