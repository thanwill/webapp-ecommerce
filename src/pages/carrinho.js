import React from "react";
import CarrinhoController from "../components/Carrinho/CarrinhoController";

const Carrinho = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-10 offset-1 col-md-6 offset-md-3 mt-5 mb-5'>
          <CarrinhoController />
        </div>
      </div>
    </div>
  );
};

export default Carrinho;
