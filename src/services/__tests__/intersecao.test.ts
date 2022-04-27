import { intersecao } from '../intersecao';

describe('intersecao', () => {
  it('deve retornar uma intersecao vazia se não houver elementos coincidentes nos arrays', () => {
    // setup
    const array1 = [1, 2, 3];
    const array2 = [4, 5, 6];
    // construção
    const resultado = intersecao(array1, array2);
    // expectativas
    expect(resultado).toEqual([]);
  });

  it('deve retornar uma intersecao vazia se o primeiro conjunto for vazio', () => {
    // setup
    const array1: number[] = [];
    const array2 = [4, 5, 6];
    // construção
    const resultado = intersecao(array1, array2);
    // expectativas
    expect(resultado).toEqual([]);
  });

  it('deve retornar uma intersecao vazia se o segundo conjunto for vazio', () => {
    // setup
    const array1 = [1, 2, 3];
    const array2: number[] = [];
    // construção
    const resultado = intersecao(array1, array2);
    // expectativas
    expect(resultado).toEqual([]);
  });

  it('deve retornar o array de intersecao de dois conjuntos', () => {
    // setup
    const array1 = [1, 2, 3, 4, 5];
    const array2 = [4, 5, 6, 7];
    // construção
    const resultado = intersecao(array1, array2);
    // expectativas
    expect(resultado).toEqual([4, 5]);
  });

  it('deve operar intersecao de tipos não numericos', () => {
    // setup
    const array1 = ['Paulo', 'Koba', 'Larissa', 'Pedro'];
    const array2 = ['Koba', 'Larissa', 'Pedro', 'Mauricio'];
    // construção
    const resultado = intersecao(array1, array2);
    // expectativas
    expect(resultado).toEqual(['Koba', 'Larissa', 'Pedro']);
  });
});