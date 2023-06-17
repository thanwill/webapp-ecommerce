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

const MovimentoStep = ({nextStep, prevStep, handleChange, values}) => {
  const Continues = e => {
    e.preventDefault();
    nextStep();
  };

  const Previous = e => {
    e.preventDefault();
    prevStep();
  };

  return (
    <>
    
    </>
  );
};

export default MovimentoStep;
