import { Link } from 'react-router-dom';
import logo from "../../assets/logo/Ugnayan Logo circle wo name.png";
import "./Navbar.css"
import Dropdown from 'react-bootstrap/Dropdown';


function DisplayLink({ currentPage }) {
    if (currentPage == 'landingpage') {
      return (
      <>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <Link to ="/">
          <img src={logo} alt="" className="d-inline-block align-middle"></img>
          UGNAYAN
          </Link>
        </a>

        <form className="d-flex align-buttons">
          <Link to ="/login">
              <button className="left-btn">
                  Log In
              </button>
          </Link> 

          <Link to ="/signup">
              <button className="right-btn">
                  Sign Up
              </button>
          </Link> 
        </form>
      </div>
      </>
      )
    }


    else if (currentPage == 'signin') {
      return (
      <>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <Link to ="/">
          <img src={logo} alt="" className="d-inline-block align-middle"></img>
          UGNAYAN
          </Link>
        </a>

        <form className="d-flex align-buttons">
          <Link to ="/">
              <button className="left-btn">
                  Back to Home
              </button>
          </Link>

          <Link to ="/login">
              <button className="right-btn">
                  Login
              </button>
          </Link> 
        </form>
      </div>
      </>
      )
    }


    else if (currentPage =='login') {
      return (
      <>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <Link to ="/">
          <img src={logo} alt="" className="d-inline-block align-middle"></img>
          UGNAYAN
          </Link>
        </a>

        <form className="d-flex align-buttons">
          <Link to ="/">
              <button className="left-btn">
                  Back to Home
              </button>
          </Link>

          <Link to ="/signup">
              <button className="right-btn">
                  Sign Up
              </button>
          </Link> 
          </form>
      </div>
      </>
      )
    }


    else if (currentPage =='dashboard') {
      return (
      <>
      <div className="offcanvas offcanvas-start" tabindex="-1" id="sidebar" aria-labelledby="sidebarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarLabel">Offcanvas</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div>
            Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
          </div>
          <div className="dropdown mt-3">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
              Dropdown button
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link to ="/dashboard">
          <img src={logo} alt="" className="d-inline-block align-middle"></img>
          UGNAYAN
          </Link>
        </a>

        <form className="d-flex align-buttons">
          {/* <button className='notif'> 
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
            </svg>
          </button> */}

          <Dropdown>
          <Dropdown.Toggle variant="danger" id="dropdown-basic">
            Clarisse Bianca Bucu
          </Dropdown.Toggle>
        
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">👤 Profile</Dropdown.Item>
            <Dropdown.Item href="#/action-2">❔ FAQ</Dropdown.Item>
            <Dropdown.Item href="#/action-3"><Link to="/">↪ Logout</Link></Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
          </form>
      </div>
      </>
      )
    }

    return null;
}

export default function Navbar({ currentPage }) {

  return (
    <nav className="navbar navbar-dark">
      <DisplayLink currentPage={currentPage}/>
    </nav>
  )
}
