import React from "react";
import Title from "../Title";
import CaixaStep from "./CaixaStep";
import { ItensServices } from "../../services/estoque";

const Resumo = ({ nextStep, prevStep, handleChange, handeSubmit, values }) => {

  return (
    <>
      <Title title={"Resumo"} subtitle={"Consulte os detalhes cadastrados"} />

      {
        <div>
          <div className='row'>
            <p>{values.documento}</p>
            <p>{values.motivo}</p>
          </div>
        </div>
      }
      <h1>Itens</h1>

      <table className='table table-striped'>
        
        <thead>
          <tr>
            <th scope='col'>Produto</th>
            <th scope='col'>Quantidade</th>
            <th scope='col'>Valor unitário</th>
            <th scope='col'>Valor total</th>
          </tr>
        </thead>
        <tbody>
          {
            // percorre o array de itens cadastrados e cria uma linha para cada item
            values.itens.map(item => (
              <tr>
                <td>{item.nome}</td>
                <td>{item.quantidade}</td>
                <td>{item.valor_unitario}</td>
                <td>
                  {
                    // calcula o valor total do item e exibe com duas casas decimais
                    (item.quantidade * item.valor_unitario).toFixed(2)
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <CaixaStep prevStep={prevStep} handeSubmit={handeSubmit} />
    </>
  );
};

export default Resumo;
