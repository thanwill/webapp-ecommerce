import React from "react";
import Title from "../Title";
import { Form } from "react-bootstrap";
import CaixaStep from "./CaixaStep";
import { EnderecoServices, DepositosServices } from "../../services/estoque";

const MovimentoStep = ({ nextStep, prevStep, handleChange, values }) => {
  // cria um estado para armazenar os enderecos
  const [enderecos, setEnderecos] = React.useState([]);
  const [depositos, setDepositos] = React.useState([]);

  const [depositoOrigem, setDepositoOrigem] = React.useState(null);
  // cria uma função para listar os enderecos
  const listarEnderecos = async () => {
    try {
      const response = await EnderecoServices.listar();
      setEnderecos(response);
    } catch (error) {
      console.error(error);
    }
  };

  const listarDepositos = async () => {
    try {
      const response = await DepositosServices.listar();
      setDepositos(response);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    // executa a função listarEnderecos
    listarEnderecos();
    listarDepositos();
  }, []);

  return (
    <>
      <Title
        title={"Movimentos"}
        subtitle={"Selecione a categoria do movimento"}
      />

      <Form>
        {
          // cria o campo select para o motivo
        }
        <div className='row'>
          <div className='input-group mt-3'>
            <select className='form-select' aria-label='Selecione o motivo' onChange={handleChange('motivo')} >
              <option selected disabled>
                Selecione o motivo
              </option>
              <option value='Compra de estoque'>Compra de estoque</option>
              <option value='Venda de estoque'>Venda de estoque</option>
              <option value='Devolução de cliente'>Devolução de cliente</option>
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

        <div className='row'>
          <div className='input-group mt-3'>
            <select className='form-select' aria-label='Selecione o motivo' onChange={handleChange('documento')}>
              <option selected disabled>
                Selecione o documento
              </option>
              {/*
                Nota fiscal de compra
                Nota fiscal de venda
                Ordem de compra
                Ordem de venda
                Recibo de devolução
                Fatura de transferência
                Relatório de ajuste
                Boletim de ocorrência
                Nenhum documento

                */}
              <option value='Nota fiscal de compra'>
                Nota fiscal de compra
              </option>
              <option value='Nota fiscal de venda'>Nota fiscal de venda</option>
              <option value='Ordem de compra'>Ordem de compra</option>
              <option value='Ordem de venda'>Ordem de venda</option>
              <option value='Recibo de devolução'>Recibo de devolução</option>
              <option value='Fatura de transferência'>
                Fatura de transferência
              </option>
              <option value='Relatório de ajuste'>Relatório de ajuste</option>
              <option value='Boletim de ocorrência'>
                Boletim de ocorrência
              </option>
              <option value='Nenhum documento'>Nenhum documento</option>
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='input-group mt-3'>
            {
              // cria o campo select para o deposito_origem
              enderecos.length > 0 && (
                <>
                  <select className='form-select' aria-label='Selecione a orgem' onChange={handleChange('deposito_origem')}>
                    <option selected disabled>
                      Selecione a origem
                    </option>
                    {
                      // percorre o array de enderecos e cria uma option para cada endereco
                      depositos.map(deposito => (
                        <option value={deposito.cod_deposito} key={deposito.cod_deposito}>
                          {deposito.nome}
                        </option>
                      ))
                    }
                  </select>
                </>
              )
            }
          </div>
          
        </div>
      </Form>
      <CaixaStep nextStep={nextStep} values={values} />
    </>
  );
};

export default MovimentoStep;
