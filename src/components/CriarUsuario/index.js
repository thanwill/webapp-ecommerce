import React, { useState } from 'react';
import { UsuarioService } from '../services/usuario';
import { Form } from 'react-bootstrap';
import Title from '../Title';
import './index.css';

export default function CriarUsuario() {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
    avatarUrl: '',
    newsletter: false,
    plano: '',
  });

  const [validated, setValidated] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // verifica se os campos estão vazios

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
          <Form
            noValidate
            onChange={(e) => {
              // captura o foco de cada input e valida se o pattern está correto ou não adicionando a classe is-invalid ou is-valid

              if (e.target.value !== '') {
                if (e.target.validity.valid) {
                  e.target.classList.remove('is-invalid');
                  e.target.classList.add('is-valid');
                  setValidated(false);
                } else {
                  e.target.classList.remove('is-valid');
                  e.target.classList.add('is-invalid');
                  setValidated(true);
                  // cria um elemento span para exibir a mensagem de erro com a tag invalid-feedback
                  const span = document.createElement('span');
                  span.classList.add('invalid-feedback');
                  span.textContent = e.target.validationMessage;
                }
              }
            }}
          >
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
                  pattern="^[a-zA-Zà-úÀ-Ú0-9]+(([' -][a-zA-Zà-úÀ-Ú0-9])?[a-zA-Zà-úÀ-Ú0-9]*)*$"
                  onChange={handleChange}
                />
                <label for="floatingInput">Nome completo</label>
              </div>
              {validated && (
                <div class="form-text">Por favor, insira um nome válido.</div>
              )}
            </div>
            <div class="mb-3">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  pattern="^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$"
                  onChange={handleChange}
                />
                <label for="floatingInput">E-mail</label>
              </div>
              {validated ? (
                <div id="emailHelp" class="form-text">
                  Por favor, insira um e-mail válido.
                </div>
              ) : (
                <div id="emailHelp" class="form-text">
                  Nós nunca compartilharemos seu e-mail com mais ninguém.
                </div>
              )}
            </div>
            <div class="mb-3">
              <div class="form-floating">
                <input
                  type="password"
                  name="senha"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <label for="floatingPassword">Senha</label>
              </div>

              {
                // se validated for true, exibe a mensagem de erro abaixo se for false, a mensagem não é exibida e some da tela
                validated && (
                  <div id="emailHelp" class="form-text">
                    A senha deve conter no mínimo 8 caracteres, uma letra
                    maiúscula, uma minúscula e um número.
                  </div>
                )
              }
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
          </Form>
        </div>
      </div>
    </div>
  );
}
