// cria umm modal com formulario para atualizar o perfil
import Title from '../Title';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { UsuarioService } from '../services/usuario';

export default function AtualizarPerfil({ usuario }) {

  const [usuarioAtualizado, setUsuarioAtualizado] = useState({
    nome: '',
    email: '',
    senha: '',
    avatarUrl: '',
    newsletter: false,
    plano: '',
  });

  const [validated, setValidated] = useState(false);

  // captura o estado do backend
  const [resposta, setResposta] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    console.log(usuario)

    setUsuarioAtualizado((prevUsuario) => ({
      ...prevUsuario,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // verifica se os campos estão vazios

    UsuarioService.atualizar(usuario.id, usuarioAtualizado).then((response) => {
      setResposta(response);
    });
  };

  return (
    <>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                <Title title="Atualizar perfil" />
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <Title
                subtitle={`Olá, ${usuario.nome}. Atualize aqui informações do seu perfil e mantenha sua conta sempre em dia.`}
              />
              <Form>
                <div className="row">
                  <div className=" col-10 offset-1 col-md-6 offset-md-3 mt-3">
                    <div class="mb-3">
                      <div class="form-floating mb-3">
                        <input
                          type="text"
                          name="nome"
                          class="form-control"
                          id="floatingInput"
                          placeholder="Johe Doe"
                          defaultValue={usuario.nome}
                          onChange={handleChange}
                          // validacao
                          required
                          minLength={3}
                          maxLength={100}
                          pattern="^[a-zA-Zà-úÀ-Ú0-9]+(([' -][a-zA-Zà-úÀ-Ú0-9])?[a-zA-Zà-úÀ-Ú0-9]*)*$"
                        />
                        <label for="floatingInput">Nome completo</label>
                      </div>
                    </div>
                    <div class="mb-3">
                      <div class="form-floating mb-3">
                        <input
                          type="email"
                          name="email"
                          class="form-control"
                          id="floatingInput"
                          placeholder="example@gmail.com"
                          required
                          defaultValue={usuario.email}
                          onChange={handleChange}
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        />
                        <label for="floatingInput">Email</label>
                      </div>
                    </div>

                    
                  </div>
                </div>
              </Form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleSubmit}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
