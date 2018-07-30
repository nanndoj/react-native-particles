//@flow

import emitParticle from '../emit-particle';
import { Vector } from '../../entities/Vector';

describe('Emit Particles', () => {
  it('should emmit new particles', () => {
    const particle = emitParticle(
      Vector(0, 0), // Initial position
      Vector(2, 2), // Velocity
      null, // Spread angle (in radians)
      Vector(1, 1), // Acceleration
      1 // Unique particle id
    );
    expect(particle).toBeTruthy();
  });

  it('The particle velocity should be randomized along the spread angle ', () => {
    const velocity = Vector(2, 2);

    const particle = emitParticle(
      Vector(0, 0), // Initial position
      velocity, // Velocity
      1.2, // Spread angle (in radians)
      Vector(1, 1), // Acceleration
      1 // Unique particle id
    );
    expect(particle.velocity).not.toEqual(velocity);
  });
});
