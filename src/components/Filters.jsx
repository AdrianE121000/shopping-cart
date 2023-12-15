import { useId } from 'react';
import { useCategory } from '../hooks/useCategory';
import { useFilters } from '../hooks/useFilters';
import './filters.css';

export function Filters() {
  const { filters, setFilters } = useFilters();
  const { categories } = useCategory();

  const minpriceFilterId = useId();
  const categoryFilterId = useId();

  const handleChangePrice = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      price: event.target.value,
    }));
  };

  const handleChangeCategory = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };
  return (
    <section className='filters'>
      <div>
        <label htmlFor={minpriceFilterId}>Price</label>
        <input
          type='range'
          id={minpriceFilterId}
          min='0'
          max='1000'
          onChange={handleChangePrice}
          value={filters.price}
        />
        <span>{filters.price}</span>
      </div>
      <div>
        <label htmlFor={categoryFilterId}>Price</label>
        <select
          id={categoryFilterId}
          onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          {categories.map((cat, index) => (
            <option
              key={index}
              value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
