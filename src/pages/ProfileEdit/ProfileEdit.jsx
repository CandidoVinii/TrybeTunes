import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';

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
              <form action="">
                <label htmlFor="name">
                  Nome:
                  <input
                    onChange={ this.handleChange }
                    value={ name }
                    name="name"
                    type="text"
                    placeholder="Digite seu nome aqui"
                    data-testid="edit-input-name"
                  />
                </label>
                <label htmlFor="email">
                  Email:
                  <input
                    onChange={ this.handleChange }
                    value={ email }
                    name="email"
                    type="text"
                    placeholder="Digite seu email aqui"
                    data-testid="edit-input-email"
                  />
                </label>
                <label htmlFor="description">
                  Descrição:
                  <textarea
                    onChange={ this.handleChange }
                    value={ description }
                    name="description"
                    data-testid="edit-input-description"
                  />
                </label>
                <label htmlFor="image">
                  Foto:
                  <input
                    value={ image }
                    onChange={ this.handleChange }
                    name="image"
                    type="text"
                    placeholder="Coloque a URL da foto aqui"
                    data-testid="edit-input-image"
                  />
                </label>
                <button
                  type="button"
                  data-testid="edit-button-save"
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
