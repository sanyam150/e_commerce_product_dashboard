import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/reducers/categoriesSlice';
import AllProducts from '../Components/AllProducts';
const HomePage = () => {
  const fetchData = useRef(0);
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );

  const [filterProductCategory, setFilterProductCategory] = useState(null);

  useEffect(() => {
    fetchData.current += 1;
    if (fetchData.current === 1) dispatch(fetchCategories());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;
  return (
    <>
      <div>
        <Navbar
          categories={categories}
          setFilterProductCategory={setFilterProductCategory}
        />
      </div>
      <div>
        <AllProducts filterProductCategory={filterProductCategory} />
      </div>
    </>
  );
};

export default HomePage;
