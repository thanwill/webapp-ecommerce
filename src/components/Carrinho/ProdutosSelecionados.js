import React from "react";

const ProdutosSelecionados = () => {
  // verifica se existe produtos selecionados no localStorage
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  return (
    <>
      {
        // verifica se o carrinho está vazio
        carrinho.length === 0 ? (
          // se estiver vazio, exibe uma mensagem
          <p>Nenhum produto selecionado</p>
        ) : (
          // se não estiver vazio, exibe a lista de produtos
          <ul className='list-group'>
            {carrinho.map(produto => {
              return (
                <li
                  key={produto.cod_produto}
                  className='list-group-item d-flex justify-content-between align-items-center'>
                  {produto.nome}
                  <span className='badge bg-primary rounded-pill'>
                    {produto.quantidade}
                  </span>
                </li>
              );
            })}
          </ul>
        )
      }
    </>
  );
};

export default ProdutosSelecionados;
