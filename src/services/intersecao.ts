export const intersecao = <T,>(array1: T[], array2: T[]): T[] => {
  const retorno: T[] = [];
  for (const item1 of array1) {
    for (const item2 of array2) {
      if (item1 === item2) {
        retorno.push(item1);
        break;
      }
    }
  }

  return retorno;
}