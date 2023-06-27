import React, { useEffect, useState } from "react";

const ProdutosSelecionados = () => {
  // verifica se existe produtos selecionados no localStorage
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const [carrinhoAtualizado, setCarrinhoAtualizado] = useState(carrinho);

  useEffect(() => {
    setCarrinhoAtualizado(carrinho);
  }, [carrinho]);

  // função para adicionar quantidade
  function handleAdicionarQuantidade(item) {
    carrinho.map(produto => {
      if (produto.cod_produto === item.cod_produto) {
        return {
          ...produto,
          quantidade: produto.quantidade + 1,
        };
      }
      return produto;
    });
  }

  // função para remover quantidade
  function handleRemoverProduto(item) {
    const novoCarrinho = carrinhoAtualizado.filter(
      produto => produto.cod_produto !== item.cod_produto
    );
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  }

  return (
    <>
      <div className='accordion accordion-flush' id='accordionFlushExample'>
        {
          // verifica se o carrinho está vazio
          carrinhoAtualizado.length === 0 ? (
            // se estiver vazio, exibe uma mensagem
            <>
              <div className='accordion-item'>
                <h2 className='accordion-header' id='flush-headingOne'>
                  <button
                    className='accordion-button collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#flush-collapseOne'
                    aria-expanded='false'
                    aria-controls='flush-collapseOne'>
                    Accordion Item #1
                  </button>
                </h2>
                <div
                  id='flush-collapseOne'
                  className='accordion-collapse collapse'
                  aria-labelledby='flush-headingOne'
                  data-bs-parent='#accordionFlushExample'>
                  <div className='accordion-body'>
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> class. This is
                    the first item's accordion body.
                  </div>
                </div>
              </div>
            </>
          ) : (
            // se não estiver vazio, exibe a lista de produtos
            <>
              {carrinhoAtualizado.map(produto => {
                return (
                  <>
                    <div className='accordion-item' key={produto.cod_produto}>
                      <h2
                        className='accordion-header'
                        id={`flush-heading${produto.cod_produto}`}>
                        <button
                          className='accordion-button collapsed'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target={`#flush-collapse${produto.cod_produto}`}
                          aria-expanded='false'
                          aria-controls={`flush-collapse${produto.cod_produto}`}>
                          {produto.nome}
                        </button>
                      </h2>
                      <div
                        id={`flush-collapse${produto.cod_produto}`}
                        className='accordion-collapse collapse'
                        aria-labelledby={`flush-heading${produto.cod_produto}`}
                        data-bs-parent='#accordionFlushExample'>
                        <div className='accordion-body'>
                          <div className='row'>
                            <div className='col'>
                              <p>
                                {
                                  // formata o valor unitário do produto
                                  Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }).format(produto.valor_unitario)
                                }
                              </p>
                            </div>
                            <div className='col'>
                              {
                                //remove
                                <button
                                  type='button'
                                  onClick={() => handleRemoverProduto(produto)}
                                  className='btn btn-sm btn-outline-secondary mx-2'>
                                  <i className='bi bi-trash'></i>
                                </button>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          )
        }
      </div>
      {
        // mostra o valor totoa do carrinho
        carrinhoAtualizado.length !== 0 && (
          <div className='row'>
            <div className='col'>
              <p className='text-end mt-4'>
                <strong>
                  Total:{" "}
                  {
                    // formata o valor total do carrinho
                    Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(
                      carrinhoAtualizado.reduce(
                        (total, produto) =>
                          total + produto.valor_unitario * produto.quantidade,
                        0
                      )
                    )
                  }
                </strong>
              </p>
            </div>
          </div>
        )
      }
    </>
  );
};

export default ProdutosSelecionados;
