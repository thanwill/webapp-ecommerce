import React from "react";
import CadastrarUsuario from '../components/CadastrarUsuario/CadastrarUsuario';

const Cadastro = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-10 offset-1 col-md-6 offset-md-3 mt-5 mb-5'>
          <CadastrarUsuario />
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
