import React, { useState, useEffect} from "react";
import CaixaStep from "../Movimento/CaixaStep";
import Title from "../Title/index";
import Form from "react-bootstrap/Form";
const Endereco = ({
  values,
  nextStep,
  prevStep,
  handleChange,
}) => {
  const [validated, setValidated] = React.useState(false);
  const [cep, setCep] = useState("");

  // consulta a api do viacep e preenche os campos de endereco
  useEffect(() => {
    // verifica se o cep nao esta vazio e contem 8 digitos
    if (cep !== "" && cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${values.cep}/json/`)
        .then(response => response.json())
        .then(data => {
          if (data.erro) {
            alert("CEP não encontrado.");
          } else {
            console.log(data);
            handleChange("logradouro")({
              target: { value: data.logradouro },
            });
            handleChange("bairro")({ target: { value: data.bairro } });
            handleChange("localidade")({ target: { value: data.localidade } });
            handleChange("uf")({ target: { value: data.uf } });
          }
        });
    } else {
      handleChange("logradouro")({ target: { value: "" } });
      handleChange("bairro")({ target: { value: "" } });
      handleChange("localidade")({ target: { value: "" } });
      handleChange("uf")({ target: { value: "" } });
    }

  }, [cep]);



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
              name='cep'
              className='form-control'
              id='cep'
              placeholder='80123-500'
              // validacao
              required
              pattern='[0-9]{5}-[\d]{3}'
              onChange={e => {
                e.target.value = e.target.value.replace(
                  /(\d{5})(\d{3})/,
                  "$1-$2"
                );                
                setCep(e.target.value);
                handleChange("cep")(e);
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
          Object.keys(values.cep).length !== 0 && (
            <>
              <div className='mb-3'>
                <div className='form-floating mb-3'>
                  <input
                    type='text'
                    name='logradouro'
                    className='form-control'
                    id='logradouro'
                    placeholder='Rua das Flores'
                    required
                    pattern='[A-Za-zÀ-ú0-9 ]{3,}'
                    defaultValue={values.logradouro}
                    onChange={handleChange("logradouro")}
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
                    name='numero'
                    className='form-control'
                    id='numero'
                    placeholder='123'
                    // validacao
                    required
                    pattern='[0-9]{1,}'
                    
                    onChange={handleChange("numero")}
                  />
                  <label htmlFor='numero'>Número</label>
                </div>
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
                    defaultValue={values.bairro}
                    onChange={handleChange("bairro")}
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
                    name='localidade'
                    className='form-control'
                    id='localidade'
                    placeholder='Curitiba'
                    // validacao
                    required
                    pattern='[A-Za-zÀ-ú0-9 ]{3,}'
                    defaultValue={values.localidade}
                    onChange={e => {
                      handleChange("localidade");
                    }}
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
                  <select
                    className='form-select'
                    id='uf'
                    name='uf'
                    required
                    defaultValue={values.uf}
                    onChange={e => {
                      handleChange("uf")(e);
                    }}>
                    <option value='' disabled selected>
                      Selecione um estado
                    </option>
                    <option value='AC'>Acre</option>
                    <option value='AL'>Alagoas</option>
                    <option value='AP'>Amapá</option>
                    <option value='AM'>Amazonas</option>
                    <option value='BA'>Bahia</option>
                    <option value='CE'>Ceará</option>
                    <option value='DF'>Distrito Federal</option>
                    <option value='ES'>Espírito Santo</option>
                    <option value='GO'>Goiás</option>
                    <option value='MA'>Maranhão</option>
                    <option value='MT'>Mato Grosso</option>
                    <option value='MS'>Mato Grosso do Sul</option>
                    <option value='MG'>Minas Gerais</option>
                    <option value='PA'>Pará</option>
                    <option value='PB'>Paraíba</option>
                    <option value='PR'>Paraná</option>
                    <option value='PE'>Pernambuco</option>
                    <option value='PI'>Piauí</option>
                    <option value='RJ'>Rio de Janeiro</option>
                    <option value='RN'>Rio Grande do Norte</option>
                    <option value='RS'>Rio Grande do Sul</option>
                    <option value='RO'>Rondônia</option>
                    <option value='RR'>Roraima</option>
                    <option value='SC'>Santa Catarina</option>
                    <option value='SP'>São Paulo</option>
                    <option value='SE'>Sergipe</option>
                    <option value='TO'>Tocantins</option>
                  </select>
                  <label htmlFor='uf'>UF</label>
                </div>
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
