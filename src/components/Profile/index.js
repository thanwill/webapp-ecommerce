import React from "react";
import "./styles.css";
import Title from "../Title/index";
import { useState, useEffect } from "react";
import { UsuarioService } from "../../services/usuario";
import AtualizarPerfil from "../AtualizarPerfil/index";
import { Form } from "react-bootstrap";
export default function Profile({ id }) {
  const [usuario, setUsuario] = useState(null);
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
        title='Perfil do usuário'
        subtitle='Aqui você pode ver e editar as informações do seu perfil'
      />
      {
        // se o usuário existir, renderiza o componente de atualização
        usuario ? (
          <>
            <div className='user-profile  '>
              {
                // se o usuário tiver uma foto, mostra a foto, senão mostra a imagem padrão
                usuario.foto ? (
                  <img
                    src={usuario.foto}
                    alt={usuario.nome}
                    className='user-photo'
                  />
                ) : (
                  <img
                    src='./assets/beta.png'
                    alt={`Aqui`}
                    className='user-photo'
                  />
                )
              }
              <div className='user-details'>
                <h2>{usuario.nome}</h2>
                <p>{usuario.email}</p>

                <p>
                  Plano:
                  {
                    // mostra o plano do usuario basic 1, standard 2, premium 3
                    usuario.plano === 1
                      ? " Basic"
                      : usuario.plano === 2
                      ? " Standard"
                      : " Premium"
                  }
                </p>
              </div>
            </div>
            <div
              className='btn btn-primary'
              data-bs-toggle='modal'
              data-bs-target={`#modal-edit-${usuario.id}`}>
              Editar
            </div>
            {
              <>
                <div
                  className='modal fade'
                  id={`modal-edit-${usuario.id}`}
                  data-bs-backdrop='static'
                  data-bs-keyboard='false'
                  tabIndex='-1'
                  aria-labelledby='staticBackdropLabel'
                  aria-hidden='true'>
                  <div className='modal-dialog'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h1
                          className='modal-title fs-5'
                          id='staticBackdropLabel'>
                          Atualizar perfil
                        </h1>
                        <button
                          type='button'
                          className='btn-close'
                          data-bs-dismiss='modal'
                          aria-label='Close'></button>
                      </div>
                      <div className='modal-body'>
                        <Title
                          subtitle={`Olá, ${usuario.nome}. Atualize aqui informações do seu perfil e mantenha sua conta sempre em dia.`}
                        />
                        <Form>
                          <div className='row'>
                            <div className=' col-10 offset-1 col-md-6 offset-md-3 mt-3'>
                              <div className='mb-3'>
                                <div className='form-floating mb-3'>
                                  <input
                                    type='text'
                                    name='nome'
                                    className='form-control'
                                    id='nome-update'
                                    placeholder='Johe Doe'
                                    defaultValue={usuario.nome}
                                    // validacao
                                    required
                                    minLength={3}
                                    maxLength={100}
                                    pattern="^[a-zA-Zà-úÀ-Ú0-9]+(([' -][a-zA-Zà-úÀ-Ú0-9])?[a-zA-Zà-úÀ-Ú0-9]*)*$"
                                  />
                                  <label htmlFor='nome-update'>
                                    Nome completo
                                  </label>
                                </div>
                              </div>
                              <div className='mb-3'>
                                <div className='form-floating mb-3'>
                                  <input
                                    type='email'
                                    name='email'
                                    className='form-control'
                                    id='email-update'
                                    placeholder='example@gmail.com'
                                    required
                                    defaultValue={usuario.email}
                                    autoComplete='on'
                                    pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                                  />
                                  <label htmlFor='email-update'>Email</label>
                                </div>
                              </div>

                              <div className='mb-3'>
                                <div className='input-group mb-3'>
                                  <input
                                    name='senha'
                                    className='form-control'
                                    id='senha-update'
                                    placeholder='Senha'
                                    required
                                    defaultValue={usuario.senha}
                                    minLength={6}
                                    maxLength={20}
                                    aria-describedby='button-addon2'
                                  />
                                  <button
                                    className='btn btn-outline-secondary'
                                    type='button'
                                    id='button-addon2'
>                                    <i
                                      className={`bi bi-eye`}></i>
                                  </button>
                                </div>
                              </div>

                              <div className='row'>
                                <div className='input-group mb-3 mt-5'>
                                  <div className='form-check form-switch'>
                                    <input
                                      type='checkbox'
                                      name='newsletter'
                                      className='form-check-input'
                                      role='switch'
                                      id='newsletter-switch'
                                      checked={
                                        usuario.newsletter
                                          ? usuario.newsletter
                                          : false
                                      }
                                    />

                                    <label
                                      className='form-check-label text-muted '
                                      htmlFor='newsletter-switch'>
                                      Quero receber novidades por e-mail
                                    </label>
                                  </div>
                                  {usuario.newsletter ? (
                                    <div className='form-text'>
                                      Você já está cadastrado em nossa
                                      newsletter.
                                    </div>
                                  ) : (
                                    <div className='form-text'>
                                      Você não receberá nossas novidades por
                                      email.
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </div>
                      <div className='modal-footer'>
                        <button
                          type='button'
                          className='btn btn-secondary'
                          data-bs-dismiss='modal'>
                          Fechar
                        </button>
                        <button type='button' className='btn btn-primary'>
                          
                          Salvar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
            <AtualizarPerfil usuario={usuario} />
          </>
        ) : (
          <p>Carregando...</p>
        )
      }
    </>
  );
}
