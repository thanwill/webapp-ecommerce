import React from "react";
import CaixaStep from "../Movimento/CaixaStep";
import Title from "../Title/index";
import { Form } from "react-bootstrap";

const Contato = ({ nextStep, prevStep, handleChange }) => {
  const [validated, setValidated] = React.useState(false);

  return (
    <>
      <Title
        title='Dados de contato!'
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
              className='form-control'
              placeholder='(DDD) 99999-9999)'
              required
              // cria um pattern para o telefone
              pattern='^\([1-9]{2}\) [2-9][0-9]{3,4}\-[0-9]{4}$'
              onChange={e => {
                e.target.value = e.target.value.replace(
                  // cria uma mascara para o telefone
                  /^(\d{2})(\d{5})(\d{4}).*/,
                  "($1) $2-$3"
                );
                handleChange("telefone")(e);
              }}
            />
            <label htmlFor='nome-cadastro'>Telefone</label>
          </div>
          {validated && (
            <div className='form-text'>
              Por favor, insira um telefone válido.
            </div>
          )}
        </div>
        <div className='mb-3'>
          <div className='form-floating mb-3'>
            <input
              type='email'
              name='email-cadastro'
              className='form-control'
              id='email-cadastro'
              placeholder='name@example.com'
              pattern='^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$'
              autoComplete='on'
              required
              onChange={handleChange("email")}
            />
            <label htmlFor='email-cadastro'>E-mail</label>
          </div>
          {validated ? (
            <div className='form-text'>Por favor, insira um e-mail válido.</div>
          ) : (
            <div className='form-text'>
              Nós nunca compartilharemos seu e-mail com mais ninguém.
            </div>
          )}
        </div>
      </Form>

      <CaixaStep nextStep={nextStep} prevStep={prevStep} />
    </>
  );
};

export default Contato;
