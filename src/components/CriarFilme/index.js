import React, { useState } from "react";
import "./index.css";
export default function CriarFilme() {
  const [filme, setFilme] = useState({
    titulo: "",
    ano: 0,
    poster: "",
    nota: 0,
    assistido: false,
  });

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFilme(prevFilme => ({
      ...prevFilme,
      [name]: newValue,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Faça o que for necessário com o objeto de filme (por exemplo, enviar para um servidor, salvar em um estado global, etc.)
    console.log(filme);

    // Limpe os campos do formulário
    setFilme({
      titulo: "",
      ano: 0,
      poster: "",
      nota: 0,
      assistido: false,
    });
  };

  return (
    <div className=''>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <form>
            <div className='mb-3'>
              <div className='form-floating mb-3'>
                <input
                  type='email'
                  className='form-control'
                  id='floatingInput'
                  placeholder='name@example.com'
                />
                <label htmlFor='floatingInput'>E-mail</label>
              </div>

              <div id='emailHelp' className='form-text'>
                Nós nunca compartilharemos seu e-mail com mais ninguém.
              </div>
            </div>
            <div className='mb-3'>
              <div className='form-floating'>
                <input
                  type='password'
                  className='form-control'
                  id='floatingPassword'
                  placeholder='Password'
                />
                <label htmlFor='floatingPassword'>Senha</label>
              </div>
            </div>
            <div className='row'>
              <div className='mt-3'>
                <label htmlFor='formFile' className='form-label text-muted'>
                  Adicione uma imagem ao seu perfil
                </label>
                <input className='form-control' type='file' id='formFile' />
              </div>
            </div>
            <div className='row'>
              <div className='input-group mb-3 mt-5'>
                <div className='form-check form-switch'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    role='switch'
                    id='flexSwitchCheckChecked'
                  />
                  <label
                    className='form-check-label text-muted '
                    htmlFor='flexSwitchCheckChecked'>
                    Quero receber novidades por e-mail
                  </label>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='input-group mb-3 mt-3'>
                <select
                  className='form-select'
                  aria-label='Default select example'>
                  <option defaultValue={1}>Selecione seu plano</option>
                  <option value={1}>Basic</option>
                  <option value={2}>Standard</option>
                  <option value={3}>Premium</option>
                </select>
              </div>
            </div>
            <button
              type='submit'
              className='btn btn-primary mt-5'
              onChange={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
