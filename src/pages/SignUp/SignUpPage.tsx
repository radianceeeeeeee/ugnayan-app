import Navbar from "../Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpForm from "./SignUpForm";
import SignUpBackground from "./SignUpBackground";

export default function SignUpPage() {
  return (
    <div>
      <Navbar currentPage={"signin"} />
      <div className="container ">
        <div className="row justify-content-md-center">
          <div className="col-4 ">
            <SignUpBackground></SignUpBackground>
          </div>
          <div className="col-5">
            <SignUpForm></SignUpForm>
          </div>
        </div>
      </div>
    </div>
  );
}
