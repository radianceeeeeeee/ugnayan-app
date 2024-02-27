import "bootstrap/dist/css/bootstrap.min.css";
import './Dashboard.css';
import OrgCard from './OrgCard';
import { useState } from "react";
import Navbar from '../Navbar/Navbar';

export default function DashboardPage() {
  const [orgs, setOrgs] = useState([
    { id: 1, name: "Association for Computing Machinery", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    { id: 2, name: "DevelUP", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    { id: 3, name: "Google Developer Student Clubs", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    { id: 4, name: "UP Association of Computer Science Majors", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    { id: 5, name: "UP Center for Student Innovations", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
  ]);

  const [query, setQuery] = useState('');

  const filteredOrgs = orgs.filter(org => 
    org.name.toLowerCase().includes(query.toLowerCase()) || // Search by name
    org.desc.toLowerCase().includes(query.toLowerCase())   // Search by description
  );

  return (
    <div> 
      <Navbar currentPage={"dashboard"}/>
      <div className="container">
        <div className="row search-row">
          <div className="col-12">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          {filteredOrgs.map((org, index) => (
            <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
              <OrgCard org={org}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
