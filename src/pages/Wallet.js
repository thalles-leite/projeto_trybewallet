import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fetchCurrencies } from '../redux/actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    return (
      <>
        <Header />
        <div> TrybeWallet </div>
        <WalletForm />
      </>
    );
  }
}
const mapStateToProps = (store) => ({});
export default connect(mapStateToProps)(Wallet);
