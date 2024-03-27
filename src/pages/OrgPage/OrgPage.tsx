import React from 'react'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './OrgPage.css';
import { fetchOrgData } from "../../components/FirebaseConnection";



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
      <div className="cover" style={{ 
        backgroundImage: orgPic ? `url(\"${orgPic}` + '.jpg\")' : '',
        backgroundPositionY: '-150px',
        height: '280px',
        width: '100%'
      }}>  

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