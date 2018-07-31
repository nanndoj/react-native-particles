//@flow
import { Particle } from './../entities/Particle';
import { add } from './vector-helpers';

import type { ParticleType } from './../entities/Particle';

export const move = (particle: ParticleType): ParticleType => {
  // Calculate the velocity by adding acceleration
  const velocity = add(particle.velocity, particle.acceleration);

  // Calculate the new position
  const position = add(particle.position, velocity);

  return Particle(velocity, particle.acceleration, particle.id, position);
};

export default Particle;
