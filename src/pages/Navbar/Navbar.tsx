import { Link } from 'react-router-dom';
import logo from "../../assets/logo/Ugnayan Logo circle wo name.png";
import title from "../../assets/logo/Ugnayan Title white.png";
import "./Navbar.css"
import Dropdown from 'react-bootstrap/Dropdown';


function DisplayLink({ currentPage }) {
    if (currentPage == 'landingpage') {
      return (
      <>
      <Link to ="/login">
          <button className="button-text">
              Log In
          </button>
      </Link> 
      <Link to ="/signup">
          <button className="signup-page">
              Sign Up
          </button>
      </Link> 
      </>
      )
    }
    else if (currentPage == 'signin') {
      return (
      <>
      <Link to ="/">
      <button className="button-text">
        Back to Home
      </button>
      </Link>
      <Link to ="/login">
          <button className="signup-page">
              Login
          </button>
      </Link> 
      </>
      )
    }
    else if (currentPage =='login') {
      return (
      <>
      <Link to ="/">
      <button className="button-text">
        Back to Home
      </button>
      </Link>
      <Link to ="/signup">
          <button className="signup-page">
              Sign Up
          </button>
      </Link> 
      </>
      )
    }
    else if (currentPage =='dashboard') {
        return (
          <>
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
            <Dropdown.Item href="#/action-3">↪ Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </>
        )
    }

    return null;
}

export default function Navbar({ currentPage }) {
  console.log(currentPage)

  return (
      <div className="app-header">
        <div className="app-header-left">
          <div className="app-header-logo">
          <Link to ="/">
          <img src={logo} alt="Logo" className='app-header-logo'></img>
          </Link>
          </div>
          <Link to ="/">
          <div className="app-header-name">
            <img src={title} alt="UGNAYAN" className='app-header-title'></img>
          </div>
          </Link>
        </div>
        <div className="app-header-right">
          <DisplayLink currentPage={currentPage}/>
        </div>
      </div>
  )
}
