import React from "react";
import { useState } from "react";
import Title from "../components/Title/index";

export default function Login() {
  const [usuario, setUsuario] = useState({
    email: "",
    senha: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(usuario);
  }

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-10 offset-1 col-md-6 offset-md-3 mt-5 mb-5'>
            <div className='card'>
              <div className='card-header'>
                <Title
                  title='Login'
                  subtitle='Faça login para acessar o sistema'
                />
              </div>
              <div className='card-body'>
                <form className=''>
                  <div className='mb-3 email-usuario'>
                    <div className='form-floating mb-3'>
                      <input
                        type='email'
                        name='email'
                        className='form-control'
                        id='email-cadastro'
                        placeholder='name@example.com'
                        pattern='^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$'
                        autoComplete='on'
                        onChange={handleChange}
                      />
                      <label htmlFor='email-cadastro'>E-mail</label>
                    </div>
                  </div>
                  <div className='mb-3 senha-usuario'>
                    <div className='form-floating'>
                      <input
                        type='password'
                        name='senha'
                        className='form-control'
                        id='floatingPassword'
                        placeholder='Password'
                        pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
                        onChange={handleChange}
                      />
                      <label htmlFor='floatingPassword'>Senha</label>
                    </div>
                  </div>
                  <div className='mb-3'>
                    <select
                      class='form-select'
                      aria-label='Default select example'>
                      <option selected>Open this select menu</option>
                      <option value='1'>One</option>
                      <option value='2'>Two</option>
                      <option value='3'>Three</option>
                    </select>
                  </div>

                  <button
                    type='submit'
                    className='btn btn-primary btn-block'
                    onClick={handleSubmit}>
                    Entrar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
