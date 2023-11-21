import { useState } from 'react';
import { createContext } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    const productsInCartIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (productsInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[productsInCartIndex].quantity += 1;
      return setCart(newCart);
    }

    setCart((prevState) => [
      ...prevState,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };

  const removeFromCart = (product) => {
    setCart((prevState) => prevState.filter((item) => item.id !== product.id));
  };

  const clearCart = () => {
    setCart([]);
  };
  return (
    <CartContext.Provider
      value={{ cart, addToCart, clearCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
