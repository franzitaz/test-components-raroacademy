import React from "react";
import { classNames } from "../../helpers/classnames";

export interface InputProps extends
React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  isValid?: boolean;
  errors?: string[]
}

export const Input: React.FC<InputProps> = ({
  label,
  errors = [],
  isValid,
  ...inputProps
}) => {
  const labelError = errors.length > 0 ? 'text-red-700' : '';
  const inputBorderError = errors.length > 0 ? 'border-red-300 placeholder-red-400' : '';

  return (
    <div>
      <label htmlFor="email" className={
        classNames(
          labelError,
          "block text-sm font-medium text-gray-700"
        )
      }>
        { label }
      </label>
      <div className="mt-1">
        <input
          className={
            classNames(
              inputBorderError,
              `
                appearance-none block w-full px-3 py-2
                border border-gray-300 rounded-md shadow-sm
                placeholder-gray-400
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                sm:text-sm
              `
            )
          }
          {...inputProps}
        />
        {
          errors.length > 0 ?
          (
            errors.map(error => (
              <p className="mt-2 text-sm text-red-600" key={ error }>
                { error }
              </p>
            ))
          ) : <></>
        }
      </div>
    </div>
  );
}
