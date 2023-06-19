/*
{
  "motivo": "entrada",
  "documento": "Nota Fiscal",
  "deposito_origem": "DEP2023615233322",
  "local_destino": "DEP2023615224950",
  "itens": [
      "ITM202361605417",
      "ITM202361605425"
  ]
}
*/
import React from "react";
import Title from "../Title";
import { Form } from "react-bootstrap";

const MovimentoStep = ({ nextStep, prevStep, handleChange, values }) => {
  const continuar = e => {
    e.preventDefault();
    nextStep();
  };

  return (
    <>
      <Title
        title={"Cadastro de Movimento"}
        subtitle={"Selecione a categoria do movimento"}
      />

      {
        // o formulário vai conter campos motivo, documento e um select para o deposito_origem
      }

      <Form
        style={{
          width: "50%",
          margin: "auto",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}>
        <div className=''>
          {
            // lista as opcoes de movitos como entrada e saida,
          }
          <select class='form-select' aria-label='Default select example'>
            <option selected>Open this select menu</option>
            <option value='1'>One</option>
            <option value='2'>Two</option>
            <option value='3'>Three</option>
          </select>
        </div>

        <div className='mb-3'>
          <select class='form-select' aria-label='Default select example'>
            <option selected>Open this select menu</option>
            <option value='1'>One</option>
            <option value='2'>Two</option>
            <option value='3'>Three</option>
          </select>
        </div>

        <button className='btn btn-primary' onClick={continuar}>
          Continuar
        </button>
      </Form>
    </>
  );
};

export default MovimentoStep;
