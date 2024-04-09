import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../../assets/logo/Ugnayan Logo circle wo name.png";
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './OrgPage.css';
import { fetchOrgData } from "../../components/FirebaseConnection";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCakeCandles, faLocationDot, faEnvelope, faGlobe, faHandshakeAngle } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

export default function OrgPage() {
  const params = useParams();

  const [orgs, setOrgs] = useState({});
  const [orgPic, setOrgPic] = useState('');

  const orgLogo = orgs.orgLogo + ".jpg";

  const handleBack = () => {
    window.history.back();
  };

  const [websiteName, setWebsiteName] = useState('');
  const [facebookName, setFacebookName] = useState('');

  useEffect(() => {
      if (orgs && orgs.orgWebsite) {
          const urlParts = orgs.orgWebsite.split('/');
          const name = urlParts[urlParts.length - 2];
          setWebsiteName(name);
      }
  }, [orgs]);

  useEffect(() => {
      if (orgs && orgs.orgFacebook) {
          const urlParts = orgs.orgFacebook.split('/');
          const name = urlParts[urlParts.length - 2];
          setFacebookName(name);
      }
  }, [orgs]);

  useEffect(() => {
    setOrgs({}); // Clear existing data before fetching new data
    fetchOrgData()
      .then(data => {
        const newData = data.map(item => ({ ...item, starred: false }));
        
        // Find the organization with the same ID as params
        const orgWithParamsId = newData.find(org => org.orgId === params.orgId);
  
        // Update state with the organization matching the ID
        if (orgWithParamsId) {
          setOrgs(orgWithParamsId);
          if (orgWithParamsId.orgPictures && orgWithParamsId.orgPictures.length > 0) {
            setOrgPic(orgWithParamsId.orgPictures[0]);
          }
        } else {
          console.log("Organization not found with the given ID");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [params.orgId]); // Dependency array including params.orgId to re-run the effect when params.orgId changes

  return (
    <div> 
      <Navbar currentPage={"dashboard"}/>
      <Sidebar />

      <div className="container-md org-header-container">
        <button className="btn btn-light back-button" onClick={handleBack}><FontAwesomeIcon icon={faChevronLeft} style={{ marginRight: '0.5rem' }}/> Back to Search </button>

        <div id="myCarousel" className="carousel slide mb-6 rounded-3" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner rounded-3">
            <div className="carousel-item active">
              <div className="carousel-image rounded-3" style={{ 
                backgroundImage: orgPic ? `url(\"${orgPic}` + '.jpg\")' : '',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%'
              }}> </div>
            </div>
            <div className="carousel-item">
              <svg className="bd-placeholder-img rounded-3" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></svg>
            </div>
            <div className="carousel-item">
              <svg className="bd-placeholder-img rounded-3" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></svg>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div> 

        <div className="org-header-box">
          <div className="row">
            <div className="col-md-auto"><img src={orgLogo} className="logo-img" alt="..."/></div>
            <div className="col-6 org-header-text">
              <h1 className="font-inter custom-grey">{orgs.orgName}</h1>
            </div>
            <div className="col-md-auto orgpage-options">
              <button type="button" className="btn btn-outline-dark org-options-button"> Manage Members </button>
              <button type="button" className="btn btn-outline-dark org-options-button"> Edit Page </button>
            </div>
          </div>
        </div>
      </div>

      <div className='container-md orgpage-body'>
        <div className="row">
     
          <div className="col col-md-3">
            <div className="card">
              <div className="card-header about-card-header">
                About
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"> <div className="row">
                  <div className="col-md-2 text-center"><FontAwesomeIcon icon={faCakeCandles}/></div> 
                  <div className="col-md-10 about-info"> Founded {orgs.dateFounded} </div>
                </div></li>
                <li className="list-group-item"> <div className="row">
                  <div className="col-md-2 text-center"><FontAwesomeIcon icon={faLocationDot}/></div>
                  <div className="col-md-10 about-info"> {orgs.orgLocation} </div>
                </div></li>
                <li className="list-group-item"> <div className="row">
                  <div className="col-md-2 text-center"><FontAwesomeIcon icon={faEnvelope}/></div>
                  <div className="col-md-10 about-info"> {orgs.orgEmails} </div>
                </div></li>
                <li className="list-group-item"> <div className="row">
                  <div className="col-md-2 text-center"><FontAwesomeIcon icon={faGlobe}/></div>
                  <div className="col-md-10 about-info"><a href={orgs.orgWebsite} target="_blank" rel="noopener noreferrer"> {websiteName} </a></div>
                </div></li>
                <li className="list-group-item"> <div className="row">
                  <div className="col-md-2 text-center"><FontAwesomeIcon icon={faFacebook}/></div>
                  <div className="col-md-10 about-info"><a href={orgs.orgFacebook} target="_blank" rel="noopener noreferrer"> {facebookName} </a></div>
                </div></li>
                <li className="list-group-item"> <div className="row">
                  <div className="col-md-2 text-center"><FontAwesomeIcon icon={faHandshakeAngle}/></div>
                  <div className="col-md-10 about-info"> Affiliations: {orgs.orgAffiliations} </div>
                </div></li>
              </ul>
            </div>

            <div className="card text-center mt-3">
              <div className="card-header right-card-header">
                Your Member Status
              </div>
              <div className="card-body">
                <p className="card-text"> You are not affiliated with this org. </p>
                <a href="#" className="btn btn-primary col-12 apply-button"> Apply Now </a>
                <p className="card-text"><small className="text-muted"> open until Oct. 12, 2024 </small></p>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <div className="card org-desc">
              <div className="card-body">
                <p className="card-text"> {orgs.orgDescription} </p>
              </div>
            </div>
          </div>

          <div className="col-md-2">
            <div className="card">
              <div className="card-header right-card-header">
                Addtl. Feature
              </div>
              <div className="card-body">
                <p className="card-text"> Can add more features here (eg. statistics/analytics, members you might know, current EB, images, etc.) </p>
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-header right-card-header">
                Addtl. Feature
              </div>
              <div className="card-body">
                <p className="card-text"> Can add more features here (eg. statistics/analytics, members you might know, etc.) </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <section id="footer">
        <div className="container">
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
              <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                <img src={logo} alt="" width="30" height="30"></img>
              </a>
              <span className="mb-3 mb-md-0 text-body-secondary">&copy; 2024</span>
            </div>

            <ul className="nav col-md-4 justify-content-end">
              <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
              <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
              <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Contact Us</a></li>
              <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About Us</a></li>
            </ul>
          </footer>
        </div>
      </section>
    </div>
  )
}