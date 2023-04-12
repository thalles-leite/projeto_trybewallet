import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import Wallet from './pages/Wallet';
import { renderWithRouterAndRedux } from './tests/helpers/renderWith';

describe('Página de login', () => {
  it('Testar se ao renderizar a página dois campos de inputs aparecerão na tela', () => {
    renderWithRouterAndRedux(<App />);

    const loginTitle = screen.getByRole('heading', {
      name: /faça o login/i,
    });

    expect(loginTitle).toBeInTheDocument();
  });

  it('Testa se o botão só habilita se os campos estiverem corretos', () => {
    const correctUser = 'teste@teste.com';
    const correcTPassword = '1234566';

    renderWithRouterAndRedux(<App />);

    const enterButton = screen.getByRole('button', {
      name: /entrar/i,
    });

    const emailField = screen.getByRole('textbox', {
      name: /digite seu e-mail:/i,
    });

    const passwordField = screen.getByLabelText(/digite sua senha/i);

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();

    expect(enterButton).toBeDisabled();

    userEvent.type(emailField, correctUser);

    expect(enterButton).toBeDisabled();
    userEvent.type(passwordField, correcTPassword);
    expect(enterButton).not.toBeDisabled();
    userEvent.click(enterButton);
  });

  it('Verifica se o e-mail está aparecendo no header', () => {
    const initialState = {
      user: {
        email: 'teste@teste.com',
      },
    };
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const emailElement = screen.getByText(/email: teste@teste.com/i);

    expect(emailElement).toBeInTheDocument();
  });

  it('Verifica comportamento do formulário e tabela', async () => {
    renderWithRouterAndRedux(<Wallet />);

    await waitFor(() => {
      const selectElement = screen.getByTestId('currency-input');
      expect(selectElement).toBeInTheDocument();

      // Seleciona o primeiro elemento do selectElement
      const firstOption = selectElement.querySelector('option:first-of-type');
      expect(firstOption.value).toBe('USD');
    });

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const buttonAdd = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueInput, '12');
    userEvent.type(descriptionInput, 'Lanche');

    userEvent.click(buttonAdd);

    userEvent.type(valueInput, '24');
    userEvent.type(descriptionInput, 'Carne');

    userEvent.click(buttonAdd);

    await waitFor(() => {
      const decFirst = screen.getByRole('cell', {
        name: /lanche/i,
      });

      const valueFirst = screen.getByRole('cell', {
        name: /12.00/i,
      });

      expect(decFirst).toBeInTheDocument();
      expect(valueFirst).toBeInTheDocument();
      const deleteButton = screen.getByTestId('delete-btn');

      userEvent.click(deleteButton);
    });
  });
});
