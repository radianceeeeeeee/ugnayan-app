import React from 'react'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './OrgPage.css';
import { fetchOrgData } from "../../components/FirebaseConnection";



export default function OrgPage() {

  const params = useParams();

  const [orgs, setOrgs] = useState([])

  useEffect(() => {
    setOrgs([]); // Clear existing data before fetching new data
    fetchOrgData()
      .then(data => {
        const newData = data.map(item => ({ ...item, starred: false })); // Add 'starred: false' property to each object
        
        // Find the organization with the same ID as params
        const orgWithParamsId = newData.find(org => org.orgId === params.orgId);
  
        // Update state with the organization matching the ID
        if (orgWithParamsId) {
          setOrgs([orgWithParamsId][0]);
        } else {
          console.log("Organization not found with the given ID");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [params.id]); // Dependency array including params.id to re-run the effect when params.id changes
  

  const founded = orgs.dateFounded
  console.log(orgs)

  return (
    <div> 
      <Navbar currentPage={"dashboard"}/>
      <div className="cover"> 

      </div>
      <div className='container'>

        <div className="row">
     
          <div className="col-4 info-card">
            
          <img src="https://imgur.com/dMvHcFM.jpg" className="logo-img" alt="..."/>
          <div className="card org-info">
            <div className="card-body">
              <br></br>
              <p className="card-text"> Founded: []</p>
              <p className="card-text"> Location: []</p>
              <p className="card-text"> Affiliation: []</p>
              <p className="card-text"> Email: []</p>
              <p className="card-text"> Website: []</p>
              <p className="card-text"> Facebook: []</p>
            </div>
            <div className="card-footer">
              You are not affiliated with this org.
            </div>
          </div>
          </div>
          <div className="col-6 org-desc">
            <h1>[Org Page #{params.orgId}]</h1>
            <br></br>
            <div> [short desc]</div>
          </div>
        </div>
      </div>
      
    </div>

  )
}