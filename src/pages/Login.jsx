import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  TextField,

} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import LoginIcon from '@mui/icons-material/Login';

import { addUser } from '../redux/actions';
import { Light } from '../themes/Light';
import Logo from '../assets/logo.svg';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  render() {
    const { email, password, showPassword } = this.state;
    const { history, dispatch } = this.props;
    const regEmail = /^\S+@\S+\.\S+$/;
    const validationEmail = regEmail.test(email);
    const MIN_PASSWORD = 6;

    return (
      <Container
        component="main"
        maxWidth="100vw"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: '100vh', backgroundColor: 'primary.main' }}
        >

          <Paper sx={Light.paper} elevation={10}>

            <Box display="flex" justifyContent="center">
              <img src={Logo} alt="logo" />
            </Box>

            <TextField
              autoFocus
              required
              inputProps={{
                'data-testid': 'email-input',
              }}
              id="outlined-required"
              label="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
              error={!validationEmail}
              helperText={!validationEmail && ('Email inválido')}
            />

            <OutlinedInput
              inputProps={{
                'data-testid': 'password-input',
              }}
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="Password"
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => this.handleClickShowPassword()}
                    onMouseDown={(event) => this.handleMouseDownPassword(event)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
            />

            <Button
              variant="contained"
              size="large"
              sx={{ height: 60 }}
              endIcon={<LoginIcon />}
              disabled={((password.length < MIN_PASSWORD) || !validationEmail)}
              onClick={() => {
                dispatch(addUser({ email, password }));
                history.push('/carteira');
              }}
            >
              Entrar
            </Button>

          </Paper>
        </Box>
      </Container>

    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

Login.propTypes = {
  history: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(Login);
