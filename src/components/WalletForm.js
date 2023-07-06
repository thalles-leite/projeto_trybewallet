/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {

  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PaymentIcon from '@mui/icons-material/Payment';
import LabelIcon from '@mui/icons-material/Label';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import { green, orange } from '@mui/material/colors';
import { fetchCurrentValue, updateExpenseWallet } from '../redux/actions';

const INITIAL_STATE = {

  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: '',
  editing: false,
};
class WalletForm extends Component {
  state = INITIAL_STATE;

  componentDidUpdate(prevProps) {
    const { expenses, idToEdit } = this.props;
    const prevIdToEdit = prevProps.idToEdit;

    if (idToEdit !== prevIdToEdit) {
      const filteredExpense = expenses.find((expense) => expense.id === idToEdit);

      this.setState({
        value: filteredExpense.value,
        description: filteredExpense.description,
        currency: filteredExpense.currency,
        method: filteredExpense.method,
        tag: filteredExpense.tag,
        editing: true,
      });
    }
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { currencies, dispatch, expenses, editor, idToEdit } = this.props;
    const { editing } = this.state;
    const filteredExpense = expenses.find((expense) => expense.id === idToEdit);
    if (filteredExpense && !editing && editor) {
      this.setState({
        value: filteredExpense.value,
        description: filteredExpense.description,
        currency: filteredExpense.currency,
        method: filteredExpense.method,
        tag: filteredExpense.tag,
        editing: true,
      });
    }
    const { value, description, currency, method, tag } = this.state;
    return (
      <Container
        disableGutters
        sx={ {
          mt: { xs: 10, sm: 10 },
        } }
      >
        <Box
          sx={ {
            margin: 1,
            padding: 2,
          } }
          component={ Paper }
          elevation={ 3 }
        >
          <Grid
            container
            spacing={ 2 }
            columns={ {
              xs: 4, // 4 colunas até 600px
              sm: 6, // 6 colunas até 900px
              md: 13, // 12 colunas acima de 900px
            } }
          >
            <Grid item xs={ 2 } sm={ 2 } md={ 1.8 }>
              <TextField
                fullWidth
                required
                label="valor"
                name="value"
                inputProps={ {
                  'data-testid': 'value-input',
                } }
                value={ value }
                onChange={ this.handleChange }
              />
            </Grid>
            <Grid item xs={ 2 } sm={ 2 } md={ 2 }>
              <TextField
                label="descrição"
                fullWidth
                inputProps={ {
                  'data-testid': 'description-input',
                } }
                name="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </Grid>
            <Grid item xs={ 2 } sm={ 2 } md={ 2 }>
              <Select
                inputProps={ {
                  'data-testid': 'currency-input',
                } }
                name="currency"
                fullWidth
                value={ currency }
                onChange={ this.handleChange }
                // IconComponent={ CurrencyExchangeIcon }
                startAdornment={
                  <InputAdornment position="start">
                    <CurrencyExchangeIcon />
                  </InputAdornment>
                }
              >
                {currencies && (
                  currencies.map((currencie, index) => (
                    <MenuItem key={ index } value={ currencie }>
                      {currencie}
                    </MenuItem>
                  ))
                )}
              </Select>
            </Grid>
            <Grid item xs={ 2 } sm={ 2 } md={ 2 }>
              <Select
                fullWidth
                inputProps={ {
                  'data-testid': 'method-input',

                } }
                name="method"
                value={ method }
                onChange={ this.handleChange }
                startAdornment={
                  <InputAdornment position="start">
                    <PaymentIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="Dinheiro">Dinheiro</MenuItem>
                <MenuItem value="Cartão de crédito">Cartão de crédito</MenuItem>
                <MenuItem value="Cartão de débito">Cartão de débito</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={ 2 } sm={ 2 } md={ 2.2 }>
              <Select
                fullWidth
                inputProps={ {
                  'data-testid': 'tag-input',
                } }
                name="tag"
                value={ tag }
                onChange={ this.handleChange }
                startAdornment={
                  <InputAdornment position="start">
                    <LabelIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="Alimentação">Alimentação</MenuItem>
                <MenuItem value="Lazer">Lazer</MenuItem>
                <MenuItem value="Trabalho">Trabalho</MenuItem>
                <MenuItem value="Transporte">Transporte</MenuItem>
                <MenuItem value="Saúde">Saúde</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={ 2 } sm={ 2 } md={ 3 }>

              {editor ? (

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={ <TaskAltIcon /> }
                  type="button"
                  color="warning"
                  sx={ {
                    height: 1,
                  } }
                  onClick={ () => {
                    dispatch(updateExpenseWallet(
                      { id: idToEdit, value, description, currency, method, tag },
                    ));
                    this.setState(INITIAL_STATE);
                  } }
                >
                  Editar despesa
                </Button>
              )
                : (
                  <Button
                    variant="contained"
                    fullWidth
                    sx={ {
                      height: '100%',
                    } }
                    type="button"
                    startIcon={ <AddTaskIcon /> }
                    onClick={ () => {
                      dispatch(
                        fetchCurrentValue(
                          { value, description, currency, method, tag },
                          expenses,
                        ),
                      );
                      this.setState(INITIAL_STATE);
                    } }
                  >
                    Adicionar despesa

                  </Button>
                )}
            </Grid>

          </Grid>
        </Box>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,

});
WalletForm.propTypes = {
  currencies: PropTypes.string.isRequired,
  expenses: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps)(WalletForm);
