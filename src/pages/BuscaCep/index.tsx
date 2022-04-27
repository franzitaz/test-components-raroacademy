import { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { buscaEnderecoPorCEP, Endereco } from "../../services/cep";

export const BuscaCep = () => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState<Endereco>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const buscarCep = async () => {
    setLoading(true);

    try {
      const endereco = await buscaEnderecoPorCEP(cep);
      setLoading(false);
      setEndereco(endereco);
    } catch (error: any) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          <Input
            label="cep"
            name="cep"
            value={cep}
            placeholder="Digite o CEP"
            onChange={ev => setCep(ev?.target.value ?? '')}
          />
          <Button onClick={() => buscarCep()}>
            { loading ? 'Carregando...' : 'buscar por CEP' }
          </Button>
        </div>

        {
          !loading && endereco?.cep ?
            (
              <pre data-testid="resultado-busca-cep"
                className="mt-10 text-gray-500 text-2xl font-medium">
                { JSON.stringify(endereco, null, 2) }
              </pre>
            ) :
            <></>
        }

        {
          !loading && error ?
          (
            <h1 data-testid="erro"
              className="mt-10 text-red-500 text-2xl font-medium text-center">
              { error }
            </h1>
          ) :
            <></>
        }
      </div>
    </div>
  )
}
