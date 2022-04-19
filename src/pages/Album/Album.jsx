import React, { Component } from 'react';
import Header from '../Header/Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <h1> Aqui você está no album</h1>
      </div>
    );
  }
}

export default Album;
