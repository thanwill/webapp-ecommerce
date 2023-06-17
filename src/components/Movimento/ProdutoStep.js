/*
{
"nome": "Ração para gatos",
"descricao": "Ração completa e balanceada para gatos de todas as idades",
"cod_categoria": "CAT2023613115533"
}
*/
import React from "react";
import { Button } from "bootstrap";

const ProdutoStep = ({ nextStep, prevStep, handleChange, values }) => {
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

export default ProdutoStep;
