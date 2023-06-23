import React from 'react'
import CaixaStep from "../Movimento/CaixaStep";
import Title from '../Title/index';
const Resumo = ({ values, nextStep, prevStep, handeSubmit }) => {
  return (
    <>
    <Title title='Quase lá!' subtitle='Aqui vai um resumo das informações.' />
    <CaixaStep prevStep={prevStep} handeSubmit={handeSubmit} />
    </>

  )
}

export default Resumo