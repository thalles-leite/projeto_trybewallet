import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  IconButton,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { editExpenseWallet, removeExpenseWallet } from '../redux/actions';

class CardComponent extends Component {
  itemRemove = (expensParam) => {
    const { dispatch } = this.props;
    dispatch(removeExpenseWallet(expensParam));
  };

  render() {
    const { expenses, dispatch } = this.props;
    return (
      <Container>

        <Grid container spacing={1}>
          {expenses.map((expense) => {
            const {
              id, description, method, tag,
            } = expense;
            const { exchangeRates } = expense;
            const currencyName = Object
              .entries(exchangeRates).find((exange) => exange[0] === expense.currency);
            const convertedValue = expense.value * currencyName[1].ask;
            const valor = expense.value;

            return (
              <Grid
                key={id}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}

              >
                <Card>
                  <CardContent>
                    <Typography variant="h6">{description}</Typography>
                    <Typography variant="subtitle1">{tag}</Typography>
                    <Typography variant="subtitle1">{method}</Typography>
                    <Typography variant="h6">{parseFloat(valor).toFixed(2)}</Typography>
                    <Typography variant="subtitle1">{currencyName[1].name}</Typography>
                    <Typography
                      variant="subtitle1"
                    >
                      {parseFloat(currencyName[1].ask).toFixed(2)}

                    </Typography>
                    <Typography variant="h6">{convertedValue.toFixed(2)}</Typography>
                    <Typography variant="subtitle1">Real</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      type="button"
                      onClick={() => this.itemRemove(expense)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      type="button"
                      onClick={() => { dispatch(editExpenseWallet(expense)); }}
                      color="warning"
                    >
                      <EditIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

CardComponent.propTypes = {
  expenses: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,

};

export default connect(mapStateToProps)(CardComponent);
