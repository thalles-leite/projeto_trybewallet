import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrentValue } from '../redux/actions';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: '',
};
class WalletForm extends Component {
  state = INITIAL_STATE;

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { currencies, dispatch, expenses } = this.props;

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

        <button
          type="button"
          onClick={ () => {
            dispatch(fetchCurrentValue(this.state, expenses));
            this.setState(INITIAL_STATE);
          } }
        >
          Adicionar despesa

        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});
WalletForm.propTypes = {
  currencies: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(WalletForm);
