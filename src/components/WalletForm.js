import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
      <>
        <div>WalletForm</div>

        <input
          name="value"
          type="text"
          data-testid="value-input"
          placeholder="valor"
          value={ value }
          onChange={ this.handleChange }
        />

        <input
          type="text"
          data-testid="description-input"
          name="description"
          placeholder="descrição"
          value={ description }
          onChange={ this.handleChange }
        />

        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currencies && (
            currencies.map((currencie, index) => (
              <option key={ index } value={ currencie }>
                {currencie}
              </option>
            ))
          )}
        </select>

        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        {editor ? (
          <button
            type="button"
            onClick={ () => {
              dispatch(updateExpenseWallet(
                { id: idToEdit, value, description, currency, method, tag },
              ));
              this.setState(INITIAL_STATE);
            } }
          >
            Editar despesa
          </button>
        )
          : (
            <button
              type="button"
              onClick={ () => {
                dispatch(
                  fetchCurrentValue({
                    value, description, currency, method, tag }, expenses),
                );
                this.setState(INITIAL_STATE);
              } }
            >
              Adicionar despesa

            </button>)}
      </>
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
