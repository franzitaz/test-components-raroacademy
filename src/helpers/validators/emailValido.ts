import { ValidationFn } from "../../hooks/useValidatedField";
import { campoObrigatorio } from "./campoObrigatorio";

export const emailValido = (fieldLabel: string): ValidationFn => (value: string) => {
  const errors = campoObrigatorio(fieldLabel)(value);
  // baseado na resposta encontrada em
  // https://stackoverflow.com/a/46181
  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  if (!validateEmail(value)) {
    errors.push('Formato de e-mail inválido');
  }

  return errors;
}
