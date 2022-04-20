import React, { Component } from 'react';
import propTypes from 'prop-types';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Header from '../Header/Header';
import getMusic from '../../services/musicsAPI';
import Loading from '../Loading/Loading';
import MusicCard from '../MusicCard/MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    // console.log(match);
    const request = await getMusic(match.params.id);
    // console.log(request);
    const filtered = request.filter((music) => music.kind === 'song');
    // console.log(filtered);
    const favorites = await getFavoriteSongs();
    // console.log(favorites)
    this.setState({
      musics: filtered,
      album: request[0],
      loading: false,
      favs: favorites,
    });
  }

  getFavs = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favs: favorites });
    // console.log(favorites);
  }

  isFavorite = (id) => {
    const { favs } = this.state;
    // console.log(favs);
    const validation = favs.some((musicId) => musicId.trackId === id);
    if (validation) return true;
    return false;
  }

  render() {
    const { album, loading, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <div>
                <div>
                  <h2 data-testid="artist-name">{album.artistName}</h2>
                  <p data-testid="album-name">{album.collectionName}</p>
                </div>
                <div>
                  {
                    musics.map((track) => (
                      <div key={ track.trackId }>
                        <img src={ track.artworkUrl100 } alt={ track.trackName } />
                        <MusicCard
                          key={ track.trackId }
                          trackName={ track.trackName }
                          previewUrl={ track.previewUrl }
                          trackId={ track.trackId }
                          music={ track }
                          isFavorite={ this.isFavorite(track.trackId) }
                        />
                      </div>
                    ))
                  }
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

// https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
