import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import HomePage from '../HomePage';
import '@testing-library/jest-dom/extend-expect';
import { store } from '../../redux/store/store';

jest.mock('../../Components/Navbar', () => () => (
  <div data-testid='navbar'>Navbar</div>
));
jest.mock('../../Components/AllProducts', () => () => <div>AllProducts</div>);

describe('HomePage', () => {
  test('renders loading state initially', () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
