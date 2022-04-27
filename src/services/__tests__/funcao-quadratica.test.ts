import { funcaoQuadratica } from '../math';

describe('função quadrática', () => {
  it('deve retonar null se o delta negativo', () => {
    expect(funcaoQuadratica(7, 3, 4)).toBe(null);
  });

  it('deve retonar as duas raízes se o delta positivo', () => {
    const a = 4;
    const b = 2;
    const c = -6;

    const resposta = funcaoQuadratica(a, b, c);
    const expectativas = [1, -1.5];

    expect(resposta).toEqual(expectativas);
  });

  it('deve retonar uma raíz se o delta zero', () => {
    expect(funcaoQuadratica(25, -10, 1)).toEqual([0.2]);
  });
  
  it('deve acusar que não é uma função quadrática se o a === 0.', () => {
    expect(funcaoQuadratica(0, 2, 1)).toEqual(null);
  });
});