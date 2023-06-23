import React from "react";
import Botoes from "./Botoes";

const Perfil = () => {
  return (
    <>
      <div class='row mt-5'>
        <div class='col-10 offset-1 col-md-6 offset-md-3 mt-5 mb-5'>
          <div class='undefined mb-3'>
            <div class='row'>
              <h1 class=''>Movimentos</h1>
              <p class='text-muted'>Selecione a categoria do movimento</p>
            </div>
          </div>
          <form class=''>
            <div class='row'>
              <div class='input-group mt-3'>
                <select class='form-select' aria-label='Selecione o motivo'>
                  <option disabled=''>Selecione o motivo</option>
                  <option value='Compra de estoque'>Compra de estoque</option>
                  <option value='Venda de estoque'>Venda de estoque</option>
                  <option value='Devolução de cliente'>
                    Devolução de cliente
                  </option>
                  <option value='Devolução de fornecedor'>
                    Devolução de fornecedor
                  </option>
                  <option value='Transferência interna'>
                    Transferência interna
                  </option>
                  <option value='Ajuste de estoque'>Ajuste de estoque</option>
                  <option value='Perda ou roubo de estoque'>
                    Perda ou roubo de estoque
                  </option>
                  <option value='Inventário físico'>Inventário físico</option>
                  <option value='Outro motivo'>Outro motivo</option>
                </select>
              </div>
            </div>
            <div class='row'>
              <div class='input-group mt-3'>
                <select class='form-select' aria-label='Selecione o motivo'>
                  <option disabled=''>Selecione o documento</option>
                  <option value='Nota fiscal de compra'>
                    Nota fiscal de compra
                  </option>
                  <option value='Nota fiscal de venda'>
                    Nota fiscal de venda
                  </option>
                  <option value='Ordem de compra'>Ordem de compra</option>
                  <option value='Ordem de venda'>Ordem de venda</option>
                  <option value='Recibo de devolução'>
                    Recibo de devolução
                  </option>
                  <option value='Fatura de transferência'>
                    Fatura de transferência
                  </option>
                  <option value='Relatório de ajuste'>
                    Relatório de ajuste
                  </option>
                  <option value='Boletim de ocorrência'>
                    Boletim de ocorrência
                  </option>
                  <option value='Nenhum documento'>Nenhum documento</option>
                </select>
              </div>
            </div>
            <div class='row'>
              <div class='input-group mt-3'>
                <select class='form-select' aria-label='Selecione a orgem'>
                  <option disabled=''>Selecione a origem</option>
                  <option value='DEP2023615224950'>Unidade Joinville</option>
                  <option value='DEP2023615233322'>Unidade Brusque</option>
                </select>
              </div>
            </div>
          </form>
          <div class='row mt-5'>
            <div class='col-12 '>
              <button class='btn btn-primary float-end'>Continuar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Perfil;
