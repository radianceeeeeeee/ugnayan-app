import React from 'react'
import { Link } from 'react-router-dom';
import "./LogIn.css";

export default function LogInPage() {
  return (
    <div> 
      <div className="app-header">
        <div className="app-header-left">
          <div className="app-header-logo">
            Ugnayan Logo
          </div>
          <div className="app-header-name">
            UGNAYAN
          </div>
        </div>
        <div className="app-header-right">
          <button className="landing-page">
            Back to Home
          </button>
          <button className="signup-page">
            Sign Up
          </button>
        </div>
      </div>
      <div className="app-body">
        <div className="app-login">
          Logo
          Login
          Sign in using your UP mail account
          Email
          Password
          <button className="login-button">
            Log In
          </button>
          Forgot your username or password?
          <button className="login-guest">
            Log in as a Guest
          </button>
          Some features will be unavailable with guest access.
        </div>
      </div>
      <Link to="/dashboard"> Log In </Link>
    </div>
  )
}