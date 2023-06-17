import "./style.css";

export default function Produtos({ produtos, categorias }) {
  console.log(produtos);
  return (
    <>
      {
        // Se produtos for diferente de vazio, renderiza o componente
        produtos &&
          produtos.map(produto => {
            return (
              <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4'>
                <div className='card' key={produto._id}>
                  <svg
                    className='bd-placeholder-img card-img-top'
                    width='100%'
                    height='200'
                    xmlns='http://www.w3.org/2000/svg'
                    role='img'
                    aria-label='Placeholder: Image cap'
                    preserveAspectRatio='xMidYMid slice'
                    focusable='false'>
                    <title>Placeholder</title>
                    <rect width='100%' height='100%' fill='#868e96'></rect>
                  </svg>
                  <div className='card-body'>
                    <h5 className='card-title'>{produto.nome}</h5>
                    <p className='card-text'>{produto.descricao}</p>
                    <ul className='list-group list-group-flush'>
                      <li className='list-group-item'>
                        {categorias.map(categoria => {
                          if (categoria._id === produto.categoria) {
                            return categoria.nome;
                          }
                        })}
                      </li>
                      <li className='list-group-item'>
                        
                      </li>
                    </ul>
                    <a href=' ' className='btn btn-primary'>
                      Comprar
                    </a>
                  </div>
                </div>
              </div>
            );
          })
      }

      <div className='card'>
        <svg
          className='bd-placeholder-img card-img-top'
          width='100%'
          height='200'
          xmlns='http://www.w3.org/2000/svg'
          role='img'
          aria-label='Placeholder: Image cap'
          preserveAspectRatio='xMidYMid slice'
          focusable='false'>
          <title>Placeholder</title>
          <rect width='100%' height='100%' fill='#868e96'></rect>
        </svg>
        <div className='card-body'>
          <h5 className='card-title'>Card title</h5>
          <p className='card-text'>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>An item</li>
          <li className='list-group-item'>A second item</li>
          <li className='list-group-item'>A third item</li>
        </ul>
        <div className='card-body'>
          <a href='#' className='card-link'>
            Card link
          </a>
          <a href='#' className='card-link'>
            Another link
          </a>
        </div>
      </div>
    </>
  );
}
