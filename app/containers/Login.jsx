import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin } from 'actions/users';
import styles from 'scss/components/_login';

const cx = classNames.bind(styles);

@connect(state => ({
  user: state.user
}))
export default class Login extends Component {

  onLoginSubmit() {
    const { dispatch } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    dispatch(manualLogin({
      email: email,
      password: password
    }));
  }

  render() {
    const { authenticated, isWaiting } = this.props.user;
    if (authenticated) {
      return (
        <h1 className={cx('login__header')}>You are logged in amigo</h1>
      );
    }

    if (isWaiting) {
      return (
        <h1 className={cx('login__header')}>Waiting ...</h1>
      );
    }

    return (
      <div className={cx('login__container')}>
        <h1 className={cx('login__header')}>Email Login Demo</h1>
        <fieldset className={cx('login__fieldset')}>
            <input className={cx('login__input')}
              type="email"
              ref="email"
              placeholder="email" />
            <input className={cx('login__input')}
              type="password"
              ref="password"
              placeholder="password" />
            <button className={cx('login__button', 'login__button--green')}
              onClick={::this.onLoginSubmit}>Login</button>
            <p className={cx('login__hint')}>Hint: email: example@ninja.com password: ninja</p>
        </fieldset>
        <h1 className={cx('login__header')}>Google Login Demo</h1>
        <fieldset className={cx('login__fieldset')}>
          <a className={cx('login__button', 'login__button--green')}
            href="/auth/google">Login with Google</a>
        </fieldset>
      </div>
    );
  }
}
