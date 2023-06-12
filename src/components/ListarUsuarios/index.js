import Title from "../Title/index";

export default function ListarUsuarios({ usuarios }) {
  return (
    <>
      <Title
        title='Usuários'
        subtitle='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, labore!'
      />
      {
        // verifica se existe usuários cadastrados
        usuarios ? (
          <>
            <ul className='list-group'>
              {usuarios.map(usuario => (
                <div className='card mb-3' key={usuario.id}>
                  <div className='row g-0'>
                    <div className='col-md-8'>
                      <div className='card-body'>
                        <h5 className='card-title'>{usuario.nome}</h5>
                        <p className='card-text'>{usuario.email}</p>
                        <p className='card-text'>
                          <small className='text-body-secondary'>
                            Last updated 3 mins ago
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </>
        ) : (
          <ul className='list-group'>
            <div className='card' aria-hidden='true'>
              <img
                src='./assets/beta.png'
                className='card-img-top rounded-circle'
                width={10}
                alt='...'
              />
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
                <div
                  className='btn btn-primary disabled placeholder col-6'
                  href=''></div>
              </div>
            </div>
          </ul>
        )
      }
    </>
  );
}
