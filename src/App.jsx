import { useContext } from 'react';
import { Cart } from './components/Cart';
import { Header } from './components/Header';
import { Products } from './components/Products';
import { CartProvider } from './context/cart';
import { ProductsContext } from './context/products';
import { useFilters } from './hooks/useFilters';

function App() {
  const { products } = useContext(ProductsContext);
  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(products);
  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
    </CartProvider>
  );
}

export default App;
