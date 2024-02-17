import React from 'react'
import { Link } from 'react-router-dom';

export default function LogInPage() {
  return (
    <div> 
      <h1>Log In Page</h1>
      <Link to="/dashboard"> Log In </Link>
    </div>
  )
}