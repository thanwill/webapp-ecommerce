/*
{
"valor_unitario": 3.9,
"quantidade": 5,
"cod_produto": "PROD20236160441"
}
*/
import React from 'react'

const ItemStep = ({nextStep, prevStep, handleChange, values}) => {
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
}

export default ItemStep