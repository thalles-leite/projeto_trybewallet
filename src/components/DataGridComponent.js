import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Paper } from '@mui/material';
import { editExpenseWallet, removeExpenseWallet } from '../redux/actions';

const columns = [
  {
    field: 'id',
    headerName: 'ID',

    flex: 1 },
  {
    field: 'name',
    headerName: 'Name',
    flex: 3,

  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 4,

  },
  {
    field: 'price',
    headerName: 'Price',
    flex: 1,
    type: 'number',

  },
];

const products = [
  { id: 1, name: 'Product 1', description: 'Description 1', price: 10 },
  { id: 2, name: 'Product 2', description: 'Description 2', price: 20 },
  { id: 3, name: 'Product 3', description: 'Description 3', price: 30 },
  { id: 4, name: 'Product 4', description: 'Description 4', price: 40 },
  { id: 5, name: 'Product 5', description: 'Description 5', price: 50 },
  { id: 7, name: 'Product 1', description: 'Description 1', price: 10 },
  { id: 8, name: 'Product 2', description: 'Description 2', price: 20 },
  { id: 9, name: 'Product 3', description: 'Description 3', price: 30 },
  { id: 10, name: 'Product 4', description: 'Description 4', price: 40 },
  { id: 11, name: 'Product 5', description: 'Description 5', price: 50 },
  { id: 7, name: 'Product 1', description: 'Description 1', price: 10 },
  { id: 8, name: 'Product 2', description: 'Description 2', price: 20 },
  { id: 9, name: 'Product 3', description: 'Description 3', price: 30 },
  { id: 10, name: 'Product 4', description: 'Description 4', price: 40 },
  { id: 11, name: 'Product 5', description: 'Description 5', price: 50 },
  { id: 10, name: 'Product 4', description: 'Description 4', price: 40 },
  { id: 11, name: 'Product 5', description: 'Description 5', price: 50 },
  { id: 7, name: 'Product 1', description: 'Description 1', price: 10 },
  { id: 8, name: 'Product 2', description: 'Description 2', price: 20 },
  { id: 9, name: 'Product 3', description: 'Description 3', price: 30 },
  { id: 10, name: 'Product 4', description: 'Description 4', price: 40 },
  { id: 11, name: 'Product 5', description: 'Description 5', price: 50 },
];

class TableComponent extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <Container maxWidth="lg">
        <Paper elevation={ 3 } sx={ { margin: '5px', padding: '10px' } }>
          <div style={ { width: '100%' } }>
            <DataGrid
              autoHeight
              rows={ products }
              columns={ columns }
              pageSize={ 10 }
            />
          </div>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(TableComponent);
