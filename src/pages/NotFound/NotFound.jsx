import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <strong>ERROR 404</strong>
        <h1>Desculpe não há nada por aqui</h1>
      </div>
    );
  }
}

export default NotFound;
