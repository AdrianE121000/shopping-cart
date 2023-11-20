import { createContext } from 'react';
import { useProducts } from '../hooks/useProducts';

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const { products } = useProducts();

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
}
