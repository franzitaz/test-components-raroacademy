import { ValidationFn } from "../../hooks/useValidatedField";

export const senhaValida = (fieldLabel: string): ValidationFn => (value: string) => {
  const errors: string[] = [];

  if (value.length < 8) {
    errors.push(`${fieldLabel} deve ter ao menos 8 caracteres`);
  }

  if (!value.match(/[A-Z]/)) {
    errors.push(`${fieldLabel} deve conter pelo menos uma letra maiúscula`);
  }

  if (!value.match(/[a-z]/)) {
    errors.push(`${fieldLabel} deve conter pelo menos uma letra minúscula`);
  }

  if (!value.match(/\d/)) {
    errors.push(`${fieldLabel} deve conter pelo menos um número`);
  }

  if (!value.match(/[^A-Za-z0-9\s]/)) {
    errors.push(`${fieldLabel} deve conter pelo menos um caractere especial`);
  }

  return errors;
}
