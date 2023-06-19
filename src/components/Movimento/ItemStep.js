/*
{
"valor_unitario": 3.9,
"quantidade": 5,
"cod_produto": "PROD20236160441"
}
*/
import React from "react";
import Title from "../Title";
import { Form } from "react-bootstrap";

const ItemStep = ({ nextStep, prevStep, handleChange, values }) => {
  const continuar = e => {
    e.preventDefault();
    nextStep();
  };

  const voltar = e => {
    e.preventDefault();
    prevStep();
  };

  return (
    <>
      <Title
        title='Cadastro de Movimento'
        subtitle='Selecione os itens relacionados ao movimento'
      />
      <Form
        style={{
          width: "50%",
          margin: "auto",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}>
          <h1>cadastro de itens</h1>
          <button className='btn btn-primary' onClick={voltar}>
          Voltar
        </button>
        <button className='btn btn-primary' onClick={continuar}>
          Continuar
        </button>
        
      </Form>
    </>
  );
};

export default ItemStep;
