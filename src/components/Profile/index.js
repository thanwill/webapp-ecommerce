import React from 'react';
import './styles.css';
import Title from '../Title/index';
import { useState, useEffect } from 'react';
import { UsuarioService } from '../../services/usuario';
import AtualizarPerfil from '../AtualizarPerfil/index';
export default function Profile({ id }) {

  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
    foto:null,
    newsletter: false,
    plano: 0,
  });

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const response = await UsuarioService.exibir(id);
        setUsuario(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsuario();
  }, [id]);
  
  return (
    <>
      <Title
        title="Perfil do usuário"
        subtitle="Aqui você pode ver e editar as informações do seu perfil"
      />
      {
        // se o usuário existir, renderiza o componente de atualização
        usuario ? (
          <>
            <div className="user-profile  ">
              <div className="avatar mb-5">
                <img src="" alt="Avatar" />
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
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Editar
            </button>
            <AtualizarPerfil usuario={usuario} />
          </>
        ) : (
          <p>Carregando...</p>
        )
      }
    </>
  );
}
