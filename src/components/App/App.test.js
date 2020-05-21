import React from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Here you can grab real estate data about houses for sale./i);
  expect(linkElement).toBeInTheDocument();
});
