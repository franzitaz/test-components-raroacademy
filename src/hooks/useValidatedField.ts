import { ChangeEvent, FocusEvent, useCallback, useMemo, useState } from "react";
import { InputProps } from "../components/Input";

export type ValidationFn = (value: string) => string[];
export const useValidatedField = (validationFn: ValidationFn): Partial<InputProps> => {
  const [value, setValue] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const isValid = useMemo(() => {
    return errors.length === 0 && value.length > 0;
  }, [errors.length, value.length]);

  const onBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
    setErrors(validationFn(event.target.value));
  }, [validationFn]);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setErrors([]);
    setValue(event.target.value);
  }, []);

  return {
    value,
    onChange,
    onBlur,
    errors,
    isValid,
  };
};
