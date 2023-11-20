import { useContext } from 'react';
import { Header } from './components/Header';
import { Products } from './components/Products';
import { ProductsContext } from './context/products';
import { useFilters } from './hooks/useFilters';

function App() {
  const { products } = useContext(ProductsContext);
  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(products);
  return (
    <>
      <Header />
      <Products products={filteredProducts} />
    </>
  );
}

export default App;
