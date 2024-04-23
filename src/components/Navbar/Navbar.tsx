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
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../FirebaseConfig";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";


function DisplayLink({ currentPage }) {
  const handleLogOut = async (event: any) => {
      await doSignOut();
      console.log("Signed out");
    window.location.href = "/";
  };

  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleOpenProfileModal = () => {
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };



  const [name, setName] = useState("Loading...");
  const [role, setRole] = useState("Loading...");
  useEffect(() => {
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
          if (user) {
              if (auth.currentUser?.isAnonymous) {
                  console.log("Guest")
                  setName("Guest")
              } else {
                  const uid = user.uid;
                  console.log(uid);

                  const db = getFirestore(app);
                  getDoc(doc(db, "users", uid)).then(docSnap => {
                      if (docSnap.exists()) {
                          setName(`${docSnap.data().firstName} ${docSnap.data().lastName}`)
                          setRole(`${docSnap.data().role}`)
                      }
                  });
              }
          } else {
              setName("Loading...")
          }
      })
    }, [name, role]);


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
            <Dropdown.Item> 
                Notifications</Dropdown.Item>
            <Dropdown.Item href="#/action-2" disabled> 
                You have no notifications.</Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>

          <div>
            {role == "Site Admin" ? 
              <Link to ="/admin">
              <button className="right-btn">⚙️Admin</button>
              </Link> :

              <></>
            }
          </div>

          <Dropdown>
          <Dropdown.Toggle variant="danger" id="dropdown-basic" className="custom-dropdown-button menu-padding">
          {/* <DisplayName /> <span style={{ marginRight: '2px' }}></span> */}
            {name}  
            {/* <br></br>
            <div className='role'> {role} </div> */}

          </Dropdown.Toggle>
        
          <Dropdown.Menu className="aligned-dropdown-menu">
          <Dropdown.Item onClick={handleOpenProfileModal}> 
                <FontAwesomeIcon icon={faUser} /> <span style={{ marginLeft: '5px' }}> Profile </span></Dropdown.Item>
            <Dropdown.Item href="#/action-2"> 
                <FontAwesomeIcon icon={faCircleQuestion} /> <span style={{ marginLeft: '5px' }}> FAQ </span></Dropdown.Item>
            <Dropdown.Item href="#/action-3" onClick={handleLogOut}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} /> <span style={{ marginLeft: '5px' }}> Logout </span></Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
          </form>

          <div className="modal" tabIndex="-1" role="dialog" style={{ display: showProfileModal ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Profile</h5>
                  <button type="button" className="close" onClick={handleCloseProfileModal} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {/* Content of your modal */}
                  {/* Add your profile information here */}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseProfileModal}>Close</button>
                  {/* Add other buttons or actions here */}
                </div>
              </div>
            </div>
          </div>
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
