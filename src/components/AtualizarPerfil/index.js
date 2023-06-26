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

  const [usuarioAtualizado, setUsuarioAtualizado] = useState(null);

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setUsuarioAtualizado(prevUsuario => ({
      ...prevUsuario,
      [name]: newValue,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    UsuarioService.atualizar(usuario.cod_usuario, usuarioAtualizado)
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
        id={`modal-update-${usuario.cod_usuario}`}
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
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
                        <label htmlFor='nome-update'>Nome completo</label>
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
                        <label htmlFor='email-update'>Email</label>
                      </div>
                    </div>
                    {
                      // campo para atualizar o telefone
                    }
                    <div className='mb-3'>
                      <div className='form-floating mb-3'>
                        <input
                          type='tel'
                          name='telefone'
                          className='form-control'
                          id='telefone-update'
                          placeholder='(00) 00000-0000'
                          required
                          defaultValue={usuario.telefone}
                          onChange={handleChange}
                          minLength={14}
                          maxLength={15}
                          pattern='^\([1-9]{2}\) [2-9][0-9]{3,4}\-[0-9]{4}$'
                        />
                        <label htmlFor='telefone-update'>Telefone</label>
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
                data-bs-dismiss='modal'
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
