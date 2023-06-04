import React from 'react';
import './styles.css';
import Title from '../Title/index';
import { useState, useEffect } from 'react';
import { UsuarioService } from '../services/usuario';
import AtualizarPerfil from '../AtualizarPerfil/index';
export default function Profile({ id }) {
  var avatarUrl = process.env.PUBLIC_URL + '/imagem-perfil.png';

  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
    avatarUrl: '',
    newsletter: false,
    plano: '',
  });

  // usa o service para buscar o usuario pelo id e atualizar o estado
  useEffect(() => {
    async function fetchUsuario() {
      const usuario = await UsuarioService.buscaPorId(id);
      setUsuario(usuario);
    }
    fetchUsuario();
  }, [id]);

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
                <h2>{usuario.nome}</h2>
                <p>{usuario.email}</p>

                <p>
                  Plano:
                  {
                    // mostra o plano do usuario basic 1, standard 2, premium 3
                    usuario.plano === 1
                      ? ' Basic'
                      : usuario.plano === 2
                      ? ' Standard'
                      : ' Premium'
                  }
                </p>
              </div>
            </div>
            {
              // cria um botão para editar o perfil
            }
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Editar
            </button>
            <AtualizarPerfil usuario={usuario} />
          </div>
        </div>
      </div>
    </div>
  );
}
