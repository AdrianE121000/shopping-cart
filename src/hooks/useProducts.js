import { useEffect, useState } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      });
  }, []);

  return { products };
}
