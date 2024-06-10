import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginPage from '../LoginPage';
import { store } from '../../redux/store/store';
import '@testing-library/jest-dom/extend-expect';

describe('LoginPage', () => {
  test('renders login form', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/login form/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('handles form input changes', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });

    expect(screen.getByLabelText(/email address/i).value).toBe(
      'test@example.com'
    );
    expect(screen.getByLabelText(/password/i).value).toBe('password');
  });

  test('shows alert if user does not exist', () => {
    window.alert = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/SignUp' element={<div>Sign Up Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'nonexistent@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(window.alert).toHaveBeenCalledWith(
      'User does not exist. Please create an account first.'
    );
    expect(screen.getByText(/sign up page/i)).toBeInTheDocument();
  });

  test('shows alert for incorrect password', () => {
    const users = [{ email: 'test@example.com', password: 'correctpassword' }];
    localStorage.setItem('users', JSON.stringify(users));
    window.alert = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(window.alert).toHaveBeenCalledWith('Incorrect email or password');
  });

  test('navigates to homepage on successful login', () => {
    const users = [{ email: 'test@example.com', password: 'password' }];
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/HomePage' element={<div>Home Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  });
});
