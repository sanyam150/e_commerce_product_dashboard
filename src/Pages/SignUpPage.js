import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducers/userLoginSlice';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email_signup: '',
    password_signup: '',
    confirmPassword_signup: '',
  });

  const handleFormData = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (formData.password_signup !== formData.confirmPassword_signup) {
      alert('Passwords do not match!');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(
      (user) => user.email === formData.email_signup
    );
    if (userExists) {
      setFormData({
        email_signup: '',
        password_signup: '',
        confirmPassword_signup: '',
      });
      alert('User Already Exists');
      return;
    }

    const newUser = {
      email: formData.email_signup,
      password: formData.password_signup,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('User Successfully registered');
    setFormData({
      email_signup: '',
      password_signup: '',
      confirmPassword_signup: '',
    });

    localStorage.setItem(
      'userLoggedInInfo',
      JSON.stringify({
        email: formData.email_signup,
        password: formData.password_signup,
      })
    );
    dispatch(
      login({
        email: formData.email_signup,
        password: formData.password_signup,
      })
    );
    navigate('/HomePage');
  };

  return (
    <div className='container mt-5'>
      <form onSubmit={handleSignUp} style={{ width: '50%' }}>
        <h2 className='text-center mb-4'>Sign Up</h2>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='emailSignup'
            value={formData.email_signup}
            onChange={handleFormData}
            required
            name='email_signup'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='passwordSignup'
            value={formData.password_signup}
            onChange={handleFormData}
            required
            name='password_signup'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='confirmPassword' className='form-label'>
            Confirm Password
          </label>
          <input
            type='password'
            className='form-control'
            id='confirmPasswordSignup'
            value={formData.confirmPassword_signup}
            onChange={handleFormData}
            required
            name='confirmPassword_signup'
          />
        </div>
        <button type='submit' className='btn btn-primary w-100'>
          Sign Up
        </button>
        <p style={{ padding: '3px' }}>
          <Link
            to='/'
            className='link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'
          >
            Click to Login Page
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
