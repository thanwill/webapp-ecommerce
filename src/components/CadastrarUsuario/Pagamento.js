import React from 'react'
import CaixaStep from "../Movimento/CaixaStep";
import Title from '../Title/index';

const Pagamento = ({ values, nextStep, prevStep, handeSubmit }) => {
  return (
    <>
    <Title title='Pagamento' subtitle='Defina a sua forma de pagamento.' />
    <CaixaStep nextStep={nextStep} prevStep={prevStep} />
    </>
  )
}

export default Pagamento