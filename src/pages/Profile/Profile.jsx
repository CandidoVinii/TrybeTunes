import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import { getUser } from '../../services/userAPI';
import './profile.css';

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
              <div className="div-profile">
                <img
                  className="img-perfil"
                  data-testid="profile-image"
                  src={ userImage }
                  alt={ userName }
                />
                <p className='profile-p'>Nome:</p>
                <strong>
                  { userName }
                </strong>
                <p className='profile-p'>Email:</p>
                <strong>
                  { userEmail }
                </strong>
                <p className='profile-p'>Descrição:</p>
                <strong>
                  { userDescription }
                </strong>
                <button className='editar-perfil'>
                  <Link className='link' exact to="/profile/edit">Editar perfil</Link>
                </button>
              </div>
            )
        }
      </div>
    );
  }
}

export default Profile;
