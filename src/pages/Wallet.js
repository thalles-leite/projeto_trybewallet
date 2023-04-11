import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div> TrybeWallet </div>
      </>
    );
  }
}
const mapStateToProps = (store) => ({
  email: store.user.email,
});

export default connect(mapStateToProps)(Wallet);
