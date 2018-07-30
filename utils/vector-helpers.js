// Gets the length of the vector
import { Vector } from './../entities/Vector';
import type { VectorType } from './../entities/Vector';

export const getMagnitude = (vector: VectorType): number =>
  Math.sqrt(vector.x * vector.x + vector.y * vector.y);

// Add a vector to another
export const add = (vectorA: VectorType, vectorB: VectorType): VectorType =>
  Vector(vectorA.x + vectorB.x, vectorA.y + vectorB.y);

// Gets the angle accounting for the quadrant we're in
export const getAngle = (vector: VectorType): number =>
  Math.atan2(vector.y, vector.x);

// Allows us to get a new vector from angle and magnitude
export const fromAngle = (angle: number, magnitude: number): VectorType =>
  Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));

export const toRadians = (angle: number): number => angle * (Math.PI / 180);
export const toDegrees = (radians: number): number => (radians * 180) / Math.PI;
