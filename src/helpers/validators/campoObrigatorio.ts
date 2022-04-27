import { ValidationFn } from "../../hooks/useValidatedField";

export const campoObrigatorio = (fieldLabel: string): ValidationFn => (value: string) => {
  if (value.trim().length === 0) {
    return [`${fieldLabel} é obrigatório`];
  }

  return [];
};
