//@flow
import { Vector } from '../../entities/Vector';
import {
  add,
  fromAngle,
  getAngle,
  getMagnitude,
  toDegrees,
  toRadians
} from '../vector-helpers';

const round2Decimals = v => Math.round(v * 100) / 100;

describe('Vector Helpers', () => {
  it('Should add one vector to another', () => {
    const vector1 = Vector(2, 3);
    const vector2 = Vector(4, 6);

    expect(add(vector1, vector2)).toEqual(Vector(6, 9));
  });

  it('Should calculate the vector magnitude for 2D vectors', () => {
    // The magnitude of the vector v(4,-3) = 5
    const vector = Vector(4, -3);

    expect(getMagnitude(vector)).toEqual(5);
  });

  it('Should calculate the angle angle (degrees) for 2D vectors', () => {
    // The angle of the vector v(3, 4) is 53.13 degrees approximately
    const vector = Vector(3, 4);
    const angleInDegrees = Math.round(toDegrees(getAngle(vector)) * 100) / 100;
    expect(angleInDegrees).toEqual(53.13);
  });

  it('Should calculate the angle angle (in radians) for 2D vectors', () => {
    // The angle of the vector v(3, 4) is 0.93 radians approximately
    const vector = Vector(3, 4);
    const angleInRadians = round2Decimals(getAngle(vector));
    expect(angleInRadians).toEqual(0.93);
  });

  it('Should convert an angle from degrees to radians', () => {
    // 60 degrees is approximately 1.05 radians
    const angleInDegrees = 60;
    const angleInRadians = round2Decimals(toRadians(angleInDegrees));
    expect(angleInRadians).toEqual(1.05);
  });

  it('Should get a new vector based on the angle and magnitude', () => {
    // v() is the vector with 11 of magnitude and 105 degrees angle
    const magnitude = 11;
    const angleInDegrees = toRadians(105);

    const result = fromAngle(angleInDegrees, magnitude);

    // Created the approximated result
    const approximated = Vector(
      round2Decimals(result.x),
      round2Decimals(result.y)
    );

    expect(approximated).toEqual(Vector(-2.85, 10.63));
  });
});
