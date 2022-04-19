import React, { Component } from 'react';
import Header from '../Header/Header';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <h1>
          Aqui você está no search
        </h1>
      </div>
    );
  }
}

export default Search;
