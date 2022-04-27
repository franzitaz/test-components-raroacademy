import { Cadastro } from '../Cadastro';

import { render, screen } from '@testing-library/react'
import faker from '@faker-js/faker';
import { validaErroApresentadoEmTela } from '../../helpers/teste/validaErroApresentadoEmTela';
import { validaErroNaoApresentadoEmTela } from '../../helpers/teste/validaErroNaoApresentadoEmTela';
import { setValorInput } from '../../helpers/teste/setValorInput';
import { preencheFormCorretamente } from '../../helpers/teste/preencheFormCorretamente';
import axios from 'axios';

const makeSut = () => {
  return render(
    <Cadastro />
  );
}

describe('Cadastro Page', () => {
  beforeEach(jest.clearAllMocks);
  beforeEach(makeSut);

  it('deve bloquear o submit caso os campos não estejam válidos', () => {
    // setup
    const button = screen.getByText('Cadastrar');
    // construcao do cenário e expects
    expect(button).toBeDisabled();
  });

  it('deve validar o formato de e-mail no cadastro', () => {
    const inputEmail = screen.getByPlaceholderText('e-mail');
    const emailWrong = 'teste@teste';
    const emailRight = faker.internet.email();
    const mensageValidation = 'Formato de e-mail inválido';

    setValorInput(inputEmail, emailWrong);
    screen.getByText(mensageValidation);
    validaErroNaoApresentadoEmTela(inputEmail, emailRight, mensageValidation);
  });

  describe('deve validar os critérios de aceitação da senha', () => {
    let input: HTMLElement;
    beforeEach(() => {
      input = screen.getByPlaceholderText('Senha');
    });

    it('senha deve ter 8 dígitos ou mais', () => {
      const value = faker.lorem.paragraph();
      const mensageValidation = 'Senha deve ter ao menos 8 caracteres';
      validaErroApresentadoEmTela(input, mensageValidation);
      validaErroNaoApresentadoEmTela(input, value, mensageValidation);
    });

    it('senha deve ter letra maiuscula', () => {
      const value = 'Teste';
      const mensageValidation = 'Senha deve conter pelo menos uma letra maiúscula';
      validaErroApresentadoEmTela(input, mensageValidation);
      validaErroNaoApresentadoEmTela(input, value, mensageValidation);
    });

    it('senha deve ter letra minúscula', () => {
      const value = 'Teste';
      const mensageValidation = 'Senha deve conter pelo menos uma letra minúscula';
      validaErroApresentadoEmTela(input, mensageValidation);
      validaErroNaoApresentadoEmTela(input, value, mensageValidation);
    });

    it('senha deve ter números', () => {
      const value = 'Teste 1';
      const mensageValidation = 'Senha deve conter pelo menos um número';
      validaErroApresentadoEmTela(input, mensageValidation);
      validaErroNaoApresentadoEmTela(input, value, mensageValidation);
    });

    it('senha deve ter caracteres especiais', () => {
      const value = 'Teste@1';
      const mensageValidation = 'Senha deve conter pelo menos um caractere especial';
      validaErroApresentadoEmTela(input, mensageValidation);
      validaErroNaoApresentadoEmTela(input, value, mensageValidation);
    });
  });

  it('deve garantir que senha e confirmação sejam iguais', () => {
    const password = screen.getByPlaceholderText('Senha');
    const passwordConfirmation = screen.getByPlaceholderText('Confirmação de Senha');
    const mensageValidation = 'Senhas não conferem';
    const passwordTest1 = 'Teste@1';
    const passwordTest2 = 'Teste@2';
    setValorInput(password, passwordTest1);
    setValorInput(passwordConfirmation, passwordTest2);

    screen.getByText(mensageValidation);
    validaErroNaoApresentadoEmTela(passwordConfirmation, passwordTest1, mensageValidation);
  });

  it('deve enviar o formulário se todos os dados estiverem preenchidos corretamente', () => {
    // setup
    jest.spyOn(axios, 'post').mockResolvedValue('ok');
    const dados = {
      nome: faker.name.firstName(),
      email: faker.internet.email(),
      senha: 'S3nh@!123',
      codigoAcesso: faker.lorem.paragraph(),
    };

    // construcao
    preencheFormCorretamente(dados);
    const button = screen.getByText('Cadastrar');
    button.click();

    // asserts
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/auth/cadastrar'),
      dados
    );
  });

  it('deve notificar o usuário que o cadastro foi efetuado com sucesso', async () => {
    // setup
    jest.spyOn(axios, 'post').mockResolvedValue('ok');
    const dados = {
      nome: faker.name.firstName(),
      email: faker.internet.email(),
      senha: 'S3nh@!123',
      codigoAcesso: faker.lorem.paragraph(),
    };

    // construcao
    preencheFormCorretamente(dados);
    const button = screen.getByText('Cadastrar');
    button.click();

    const mensageConfirmation = await screen.findByText('Cadastro realizado com sucesso');

    // asserts
    expect(mensageConfirmation).toBeInTheDocument();
  });

  it('deve apresentar os erros de validação para o usuário, caso a API retorne erro', async () => {
    // setup
    const mensageError = "Usuário já existe";
    jest.spyOn(axios, 'post').mockRejectedValue({
      response: {
        data: {
          statusCode: 400,
          message: mensageError,
          error: "Bad Request"
        },
      },
    });
    const dados = {
      nome: faker.name.firstName(),
      email: faker.internet.email(),
      senha: 'S3nh@!123',
      codigoAcesso: faker.lorem.paragraph(),
    };

    // construcao
    preencheFormCorretamente(dados);
    const button = screen.getByText('Cadastrar');
    button.click();

    const mensagem = await screen.findByText(mensageError);
    // asserts
    expect(mensagem).toBeInTheDocument();
  });
});
