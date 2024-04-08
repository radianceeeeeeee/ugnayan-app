import React from 'react'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './OrgPage.css';
import { fetchOrgData } from "../../components/FirebaseConnection";
import Sidebar from "../../components/Sidebar/Sidebar";



export default function OrgPage() {
  const params = useParams();

  const [orgs, setOrgs] = useState({});
  const [orgPic, setOrgPic] = useState('');

  const orgLogo = orgs.orgLogo + ".jpg";


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

  // Define coverStyle object
  const coverStyle = {
    backgroundImage: orgPic ? `url(\"${orgPic}` + '.jpg\");' : '',
    backgroundPositionY: '-150px',
    height: '280px',
    width: '100%'
  };

  console.log(orgPic ? `url(\"${orgPic}` + '.jpg\")' : '')





  return (
    <div> 
      <Navbar currentPage={"dashboard"}/>
      <Sidebar />

      <div id="myCarousel" className="carousel slide mb-6 rounded-3" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
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

      <div className='container'>

        <div className="row">
     
          <div className="col-4 info-card">
            
          <img src={orgLogo} className="logo-img" alt="..."/>
          <div className="card org-info">
            <div className="card-body">
              <br></br>
              <p className="card-text"> Founded: {orgs.dateFounded}</p>
              <p className="card-text"> Location: {orgs.orgLocation}</p>
              <p className="card-text"> Affiliation: {orgs.orgAffiliations}</p>
              <p className="card-text"> Email: {orgs.orgEmails}</p>
              <p className="card-text"> Website: {orgs.orgWebsite}</p>
              <p className="card-text"> Facebook: {orgs.orgFacebook} </p>
            </div>
            <div className="card-footer">
              You are not affiliated with this org.
            </div>
          </div>
          </div>
          <div className="col-8 org-desc">
            <h1>{orgs.orgName}</h1>
            <br></br>
            <div> {orgs.orgDescription} </div>
          </div>
        </div>
      </div>
      
    </div>

  )
}