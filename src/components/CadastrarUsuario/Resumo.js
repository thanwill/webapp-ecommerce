import React from 'react'
import CaixaStep from "../Movimento/CaixaStep";
import Title from '../Title/index';
const Resumo = ({ values, prevStep, handeSubmit }) => {
  return (
    <>
    <Title title='Quase lá!' subtitle='Aqui vai um resumo das informações.' />

    {
     values && Object.keys(values).map((key, index) => {
        return (
          <div key={index}>
            <p>{key}: {values[key]}</p>
          </div>
        )
      })

    }
    
    <CaixaStep prevStep={prevStep} handeSubmit={handeSubmit} />
    </>

  )
}

export default Resumo