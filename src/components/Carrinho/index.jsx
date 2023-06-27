import React, {useEffect, useContext, useState} from 'react'
import { Section, Container } from './styles.js'
import ItemProduct from './itemProduct'
import { CartContext } from '../../context/cartContext.jsx'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Carrinho(){

    const { cart } = useContext(CartContext)
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState({})

    useEffect(() => {
        if(cart.length === 0){
            toast.error('Seu carrinho está vazio')
            //navigate('/')
        }

        const user = fetch('http://localhost:3000/user/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => response.json()).then((data) => {
            setUsuario(data)
        }).catch((err) => {
            console.log(err)
            navigate('/login')
            toast.error('Você precisa estar logado para acessar essa página')
        })

        return () => {
        }
    },[
        cart,
        navigate
    ])

    return(
        <Container>
            <Section>
                <h3>Seu Carrinho</h3>
                {cart.length > 0 ? cart.map((item) => (
                    <ItemProduct
                        key={item._id}
                        id={item._id}
                        nome={item.name}
                        quantidade={item.quantity}
                    />
                )) : (<h4>Seu carrinho está vazio</h4>)}
            </Section>
            <Section>
                <h3>Dados de entrega</h3>
                <form>
                    <label>Nome do Destinatário:</label>
                    <input type="text" name="name" defaultValue={usuario.nome} />
                    <label>Rua:</label>
                    <input type="text" name="street" defaultValue={usuario.endereco.rua}/>
                    <label>Número:</label>
                    <input type="text" name="number" defaultValue={usuario.endereco.numero}/>
                    <label>Complemento:</label>
                    <input type="text" name="complement" defaultValue={usuario.endereco.complemento} />
                    <label>Bairro:</label>
                    <input type="text" name="district" defaultValue={usuario.endereco.bairro}/>
                    <label>Cidade:</label>
                    <input type="text" name="city" defaultValue={usuario.endereco.cidade}/>
                    <label>Estado:</label>
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
                    {usuario.cartao ? <option value="cartao">Cartao: {usuario.cartao.numero}</option> : null}
                </select>
            </Section>
            <Section>
                <h4>Total: R$600</h4>
                <button className='finish'>Finalizar Compra</button>
            </Section>
        </Container>
    )
}