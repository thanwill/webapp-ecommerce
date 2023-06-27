import { useEffect, useState } from 'react';
import { FilmesService } from '../../services/filmes';
import ListaFilmes from '../ListaFilmes';
export default function Catalogo() {
  const [filmes, setFilmes] = useState([]);

  // usa o useEffect para executar uma função assim que o componente for montado na tela
  useEffect(() => {
    // chama a função listar do service
    FilmesService.listar().then((filmes) => {
      // atualiza o estado com a lista de usuarios
      setFilmes(filmes);
    });
  }, []);

  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col-10 offset-1 col-md-6">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Lançamentos
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Planos
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabIndex="0"
          >
            <div className="row">
              <div className="col-10 offset-1 col-md-6 offset-md-3 mt-5 mb-5">
                <ListaFilmes filmes={filmes} />
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabIndex="0"
          >
            <div className="row">
              <div className="col-10 offset-1 col-md-6 offset-md-3 mt-5 mb-5"></div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
            tabIndex="0"
          >
            <div className="row">
              <div className="col-10 offset-1 col-md-6 offset-md-3 mt-5"></div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-disabled"
            role="tabpanel"
            aria-labelledby="pills-disabled-tab"
            tabIndex="0"
          >
            ...
          </div>
        </div>
      </div>
    </>
  );
}
