/*
{
"rua": "Rua Antônio Escorsin",
"numero": "123",
"complemento": "Sala 501",
"bairro": "Santa Cândida",
"cidade": "Curitiba",
"estado": "PR",
"cep": "82940-250"
}
*/

import React from 'react'

const EnderecoStep = ({nextStep, prevStep, handleChange, values}) => {
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

export default EnderecoStep