import React from 'react'
import CaixaStep from "../Movimento/CaixaStep";
import Title from '../Title/index';
const Resumo = ({ values, nextStep, prevStep, handeSubmit }) => {
  console.log(values)
  return (
    <>
    <Title title='Quase lá!' subtitle='Aqui vai um resumo das informações.' />
    {
      // cria uma tela de confirmação com as informações do usuário
      
      
    }
    <CaixaStep prevStep={prevStep} handeSubmit={handeSubmit} />
    </>

  )
}

export default Resumo