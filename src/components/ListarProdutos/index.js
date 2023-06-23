import { useEffect, useState } from "react";
import { CategoriaService, ItensServices } from "../../services/estoque";
//import Categorias from "../Categorias/index.js";
import Produtos from "../Produtos/index.js";
import Title from "../Title/index.js";

export default function ListarProdutos() {
  const [itens, setItens] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    CategoriaService.listar().then(categorias => {
      setCategorias(categorias);
    });

    ItensServices.listar().then(itens => {
      setItens(itens);
    });
  }, []);
  return (

    <>
      <div className='container '>
        <div className='row'>
          <div className='col-10 offset-1 col-md-6'>
            <ul className='nav nav-pills mb-3' id='pills-tab' role='tablist'>
              <li className='nav-item' role='presentation'>
                <button
                  className='nav-link active'
                  id='pills-home-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#pills-home'
                  type='button'
                  role='tab'
                  aria-controls='pills-home'
                  aria-selected='true'>
                  Produtos
                </button>
              </li>
              <li className='nav-item' role='presentation'>
                <button
                  className='nav-link'
                  id='pills-profile-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#pills-profile'
                  type='button'
                  role='tab'
                  aria-controls='pills-profile'
                  aria-selected='false'>
                  Serviços
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className='tab-content' id='pills-tabContent'>
          <div
            className='tab-pane fade show active'
            id='pills-home'
            role='tabpanel'
            aria-labelledby='pills-home-tab'
            tabIndex='0'>
            <div className='row'>
              <div className='col-10 offset-1 col-md-6 offset-md-3 mt-5 mb-5'>
                <Title title='Produtos' subtitle='Confira nossos produtos' />
                <Produtos itens={itens} categorias={categorias} />
                
              </div>
            </div>
          </div>
          <div
            className='tab-pane fade'
            id='pills-profile'
            role='tabpanel'
            aria-labelledby='pills-profile-tab'
            tabIndex='0'>
            <div className='row'>
              <div className='col-10 offset-1 col-md-6 offset-md-3 mt-5 mb-5'></div>
            </div>
          </div>
          <div
            className='tab-pane fade'
            id='pills-contact'
            role='tabpanel'
            aria-labelledby='pills-contact-tab'
            tabIndex='0'>
            <div className='row'>
              <div className='col-10 offset-1 col-md-6 offset-md-3 mt-5'></div>
            </div>
          </div>
          <div
            className='tab-pane fade'
            id='pills-disabled'
            role='tabpanel'
            aria-labelledby='pills-disabled-tab'
            tabIndex='0'>
            ...
          </div>
        </div>
      </div>
    </>
  );
}
