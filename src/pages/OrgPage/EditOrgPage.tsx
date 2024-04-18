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
import { faChevronLeft, faFloppyDisk, faSquareShareNodes } from '@fortawesome/free-solid-svg-icons';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../FirebaseConfig';

export default function EditOrgPage() {
  const params = useParams();

  const [orgs, setOrgs] = useState({});
  const [orgPic, setOrgPic] = useState('');

  const orgLogo = orgs.orgLogo + ".jpg";

  const handleBack = () => {
    window.history.back();
  };

  const [isUserAnOrgAdmin, setIsUserAnOrgAdmin] = useState(false);
  useEffect(() => {
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
          if (user) {
              if (auth.currentUser?.isAnonymous) {
                  setIsUserAnOrgAdmin(false);
              } else {
                  const uid = user.uid;
                  console.log(uid);

                  const db = getFirestore(app);
                  getDoc(doc(db, "users", uid)).then(docSnap => {
                      if (docSnap.exists()) {
                        setIsUserAnOrgAdmin(docSnap.data().role === "Org Admin");
                      }
                  });
              }
          } else {
            setIsUserAnOrgAdmin(false);
          }
      })
    }, [isUserAnOrgAdmin]);

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

      {isUserAnOrgAdmin ? 
      <>
            <div className="container-md org-header-container">
        <button className="btn btn-light back-button" onClick={handleBack}>
          <FontAwesomeIcon icon={faChevronLeft} style={{ marginRight: '0.5rem' }}/> 
          Leave Edit Page </button>

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
              <button type="button" className="btn btn-outline-dark org-options-button" data-bs-toggle="modal" data-bs-target="#bannerModal"> Edit Images </button>
                <div className="modal fade" id="bannerModal" tabIndex="-1" aria-labelledby="bannerModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel"> Edit Banner Images </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div className="form-floating mb-2 mt-2">
                          <input type="url" className="form-control" id="floatingBanner1" placeholder="https://example.com" value={orgs.orgPictures} />
                          <label htmlFor="floatingBanner1"> Imgur Link 1 </label>
                        </div>
                        <div className="form-floating mb-2">
                          <input type="url" className="form-control" id="floatingBanner2" placeholder="https://example.com" />
                          <label htmlFor="floatingBanner2"> Imgur Link 2 </label>
                        </div>
                        <div className="form-floating mb-2">
                          <input type="url" className="form-control" id="floatingBanner3" placeholder="https://example.com" />
                          <label htmlFor="floatingBanner3"> Imgur Link 3 </label>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-outline-dark org-options-button"> Close </button>
                        <button type="button" className="btn btn-outline-dark org-options-button"> Save Changes </button>
                      </div>
                    </div>
                  </div>
                </div>
              <button type="button" className="btn btn-outline-dark org-options-button"> Save Changes </button>
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
              <div className="col-md px-4">
                <div className="form-floating mb-2 mt-3">
                  <input type="date" className="form-control" id="floatingDateFounded" placeholder="Month XX, XXXX" value={orgs.dateFounded} />
                  <label htmlFor="floatingDateFounded"> Date Founded </label>
                </div>
                <div className="form-floating mb-2">
                  <input type="text" className="form-control" id="floatingLocation" placeholder="UP Diliman" value={orgs.orgLocation} />
                  <label htmlFor="floatingLocation"> Org Location </label>
                </div>
                <div className="form-floating mb-2">
                  <input type="email" className="form-control" id="floatingEmail" placeholder="email@example.com" value={orgs.orgEmails} />
                  <label htmlFor="floatingEmail"> Org Email </label>
                </div>
                <div className="form-floating mb-2">
                  <input type="url" className="form-control" id="floatingWebsite" placeholder="https://example.com" value={orgs.orgWebsite} />
                  <label htmlFor="floatingWebsite"> Org Website </label>
                </div>
                <div className="form-floating mb-2">
                  <input type="url" className="form-control" id="floatingFB" placeholder="https://example.com" value={orgs.orgFacebook} />
                  <label htmlFor="floatingFB"> Facebook Page </label>
                </div>
                <div className="form-floating mb-4">
                  <input type="text" className="form-control" id="floatingAffiliations" placeholder="https://example.com" value={orgs.orgAffiliations} />
                  <label htmlFor="floatingAffiliations"> Affiliations </label>
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-header right-card-header">
                Application Status
              </div>
              <div className="card-body">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked />
                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Applications are Open</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <div className="card org-desc">
              <div className="form-floating">
                <textarea className="form-control" 
                  placeholder="Describe your organization here!" 
                  id="floatingTextarea2" style={{ height: 500 }} 
                  value={orgs.orgDescription}></textarea>
                <label htmlFor="floatingTextarea2"> Description </label>
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
      </> :
      <div className="alert alert-danger">
        You have no permission to view this page.
      </div>
      }
    </div>
  )
}