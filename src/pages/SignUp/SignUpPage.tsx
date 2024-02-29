import Navbar from "../Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpForm from "./SignUpForm";
import SignUpBackground from "./SignUpBackground";

export default function SignUpPage() {
  return (
    <div>
      <Navbar currentPage={"signin"} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 d-none d-md-block">
            <SignUpBackground />
          </div>
          <div className="col-md-8 ">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}