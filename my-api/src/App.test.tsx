import React from 'react';
import { render, screen } from '@testing-library/react';
import Route from './App';

import mockAxios from 'jest-mock-axios';
export default mockAxios;

afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
});

//render(<Router><NavBar /></Router>);

test('renders learn react link', () => {
  render(<Route />);
  const linkElement = screen.getByText(/PhoneContact/i);
  expect(linkElement).toBeInTheDocument();
});
