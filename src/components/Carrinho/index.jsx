import React, { useEffect, useContext, useState } from 'react';
import { Section, Container } from './styles.js';
import ItemProduct from './itemProduct';
import { CartContext } from '../../context/cartContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';

const Carrinho = () => {
  const { cart, clear } = useContext(CartContext);
  const [display, setDisplay] = useState(false);
  const [usuario, setUsuario] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      toast.error('Você precisa estar logado para acessar o carrinho');
      return;
    }

    if(cart.length === 0) {
      navigate('/');
      toast.error('Você precisa adicionar produtos ao carrinho');
      return;
    }

    axios.get('http://localhost:3000/usuario/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setUsuario(response.data);
      console.log(cart)
      setDisplay(true);
    }).catch((error) => {
      toast.error('Erro ao buscar usuário');
      navigate('/login');
      localStorage.removeItem('token');
    });
  }, [navigate, cart]);

  return (
    <Container>
      {
        display ? (
          <>
            <Section>
        <h3>
          Seu Carrinho -{' '}
          <span
            style={{
              cursor: 'pointer',
              color: '#004cff',
            }}
            onClick={clear}
          >
            Limpar carrinho
          </span>
        </h3>
        <ItemProduct
          id={1}
          nome="Nome do Produto"
          quantidade="Quantidade"

        />
        {cart.length > 0 ? (
          cart.map((item) => (
            <ItemProduct
              key={item.id}
              id={item.id}
              nome={item.name}
              quantidade={item.quantity}
            />
          ))
        ) : (
          <h4>Seu carrinho está vazio</h4>
        )}
      </Section>
      <Section>
        <h3>Dados de entrega</h3>
        <form>
          <label htmlFor="name">Nome do Destinatário:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={usuario.nome}
            placeholder='Confirme o nome do destinatário'
          />
          <label htmlFor="street">Rua:</label>
          <input
            type="text"
            id="street"
            name="street"
            defaultValue={usuario.endereco.rua}
          />
          <label htmlFor="number">Número:</label>
          <input
            type="text"
            id="number"
            name="number"
            defaultValue={usuario.endereco.numero}
          />
          <label htmlFor="complement">Complemento:</label>
          <input
            type="text"
            id="complement"
            name="complement"
            defaultValue={usuario.endereco.complemento}
          />
          <label htmlFor="district">Bairro:</label>
          <input
            type="text"
            id="district"
            name="district"
            defaultValue={usuario.endereco.bairro}
          />
          <label htmlFor="city">Cidade:</label>
          <input
            type="text"
            id="city"
            name="city"
            defaultValue={usuario.endereco.cidade}
          />
          <label htmlFor="state">Estado:</label>
          <select name="state" defaultValue={usuario.endereco.estado}>
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AM">AM</option>
                        <option value="AP">AP</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MG">MG</option>
                        <option value="MS">MS</option>
                        <option value="MT">MT</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PE" >PE</option>
                        <option value="PI">PI</option>
                        <option value="PR">PR</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="RS">RS</option>
                        <option value="SC" >SC</option>
                        <option value="SE">SE</option>
                        <option value="SP">SP</option>
                        <option value="TO">TO</option>
                    </select>
        </form>
      </Section>
      <Section>
        <h3>Forma de pagamento:</h3>
        <select>
          <option value="boleto">Boleto</option>
          <option value="pix">PIX</option>
          {usuario.cartao && (
            <option value="cartao">Cartao: {usuario.cartao.numero}</option>
          )}
        </select>
      </Section>
      <Section>
        <button className="finish">Finalizar Compra</button>
      </Section>
          </>
        ) : (
          <Section>
            <TailSpin color="#004cff" height={80} width={80} />
          </Section>
        )
      }
    </Container>
  );
};

export default Carrinho;