import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './OrgPage.css';
// import acm from '../Dashboard/acm.png';
// import logo from '.../src/assets/logo_placeholder.png';


export default function OrgPage() {

  const params = useParams();


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