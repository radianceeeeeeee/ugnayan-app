import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import logo from "../../assets/logo_placeholder.png";
import Navbar from "../Navbar/Navbar";

export default function SignUpPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Navbar currentPage={"signin"}/>
      <div className="app-body">
        <div className="app-signup-background">
          <div className="app-signup-bg-text">
            <h2>Welcome to UP Ugnayan</h2>
          </div>
        </div>
        <div className="app-signup">
          <h1>
            <b>Sign Up</b>
          </h1>
          <h6>Create an Ugnayan Account using your UP Mail</h6>
          <br></br>
          <input
            type="text"
            placeholder="First Name"
            className="signup-input"
          />
          <input type="text" placeholder="Last Name" className="signup-input" />
          <input
            type="text"
            placeholder="Student No."
            className="signup-input"
          />
          <input type="text" placeholder="Course" className="signup-input" />
          <input type="email" placeholder="Email" className="signup-input" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="signup-input"
          />
          <Link to="/login">
            <button className="create-acc-button">Create Account</button>
          </Link>
          <br></br>
          <h6>
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </h6>
          <img src={logo} alt="Logo" className="app-signup-logo" />
        </div>
      </div>
    </div>
  );
}
