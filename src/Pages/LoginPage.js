import React, { useState } from 'react';
import './css/LoginPage.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email_login: '',
    password_login: '',
  });

  const handleFormData = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.email === formData.email_login);

    if (!user) {
      alert('User does not exist. Please create an account first.');
      navigate('/SignUp');
      return;
    }

    if (user.password !== formData.password_login) {
      alert('Incorrect email or password');
      return;
    }

    localStorage.setItem(
      'userLoggedInInfo',
      JSON.stringify({
        email: formData.email_login,
        password: formData.password_login,
      })
    );
    navigate('/HomePage');
  };

  return (
    <div className='container mt-5'>
      <form onSubmit={handleLogin} className='login_form_wrapper'>
        <h2 className='text-center mb-4'>Login Form</h2>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            value={formData.email_login}
            onChange={handleFormData}
            required
            name='email_login'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            value={formData.password_login}
            onChange={handleFormData}
            required
            name='password_login'
          />
        </div>
        <button type='submit' className='btn btn-primary w-100'>
          Login
        </button>
        <p style={{ padding: '3px' }}>
          <Link
            to='/SignUp'
            className='link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'
          >
            Does not have account ? Click to SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
