import { Link } from 'react-router-dom';
import logo from "../../assets/logo/Ugnayan Logo circle wo name.png";
import "./Navbar.css";
import "../Sidebar/Sidebar";
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { DisplayName } from '../DisplayName';
import { doSignOut } from '../../firebase/auth';


function DisplayLink({ currentPage }) {
  const handleLogOut = async (event: any) => {
      await doSignOut();
      console.log("Signed out");
    window.location.href = "/";
  };

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
          <Dropdown>
          <Dropdown.Toggle variant="danger" id="dropdown-basic" className="custom-dropdown-button no-dropdown-icon">
            <FontAwesomeIcon icon={faBell} />
          </Dropdown.Toggle>

          <Dropdown.Menu className="aligned-dropdown-menu">
            <Dropdown.Item href="#/action-1"> 
                Notifications</Dropdown.Item>
            <Dropdown.Item href="#/action-2" disabled> 
                You have no notifications.</Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
          <Dropdown.Toggle variant="danger" id="dropdown-basic" className="custom-dropdown-button menu-padding">
          <DisplayName /> <span style={{ marginRight: '2px' }}></span>
          </Dropdown.Toggle>
        
          <Dropdown.Menu className="aligned-dropdown-menu">
            <Dropdown.Item href="#/action-1"> 
                <FontAwesomeIcon icon={faUser} /> <span style={{ marginLeft: '5px' }}> Profile </span></Dropdown.Item>
            <Dropdown.Item href="#/action-2"> 
                <FontAwesomeIcon icon={faCircleQuestion} /> <span style={{ marginLeft: '5px' }}> FAQ </span></Dropdown.Item>
            <Dropdown.Item href="#/action-3" onClick={handleLogOut}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} /> <span style={{ marginLeft: '5px' }}> Logout </span></Dropdown.Item>
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
    <nav className="navbar navbar-dark sticky-top">
      <DisplayLink currentPage={currentPage}/>
    </nav>
  )
}
