import React from 'react'
import { Link } from 'react-router-dom';
import "./LogIn.css";
import logo from "../../assets/logo_placeholder.png";

export default function LogInPage() {
  return (
    <div> 
      <div className="app-header">
        <div className="app-header-left">
          <div className="app-header-logo">
          <img src={logo} alt="Logo" width={50} height={50}></img>
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
          <img src={logo} alt="Logo" className='login-logo'></img>
          <br></br>
          <h1><b>Login</b></h1>
          <br></br>
          Sign in using your UP mail account
          <br></br>
          <input type="text" placeholder='E-mail' className="login-email-input" />
          <br></br>
          <br></br>
          <br></br>
          <input type="text" placeholder='Password' className="login-password-input" />
          <br></br>
          <button className="login-button">
            Log In
          </button>
          <a href='#' className='login-forget'>
          Forgot your username or password?
          </a>
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