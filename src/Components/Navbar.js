import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/userLoginSlice';

const Navbar = ({ categories, setFilterProductCategory }) => {
  const dispatch = useDispatch();
  const handleProductCategory = (category) => {
    if (category) setFilterProductCategory(category);
  };

  const handleLogout = () => {
    localStorage.removeItem('userLoggedInInfo');
    dispatch(logout());
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <Link className='navbar-brand' disabled={true}>
          E-Commerce
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link' to='/' onClick={handleLogout}>
                Logout
              </Link>
            </li>
            <li className='nav-item dropdown'>
              <Link
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdownMenuLink'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Categories
              </Link>
              <ul
                className='dropdown-menu'
                aria-labelledby='navbarDropdownMenuLink'
              >
                <li key='None'>
                  <Link
                    className='dropdown-item'
                    onClick={() => handleProductCategory('none')}
                  >
                    All Products
                  </Link>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <Link
                      className='dropdown-item'
                      onClick={() => handleProductCategory(category)}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
