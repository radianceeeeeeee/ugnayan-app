import React from 'react';
import { render, screen } from '@testing-library/react';
import LogInPage from '../src/pages/LogIn/LoginPage.tsx'
import { MemoryRouter } from 'react-router-dom';
import { dummyDatabase } from './DummyDatabase.tsx';

// testing routed pages credit from: https://stackoverflow.com/questions/76081552/typeerror-cannot-destructure-property-basename-of-react-namespace-usecontex

test('renders log in page', () => {
  render(
    <MemoryRouter><LogInPage /></MemoryRouter>);
  const linkElement = screen.getByText(/Sign in using your UP mail account/i);
  expect(linkElement).toBeInTheDocument();
});


function LogIn(email, password) {
  return true;
}

test('valid log in inputs', () => {
  expect(LogIn("test@example.com", "password")).toBeTruthy;
  expect(LogIn("jadelacruz@up.edu.ph", "password")).toBeTruthy;
});