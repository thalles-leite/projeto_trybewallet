import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import Wallet from './pages/Wallet';
import { renderWithRouterAndRedux } from './tests/helpers/renderWith';

describe('Página de login', () => {
  it('Testar se ao renderizar a página dois campos de inputs aparecerão na tela', () => {
    renderWithRouterAndRedux(<App />);

    const loginTitle = screen.getByRole('heading', {
      name: /login/i,
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
      name: /seu e-mail/i,
    });

    const passwordField = screen.getByLabelText(/sua senha/i);

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

  it('Verifica a edição', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const newValue = '200';

    await waitFor(() => {
      const selectElement = screen.getByTestId('currency-input');
      expect(selectElement).toBeInTheDocument();

      // Seleciona o primeiro elemento do selectElement
      const firstOption = selectElement.querySelector('option:first-of-type');
      expect(firstOption.value).toBe('USD');
    });

    const valueInput = screen.getAllByRole('textbox')[0];
    const descriptionInput = screen.getByTestId('description-input');
    const buttonAdd = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueInput, '12');
    userEvent.type(descriptionInput, 'Lanche');

    userEvent.click(buttonAdd);

    await waitFor(() => {
      const editButton = screen.getByRole('button', {
        name: /editar despesa/i,
      });
      expect(editButton).toBeInTheDocument();
      userEvent.click(editButton);
    });

    const valueInput2 = screen.getByTestId('value-input');
    expect(valueInput2.value).toBe('12');

    userEvent.clear(valueInput2);
    userEvent.type(valueInput2, newValue);
    const buttonEdit = screen.getAllByRole('button', {
      name: /editar despesa/i,
    });

    expect(buttonEdit).toHaveLength(2);
    userEvent.click(buttonEdit[0]);

    const newValueUpdated = screen.getByRole('cell', {
      name: /200.00/i,
    });

    expect(newValueUpdated).toBeInTheDocument();
  });
});
