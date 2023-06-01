import React from 'react';
import './index.css';
import Title from '../Title';
import UserProfile from '../Profile';
import CriarUsuario from '../CriarUsario';
// cria meu componente header

function Header() {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    avatarUrl: process.env.PUBLIC_URL + '/imagem-perfil.png',
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-10 offset-1 col-md-6">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Cadastro
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Registros
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  Sobre
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabindex="0"
          >
            <div className="mb-5">
              <CriarUsuario />
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabindex="0"
          >
            ...
          </div>
          <div
            class="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
            tabindex="0"
          >
            <div className="container">
              <UserProfile {...user} />
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="pills-disabled"
            role="tabpanel"
            aria-labelledby="pills-disabled-tab"
            tabindex="0"
          >
            ...
          </div>
        </div>
      </div>
    </>
  );
}

// exporta meu componente header
export default Header;
