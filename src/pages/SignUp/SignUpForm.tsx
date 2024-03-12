import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUp.css";
import showEye from "../../assets/eye.png";
import hideEye from "../../assets/hidden.png";
import logo from "../../assets/logo_placeholder.png";

export default function SignUpForm() {
  const courses = ["BS Computer Science", "BS Mathematics"];
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    studentNo: false,
    course: false,
    email: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentNo: "",
    email: "",
    password: "",
  });
  const ref = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    studentNo: useRef<HTMLInputElement>(null),
    course: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.target;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    window.location.href = "/login";
  };

  const handleBlur = (event: any) => {
    const { name } = event.target;
    if (event.target.validity.patternMismatch && (ref as any)[name].current) {
      (ref as any)[name].current.focus();
      setError({
        ...error,
        [name]: true,
      });
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name == "course") {
      event.target.style.color = "#000000";
    }

    const newValueIsValid = !event.target.validity.patternMismatch;
    if (error) {
      if (newValueIsValid) {
        setError({
          ...error,
          [name]: false,
        });
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function style(error: boolean) {
    if (error) {
      return {
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      };
    }
  }

  return (
    <div>
      <div className="card signup-form">
        <div className="card-title signup-text">Sign Up</div>
        <div className="card-title signup-subtext">
          Create an Ugnayan Account using your UP Mail
        </div>
        <div className="card-body signup-inputs">
          <form className="needs-validation" onSubmit={handleSubmit}>
            <div className="signup-space">
              <input
                value={formData.firstName}
                name="firstName"
                type="text"
                className="form-control signup-input"
                placeholder="First Name"
                inputMode="text"
                pattern=".*"
                onChange={handleChange}
                onBlur={handleBlur}
                style={style(error.firstName)}
                ref={ref.firstName}
                required
              />
            </div>

            <div className="signup-space">
              <input
                value={formData.lastName}
                name="lastName"
                type="text"
                className="form-control signup-input"
                placeholder="Last Name"
                inputMode="text"
                pattern=".*"
                onChange={handleChange}
                onBlur={handleBlur}
                style={style(error.firstName)}
                ref={ref.firstName}
                required
              />
            </div>

            <div className="signup-space">
              <input
                value={formData.studentNo}
                name="studentNo"
                type="text"
                className="form-control signup-input"
                placeholder="Student No."
                inputMode="decimal"
                pattern="[0-9]{9}"
                onChange={handleChange}
                onBlur={handleBlur}
                style={style(error.studentNo)}
                ref={ref.studentNo}
                required
              />
            </div>

            <div className="signup-space">
              <select
                name="course"
                className="signup-input signup-select"
                onChange={handleChange}
                onBlur={handleBlur}
                style={style(error.course)}
                required
              >
                <option selected disabled value="">
                  Course
                </option>
                {courses.map((course) => (
                  <option>{course}</option>
                ))}
              </select>
            </div>

            <div className="signup-space">
              <input
                value={formData.email}
                name="email"
                type="email"
                className="form-control signup-input"
                placeholder="Email"
                inputMode="text"
                pattern="[a-z]*@up\.edu\.ph"
                onChange={handleChange}
                onBlur={handleBlur}
                style={style(error.email)}
                ref={ref.email}
                required
              />
            </div>

            <div className="signup-space">
              <div className="signup-password-blank">
                <input
                  value={formData.password}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control signup-input-password"
                  placeholder="Password"
                  inputMode="text"
                  pattern=".{8}.*"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={style(error.password)}
                  ref={ref.password}
                  required
                />

                <button
                  type="button"
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
            </div>

            <button type="submit" className="btn btn-primary create-acc-button">
              Create Account
            </button>
            <br></br>
            <div className="signup-subtext">
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Login
              </Link>
            </div>

            <img src={logo} alt="Logo" className="app-signup-logo" />
          </form>
        </div>
      </div>
    </div>
  );
}
