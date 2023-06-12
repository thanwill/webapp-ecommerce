export default function DetalhesFilme({ filme }) {
  return (
    <>
      <div
        class='modal fade'
        id='staticBackdropFilme'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabindex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'>
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h1 class='modal-title fs-5' id='staticBackdropLabel'>
                {filme.titulo}
              </h1>
              <button
                type='button'
                class='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div class='modal-body'>
              <ul className='list-group'>
                <div className='card' aria-hidden='true'>
                  <div className='card-body'>
                    <h5 className='card-title placeholder-glow'>
                      <span className='placeholder col-6'></span>
                    </h5>
                    <p className='card-text placeholder-glow'>
                      <span className='placeholder col-7'></span>
                      <span className='placeholder col-4'></span>
                      <span className='placeholder col-4'></span>
                      <span className='placeholder col-6'></span>
                      <span className='placeholder col-8'></span>
                    </p>
                  </div>
                </div>
              </ul>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-secondary'
                data-bs-dismiss='modal'>
                Fechar
              </button>
              <button type='button' class='btn btn-primary'>
                Comentar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
