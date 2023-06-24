import React from "react";

import Title from "../Title";
import DetalhesFilme from "../DetalhesFilme";

export default function ListaFilmes({ filmes }) {


  return (
    <>
      <Title
        title='Catálogo'
        subtitle='Assista aos filmes online e de onde estiver com o catálogo de filmes atualizado toda semana.'
      />
      {filmes ? (
        <>
          {filmes.map(filme => (
            <div className='card mb-3' key={filme.id}>
              <img src={filme.poster} className='card-img-top' alt='...' />
              <div className='card-body'>
                <h5 className='card-title'>{filme.titulo}</h5>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <button
                  type='button'
                  className='btn btn-primary'
                  data-bs-toggle='modal'
                  data-bs-target='#staticBackdropFilme'>
                  Detalhes
                </button>
              </div>
              <DetalhesFilme filme={filme} />
            </div>
          ))}
          
        </>
      ) : (
        <p>Não há filmes cadastrados.</p>
      )}
      
    </>
  );
}
