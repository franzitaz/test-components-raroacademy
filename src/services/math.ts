export const soma = (a: number, b: number) => {
  return a + b;
};

export const funcaoQuadratica = (
  a: number, b: number, c: number
): number[] | null => {
  const delta = Math.pow(b, 2) - (4 * a * c);
  const x1 = (-b + Math.sqrt(delta)) / (2 * a);
  const x2 = (-b - Math.sqrt(delta)) / (2 * a);

  if (a === 0 || delta < 0) {
    return null;
  }

  if (delta === 0) {
    return [x1];
  }

  return [x1, x2];
};
