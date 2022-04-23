import React, { Component } from 'react';
import Header from '../Header/Header';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from '../Loading/Loading';
import MusicCard from '../MusicCard/MusicCard';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      favs: [],
    };
  }

  async componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({ loading: true }, async () => {
      const favo = await getFavoriteSongs();
      this.setState({
        favs: favo,
        loading: false,
      });
    });
  }

  render() {
    const { favs, loading } = this.state;
    // console.log(favs);
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <div className="album-div">
                {
                  favs.map((item) => (
                    <div
                      key={ item.trackName }
                      className="map-card"
                    >
                      <img src={ item.artworkUrl100 } alt={ item.trackName } />
                      <MusicCard
                        key={ item.trackId }
                        trackName={ item.trackName }
                        previewUrl={ item.previewUrl }
                        trackId={ item.trackId }
                        music={ item }
                        getFavs={ this.getFavorites }
                        isFavorite
                      />
                    </div>
                  ))
                }
              </div>
            )
        }
      </div>
    );
  }
}

export default Favorites;
