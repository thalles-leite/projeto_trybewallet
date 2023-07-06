import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fetchCurrencies } from '../redux/actions';

import TableComponent from '../components/TableComponent';


class Wallet extends React.Component {
  state = {
    theme: 'Light',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  toogleTheme = () => {
    this.setState((prevState) => ({
      theme: prevState.theme === 'Dark' ? 'Light' : 'Dark',
    }));
  };

  render() {
    return (
      <>
        <Header />
        <WalletForm />
        <TableComponent />
        {/* <CardComponent /> */}
        {/* <DataGridComponent /> */}
      </>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Wallet);
