import React from 'react';
import './styles.css';
class UserProfile extends React.Component {
  render() {
    const { name, email, phone, avatarUrl } = this.props;

    return (
      <div className="user-profile ">
        <div className="avatar mb-5">
          <img src={avatarUrl} alt="Avatar" />
        </div>
        <div className="user-details">
          <h2>{name}</h2>
          <p>Email: {email}</p>
          <p>Telefone: {phone}</p>
        </div>
      </div>
    );
  }
}

export default UserProfile;
