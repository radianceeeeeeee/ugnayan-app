import React from 'react';
import { render, screen } from '@testing-library/react';
import SignInPage from '../src/pages/SignUp/SignUpPage.tsx'
import { MemoryRouter } from 'react-router-dom';

// testing routed pages credit from: https://stackoverflow.com/questions/76081552/typeerror-cannot-destructure-property-basename-of-react-namespace-usecontex

test('renders sign up page', () => {
  render(
    <MemoryRouter><SignInPage /></MemoryRouter>);
  const linkElement = screen.getByText(/Create an Ugnayan Account using your UP Mail/i);
  expect(linkElement).toBeInTheDocument();
});


function SignUp(email, password, firstName, lastName, studentNo, course) {
    return true;
}

test('valid sign up inputs', () => {
    expect(SignUp("aaa@aaa.aaa", "aaaaaaaa", "Aaaaa", "Aaaaaaaa", "2000-11111", "BS Computer Science")).toBeTruthy;
});