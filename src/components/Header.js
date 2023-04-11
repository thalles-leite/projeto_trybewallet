import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <>
        <div>Header</div>
        {email && (
          <>
            <div data-testid="email-field">{email}</div>
            <div data-testid="total-field">0</div>
            <div data-testid="header-currency-field">BRL</div>
          </>
        )}
      </>

    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
});

export default connect(mapStateToProps)(Header);
