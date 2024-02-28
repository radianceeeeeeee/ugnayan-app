import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUp.css";
import Dropdown from "react-bootstrap/Dropdown";
import showEye from "../../assets/eye.png";
import hideEye from "../../assets/hidden.png";
import logo from "../../assets/logo_placeholder.png";

export default function SignUpForm() {
  const courses = ["BS Computer Science", "BS Mathematics"];
  const [selectedCourse, setSelectedCourse] = useState("Course");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleCourseChange = (selectedCourse: string) => {
    setSelectedCourse(selectedCourse);
  };

  return (
    <div>
      <div className="card signup-form">
        <div className="card-title signup-text">Sign Up</div>
        <div className="card-title signup-subtext">
          Create an Ugnayan Account using your UP Mail
        </div>
        <div className="card-body signup-inputs">
          <input
            type="text"
            className="form-control signup-input"
            id="first-name"
            placeholder="First Name"
            required
          ></input>
          <input
            type="text"
            className="form-control signup-input"
            id="last-name"
            placeholder="Last Name"
            required
          ></input>
          <input
            type="text"
            className="form-control signup-input"
            id="student-no"
            placeholder="Student No."
            required
          ></input>
          <Dropdown
            onSelect={(eventKey) => handleCourseChange(eventKey as string)}
          >
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className="signup-input-select"
            >
              {selectedCourse}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {courses.map((course) => (
                <Dropdown.Item key={course} eventKey={course}>
                  {course}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <input
            type="email"
            className="form-control signup-input"
            id="email"
            placeholder="Email"
            required
          ></input>

          <div className="signup-password-blank">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-control signup-input-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn signup-show-password"
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
            <button type="button" className="btn btn-primary create-acc-button">
              Create Account
            </button>
          </Link>
          <br></br>
          <div className="signup-subtext">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </div>
          <img src={logo} alt="Logo" className="app-signup-logo" />
        </div>
      </div>
    </div>
  );
}
