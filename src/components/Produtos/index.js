import React, { useState } from "react";
import Toast from "../Toast";
export default function Produtos({ itens, categorias }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(0);
  const handleCategoriaChange = event => {
    const categoria = parseInt(event.target.value);
    setCategoriaSelecionada(categoria);
  };

  const produtosFiltrados =
    categoriaSelecionada === 0
      ? itens
      : itens.filter(item => item.cod_categoria === categoriaSelecionada);
  const handleShowToast = () => {
    const toastElement = document.getElementById("myToast");
    const toast = new Toast(toastElement, {
      delay: 2000, // Tempo de exibição do Toast em milissegundos
    });
    toast.show();
  };

  function handleAdicionarAoCarrinho(item) {
    // Verifica se o carrinho já existe no localStorage
    const carrinhoSalvo = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Verifica se o produto já está no carrinho
    const produtoExistente = carrinhoSalvo.find(
      produto => produto.cod_produto === item.cod_produto
    );

    if (produtoExistente) {
      // Produto já está no carrinho, faça alguma lógica adicional se necessário
      console.log("Produto já está no carrinho:", produtoExistente);
    } else {
      // Produto não está no carrinho, adicione-o
      const novoProduto = {
        nome: item.nome,
        cod_produto: item.cod_produto,
        quantidade: 1,
        valor_unitario: item.valor_unitario,
      };

      const novoCarrinho = [...carrinhoSalvo, novoProduto];

      localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
      console.log("Produto adicionado ao carrinho:", novoProduto);
    }
  }

  return (
    <>
      <div className='mb-3 card'>
        <div className='card-body'>
          <div className='flex-between-center row'>
            <div className='d-flex align-items-center mb-sm-0 col-sm-auto'>
              <select className='form-select form-select-sm'>
                {
                  // Se não existir nada em categorias, exibe uma opção vazia
                  categorias === undefined || categorias.length === 0 ? (
                    <option value='0'>Nenhuma categoria cadastrada</option>
                  ) : (
                    categorias.map(categoria => {
                      return (
                        <option
                          key={categoria.cod_categoria}
                          value={categoria.cod_categoria}>
                          {categoria.nome}
                        </option>
                      );
                    })
                  )
                }
              </select>
              <h6 className='mb-0 ms-2'>Filtrar</h6>
            </div>
          </div>
        </div>
      </div>
      {
        // Se não existir nada em itens, exibe uma mensagem
        itens === undefined || itens.length === 0 ? (
          <div className='card mt-5'>
            <svg
              className='bd-placeholder-img card-img-top'
              width='100%'
              height='200'
              role='img'
              aria-label='Placeholder: Image cap'
              preserveAspectRatio='xMidYMid slice'
              focusable='false'>
              <title>Placeholder</title>
              <rect width='100%' height='100%' fill='#868e96'></rect>
            </svg>
            <div className='card-body'>
              <h5 className='card-title'>Lorem ipsum dolor sit.</h5>
              <p className='card-text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
                molestiae.
              </p>
            </div>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>R$ 0,00</li>
              <li className='list-group-item'>Categoria</li>
              <li className='list-group-item'>Semelhantes</li>
            </ul>
            <div className='card-body'
            >
              <div className='card-link text-center'>
                <i className='bi bi-bag p-3'></i> COMPRAR
              </div>
            </div>
          </div>
        ) : (
          itens.map(item => (
            <div className='card mt-4' key={item.cod_item}>
              <svg
                className='bd-placeholder-img card-img-top'
                width='100%'
                height='200'
                role='img'
                aria-label='Placeholder: Image cap'
                preserveAspectRatio='xMidYMid slice'
                focusable='false'>
                <title>Placeholder</title>
                <rect width='100%' height='100%' fill='#868e96'></rect>
              </svg>
              <div className='card-body'>
                <h5 className='card-title'>{item.nome}</h5>
                <p className='card-text'>{}</p>
              </div>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                  {
                    // exbi item.valor_unitario em formato de moeda
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.valor_unitario)
                  }
                </li>
                <li className='list-group-item'>{item.categoria}</li>
              </ul>
              <div
                className='card-body'
                onClick={() => {
                  handleAdicionarAoCarrinho(item);
                }}>
                <div className='card-link text-center' id='btn-comprar-produto'>
                  <i className='bi bi-bag p-3'></i> COMPRAR
                </div>
              </div>

              <div
                aria-live='polite'
                aria-atomic='true'
                class='d-flex justify-content-center align-items-center w-100'>
                <div
                  class='toast'
                  role='alert'
                  aria-live='assertive'
                  aria-atomic='true'>
                  <div class='toast-header'>
                    <strong class='me-auto'>Bootstrap</strong>
                    <small>11 mins ago</small>
                    <button
                      type='button'
                      class='btn-close'
                      data-bs-dismiss='toast'
                      aria-label='Close'></button>
                  </div>
                  <div class='toast-body'>
                    Hello, world! This is a toast message.
                  </div>
                </div>
              </div>
            </div>
          ))
        )
      }
    </>
  );
}
