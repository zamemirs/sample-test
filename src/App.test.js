import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders learn react link', () => {
    const { getByText } = render(<App />);
  });
});
