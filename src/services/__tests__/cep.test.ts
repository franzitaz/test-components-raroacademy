import { buscaEnderecoPorCEP, URL } from "../cep";
import axios from 'axios';
import faker from "@faker-js/faker";

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('cep', () => {
  beforeEach(jest.clearAllMocks);

  it('deve buscar um endereço através de seu cep', async () => {
    // setup
    const address = {
      cep: faker.address.zipCode(),
      address: faker.address.streetName()
    };
    mockedAxios.get.mockResolvedValue({data: address});

    // chamada
    const data = await buscaEnderecoPorCEP(address.cep);

    // asserts
    expect(axios.get).toHaveBeenCalledWith(URL.replace('[CEP]', address.cep));
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(data).toEqual(address);
  });

  it('deve lançar uma excessão caso a API retorne que não encontrou um endereço', async () => {
    // setup
    const resposta = {
      erro: true
    };
    mockedAxios.get.mockResolvedValue({data: resposta});

    // chamada
    await expect(buscaEnderecoPorCEP(faker.address.zipCode()))
      .rejects
      .toThrow('CEP não encontrado');
  });

  it('deve lançar uma excessão caso a API retorne um erro', async () => {
    // setup
    mockedAxios.get.mockRejectedValue('qualquer erro');

    // chamada
    await expect(buscaEnderecoPorCEP(faker.address.zipCode()))
      .rejects
      .toThrow('CEP não encontrado');
  });
});
