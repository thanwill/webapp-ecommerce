import { ItemProduct as Container } from './styles'
import React, { useContext } from 'react'
import { CartContext } from '../../context/cartContext'


export default function ItemProduct({ id, img, name, price, quantity}){

    const { increment, decrement } = useContext(CartContext);

    return (
        <Container>
            <img src={img} alt={name}/>
            <p>{name}</p>
            <b><p>R${price}</p></b>
            <div className='quantity'>
                <p>{quantity}</p>
                <div className='buttonSet'>
                    <button className="plus" onClick={increment(id)}>
                        <i className='bx bx-plus'></i>
                    </button>
                    <button className="minus" onClick={decrement(id)}>
                        <i className='bx bx-minus'></i>
                    </button>
                </div>
            </div>
        </Container>
    )
}