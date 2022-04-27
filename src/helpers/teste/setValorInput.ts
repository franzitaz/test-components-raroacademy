import { fireEvent } from "@testing-library/react";

export const setValorInput = (
  input: HTMLElement,
  value: string,
) => {
  fireEvent.change(input, { target: { value }});
  fireEvent.blur(input);
};
