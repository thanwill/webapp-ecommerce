import React from 'react';
import './styles.css';
import Title from '../Title/index';
class UserProfile extends React.Component {
  render() {
    const { name, email, phone, avatarUrl } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 offset-md-3">
          <div className="user-profiled-flex flex-column align-items-center justify-content-center text-center mb-5">
              <Title 
                title="Perfil do usuário"
                subtitle="Aqui você pode ver e editar as informações do seu perfil"
              
              />
              <div className="user-profile  ">
                <div className="avatar mb-5">
                  <img src={avatarUrl} alt="Avatar" />
                </div>
                <div className="user-details">
                  <h2>{name}</h2>
                  <p>Email: {email}</p>
                  <p>Telefone: {phone}</p>
                </div>
              </div>
              {
                // cria um botão para editar o perfil
              }
              <button className="btn btn-secondary mt-3">Editar perfil</button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
