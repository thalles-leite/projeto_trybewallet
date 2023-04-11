import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <>
        <div>WalletForm</div>
        <input type="text" data-testid="value-input" />
        <input type="text" data-testid="description-input" />
        <select data-testid="currency-input">
          {currencies && (
            currencies?.map((currencie, index) => (
              <option key={ index } value={ currencie }>
                {currencie}
              </option>
            ))
          )}
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>

        </select>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
