import React from "react";
import Title from "../Title/index";
import { Form } from "react-bootstrap";
import CaixaStep from "../Movimento/CaixaStep";

const Perfil = ({ values, nextStep, prevStep, handleChange }) => {
  const [validated, setValidated] = React.useState(false);

  return (
    <>
      <Title
        title='Informações pessoais!'
        subtitle='Queremos saber um pouco mais sobre você.'
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
        <div className='mb-3'>
          <div className='form-floating mb-3'>
            <input
              type='text'
              name='nome'
              className='form-control'
              id='nome-cadastro'
              placeholder='Johe Doe'
              // validacao
              required
              minLength={3}
              maxLength={100}
              pattern="^[a-zA-Zà-úÀ-Ú0-9]+(([' -][a-zA-Zà-úÀ-Ú0-9])?[a-zA-Zà-úÀ-Ú0-9]*)*$"
              onChange={handleChange("nome")}
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
              type='password'
              name='senha-cadastro'
              className='form-control'
              id='senha-cadastro'
              placeholder='Senha'
              pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
              required
              onChange={handleChange("senha")}
            />
            <label htmlFor='senha-cadastro'>Senha</label>
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
        <div className='mb-3 confirma-senha-usuario'>
          <div className='form-floating'>
            <input
              type='password'
              name='confirma-senha-cadastro'
              className='form-control'
              id='confirma-senha-cadastro'
              placeholder='Password'
              pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
              required
              onChange={e => {
                // valida se a senha e a confirmação de senha são iguais
                if (e.target.value === values.senha) {
                  e.target.classList.remove("is-invalid");
                  e.target.classList.add("is-valid");
                  setValidated(false);
                }
              }}
            />
            <label htmlFor='confirma-senha-cadastro'>Confirme a senha</label>
          </div>
          {validated && (
            <div className='form-text'>
              As senhas não coincidem. Por favor, tente novamente.
            </div>
          )}
        </div>
        <div className='mb-3'>
          <div className='form-floating'>
            <input
              type='text'
              name='cpf-ccadastro'
              className='form-control'
              id='cpf-cadastro'
              placeholder='CPF'
              pattern='\d{3}\.\d{3}\.\d{3}-\d{2}'
              onChange={e => {
                // cria uma mascara para formatar o CPF
                e.target.value = e.target.value
                  .replace(/\D/g, "")
                  .replace(/(\d{3})(\d)/, "$1.$2")
                  .replace(/(\d{3})(\d)/, "$1.$2")
                  .replace(/(\d{3})(\d{1,2})/, "$1-$2")
                  .replace(/(-\d{2})\d+?$/, "$1");

                handleChange("cpf")(e);
              }}
              required
            />
            <label htmlFor='confirma-senha-cadastro'>CPF</label>
          </div>
        </div>
      </Form>
      <CaixaStep nextStep={nextStep} />
    </>
  );
};

export default Perfil;
