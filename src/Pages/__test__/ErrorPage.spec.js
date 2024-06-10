import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorPage from '../ErrorPage';

describe('ErrorPage', () => {
  test('renders ErrorPage component', () => {
    render(<ErrorPage />);
    expect(screen.getByText('ErrorPage')).toBeInTheDocument();
  });
});
