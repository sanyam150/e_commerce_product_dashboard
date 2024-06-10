import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsByPage,
  setCurrentPage,
} from '../redux/reducers/productsSlice';

const AllProducts = ({ filterProductCategory }) => {
  const dispatch = useDispatch();
  const { products, currentPage, totalProducts, status, error } = useSelector(
    (state) => state.products
  );
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProductsByPage(totalProducts));
  }, [dispatch, totalProducts]);

  useEffect(() => {
    if (filterProductCategory && products.length) {
      const updatedProducts = products.filter(
        (item) => item.category === filterProductCategory
      );
      if (filterProductCategory === 'none') {
        setAllProducts(products);
      } else setAllProducts(updatedProducts);
    }
  }, [filterProductCategory, products]);

  const handleProductsList = (prod) => {
    const length = prod.length,
      prodArray = [];
    for (let i = prod.length - 1; i >= length - 5; i--) {
      prodArray.push(prod[i]);
    }
    setAllProducts(prodArray);
  };

  useEffect(() => {
    if (products.length) handleProductsList(products);
  }, [products]);

  const handlePreviousPage = useCallback(() => {
    dispatch(setCurrentPage(currentPage - 1));
  }, [dispatch, currentPage]);

  const handleNextPage = useCallback(() => {
    dispatch(setCurrentPage(currentPage + 1));
  }, [dispatch, currentPage]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Products</h3>
      <div
        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        {allProducts && allProducts.length ? (
          allProducts.map((product) => (
            <div className='card' style={{ width: '18rem', margin: '1rem' }}>
              <img
                src={`${product.image}`}
                className='card-img-top'
                alt='...'
                style={{ height: '200px' }}
              />
              <div className='card-body'>
                <h5 className='card-title'>{product.title}</h5>
                <p className='card-text'>{product.description}</p>
              </div>
              <div className='card-body'>
                <h5 className='card-title'>Category:{product.category}</h5>
                <p className='card-text'>Price:${product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <div>No Product found</div>
        )}
      </div>
      <div className='d-flex' style={{ justifyContent: 'space-around' }}>
        <button
          className='btn btn-primary'
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className='mx-3'>Page {currentPage}</span>
        <button
          className='btn btn-primary'
          onClick={handleNextPage}
          disabled={currentPage === 4}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
