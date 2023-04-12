import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
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
});
