import React, { useState } from "react";
import { UsuarioService } from "../../services/usuario";
import { Form } from "react-bootstrap";
import Title from "../Title";
import "./index.css";

export default function CriarUsuario({onCreate}) {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    foto: null,
    newsletter: false,
    plano: "",
  });

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setUsuario(prevUsuario => ({
      ...prevUsuario,
      [name]: newValue,
    }));
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    setUsuario(prevUsuario => ({
      ...prevUsuario,
      foto: file,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    // se o form não for válido, não faz o submit
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("nome", usuario.nome);
        formData.append("email", usuario.email);
        formData.append("senha", usuario.senha);
        formData.append("newsletter", usuario.newsletter);
        formData.append("plano", usuario.plano);
        formData.append("foto", usuario.foto); // adiciona a imagem ao FormData

        // imprime no console os dados do FormData
        for (let pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }

        UsuarioService.criar(formData)
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            // cria um atraso de 2 segundos 
            setTimeout(() => {
              setLoading(false);

              // remove o value dos inputs
              const inputs = document.querySelectorAll("input");
              inputs.forEach(input => {
                input.value = "";
              });

              // remove a classe is-valid dos inputs
              inputs.forEach(input => {
                input.classList.remove("is-valid");
              }
              );

              // tira o
            }, 2000);
            onCreate();
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Title
        title='Cadastre-se'
        subtitle='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      />
      <Form
        noValidate
        encType='multipart/form-data'
        onChange={e => {
          // captura o foco de cada input e valida se o pattern está correto ou não adicionando a classe is-invalid ou is-valid

          if (e.target.value !== "") {
            if (e.target.validity.valid) {
              e.target.classList.remove("is-invalid");
              e.target.classList.add("is-valid");
              setValidated(false);
            } else {
              e.target.classList.remove("is-valid");
              e.target.classList.add("is-invalid");
              setValidated(true);
              // cria um elemento span para exibir a mensagem de erro com a tag invalid-feedback
              const span = document.createElement("span");
              span.classList.add("invalid-feedback");
              span.textContent = e.target.validationMessage;
            }
          }
        }}>
        <div className='mb-3 nome-usuario'>
          <div className='form-floating mb-3'>
            <input
              type='nome'
              name='nome'
              className='form-control'
              id='nome-cadastro'
              placeholder='Johe Doe'
              // validacao
              required
              minLength={3}
              maxLength={100}
              pattern="^[a-zA-Zà-úÀ-Ú0-9]+(([' -][a-zA-Zà-úÀ-Ú0-9])?[a-zA-Zà-úÀ-Ú0-9]*)*$"
              onChange={handleChange}
            />
            <label htmlFor='nome-cadastro'>Nome completo</label>
          </div>
          {validated && (
            <div className='form-text'>Por favor, insira um nome válido.</div>
          )}
        </div>
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
          {validated ? (
            <div id='emailHelp' className='form-text'>
              Por favor, insira um e-mail válido.
            </div>
          ) : (
            <div id='emailHelp' className='form-text'>
              Nós nunca compartilharemos seu e-mail com mais ninguém.
            </div>
          )}
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

          {
            // se validated for true, exibe a mensagem de erro abaixo se for false, a mensagem não é exibida e some da tela
            validated && (
              <div id='emailHelp' className='form-text'>
                A senha deve conter no mínimo 8 caracteres, uma letra maiúscula,
                uma minúscula e um número.
              </div>
            )
          }
        </div>

        <div className='mt-3'>
          <label htmlFor='file-cadastro' className='form-label text-muted'>
            Adicione uma imagem ao seu perfil
          </label>
          <input
            className='form-control'
            type='file'
            id='file-cadastro'
            name='file-cadastro'
            onChange={handleFileChange}
          />
        </div>

        <div className='row'>
          <div className='input-group mb-3 mt-5'>
            <div className='form-check form-switch'>
              <input
                type='checkbox'
                name='newsletter'
                className='form-check-input'
                role='switch'
                id='flexSwitchCheckChecked'
                onChange={handleChange}
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
              aria-label='Default select example'
              name='plano'
              required
              onChange={handleChange}>
              <option selected>Selecione seu plano</option>
              <option value='1'>Basic</option>
              <option value='2'>Standard</option>
              <option value='3'>Premium</option>
            </select>
          </div>
          {usuario.plano === "1" ? (
            <div id='emailHelp' className='form-text'>
              O plano Basic é ótimo para quem está começando.
            </div>
          ) : usuario.plano === "2" ? (
            <div id='emailHelp' className='form-text'>
              Com o plano Standard você tem acesso a todos os recursos da
              plataforma.
            </div>
          ) : usuario.plano === "3" ? (
            <div id='emailHelp' className='form-text'>
              Com o plano Premium você tem acesso a todos os recursos da
              plataforma e ainda pode compartilhar com amigos e família.
            </div>
          ) : (
            <div id='emailHelp' className='form-text'>
              Nenhum plano selecionado! Selecione um plano.
            </div>
          )}
        </div>

        <button
          type='submit'
          className='btn btn-primary mt-3'
          onClick={handleSubmit}>
          Cadastrar
        </button>
      </Form>
    </>
  );
}
