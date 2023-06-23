import React, { useEffect } from "react";
import CaixaStep from "../Movimento/CaixaStep";
import Title from "../Title/index";
import Form from "react-bootstrap/Form";
const Endereco = ({ values, nextStep, prevStep, handeSubmit }) => {
  const [validated, setValidated] = React.useState(false);
  const [cep, setCep] = React.useState("");
  const [endereco, setEndereco] = React.useState({});

  useEffect(() => {
    // captura o cep digitado
    const cep = document.getElementById("cep-cadastro").value.replace("-", "");
    // usa a api do viacep para preencher os campos de endereço
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        setEndereco(data);
      })

      .catch(error => {
        console.log(error);
      });
  }, [cep]);

  console.log(endereco);

  return (
    <>
      <Title
        title='Endereço'
        subtitle='Aqui você pode registrar seu endereço.'
      />
      <Form
        noValidate
        encType='multipart/form-data'
        onChange={e => {
          // captura o foco de cada input e valida se o pattern está correto ou não adicionando a classe is-invalid ou is-valid

          if (e.target.value !== "") {
            if (e.target.validity.valid) {
              e.target.classList.remove("is-invalid");
              e.target.classList.add("is-valid");
              setValidated(false);
            } else {
              e.target.classList.remove("is-valid");
              e.target.classList.add("is-invalid");
              setValidated(true);
              // cria um elemento span para exibir a mensagem de erro com a tag invalid-feedback
              const span = document.createElement("span");
              span.classList.add("invalid-feedback");
              span.textContent = e.target.validationMessage;
            }
          }
        }}>
        <div className='mb-3'>
          <div className='form-floating mb-3'>
            <input
              type='text'
              name='cep-cadastro'
              className='form-control'
              id='cep-cadastro'
              placeholder='80123-500'
              // validacao
              required
              pattern='[0-9]{5}-[\d]{3}'
              onChange={e => {
                // cria a mascara do cep
                e.target.value = e.target.value.replace(
                  /(\d{5})(\d{3})/,
                  "$1-$2"
                );
                // captura o cep digitado
                setCep(e.target.value);
              }}
            />
            <label htmlFor='nome-cadastro'>CEP</label>
          </div>
          {validated && (
            <div className='form-text'>Por favor, insira um CEP válido.</div>
          )}
        </div>
        {
          // verifica se endereco nao esta vazio e exibe os campos de endereco
          Object.keys(endereco).length !== 0 && (
            <>
              <div className='mb-3'>
                <div className='form-floating mb-3'>
                  <input
                    type='text'
                    name='logradouro'
                    className='form-control'
                    id='logradouro'
                    placeholder='Rua das Flores'
                    // validacao
                    required
                    pattern='[A-Za-zÀ-ú0-9 ]{3,}'
                    defaultValue={endereco.logradouro}
                  />
                  <label htmlFor='logradouro'>Logradouro</label>
                </div>
                {validated && (
                  <div className='form-text'>
                    Por favor, insira um logradouro válido.
                  </div>
                )}
              </div>
              <div className='mb-3'>
                <div className='form-floating mb-3'>
                  <input
                    type='text'
                    name='bairro'
                    className='form-control'
                    id='bairro'
                    placeholder='Centro'
                    // validacao
                    required
                    pattern='[A-Za-zÀ-ú0-9 ]{3,}'
                    defaultValue={endereco.bairro}
                  />
                  <label htmlFor='bairro'>Bairro</label>
                </div>
                {validated && (
                  <div className='form-text'>
                    Por favor, insira um bairro válido.
                  </div>
                )}
              </div>
              <div className='mb-3'>
                <div className='form-floating mb-3'>
                  <input
                    type='text'
                    name='cidade'
                    className='form-control'
                    id='cidade'
                    placeholder='Curitiba'
                    // validacao
                    required
                    pattern='[A-Za-zÀ-ú0-9 ]{3,}'
                    defaultValue={endereco.localidade}
                  />
                  <label htmlFor='cidade'>Cidade</label>
                </div>
                {validated && (
                  <div className='form-text'>
                    Por favor, insira uma cidade válida.
                  </div>
                )}
              </div>
              <div className='mb-3'>
                <div className='form-floating mb-3'>
                  <input
                    type='text'
                    name='estado'
                    className='form-control'
                    id='estado'
                    placeholder='Paraná'
                    // validacao
                    required
                    pattern='[A-Za-zÀ-ú0-9 ]{3,}'
                    defaultValue={endereco.uf}
                  />
                  <label htmlFor='estado'>Estado</label>
                </div>
                {validated && (
                  <div className='form-text'>
                    Por favor, insira um estado válido.
                  </div>
                )}
              </div>
            </>
          )
        }
      </Form>
      <CaixaStep nextStep={nextStep} prevStep={prevStep} />
    </>
  );
};

export default Endereco;
