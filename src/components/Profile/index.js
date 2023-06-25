import React from "react";
import Title from "../Title/index";
import { useState, useEffect } from "react";
import { UsuarioService } from "../../services/usuario";
import jwtDecode from "jwt-decode";

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
      <div className='mt-5 mb-5'>
        {/*
          <div className='row'>
          <div className='col-10 offset-1 col-md-6'>
            <ul className='nav nav-pills mb-3' id='pills-tab' role='tablist'>
              <li className='nav-item' role='presentation'>
                <button
                  className='nav-link active'
                  id='pills-home-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#pills-home'
                  type='button'
                  role='tab'
                  aria-controls='pills-home'
                  aria-selected='true'>
                  Produtos
                </button>
              </li>
            </ul>
          </div>
        </div>
          */}

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
                    class='rounded mx-auto d-block circle'
                    width={200}
                    alt='...'></img>
                  <div class='card' aria-hidden='true'>
                    <div class='card-body'>
                      <h5 class='card-title placeholder-glow'>
                        {usuario ? usuario.nome : "Carregando..."}
                      </h5>
                      <small class='text-body-secondary'>
                        {usuario ? usuario.email : "Carregando..."}
                      </small>
                      <br />
                      <small class='text-body-secondary'>
                        {usuario ? usuario.telefone : "Carregando..."}
                      </small>
                      <br />
                      <small class='text-body-secondary'>
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
                        // botao de logout

                        <button
                          className='btn btn-danger'
                          onClick={() => {
                            localStorage.removeItem("token");
                            window.location.reload();
                          }}>
                          Sair
                        </button>
                      }
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src='./assets/beta.png'
                    class='rounded mx-auto d-block'
                    width={200}
                    alt='...'></img>
                  <div class='card' aria-hidden='true'>
                    <div class='card-body'>
                      <h5 class='card-title placeholder-glow'>
                        <span class='placeholder col-6'></span>
                      </h5>
                      <p class='card-text placeholder-glow'>
                        <span class='placeholder col-7'></span>
                        <span class='placeholder col-4'></span>
                        <span class='placeholder col-4'></span>
                        <span class='placeholder col-6'></span>
                        <span class='placeholder col-8'></span>
                      </p>
                      <div class='btn btn-primary disabled placeholder col-6'></div>
                    </div>
                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}
