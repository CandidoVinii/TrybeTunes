import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import './profile-edit.css';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      redirect: false,
      disabled: true,
      name: '',
      email: '',
      image: '',
      description: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    const { name, email, description, image } = user;
    this.setState({
      loading: false,
      name,
      email,
      description,
      image,
    });
    this.validation();
  }

  validation = () => {
    const {
      name,
      email,
      image,
      description,
    } = this.state;
    const regex = /\S+@\S+\.\S+/;
    if (name && regex.test(email) && description && image) {
      return this.setState({
        disabled: false,
      });
    }
  }

  handleClick = async () => {
    this.setState({ loading: true });
    const {
      name,
      email,
      description,
      image,
    } = this.state;
    const userInfo = {
      name,
      email,
      description,
      image,
    };
    await updateUser(userInfo);
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
    this.validation();
  }

  render() {
    const {
      disabled,
      loading,
      redirect,
      name,
      email,
      image,
      description,
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          redirect ? <Redirect to="/profile" />
            : ''
        }
        {
          loading ? <Loading />
            : (
              <form className='div-edit'>
                <img
                src={ image }
                className="img-perfil"
                alt={ name } 
                />
                <input
                  value={ image }
                  onChange={ this.handleChange }
                  name="image"
                  type="text"
                  className="img-input"
                  placeholder="Coloque a URL da foto aqui"
                  data-testid="edit-input-image"
                />
                <label htmlFor="name">
                  Nome
                </label>
                  <input
                    onChange={ this.handleChange }
                    value={ name }
                    name="name"
                    className="name-input"
                    type="text"
                    placeholder="Digite seu nome aqui"
                    data-testid="edit-input-name"
                  />
                
                <label htmlFor="email">
                  Email
                </label>
                  <input
                    onChange={ this.handleChange }
                    value={ email }
                    name="email"
                    className="email-input"
                    type="text"
                    placeholder="Digite seu email aqui"
                    data-testid="edit-input-email"
                  />
                <label htmlFor="description">
                  Descrição:
                </label>
                  <textarea
                    onChange={ this.handleChange }
                    value={ description }
                    name="description"
                    placeholder="Sobre mim"
                    className="description-input"
                    data-testid="edit-input-description"
                  />
                <button
                  type="button"
                  data-testid="edit-button-save"
                  className="button-save"
                  disabled={ disabled }
                  onClick={ this.handleClick }
                >
                  Salvar perfil
                </button>
              </form>
            )
        }
      </div>
    );
  }
}

export default ProfileEdit;
