import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const arrayExpenses = Object.entries(expenses);

    const totalExpenses = arrayExpenses.reduce((acc, curr) => {
      const { value, currency, exchangeRates } = curr[1];
      const { ask } = exchangeRates[currency];
      return (acc + (value * ask));
    }, 0);

    return (
      <>
        <div>Header</div>

        <>
          <div data-testid="email-field">
            Email: &nbsp;
            {email}
          </div>

          Despesas totais: &nbsp;
          <div data-testid="total-field">
            {totalExpenses.toFixed(2)}
          </div>
          <div data-testid="header-currency-field">BRL</div>
        </>

      </>

    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  expenses: store.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({

  }).isRequired,

};

export default connect(mapStateToProps)(Header);
