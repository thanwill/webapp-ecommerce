

import "./style.css";
export default function Categorias({ props }) {
  return (
    <>
      <div className='mb-3 card'>
        <div className='card-body'>
          <div className='flex-between-center row'>
            <div className='d-flex align-items-center mb-2 mb-sm-0 col-sm-auto'>
              <select className='form-select form-select-sm'>
                {
                  // Se não existir nada em props
                  props === undefined || props.length === 0 ? (
                    // se estiver vazia, exibe uma opção vazia
                    <option value='0'>Nenhuma categoria cadastrada</option>
                  ) : (
                    props.map(categoria => {
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
                <option value='9'>All</option>
              </select>
              <h6 className='mb-0 ms-2'>Filtre por categorias</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
