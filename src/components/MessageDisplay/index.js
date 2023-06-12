// cria o escopo da página de perfil chamando o componente header.

import React from 'react';
import Title from '../Title/index';
const MessageDisplay = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="text-center mt-5 ">
            <img src="./assets/erro.png" alt="" />
            <Title
              title="Página em construção!"
              subtitle="Diminua a resolução e veja o que preparamos para você."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageDisplay;
