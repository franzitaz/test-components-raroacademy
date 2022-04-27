import { screen } from "@testing-library/react";
import { setValorInput } from "./setValorInput";

type Dados = {
  name: string;
  email: string;
  password: string;
  codeAccess: string;
};

export const preencheFormCorretamente = (dados: Dados) => {
  const name = screen.getByPlaceholderText('Nome');
  const email = screen.getByPlaceholderText('e-mail');
  const password = screen.getByPlaceholderText('Senha');
  const confirmPassword = screen.getByPlaceholderText('Confirmação de Senha');
  const codeAccess = screen.getByPlaceholderText('Código de Acesso');

  // construcao
  setValorInput(name, dados.name);
  setValorInput(email, dados.email);
  setValorInput(password, dados.password);
  setValorInput(confirmPassword, dados.password);
  setValorInput(codeAccess, dados.codeAccess);
};
