import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    console.log(this.props);
    return <div>TrybeWallet</div>;
  }
}
const mapStateToProps = (store) => ({
  email: store.user.email,
});

export default connect(mapStateToProps)(Wallet);
