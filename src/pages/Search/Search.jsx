import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../Loading/Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ artistName: value });
  }

  setAlbum = () => {
    this.setState({ loading: true }, async () => {
      const { artistName } = this.state;
      const request = await searchAlbumsAPI(artistName);
      this.setState({
        search: artistName,
        artistName: '',
        loading: false,
        albuns: request,
      });
    });
  }

  render() {
    const { artistName, loading, search, albuns } = this.state;
    const min = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          {
            loading
              ? <Loading />
              : (
                <>
                  <input
                    type="text"
                    placeholder="Digite o nome do artista"
                    data-testid="search-artist-input"
                    onChange={ this.handleChange }
                    value={ artistName }
                  />
                  <button
                    type="button"
                    data-testid="search-artist-button"
                    disabled={ artistName.length < min }
                    onClick={ this.setAlbum }
                  >
                    Procurar
                  </button>
                </>
              )
          }

        </form>
        <div>
          {
            albuns
              ? (
                <>
                  <h2>
                    {`Resultado de álbuns de: ${search}`}
                  </h2>
                  {
                    albuns.map((album) => (
                      <div key={ album.collectionId }>
                        <h3>{ album.collectionName }</h3>
                        <p>{ album.artistName }</p>
                        <Link
                          to={ `/album/${album.collectionId}` }
                          data-testid={ `link-to-album-${album.collectionId}` }
                        >
                          Album
                        </Link>
                        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                      </div>
                    ))
                  }
                </>
              )
              : ''
          }
          {
            albuns !== undefined && !albuns.length
              ? <p>Nenhum álbum foi encontrado</p>
              : ''
          }
        </div>
      </div>
    );
  }
}

export default Search;
