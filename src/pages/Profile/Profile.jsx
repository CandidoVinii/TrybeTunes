import React, { Component } from 'react';
import Header from '../Header/Header';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Você está no profile</h1>
      </div>
    );
  }
}

export default Profile;
