import React, { Component } from 'react';
import Header from '../Header/Header';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Aqui você está no favoritos</h1>
      </div>
    );
  }
}

export default Favorites;
