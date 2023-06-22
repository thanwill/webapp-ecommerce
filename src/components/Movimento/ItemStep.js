import React from "react";
import Title from "../Title";
import { Form } from "react-bootstrap";
import CaixaStep from "./CaixaStep";
import { ProdutosServices, ItensServices } from "../../services/estoque";

const ItemStep = ({ nextStep, prevStep, handleChange, values }) => {
  // cria um estado para armazenar os enderecos
  const [produtos, setProdutos] = React.useState([]);
  const [atualiza, setAtualiza] = React.useState(false);
  const [itensCadastrados, setItensCadastrados] = React.useState([]);

  const listarProdutos = async () => {
    try {
      const response = await ProdutosServices.listar();
      setProdutos(response);
    } catch (error) {
      console.error(error);
    }
  };

  const [itemCriado, setItemCriado] = React.useState({
    cod_produto: "",
    nome: "",
    quantidade: 0,
    valor_unitario: 0.0,
  });

  const criarItem = async () => {
    try {
      setItensCadastrados([...itensCadastrados, itemCriado]);
      values.itens.push(itemCriado);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // uma funcao para listar

  React.useEffect(() => {
    listarProdutos();
  }, [atualiza]);

  const handleChangeItens = name => event => {
    //setItemCriado({ ...itemCriado, [name]: event.target.value });
    let value = event.target.value;

    if (name === "quantidade") {
      value = parseInt(value);
    }
    if (name === "valor_unitario") {
      // verifica se foi enviado com virgula
      if (value.indexOf(",") > -1) {
        // substitui a virgula por ponto
        value = value.replace(",", ".");
      }
      // verifica se contém letras
      if (isNaN(value)) {
        // remove as letras
        value = value.replace(/[a-zA-Z]/g, "");
      }
      // converte para float
      value = parseFloat(value);
    }

    // realiza uma pesquisa pelo nome do produto

    const produto = produtos.find(produto => produto.cod_produto === value);

    if (produto) {
      setItemCriado({ ...itemCriado, [name]: value, nome: produto.nome });
    } else {
      setItemCriado({ ...itemCriado, [name]: value });
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const item = await criarItem();
    console.log(item);
  };

  return (
    <>
      <Title title='Itens' subtitle='Adicione itens ao movimento' />
      <Form>
        <div className='row'>
          <div className='input-group mt-3'>
            {
              // cria o campo select para o deposito_origem
              produtos.length > 0 && (
                <>
                  <select
                    className='form-select'
                    aria-label='Selecione a orgem'
                    onChange={handleChangeItens("cod_produto")}>
                    <option selected disabled>
                      Selecione o produto
                    </option>
                    {
                      // percorre o array de enderecos e cria uma option para cada endereco
                      produtos.map(produto => (
                        <option value={produto.cod_produto}>
                          {produto.nome}
                        </option>
                      ))
                    }
                  </select>
                </>
              )
            }
          </div>
        </div>
        <div className='row'>
          <div className='input-group mt-3'>
            <input
              type='number'
              className='form-control'
              placeholder='Quantidade'
              onChange={handleChangeItens("quantidade")}
            />
          </div>
        </div>

        <div className='row'>
          <div className='input-group mt-3'>
            <span className='input-group-text'>$</span>
            <input
              type='text'
              className='form-control'
              placeholder='Valor por unidade'
              onChange={handleChangeItens("valor_unitario")}
            />
            <span className='input-group-text' onClick={handleSubmit}>
              <i className='bi bi-send-plus'></i>
            </span>
          </div>
        </div>
      </Form>
      {
        // reenderiza itens cadastrados
        values.itens && values.itens.length > 0 ? (
          <>
            <div className='row'>
              <div className='col-12 mt-5'>
                <table className='table table-striped'>
                  <thead>
                    <tr>
                      <th scope='col'>
                        {
                          // cria icone para excluir a linha
                        }
                      </th>
                      <th scope='col'>Produto</th>
                      <th scope='col'>Quantidade</th>
                      <th scope='col'>Valor unitário</th>
                      <th scope='col'>Valor total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      // percorre o array de itens cadastrados e cria uma linha para cada item
                      itensCadastrados.map(item => (
                        <tr>
                          <th
                            scope='row'
                            onClick={() => {
                              // remove o item do array
                              const itens = itensCadastrados.filter(
                                itemCadastrado =>
                                  itemCadastrado.cod_produto !==
                                  item.cod_produto
                              );
                              setItensCadastrados(itens);
                            }}>
                            <i className='bi bi-trash'></i>
                          </th>
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
              </div>
            </div>
          </>
        ) : (
          <>
            <p className=" text-danger mt-4 ">Nenhum item cadastrado</p>
          </>
        )
      }
      <CaixaStep nextStep={nextStep} prevStep={prevStep} />
    </>
  );
};

export default ItemStep;
