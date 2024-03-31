import "bootstrap/dist/css/bootstrap.min.css";
import './Dashboard.css';
import OrgCard from './OrgCard';
import { useState,useEffect } from "react";
import Navbar from '../Navbar/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { fetchOrgData } from "../../components/FirebaseConnection";

export default function DashboardPage() {

  const [orgs, setOrgs] = useState([])

  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortFilterActive, setSortFilterActive] = useState(true);
  const [starredFilterActive, setStarredFilterActive] = useState(false);
  const [openForAppFilterActive, setOpenForAppFilterActive] = useState(false);
  const [scopeActive, setScopeActive] = useState(false);
  const [tagActive, setTagActive] = useState(false);

  const [selectedScope, setSelectedScope] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);


  useEffect(() => {
    setOrgs([]); // Clear existing data before fetching new data
    fetchOrgData()
      .then(data => {
        const newData = data.map(item => ({ ...item, starred: false })); // Add 'starred: false' property to each object
        setOrgs(newData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // useEffect(() => {
  //   console.log(orgs);
  // }, [orgs]);
  
  const toggleStarred = (id) => {
    setOrgs(orgs.map(org => org.orgId === id ? { ...org, starred: !org.starred } : org));
  };


const filteredOrgs = orgs.filter(org =>
  (!starredFilterActive || org.starred) &&
  (org.orgName.toLowerCase().includes(query.toLowerCase()) ||
    org.orgDescription.toLowerCase().includes(query.toLowerCase())) &&
    (!selectedScope || org.orgTags.includes(selectedScope)) &&
    (selectedTags.length === 0 || selectedTags.every(tag => org.orgTags.includes(tag)))
);




  const sortedOrgs = [...filteredOrgs].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.orgName.localeCompare(b.orgName);
    } else {
      return b.orgName.localeCompare(a.orgName);
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortFilterActive(!sortFilterActive);
  
    
    
  };


  const toggleStarredFilter = () => {
    setStarredFilterActive(!starredFilterActive);
  };

  const toggleOpenForAppFilter = () => {
    setOpenForAppFilterActive(!openForAppFilterActive);
  };

  const handleScopeSelect = (scope) => {
    setSelectedScope(prevScope => prevScope === scope ? null : scope);
    setScopeActive(!scopeActive);

  };

  const handleTagSelect = (tag) => {
    let updatedTags = [];
    let updatedTagActive = false;
  
    // Update the class name synchronously before updating the state
    if (selectedTags.includes(tag)) {
      updatedTags = selectedTags.filter(t => t !== tag);
    } else {
      updatedTags = [...selectedTags, tag];
    }
  
    // Check if there are any tags selected
    if (updatedTags.length > 0) {
      updatedTagActive = true;
    }
  
    // Update state
    setSelectedTags(updatedTags);
    setTagActive(updatedTagActive);
  };
  

  useEffect(() => {
    console.log("New tag added:", selectedTags);
  }, [selectedTags]); // The effect depends on selectedTags state
  

  return (
    <div> 
      <Navbar currentPage={"dashboard"}/>
      
      <div className="main-text"> What Org You Looking For?</div>
      <div className="sub-text"> Type in keywords, or use tags to filter out the results</div>
      <div className="container">
        <div className="row search-row">
          <div className="col-2"></div>
          <div className="col-7">
            <input
              type="search"
              className="form-control search-bar"
              placeholder="Type to Search"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div className="col-1">
            <button className={`sort-btn ${sortFilterActive ? 'active' : ''}`} type="submit" onClick={toggleSortOrder}>
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="45" fill="currentColor" className="bi bi-sort-alpha-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371zm1.57-.785L11 2.687h-.047l-.652 2.157z"/>
                <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707z"/>
              </svg>
            </button>
          </div>
          <div className="col-2"></div>
        </div>
        <div className="row search-filters-row">
          <div className="col-lg-2 col-sm-4"></div>
          <button type="button" className={`filter-btn ${starredFilterActive ? 'active' : ''}`} onClick={toggleStarredFilter}> Starred</button>
          <button type="button" className={`filter-btn filter-long ${openForAppFilterActive ? 'active' : ''}`} onClick={toggleOpenForAppFilter}> Open for App</button>
          <div className="col-lg-2 col-sm-4">
            <Dropdown>
              <Dropdown.Toggle className={`dropdown-btn ${scopeActive ? 'active' : ''}`} variant="secondary" id="dropdown-basic">
                Scope
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className={selectedScope === "computer science" ? "selected-scope" : ""} onClick={() => handleScopeSelect("computer science")}>Computer Science</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-lg-2 col-sm-4">
            <Dropdown>
              <Dropdown.Toggle className={`dropdown-btn ${tagActive ? 'active' : ''}`} variant="secondary" id="dropdown-basic">
                More Tags
              </Dropdown.Toggle>
              <Dropdown.Menu>
  <Dropdown.Item 
    className={selectedTags.includes("academic") ? "selected-scope" : ""} 
    onClick={(e) => { 
      e.stopPropagation(); 
      handleTagSelect("academic"); 
    }}
  >
    Academic 
  </Dropdown.Item>            
  <Dropdown.Item 
    className={selectedTags.includes("socio-academic") ? "selected-scope" : ""} 
    onClick={(e) => { 
      e.stopPropagation(); 
      handleTagSelect("socio-academic"); 
    }}
  >
    Socio-Academic 
  </Dropdown.Item>            
  <Dropdown.Item 
    className={selectedTags.includes("non-sectarian") ? "selected-scope" : ""} 
    onClick={(e) => { 
      e.stopPropagation(); 
      handleTagSelect("non-sectarian"); 
    }}
  >
    Non-Sectarian 
  </Dropdown.Item>            
  <Dropdown.Item 
    className={selectedTags.includes("non-profit") ? "selected-scope" : ""} 
    onClick={(e) => { 
      e.stopPropagation(); 
      handleTagSelect("non-profit"); 
    }}
  >
    Non-Profit 
  </Dropdown.Item>
</Dropdown.Menu>

            </Dropdown>
          </div>
        </div>
        <div className="row">
          {sortedOrgs.map((org, index) => (
            <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
              <OrgCard org={org} toggleStarred={toggleStarred} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
