import { AddToCartIcon } from './Icons';
import './Products.css';

export function Products({ products }) {
  return (
    <main className='products'>
      <div className='productos'>
        {products.map((product) => (
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
              <button>
                <AddToCartIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
