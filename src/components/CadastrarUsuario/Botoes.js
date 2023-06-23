/*
{
"valor_unitario": 3.9,
"quantidade": 5,
"cod_produto": "PROD20236160441"
}
*/
import React from "react";

const Botoes = ({ values, nextStep, prevStep, handeSubmit }) => {
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
      <div className='row mt-5'>
        <div className='col-12 '>
          {prevStep && (
            <button className='btn btn-secondary float-start' onClick={voltar}>
              Voltar
            </button>
          )}

          {nextStep && (
            <button className='btn btn-primary float-end' onClick={continuar}>
              Continuar
            </button>
          )}

          {handeSubmit && (
            <button className='btn btn-primary float-end' onClick={handeSubmit}>
              Salvar
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Botoes;
