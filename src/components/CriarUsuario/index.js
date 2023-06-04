import React, { useState } from 'react';
import { UsuarioService } from '../services/usuario';
import Title from '../Title';
import './index.css';
import { useEffect } from 'react';

export default function CriarUsuario() {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
    avatarUrl: '',
    newsletter: false,
    plano: '',
  });

  // captura o estado do backend
  const [resposta, setResposta] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    if (resposta) {
      console.log(resposta);
    }
  }, [resposta]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // captura o retorno do backend e salva no estado resposta

    UsuarioService.criar(usuario)
      .then((resposta) => {
        setResposta(resposta);
      })
      .catch((error) => {
        setResposta(error.response.data);
      });
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
                  name="nome"
                  class="form-control"
                  id="floatingInput"
                  placeholder="Johe Doe"
                  // validacao
                  required
                  minLength={3}
                  maxLength={100}
                  pattern="^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$"
                  onChange={handleChange}
                />
                <label for="floatingInput">Nome completo</label>
              </div>
            </div>
            <div class="mb-3">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={handleChange}
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
                  name="senha"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <label for="floatingPassword">Senha</label>
              </div>
            </div>
            <div className="row">
              <div class="mt-3">
                <label for="formFile" class="form-label text-muted">
                  Adicione uma imagem ao seu perfil
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  name="formFile"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-group mb-3 mt-5">
                <div class="form-check form-switch">
                  <input
                    type="checkbox"
                    name="newsletter"
                    class="form-check-input"
                    role="switch"
                    id="flexSwitchCheckChecked"
                    onChange={handleChange}
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
                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="plano"
                  required
                  onChange={handleChange}
                >
                  <option selected>Selecione seu plano</option>
                  <option value="1">Basic</option>
                  <option value="2">Standard</option>
                  <option value="3">Premium</option>
                </select>
              </div>
              {usuario.plano === '1' ? (
                <div id="emailHelp" class="form-text">
                  O plano Basic é ótimo para quem está começando.
                </div>
              ) : usuario.plano === '2' ? (
                <div id="emailHelp" class="form-text">
                  Com o plano Standard você tem acesso a todos os recursos da
                  plataforma.
                </div>
              ) : usuario.plano === '3' ? (
                <div id="emailHelp" class="form-text">
                  Com o plano Premium você tem acesso a todos os recursos da
                  plataforma e ainda pode compartilhar com amigos e família.
                </div>
              ) : (
                <div id="emailHelp" class="form-text">
                  Nenhum plano selecionado! Selecione um plano.
                </div>
              )}
            </div>
            <button
              type="submit"
              class="btn btn-primary mt-5"
              onClick={handleSubmit}
            >
              Submit
            </button>
            {resposta &&
              resposta.sucess && (
                <div className="alert alert-success mt-3" role="alert">
                  {resposta.message}
                </div>
              ) &&
              resposta &&
              resposta.error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {resposta.message}
                </div>
              )}
          </form>
        </div>
      </div>
    </div>
  );
}
