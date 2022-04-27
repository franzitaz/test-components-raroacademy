import axios from 'axios';

export const URL = 'https://viacep.com.br/ws/[CEP]/json/';

export type Endereco = {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
};

export const buscaEnderecoPorCEP = async (cep: string) => {
  try {
    const search = URL.replace('[CEP]', cep);
    const response = await axios.get<Endereco>(search);
    const endereco = response.data

    if (!endereco.cep) {
      throw new Error('CEP não encontrado');
    }

    return response.data;
  } catch (error) {
    throw new Error('CEP não encontrado');
  }
}
