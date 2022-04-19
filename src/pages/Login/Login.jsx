import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loadingScreen: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ userName: value });
  }

  userSet = () => {
    const { userName } = this.state;
    this.setState({ loadingScreen: true }, async () => {
      await createUser({ name: userName });
      this.setState({ loadingScreen: false, logged: true });
    });
  }

  render() {
    const { userName, loadingScreen, logged } = this.state;
    const min = 3;

    return (
      <div data-testid="page-login">
        {
          logged ? <Redirect to="/search" /> : ''
        }
        <form action="">
          <label htmlFor="userName">
            Nome:
            <input
              name="userName"
              type="text"
              onChange={ this.handleChange }
              value={ userName }
              data-testid="login-name-input"
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ userName.length < min }
            onClick={ this.userSet }
          >
            Entrar
          </button>
        </form>
        {
          loadingScreen ? <Loading /> : ''
        }
      </div>
    );
  }
}

export default Login;
