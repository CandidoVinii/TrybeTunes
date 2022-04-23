import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';
import './header.css';

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

        <div className="div-name">
          <div className='img-logo'>
            <hr />
          </div>
          {
          loading
            ? <Loading />
            : ''
          }
          <p
            data-testid="header-user-name"
            className="p-div"
          >
            { getName }
          </p>
        </div>
        <nav className="nav-header">
          <Link
            data-testid="link-to-search"
            exact
            to="/search"
            className="search-nav"
          >
            Search
          </Link>
          <Link
            data-testid="link-to-favorites"
            exact
            to="/favorites"
            className="favorites-nav"
          >
            Favorites
          </Link>
          <Link
            data-testid="link-to-profile"
            exact
            to="/profile"
            className="profile-nav"
          >
            Profile
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
