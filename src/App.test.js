import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders grid', () => {
  const { getByTestId } = render(<App />);
  const gridEl = getByTestId('grid');
  expect(gridEl).toBeInTheDocument();
});
