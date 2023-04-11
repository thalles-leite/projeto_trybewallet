import React from 'react';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { email, password } = this.state;
    const { history, user, dispatch } = this.props;
    const regEmail = /^\S+@\S+\.\S+$/;
    const validationEmail = regEmail.test(email);
    const MIN_PASSWORD = 6;

    return (
      <>
        <h1> Faça o login </h1>
        <label>
          Digite seu e-mail:&nbsp;
          <input
            type="email"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Digite sua senha
          <input
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ ((password.length < MIN_PASSWORD) || !validationEmail) }
          onClick={ () => {
            dispatch(addUser({ email, password }));
            history.push('/carteira');
          } }
        >
          Entrar

        </button>
      </>

    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Login);
