import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import './Dashboard.css'
import upcsi from './upcsi.png'
import acm from './acm.png'

export default function DashboardPage() {
  const orgs = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Increase orgs for demonstration

  return (
    <div> 
      <h1> Dashboard </h1>
    <div className="container">
      <div className="row">
        {orgs.map((org, index) => (
          <div className="col-4" key={index}>
              <div className="card org-card">
                <img src={acm} className="org-img" alt="..."/>
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Link to={`/org/${org}`}>
                    Org: {org}
                  </Link>
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>

    </div>
  );
}
