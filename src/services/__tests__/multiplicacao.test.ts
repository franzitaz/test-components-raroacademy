import * as math from '../math';

const multiplicacao = (a: number, b: number) => {
  let resultado = 0;
  for (let i = 0; i < b; i++) {
    resultado = math.soma(resultado, a);
  }

  return resultado;
};

describe('multiplicacao', () => {
  it('deve multiplicar dois numeros', () => {
    const a = 10;
    const b = 5;

    jest
      .spyOn(math, 'soma')
      .mockImplementation((elementA, elementB) => elementA + elementB)
    const resultado = multiplicacao(a, b);

    expect(resultado).toBe(50);
  });
});
