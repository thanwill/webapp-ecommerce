// cria umm modal com formulario para atualizar o perfil
import Title from "../Title";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { UsuarioService } from "../../services/usuario";
import "./index.css";

export default function AtualizarPerfil({ usuario }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [usuarioAtualizado, setUsuarioAtualizado] = useState({
    nome: "",
    email: "",
    senha: "",
    avatarUrl: "",
    newsletter: false,
    plano: "",
  });

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    console.log(usuario);

    setUsuarioAtualizado(prevUsuario => ({
      ...prevUsuario,
      [name]: newValue,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    // verifica se os campos estão vazios

    UsuarioService.atualizar(usuario.id, usuarioAtualizado)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabindex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='staticBackdropLabel'>
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
                          onChange={handleChange}
                          // validacao
                          required
                          minLength={3}
                          maxLength={100}
                          pattern="^[a-zA-Zà-úÀ-Ú0-9]+(([' -][a-zA-Zà-úÀ-Ú0-9])?[a-zA-Zà-úÀ-Ú0-9]*)*$"
                        />
                        <label for='nome-update'>Nome completo</label>
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
                          onChange={handleChange}
                          autoComplete='on'
                          pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                        />
                        <label for='email-update'>Email</label>
                      </div>
                    </div>

                    <div className='mb-3'>
                      <div className='input-group mb-3'>
                        <input
                          type={showPassword ? "text" : "password"}
                          name='senha'
                          className='form-control'
                          id='senha-update'
                          placeholder='Senha'
                          required
                          defaultValue={usuario.senha}
                          onChange={handleChange}
                          minLength={6}
                          maxLength={20}
                          aria-describedby='button-addon2'
                        />
                        <button
                          className='btn btn-outline-secondary'
                          type='button'
                          id='button-addon2'
                          onClick={handleTogglePassword}>
                          <i
                            className={`bi bi-eye${
                              showPassword ? "-slash-fill" : "-fill"
                            }`}></i>
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
                            checked={usuarioAtualizado.newsletter}
                            onChange={handleChange}
                          />

                          <label
                            className='form-check-label text-muted '
                            for='newsletter-switch'>
                            Quero receber novidades por e-mail
                          </label>
                        </div>
                        {usuario.newsletter ? (
                          <div className='form-text'>
                            Você já está cadastrado em nossa newsletter.
                          </div>
                        ) : (
                          <div className='form-text'>
                            Você não receberá nossas novidades por email.
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
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleSubmit}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
