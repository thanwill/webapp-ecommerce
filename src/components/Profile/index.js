import React from "react";
import Title from "../Title/index";
import { useState, useEffect } from "react";
import { UsuarioService } from "../../services/usuario";
import jwtDecode from "jwt-decode";
import AtualizarPerfil from "../AtualizarPerfil/index";
export default function Profile() {
  const storedToken = localStorage.getItem("token");
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    async function fetchUsuario() {
      try {
        const response = jwtDecode(storedToken);
        const data = await UsuarioService.exibir(response.id);
        setUsuario(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsuario();
  }, [storedToken]);

  return (
    <>
      <div className='row'>
        <div className='col-10 offset-1 col-md-6 offset-md-3 mt-5 mb-5'>
          <Title
            title='Perfil'
            subtitle='Consulte os detalhes do seu cadastro'
          />
          {
            // verifica se o usuário está logado
            storedToken ? (
              <>
                <img
                  src='./assets/beta.png'
                  className='rounded mx-auto d-block circle'
                  width={200}
                  alt='...'></img>
                <div className='card' aria-hidden='true'>
                  <div className='card-body'>
                    <h5 className='card-title placeholder-glow'>
                      {usuario ? usuario.nome : "Carregando..."}
                    </h5>
                    <small className='text-body-secondary'>
                      {usuario ? usuario.email : "Carregando..."}
                    </small>
                    <br />
                    <small className='text-body-secondary'>
                      {usuario ? usuario.telefone : "Carregando..."}
                    </small>
                    <br />
                    <small className='text-body-secondary'>
                      {
                        // adiciona uma mascara de asteristicos para o cpf ocultando os 9 primeiros digitos
                        usuario
                          ? usuario.cpf.replace(/.(?=.{7})/g, "*")
                          : "Carregando..."
                      }
                    </small>
                  </div>
                  <div className='card-footer'>
                    {
                      <>
                        <div className='row'>
                          <div className='col'>
                            <button
                              className='btn btn-danger'
                              onClick={() => {
                                localStorage.removeItem("token");
                                window.location.reload();
                              }}>
                              Sair
                            </button>
                          </div>
                          <div className='col'>
                            {usuario ? (
                              <>
                                <div
                                  className='btn btn-primary'
                                  data-bs-toggle='modal'
                                  data-bs-target={`#modal-update-${usuario.cod_usuario}`}>
                                  Editar
                                </div>
                                <AtualizarPerfil usuario={usuario} />
                              </>
                            ) : null}
                          </div>
                        </div>
                      </>
                    }
                  </div>
                </div>
              </>
            ) : (
              <>
                <img
                  src='./assets/beta.png'
                  className='rounded mx-auto d-block'
                  width={200}
                  alt='...'></img>
                <div className='card' aria-hidden='true'>
                  <div className='card-body'>
                    <h5 className='card-title placeholder-glow'>
                      <span className='placeholder col-6'></span>
                    </h5>
                    <p className='card-text placeholder-glow'>
                      <span className='placeholder col-7'></span>
                      <span className='placeholder col-4'></span>
                      <span className='placeholder col-4'></span>
                      <span className='placeholder col-6'></span>
                      <span className='placeholder col-8'></span>
                    </p>
                    <div className='btn btn-primary disabled placeholder col-6'></div>
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>
    </>
  );
}
