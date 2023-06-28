import React, { useState, createContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([
    { id: 1, name: 'Lorem Ipsum', price: 100, quantity: 1 }
  ]);


  const addItem = () => {
    setCart([
      ...cart,
      { id: cart.length + 1, name: 'Lorem Ipsum', price: 100, quantity: 1 }
    ]);
  };

  const increment = (id) => {
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      } else {
        return cartItem;
      }
    });
    setCart(newCart);
  };

  const decrement = (id) => {
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === id) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      } else {
        return cartItem;
      }
    });
    setCart(newCart);
  };

  const removeItem = (id) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== id);
    setCart(newCart);
  };

  const calculaTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const clear = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clear,
        increment,
        decrement,
        calculaTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
