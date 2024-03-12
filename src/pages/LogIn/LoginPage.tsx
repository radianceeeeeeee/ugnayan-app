import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./LogIn.css";
import logo from "../../assets/logo/Ugnayan Logo circle wo name.png";
import showEye from "../../assets/eye.png";
import hideEye from "../../assets/hidden.png";
import emailIcon from "../../assets/user.png";
import passwordIcon from "../../assets/door-key.png";
import Navbar from '../Navbar/Navbar';

export default function LogInPage() {
  // https://www.geeksforgeeks.org/how-to-show-and-hide-password-in-reactjs/
  // Used for showing and hiding password
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div> 
      <Navbar currentPage={"login"}/>
      <div className="app-body">
        <div className="app-login">
          <img src={logo} alt="Logo" className='login-logo'></img>
          <br></br>
          <h1><b>Login</b></h1>
          <br></br>
          Sign in using your UP mail account
          <br></br>
          <div className="login-email-blank">
            <div className="login-email-icon-box">
              <img src={emailIcon} className='login-email-icon'></img>
            </div>
            <input type="text" placeholder='E-mail' className="login-email-input" />
          </div>
          <div className="login-password-blank">
          <div className="login-password-icon-box">
            <img src={passwordIcon} className='login-password-icon'></img>
          </div>
          <input type={showPassword ? "text" : "password"} 
                 placeholder='Password' 
                 className="login-password-input"
                 value={password}
                 onChange={(e) =>
                     setPassword(e.target.value)
                 } />
          <button className="login-show-password"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? 
                    <img src={hideEye} alt="Logo" className='login-password-hide'></img> : 
                    <img src={showEye} alt="Logo" className='login-password-show'></img> 
                  }
          </button>
          </div>
          <Link to="/dashboard">
            <button className="login-button">Log In</button> 
          </Link>
          <br></br>
          <a href='#' className='login-forget'>
          Forgot your username or password?
          </a>
          <button className="login-guest">
            Log in as a Guest
          </button>
          Some features will be unavailable with guest access.
        </div>
      </div>
      
    </div>
  )
}