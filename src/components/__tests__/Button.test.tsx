import { Button } from '../Button';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

describe('Button', () => {  
  let texto: string;
  let onClick: () => void;
  let onLoad: () => void;
  
  beforeEach(jest.clearAllMocks);

  const makeSUT = (disabled = false) => {
    texto = faker.lorem.word();
    onClick = jest.fn();
    onLoad = jest.fn();

    return render(
      <Button
        disabled={disabled}
        onClick={ onClick }
        onLoad={ onLoad }
      >{ texto }</Button>
    )
  }

  it('deve ter um texto renderizado',  () => {
    makeSUT();
    screen.getByText(texto);
  });

  it('Deve chamar o callback de onclick quando clicado',  () => {
    makeSUT();
    const button = screen.getByText(texto);
    button.click();

    expect(onClick).toHaveBeenCalled();
  });

  it('Não deve chamar o callback de onclick quando estiver inativo',  () => {
    makeSUT(true);
    const button = screen.getByText(texto);
    expect(button).toBeDisabled();
  });
});
