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
        {
          // cria um campo de busca para filtar por nome, sobrenome, cidade, estado e status
          // cria um botão para excluir o usuario
        }
        {usuarios ? (
          usuarios.map(usuario => (
            <li className='card mb-3' key={usuario.id}>
              <div className='row g-0'>
                <div className='col-md-8'>
                  <div className='card-body'>
                    <h5 className='card-title'>{usuario.nome}</h5>
                    <p className='card-text'>{usuario.email}</p>
                    <p className='card-text'>
                      <small className='text-body-secondary'>
                        Last updated 3 mins ago
                      </small>{" "}
                      <br />
                      <div className='row'>
                        <div className='col-4'>
                         <div className="text-body-secondary" data-bs-toggle="modal" data-bs-target={`#modal-update-${usuario.id}`}>
                            Editar
                          </div>
                         <AtualizarPerfil usuario={usuario} />
                        </div>
                        <div className='col-3'>
                          <small className='text-body-secondary'>Excluir</small>
                        </div>
                      </div>
                      {
                        // cria um botão para editar o usuario
                      }
                    </p>
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
