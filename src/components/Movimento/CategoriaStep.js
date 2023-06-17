/*
"nome":"Pet Toys",
"descricao":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sunt nihil voluptatibus distinctio officiis dolore veniam blanditiis quidem non praesentium!"
*/
import React from "react";

const CategoriaStep = ({ nextStep, handleChange, values }) => {
  const Continues = e => {
    e.preventDefault();
    nextStep();
  };

  return (
    <>
      <h1>Categoria</h1>
      <button onClick={Continues}>Previous</button>
    </>
  );
};

export default CategoriaStep;
