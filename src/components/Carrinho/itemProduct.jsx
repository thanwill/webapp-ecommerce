import { ItemProduct as Container } from './styles'
import React, { useContext } from 'react'
import { CartContext } from '../../context/cartContext'


export default function ItemProduct({ id, name, quantity}){

    const { increment, decrement } = useContext(CartContext);

    return (
        <Container>
            <p>{name}</p>
            <div className='quantity'>
                <p>{quantity}</p>
                <div className='buttonSet'>
                    <button className="plus" onClick={increment(id)}>
                        <i class='bx bx-plus'></i>
                    </button>
                    <button className="minus" onClick={decrement(id)}>
                        <i class='bx bx-minus'></i>
                    </button>
                </div>
            </div>
        </Container>
    )
}