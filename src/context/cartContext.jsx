import React, { useState, createContext} from 'react';

export const CartContext = createContext();

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const isInCart = (id) => cart.some(item => item.id === id);

    const addItem = (item, quantity) => {
        if(isInCart(item.id)){
            const newCart = cart.map(cartItem => {
                if(cartItem.id === item.id){
                    return {...cartItem, quantity: cartItem.quantity + quantity}
                } else return cartItem;
            })
            setCart(newCart);
        } else {
            setCart([...cart, {...item, quantity}])
        }
    }

    const increment = (id) => {
        const newCart = cart.map(cartItem => {
            if(cartItem.id === id){
                return {...cartItem, quantity: cartItem.quantity + 1}
            } else return cartItem;
        })
        setCart(newCart);
    }

    const decrement = (id) => {
        const newCart = cart.map(cartItem => {
            if(cartItem.id === id){
                return {...cartItem, quantity: cartItem.quantity - 1}
            } else return cartItem;
        })
        setCart(newCart);
    }

    const removeItem = (id) => {
        const newCart = cart.filter(cartItem => cartItem.id !== id);
        setCart(newCart);
    }

    const clear = () => setCart([]);

    const getTotal = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        })
        setTotal(total);
    }

    return (
        <CartContext.Provider value={{cart, addItem, removeItem, clear, total, getTotal, increment, decrement}}>
            {children}
        </CartContext.Provider>
    )

}
export default CartProvider;