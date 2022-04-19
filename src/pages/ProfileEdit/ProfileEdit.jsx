import React, { Component } from 'react';
import Header from '../Header/Header';

class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h1>Você está no profile edit</h1>
      </div>
    );
  }
}

export default ProfileEdit;
