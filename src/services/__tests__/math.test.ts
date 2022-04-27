import { soma } from "../math";

describe('math', () => {
  it('deve calcular a soma de dois valores', () => {
    expect(soma(10, 20)).toBe(30);
  });

  it('deve calcular a soma de valores negativos', () => {
    expect(soma(-10, 10)).toBe(0);
  });
});