import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import Loading from '../Loading/Loading';
import './musicCard.css';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    const { isFavorite } = this.props;
    this.state = {
      loading: false,
      favorite: isFavorite,
    };
  }

  addSongFav = () => {
    this.setState({ loading: true }, async () => {
      const { music, getFavs } = this.props;
      await addSong(music);
      await getFavs();
      this.setState({ loading: false });
    });
  }

  removeSongFav = () => {
    this.setState({ loading: true }, async () => {
      const { music, getFavs } = this.props;
      await removeSong(music);
      await getFavs();
      this.setState({ loading: false });
    });
  }

  handleChange = ({ target }) => {
    const { checked } = target;
    this.setState({ favorite: checked }, async () => {
      if (checked) {
        this.addSongFav();
      } else {
        this.removeSongFav();
      }
    });
  }

  render() {
    const { trackName, previewUrl, trackId, artistName, collectionName, artworkUrl100 } = this.props;
    const { loading, favorite } = this.state;
    return (
      <div>
        {
          loading
            ? <Loading />
            : ''
        }
        <div className="card-content">
          <img src={ artworkUrl100 } alt={ artistName } />
          <hr />
          <h2>{ artistName }</h2>
          <span>{ collectionName }</span>
          <p>{ trackName }</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
        <div className="input-container">
          <label htmlFor={ trackName }>
            Favorita
            <input
              id={ trackName }
              type="checkbox"
              onChange={ this.handleChange }
              checked={ favorite }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  music: propTypes.shape({}).isRequired,
  getFavs: propTypes.func.isRequired,
  isFavorite: propTypes.bool.isRequired,
};

export default MusicCard;
