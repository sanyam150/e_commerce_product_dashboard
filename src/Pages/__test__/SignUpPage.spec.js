import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store/store';
import SignUpPage from '../SignUpPage';
import '@testing-library/jest-dom/extend-expect';

describe('SignUpPage', () => {
  test('renders sign-up form', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('signup-title')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByTestId('signup-password-label')).toBeInTheDocument();
    expect(
      screen.getByTestId('signup-confirmPassword-label')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign Up/i })
    ).toBeInTheDocument();
  });

  test('handles form input changes', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByTestId('signup-password-label'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByTestId('signup-confirmPassword-label'), {
      target: { value: 'password' },
    });

    expect(screen.getByLabelText(/Email address/i).value).toBe(
      'test@example.com'
    );
    expect(screen.getByTestId('signup-password-label').value).toBe('password');
    expect(screen.getByTestId('signup-confirmPassword-label').value).toBe(
      'password'
    );
  });

  test('shows alert if passwords do not match', () => {
    window.alert = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByTestId('signup-password-label'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByTestId('signup-confirmPassword-label'), {
      target: { value: 'differentpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    expect(window.alert).toHaveBeenCalledWith('Passwords do not match!');
  });

  test('shows alert if user already exists', () => {
    const users = [{ email: 'test@example.com', password: 'password' }];
    localStorage.setItem('users', JSON.stringify(users));
    window.alert = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByTestId('signup-password-label'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByTestId('signup-confirmPassword-label'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    expect(window.alert).toHaveBeenCalledWith('User Already Exists');
  });

  test('registers new user and navigates to homepage on successful sign-up', () => {
    localStorage.setItem('users', JSON.stringify([]));
    localStorage.setItem = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/signup']}>
          <Routes>
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/HomePage' element={<div>Home Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: 'newuser@example.com' },
    });
    fireEvent.change(screen.getByTestId('signup-password-label'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByTestId('signup-confirmPassword-label'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
  });
});
