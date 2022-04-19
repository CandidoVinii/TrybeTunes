import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      getName: '',
    };
  }

  async componentDidMount() {
    const request = await getUser();
    this.setState({ getName: request.name, loading: false });
  }

  render() {
    const { getName, loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading
            ? <Loading />
            : ''
        }
        <p>
          <strong data-testid="header-user-name">{ getName }</strong>
        </p>
        <nav>
          <Link data-testid="link-to-search" exact to="/search">Search</Link>
          <Link data-testid="link-to-favorites" exact to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" exact to="/profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
