/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Hidden,
  Icon,
  IconButton,
} from '@mui/material';
import Container from '@mui/material/Container';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { changeTheme } from '../redux/actions';

class Header extends Component {
  render() {
    const { email, expenses, theme, dispatch } = this.props;
    console.log(theme);
    const arrayExpenses = Object.entries(expenses);

    const totalExpenses = arrayExpenses.reduce((acc, curr) => {
      const { value, currency, exchangeRates } = curr[1];

      const { ask } = exchangeRates[currency];

      return (acc + (value * ask));
    }, 0);

    return (
      <AppBar>
        <Container>

          <Toolbar
            disableGutters
            sx={ {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingX: 2,
              paddingY: 1,
            } }
          >
            <Grid
              container
              spacing={ { xs: 0, md: 2 } }
              sx={ {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              } }
            >
              <Hidden smDown>
                <Grid
                  direction="row"
                  item
                  xs={ 12 }
                  sm={ 3 }
                  md={ 3 }

                >
                  <Link to="./">
                    <img
                      src={ Logo }
                      alt="Logo"
                      style={ {
                        maxWidth: '100%',
                        height: 'auto',
                        display: 'block',
                      } }
                    />
                  </Link>

                </Grid>
              </Hidden>
              <Grid
                direction="row"
                item
                xs={ 12 }
                sm={ 5 }
                md={ 5 }
                sx={ {
                  order: { xs: '2', sm: '1' },
                } }
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  sx={ {
                    alignItems: 'center',
                    fontSize: '0.8rem',
                  } }
                >
                  <Typography
                    variant="h5"
                    sx={ {
                      fontSize: { sm: '1rem' },

                    } }
                  >
                    Despesas totais: &nbsp;
                  </Typography>

                  <Typography
                    variant="h6"
                    data-testid="total-field"
                    sx={ {
                      fontSize: { sm: '1rem' },

                    } }
                  >
                    {totalExpenses.toFixed(2)}
                    &nbsp;BRL
                  </Typography>
                </Box>
              </Grid>

              <Grid
                item
                xs={ 12 }
                sm={ 4 }
                md={ 4 }
                sx={ {
                  order: { xs: '1', sm: '2' },
                } }
              >

                <Typography
                  data-testid="email-field"
                  textAlign="right"
                  variant="h7"
                  sx={ {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '0.9rem',
                  } }
                >
                  {email
                  && (
                    <Icon
                      sx={ {
                        mr: 1,
                        display: 'flex',
                      } }

                    >
                      <ContactMailIcon />
                    </Icon>)}
                  {email}
                </Typography>
              </Grid>

            </Grid>
            <IconButton
              sx={ {
                position: 'absolute',
                right: 2,

              } }
              onClick={ () => dispatch(changeTheme()) }
              color="inherit"
            >
              {theme === 'Dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </Container>

      </AppBar>

    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  expenses: store.wallet.expenses,
  theme: store.theme.theme,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({

  }).isRequired,

};

export default connect(mapStateToProps)(Header);
