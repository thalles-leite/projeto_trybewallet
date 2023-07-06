/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  TableContainer,
  Box,
  Container,
  Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { editExpenseWallet, removeExpenseWallet } from '../redux/actions';
import { Light } from '../themes/Light';

// const useStyles = makeStyles(() => ({
//   truncate: {
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     whiteSpace: 'nowrap',
//     maxWidth: 0,
//     backgroundColor: 'red',
//   },
// }));

class TableComponent extends Component {
  itemRemove = (expensParam) => {
    const { dispatch } = this.props;
    dispatch(removeExpenseWallet(expensParam));
  };

  render() {
    const { expenses, dispatch } = this.props;
    console.log(expenses);
    return (
      (expenses.length > 0) && (
        <Container>
          <Box sx={ { m: 1 } }>

            <TableContainer component={ Paper }>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Valor

                    </TableCell>
                    <TableCell>
                      Moeda

                    </TableCell>
                    <TableCell>
                      Descrição

                    </TableCell>
                    <TableCell>
                      Tag

                    </TableCell>
                    <TableCell>
                      Método de pagamento

                    </TableCell>

                    <TableCell>
                      Câmbio utilizado

                    </TableCell>
                    <TableCell>
                      Valor convertido

                    </TableCell>
                    <TableCell>
                      Moeda de conversão

                    </TableCell>
                    <TableCell>
                      Excluir/Editar

                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenses.map((expense) => {
                    const { id, description, method, tag } = expense;
                    const { exchangeRates } = expense;
                    const currencyName = Object
                      .entries(exchangeRates)
                      .find((exange) => exange[0] === expense.currency);
                    const convertedValue = expense.value * currencyName[1].ask;
                    const valor = expense.value;

                    return (
                      <TableRow key={ id }>
                        <TableCell
                          sx={ Light.nowrapClass }
                        >
                          {parseFloat(valor).toFixed(2)}

                        </TableCell>
                        <Tooltip title={ currencyName[1].name }>
                          <TableCell
                            sx={ { overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: '10em' } }
                          >
                            {currencyName[1].name}

                          </TableCell>
                        </Tooltip>
                        <TableCell>{description}</TableCell>
                        <TableCell>{tag}</TableCell>
                        <TableCell>{method}</TableCell>
                        <TableCell>
                          {parseFloat(currencyName[1].ask).toFixed(2)}

                        </TableCell>
                        <TableCell>{convertedValue.toFixed(2)}</TableCell>
                        <TableCell>Real</TableCell>
                        <TableCell>
                          <IconButton
                            type="button"
                            data-testid="delete-btn"
                            onClick={ () => this.itemRemove(expense) }
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            type="button"
                            data-testid="edit-btn"
                            onClick={ () => { dispatch(editExpenseWallet(expense)); } }
                            color="warning"
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      )
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

export default connect(mapStateToProps)(TableComponent);
