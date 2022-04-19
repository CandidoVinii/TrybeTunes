import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../Header/Header';
import getMusic from '../../services/musicsAPI';
import Loading from '../Loading/Loading';
import MusicCard from '../MusicCard/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const response = await getMusic(match.params.id);
    const filtered = response.filter((item) => item.kind === 'song');
    this.setState({
      loading: false,
      album: response[0],
      musica: filtered,
    });
  }

  render() {
    const { album, loading, musica } = this.state;
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
                    musica.map((track) => (
                      <MusicCard
                        key={ track.trackId }
                        trackName={ track.trackName }
                        previewUrl={ track.previewUrl }
                        trackId={ track.trackId }
                        music={ track }
                      />
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

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
