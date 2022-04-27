import { fireEvent, screen } from "@testing-library/react";

export const validaErroApresentadoEmTela = (
  input: HTMLElement,
  mensagem: string
) => {
  fireEvent.blur(input);
  screen.getByText(mensagem);
};
