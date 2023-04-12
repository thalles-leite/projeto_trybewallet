import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpenseWallet, removeExpenseWallet } from '../redux/actions';

class Table extends Component {
  itemRemove = (expensParam) => {
    const { dispatch } = this.props;
    dispatch(removeExpenseWallet(expensParam));
  };

  render() {
    const { expenses, dispatch } = this.props;
    return (
      <>
        <div>Table</div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => {
                const { exchangeRates } = expense;
                const currencyName = Object.entries(exchangeRates)
                  .find((exange) => exange[0] === expense.currency);
                const convertedValue = expense.value * currencyName[1].ask;
                const valor = expense.value;

                return (
                  <tr key={ expense.id }>
                    <td>{expense.description}</td>
                    <td>{expense.tag}</td>
                    <td>{expense.method}</td>
                    <td>{parseFloat(valor).toFixed(2)}</td>
                    <td>{currencyName[1].name}</td>
                    <td>{parseFloat(currencyName[1].ask).toFixed(2)}</td>
                    <td>{convertedValue.toFixed(2)}</td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => this.itemRemove(expense) }
                      >
                        Excluir
                      </button>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        onClick={ () => { dispatch(editExpenseWallet(expense)); } }
                      >
                        Editar despesa
                      </button>

                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>

      </>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
