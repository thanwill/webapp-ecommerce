import React from "react";
import Title from "../Title/index";
import { useState, useEffect } from "react";
import { UsuarioService } from "../../services/usuario";

export default function Profile() {
  const storedToken = localStorage.getItem("token");

  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    async function fetchUsuario() {
      try {
        const response = await UsuarioService.exibir("USU2023619195236131");
        setUsuario(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsuario();
  }, [storedToken]);

  console.log(usuario);

  
  return (
    <>
      <div className='container '>

        <div className='tab-content active'  id='pills-tabContent'>
          <div
            className='tab-pane fade'
            id='pills-contact'
            role='tabpanel'
            aria-labelledby='pills-contact-tab'
            tabIndex='0'>
            <div className='row'>
              <div className='col-10 offset-1 col-md-6 offset-md-3 mt-5'>
                <Title title='Perfil' />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
