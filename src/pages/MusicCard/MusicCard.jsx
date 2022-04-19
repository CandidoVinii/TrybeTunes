import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong } from '../../services/favoriteSongsAPI';
import Loading from '../Loading/Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  song = () => {
    this.setState({ loading: true }, async () => {
      const { music } = this.props;
      await addSong({ music });
      this.setState({ loading: false });
    });
  }

  handleChange = ({ target }) => {
    const { checked } = target;
    if (checked) this.song();
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading } = this.state;
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
          <code>audio</code>
        </audio>
        <input
          type="checkbox"
          onClick={ this.song }
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
};

export default MusicCard;
