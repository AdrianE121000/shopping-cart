import { useCart } from '../hooks/useCart';
import { AddToCartIcon, RemoveFromCartIcon } from './Icons';
import './Products.css';

export function Products({ products }) {
  const { addToCart, cart, removeFromCart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <main className='products'>
      <div className='productos'>
        {products.map((product) => {
          const isProductInCart = checkProductInCart(product);
          return (
            <div
              className='producto'
              key={product.id}>
              <img
                src={product.image}
                alt={product.title}
              />
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>
              <div>
                <button
                  style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }}
                  onClick={() =>
                    isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product)
                  }>
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
