import { useReducer } from 'react';
import { createContext } from 'react';

export const CartContext = createContext();

const initialState = JSON.parse(window.localStorage.getItem('cart')) || [];

const updateLocalStorage = (state) => {
  window.localStorage.setItem('cart', JSON.stringify(state));
};

const reducer = (state, action) => {
  const { type: actionType, payload: actionPyload } = action;

  switch (actionType) {
    case 'ADD_TO_CART': {
      const { id } = actionPyload;
      const productsInCartIndex = state.findIndex((item) => item.id === id);

      if (productsInCartIndex >= 0) {
        const newState = [
          ...state.slice(0, productsInCartIndex),
          {
            ...state[productsInCartIndex],
            quantity: state[productsInCartIndex].quantity + 1,
          },
          ...state.slice(productsInCartIndex + 1),
        ];

        updateLocalStorage(newState);

        return newState;
      }
      const newState = [
        ...state,
        {
          ...actionPyload,
          quantity: 1,
        },
      ];
      updateLocalStorage(newState);
      return newState;
    }

    case 'REMOVE_FROM_CART': {
      const { id } = actionPyload;
      const newState = state.filter((item) => item.id !== id);

      updateLocalStorage(newState);
      return newState;
    }

    case 'CLEAR_CART': {
      updateLocalStorage([]);
      return [];
    }
  }

  return state;
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product) =>
    dispatch({
      type: 'ADD_TO_CART',
      payload: product,
    });

  const removeFromCart = (product) =>
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product,
    });

  const clearCart = () =>
    dispatch({
      type: 'CLEAR_CART',
    });

  return (
    <CartContext.Provider
      value={{ cart: state, addToCart, clearCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
