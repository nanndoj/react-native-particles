//@flow

import { Vector } from '../../entities/Vector';
import { Particle } from '../../entities/Particle';
import { move } from '../move-particle';

describe('Move Particles', () => {
  it('should calculate the new particle position by applying velocity', () => {
    const velocity = Vector(2, 3);
    const acceleration = Vector(2, 1);
    // The new velocity should be v(4,4) after applying the acceleration
    const position = Vector(3, 8);

    const particle = Particle(velocity, acceleration, 1, position);

    expect(move(particle).position).toEqual(Vector(7, 12));
  });

  it('should keep the same velocity when not accelerating', () => {
    const velocity = Vector(2, 3);
    const acceleration = Vector(0, 0); // No acceleration
    const position = Vector(3, 8);

    const particle = Particle(velocity, acceleration, 1, position);

    expect(move(particle).velocity).toEqual(Vector(2, 3));
  });

  it('should increase the velocity when accelerating', () => {
    const velocity = Vector(2, 3);
    const acceleration = Vector(8, 4); // Accelerating
    const position = Vector(3, 8);

    const particle = Particle(velocity, acceleration, 1, position);

    expect(move(particle).velocity).toEqual(Vector(10, 7));
  });

  it('should not modify the original particle object', () => {
    const velocity = Vector(2, 3);
    const acceleration = Vector(8, 4); // Accelerating
    const position = Vector(3, 8);

    const particle = Particle(velocity, acceleration, 1, position);

    move(particle);

    expect(particle.position).toEqual(position);
  });

  it('should reduce the velocity when breaking', () => {
    const velocity = Vector(2, 3);
    const acceleration = Vector(-5, -2); // Breaking
    const position = Vector(3, 8);

    const particle = Particle(velocity, acceleration, 1, position);

    expect(move(particle).velocity).toEqual(Vector(-3, 1));
  });
});
