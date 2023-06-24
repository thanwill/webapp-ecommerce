import React from 'react'
import { Section, Container } from './styles.js'
import ItemProduct from './itemProduct'

export default function Carrinho(){
    return(
        <Container>
            <Section>
                <h3>Seu Carrinho</h3>
                <ItemProduct id={1} img={'https://2.bp.blogspot.com/-TOCRLYBV3N4/UsbbAXBZmkI/AAAAAAAAPuM/DbPHOcuv6HA/s1600/A-Menina-Que-Roubava-Livros-capa-filme-1.jpg'} name={'Bololo'} price={'123'} quantity={1} />
            </Section>
            <Section>
                <h3>Dados de entrega</h3>
                <form>
                    <label>Nome do Destinatário:</label>
                    <input type="text" name="name" />
                    <label>Rua:</label>
                    <input type="text" name="street" />
                    <label>Número:</label>
                    <input type="text" name="number" />
                    <label>Complemento:</label>
                    <input type="text" name="complement" />
                    <label>Bairro:</label>
                    <input type="text" name="district" />
                    <label>Cidade:</label>
                    <input type="text" name="city" />
                    <label>Estado:</label>
                    <select name="state">
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AM">AM</option>
                        <option value="AP">AP</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF" selected>DF</option>
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
                    <option value="boleto">Mastercard 55020918</option>
                </select>
            </Section>
            <Section>
                <h4>Total: R$600</h4>
                <button className='finish'>Finalizar Compra</button>
            </Section>
        </Container>
    )
}