import { useReducer } from 'react';
import { createContext } from 'react';

export const CartContext = createContext();

const initialState = [];

const reducer = (state, action) => {
  const { type: actionType, payload: actionPyload } = action;

  switch (actionType) {
    case 'ADD_TO_CART': {
      const { id } = actionPyload;
      const productsInCartIndex = state.findIndex((item) => item.id === id);

      if (productsInCartIndex >= 0) {
        const newState = structuredClone(state);
        newState[productsInCartIndex].quantity += 1;
        return newState;
      }
      return [
        ...state,
        {
          ...actionPyload,
          quantity: 1,
        },
      ];
    }

    case 'REMOVE_FROM_CART': {
      const { id } = actionPyload;
      return state.filter((item) => item.id !== id);
    }

    case 'CLEAR_CART': {
      return initialState;
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
