import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import Loading from '../Loading/Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    const { isFavorite } = this.props;
    this.state = {
      loading: false,
      favorite: isFavorite,
    };
  }

  handleChange = ({ target }) => {
    const { checked } = target;
    this.setState({ favorite: checked }, async () => {
      const { getFavs } = this.props;
      if (checked) {
        this.addSongFav();
      } else {
        this.removeSongFav();
      }
      await getFavs();
    });
  }

  addSongFav = () => {
    this.setState({ loading: true }, async () => {
      const { music } = this.props;
      await addSong(music);
      this.setState({ loading: false });
    });
  }

  removeSongFav = () => {
    this.setState({ loading: true }, async () => {
      const { music } = this.props;
      await removeSong(music);
      this.setState({ loading: false });
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favorite } = this.state;
    return (
      <div>
        {
          loading
            ? <Loading />
            : ''
        }
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <input
          type="checkbox"
          onChange={ this.handleChange }
          checked={ favorite }
          data-testid={ `checkbox-music-${trackId}` }
        />
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
