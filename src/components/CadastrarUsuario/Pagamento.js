import React from "react";
import CaixaStep from "../Movimento/CaixaStep";
import Title from "../Title/index";
import Form from "react-bootstrap/Form";
const Pagamento = ({ nextStep, prevStep, handleChange }) => {
  //const [validated, setValidated] = React.useState(false);
  return (
    <>
      <Title title='Pagamento' subtitle='Defina a sua forma de pagamento.' />
      {/*
        cartao: {
          nome: "",
          numero: "",
          cvc: "",
        },
        */}
      <Form
        noValidate
        encType='multipart/form-data'
        onChange={e => {
          // captura o foco de cada input e valida se o pattern está correto ou não adicionando a classe is-invalid ou is-valid

          if (e.target.value !== "") {
            if (e.target.validity.valid) {
              e.target.classList.remove("is-invalid");
              e.target.classList.add("is-valid");
              //setValidated(false);
            } else {
              e.target.classList.remove("is-valid");
              e.target.classList.add("is-invalid");
              //setValidated(true);
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
              id='nome'
              placeholder='Nome'
              pattern='[A-Za-zÀ-ú ]{2,}'
              required
              onChange={handleChange("nome_cartao")}
            />
            <label htmlFor='nome'>Nome completo</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='text'
              name='numero'
              className='form-control'
              id='numero'
              placeholder='Número'
              pattern='[0-9]{16}'
              required
              onChange={handleChange("numero_cartao")}
            />
            <label htmlFor='numero'>Número</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='text'
              name='cvc'
              className='form-control'
              id='cvc'
              placeholder='CVC'
              pattern='[0-9]{3}'
              required
              onChange={handleChange("cvc_cartao")}
            />
            <label htmlFor='cvc'>CVC</label>
          </div>
        </div>
      </Form>

      <CaixaStep nextStep={nextStep} prevStep={prevStep} />
    </>
  );
};

export default Pagamento;
