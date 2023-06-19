import React, { useState } from "react";
import { UsuarioService } from "../../services/usuario";
import { Form } from "react-bootstrap";
import Title from "../Title";
import "./index.css";

export default function CriarUsuario({onCreate}) {
  const [validated, setValidated] = useState(false);
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    notificacoes: false,
    telefone: "",
    cpf: "",
    foto: null,
    plano: "",
    cartao:{
      nome: "",
      numero: "",
      cvc: ""
    },
    endereco:{
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
      complemento: ""
    }
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
        const formData = new FormData();
        formData.append("nome", usuario.nome);
        formData.append("email", usuario.email);
        formData.append("senha", usuario.senha);
        formData.append("notificacoes", usuario.notificacoes);
        formData.append("telefone", usuario.telefone);
        formData.append("cpf", usuario.cpf);
        formData.append("foto", usuario.foto); // adiciona a imagem ao FormData
        formData.append("plano", usuario.plano);
        formData.append("cartao.nome", usuario.cartao.nome);
        formData.append("cartao.numero", usuario.cartao.numero);
        formData.append("cartao.cvc", usuario.cartao.cvc);
        formData.append("endereco.rua", usuario.endereco.rua);
        formData.append("endereco.numero", usuario.endereco.numero);
        formData.append("endereco.bairro", usuario.endereco.bairro);
        formData.append("endereco.cidade", usuario.endereco.cidade);
        formData.append("endereco.estado", usuario.endereco.estado);
        formData.append("endereco.cep", usuario.endereco.cep);
        formData.append("endereco.complemento", usuario.endereco.complemento);

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

        <div className='mb-3'>
          <div className='form-floating'>
            <input
              type='text'
              name='telefone'
              className='form-control'
              id='telefone-cadastro'
              placeholder='(00) 00000-0000'
              pattern='\([0-9]{2}\) [0-9]{4,6}-[0-9]{3,4}$'
              onChange={handleChange}
            />
            <label htmlFor='telefone-cadastro'>Telefone</label>
          </div>
        </div>

        <div className='mb-3'>
          <div className='form-floating'>
            <input
              type='text'
              name='cpf'
              className='form-control'
              id='cpf-cadastro'
              placeholder='000.000.000-00'
              pattern='[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$'
              onChange={handleChange}
            />
            <label htmlFor='cpf-cadastro'>CPF</label>
          </div>
        </div>

        <div className='mb-3'>
          <div id='ruaHelp' className='form-text'>
              Endereço
          </div>
          <div className='form-floating mb-3'>
            <input
              type='text'
              name='endereco.rua'
              className='form-control'
              id='endereco-rua-cadastro'
              placeholder='Rua'
              required
              onChange={handleChange}
            />
            <label htmlFor='endereco-rua-cadastro'>Rua</label>
          </div>
        </div>

        <div className='mb-3'>
          <div className='form-floating mb-3'>
            <input
              type='number'
              name='endereco.numero'
              className='form-control'
              id='endereco-numero-cadastro'
              placeholder='Número'
              required
              onChange={handleChange}
            />
            <label htmlFor='endereco-numero-cadastro'>Número</label>
          </div>
        </div>

        <div className='mb-3'>
          <div className='form-floating mb-3'>
            <input
              type='text'
              name='endereco.bairro'
              className='form-control'
              id='endereco-bairro-cadastro'
              placeholder='Bairro'
              required
              onChange={handleChange}
            />
            <label htmlFor='endereco-bairro-cadastro'>Bairro</label>
          </div>
        </div>

        <div className='mb-3'>
          <div className='form-floating mb-3'>
            <input
              type='text'
              name='endereco.cidade'
              className='form-control'
              id='endereco-cidade-cadastro'
              placeholder='Cidade'
              required
              onChange={handleChange}
            />
            <label htmlFor='endereco-cidade-cadastro'>Cidade</label>
          </div>
        </div>

        <div className='mb-3'>
          <div className='form-floating mb-3'>
            <input
              type='text'
              name='endereco.estado'
              className='form-control'
              id='endereco-estado-cadastro'
              placeholder='Estado'
              required
              onChange={handleChange}
            />
            <label htmlFor='endereco-estado-cadastro'>Estado</label>
          </div>
        </div>

        <div className='mb-3'>
          <div className='form-floating mb-3'>
            <input
              type='text'
              name='endereco.cep'
              className='form-control'
              id='endereco-cep-cadastro'
              placeholder='CEP'
              required
              onChange={handleChange}
            />
            <label htmlFor='endereco-cep-cadastro'>CEP</label>
          </div>
        </div>

        <div className='mb-3'>
          <div className='form-floating'>
            <textarea
              className='form-control'
              name='endereco.complemento'
              id='endereco-complemento-cadastro'
              placeholder='Complemento'
              style={{ height: '100px' }}
              onChange={handleChange}
            ></textarea>
            <label htmlFor='endereco-complemento-cadastro'>Complemento</label>
          </div>
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

        <div className='mb-3'>
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
        </div>

        <div className='mb-3'>
          <div className='form-text'>
              Dados do cartão
          </div>
          <div className='form-floating mb-3'>
            <input
              type='text'
              name='cartao.nome'
              className='form-control'
              id='cartao-nome-cadastro'
              placeholder='Nome no cartão'
              required
              onChange={handleChange}
            />
            <label htmlFor='cartao-nome-cadastro'>Nome no cartão</label>
          </div>
        </div>

        <div className='mb-3'>
          <div className='form-floating mb-3'>
            <input
              type='text'
              name='cartao.numero'
              className='form-control'
              id='cartao-numero-cadastro'
              placeholder='Número do cartão'
              required
              maxLength={20}
              onChange={handleChange}
            />
            <label htmlFor='cartao-numero-cadastro'>Número do cartão</label>
          </div>
        </div>

        <div className='mb-3'>
          <div className='form-floating'>
            <input
              type='text'
              name='cartao.cvc'
              className='form-control'
              id='cartao-cvc-cadastro'
              placeholder='CVC'
              required
              maxLength={3}
              onChange={handleChange}
            />
            <label htmlFor='cartao-cvc-cadastro'>CVC</label>
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
