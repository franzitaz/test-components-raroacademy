import { screen } from "@testing-library/react";
import { setValorInput } from "./setValorInput";

export const validaErroNaoApresentadoEmTela = (
  input: HTMLElement,
  value: string,
  mensagem: string
) => {
  setValorInput(input, value);
  const validacao = screen.queryByText(mensagem);
  expect(validacao).not.toBeInTheDocument();
};
