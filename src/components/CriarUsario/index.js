import React, { useState } from 'react';
import Title from '../Title';
import './index.css';
export default function CriarUsuario() {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    telefone: '',
    avatarUrl: '',
    newsletter: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(usuario);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6">
          <Title
            title="Cadastre-se"
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
          <form>
            <div class="mb-3">
              <div class="form-floating mb-3">
                <input
                  type="nome"
                  class="form-control"
                  id="floatingInput"
                  placeholder="Johe Doe"
                  // validacao
                  required
                  minLength={3}
                  maxLength={100}
                  pattern="^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$"
                />
                <label for="floatingInput">Nome completo</label>
              </div>
            </div>
            <div class="mb-3">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">E-mail</label>
              </div>

              <div id="emailHelp" class="form-text">
                Nós nunca compartilharemos seu e-mail com mais ninguém.
              </div>
            </div>
            <div class="mb-3">
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label for="floatingPassword">Senha</label>
              </div>
            </div>
            <div className="row">
              <div class="mt-3">
                <label for="formFile" class="form-label text-muted">
                  Adicione uma imagem ao seu perfil
                </label>
                <input class="form-control" type="file" id="formFile" />
              </div>
            </div>
            <div className="row">
              <div className="input-group mb-3 mt-5">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                    onChange={(e) => {
                      setUsuario({ ...usuario, newsletter: e.target.checked });
                    }}
                  />
                  <label
                    class="form-check-label text-muted "
                    for="flexSwitchCheckChecked"
                  >
                    Quero receber novidades por e-mail
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="input-group mb-3 mt-3">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Selecione seu plano</option>
                  <option value="1">Basic</option>
                  <option value="2">Standard</option>
                  <option value="3">Premium</option>
                </select>
              </div>
            </div>
            <button type="submit" class="btn btn-primary mt-5">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
