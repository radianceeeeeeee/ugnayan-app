import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import logo from "../../assets/logo_placeholder.png";
import Navbar from "../Navbar/Navbar";
import showEye from "../../assets/eye.png";
import hideEye from "../../assets/hidden.png";

// https://www.geeksforgeeks.org/how-to-show-and-hide-password-in-reactjs/
// Used for showing and hiding password

const courses = ["BS Computer Science", "BS Mathematics"];

export default function SignUpPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  return (
    <div>
      <Navbar currentPage={"signin"} />
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
          <br />
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
          <select
            value={selectedCourse}
            onChange={(e) => {
              courses.includes(e.target.value)
                ? (e.target.style.color = "#000000")
                : (e.target.style.color = "#888888");
              setSelectedCourse(e.target.value);
            }}
            className="signup-input-select"
          >
            <option value="">Course</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
          <input type="email" placeholder="Email" className="signup-input" />
          <div className="signup-password-blank">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="signup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="signup-show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <img
                  src={hideEye}
                  alt="Logo"
                  className="signup-password-hide"
                ></img>
              ) : (
                <img
                  src={showEye}
                  alt="Logo"
                  className="signup-password-show"
                ></img>
              )}
            </button>
          </div>
          <Link to="/login">
            <button className="create-acc-button">Create Account</button>
          </Link>
          <br />
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
