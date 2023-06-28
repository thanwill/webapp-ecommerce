import Title from "../Title/index";
import AtualizarPerfil from "../AtualizarPerfil/index";

export default function ListarUsuarios({ usuarios }) {
  return (
    <>
      <Title
        title='Usuários'
        subtitle='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, labore!'
      />
      <ul className='list-group'>      
        {usuarios ? (
          usuarios.map(usuario => (
            <li className='card mb-3' key={usuario.id}>
              <div className='row g-0'>
                <div className='col-md-8'>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-10'>
                        <h5 className='card-title'>{usuario.nome}</h5>
                      </div>
                      <div className='col'>X</div>
                    </div>
                    <p className='card-text'>{usuario.email}</p>
                    <p className='card-text'>
                      <small className='text-body-secondary'>
                        {
                          // exibe o tempo de criação com base na dataCriacao e a data atual
                          usuario.dataCriacao ? (
                            <>
                              <span className='text-body-secondary'>
                                Criado há{" "}
                                {Math.floor(
                                  (new Date() - new Date(usuario.dataCriacao)) /
                                    1000 /
                                    60 /
                                    60 /
                                    24
                                )}{" "}
                                dias
                              </span>
                            </>
                          ) : (
                            <>
                              <span className='text-body-secondary'>
                                Criado há{" "}
                                {Math.floor(
                                  (new Date() -
                                    new Date(usuario.dataAtualizacao)) /
                                    1000 /
                                    60 /
                                    60 /
                                    24
                                )}{" "}
                                dias
                              </span>
                            </>
                          )
                        }
                      </small>
                    </p>
                    <div
                      className='btn btn-primary'
                      data-bs-toggle='modal'
                      data-bs-target={`#modal-update-${usuario.id}`}>
                      Editar
                    </div>
                    <AtualizarPerfil usuario={usuario} />
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className='card'>
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
              <div className='btn btn-primary disabled placeholder col-6'></div>
            </div>
          </li>
        )}
      </ul>
    </>
  );
}
