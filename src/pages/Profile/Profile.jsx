import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import { getUser } from '../../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      userName: '',
      userEmail: '',
      userImage: '',
      userDescription: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      loading: false,
      userName: user.name,
      userEmail: user.email,
      userImage: user.image,
      userDescription: user.description,
    });
    console.log(user);
  }

  render() {
    const {
      loading,
      userName,
      userEmail,
      userImage,
      userDescription,
    } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <div>
                <img
                  data-testid="profile-image"
                  src={ userImage }
                  alt={ userName }
                />
                <h1>
                  { userName }
                </h1>
                <p>
                  { userEmail }
                </p>
                <p>
                  { userDescription }
                </p>
                <Link exact to="/profile/edit">Editar perfil</Link>
              </div>
            )
        }
      </div>
    );
  }
}

export default Profile;
