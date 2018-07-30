//@flow
export type VectorType = {
  x: number,
  y: number
};

// Constructor helper
export const Vector = (x: number = 0, y: number = 0): VectorType => ({ x, y });
