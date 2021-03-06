import axios, { AxiosError } from "axios";
import { FormEvent, useCallback, useMemo, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { campoObrigatorio } from "../../helpers/validators/campoObrigatorio";
import { emailValido } from "../../helpers/validators/emailValido";
import { senhaValida } from "../../helpers/validators/senhaValida";
import { useValidatedField } from "../../hooks/useValidatedField";

export const Cadastro = () => {
  const [statusEnvio, setStatusEnvio] = useState({ errored: false, mensagem: "" });
  const name = useValidatedField(campoObrigatorio('Nome'));
  const email = useValidatedField(emailValido('E-mail'));
  const codeAccess = useValidatedField(campoObrigatorio('Codigo Acesso'));
  const password = useValidatedField(senhaValida('Senha'));
  const validaConfirmacaoSenha = useCallback((value: string) => {
    if (value !== password.value) {
      return ['Senhas não conferem'];
    }

    return [];

  }, [password.value]);
  const confirmPassword = useValidatedField(validaConfirmacaoSenha);

  const formValido = useMemo(() =>
    name.isValid &&
    email.isValid &&
    codeAccess.isValid &&
    password.isValid &&
    confirmPassword.isValid
  , [codeAccess.isValid, confirmPassword.isValid, email.isValid, name.isValid, password.isValid]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = {
      name: name.value,
      email: email.value,
      password: password.value,
      codeAccess: codeAccess.value
    };

    try {
      await axios.post(
        'https://3.221.159.196:3320/auth/cadastrar',
        user
        );
        setStatusEnvio({ errored: false, mensagem: 'Cadastro realizado com sucesso' });
    } catch (error) {
      console.log(error);
      const err = error as AxiosError;
      const mensagem = err.response?.data.message;
      setStatusEnvio({ errored: true, mensagem });
    }
  }

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          {statusEnvio.mensagem ? (
              statusEnvio.errored ?
              <p className="text-center text-red-500">{statusEnvio.mensagem}</p> :
              <p className="text-center text-green-500">{statusEnvio.mensagem}</p>
            ) :
            <></>
          }
          <form onSubmit={onSubmit}>
            <div className="mb-5">
              <Input
                label="Nome"
                name="nome"
                placeholder="Nome"
                type="text"
                {...name}
              />
            </div>

            <div className="mb-5">
              <Input
                label="e-mail"
                name="email"
                placeholder="e-mail"
                type="email"
                {...email}
              />
            </div>

            <div className="mb-5">
              <Input
                label="Senha"
                name="senha"
                placeholder="Senha"
                type="password"
                {...password}
              />
            </div>

            <div className="mb-5">
              <Input
                label="Confirmação de Senha"
                name="confirmacaoSenha"
                placeholder="Confirmação de Senha"
                type="password"
                {...confirmPassword}
              />
            </div>

            <div className="mb-10">
              <Input
                label="Código Acesso"
                name="codigoAcesso"
                placeholder="Código de Acesso"
                type="text"
                {...codeAccess}
              />
            </div>

            <Button type="submit" disabled={!formValido}>
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
