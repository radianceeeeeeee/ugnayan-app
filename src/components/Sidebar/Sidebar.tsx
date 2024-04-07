import React from 'react'
import "./Sidebar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
    return (
      <div className="offcanvas offcanvas-start Sidebar" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="sidebar" aria-labelledby="sidebarLabel">
        <div className="sidebar-header"> My Orgs </div>
 
          {/* just a concept test/not yet functional and responsive */}
          <div className="accordion" id="accordionPanelsStayOpenExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                <button className="accordion-button sidebar-header" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                  Org #1
                  <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: 'auto', color: '#444444', fontSize: '0.8em'}} />
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                <div className="accordion-body">
                  Step Down from Role
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                <button className="accordion-button sidebar-header" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                  Org #2
                  <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: 'auto', color: '#444444', fontSize: '0.8em'}} />
                </button>
              </h2>
              <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                <div className="accordion-body">
                  Leave Organization
                </div>
              </div>
            </div>
          </div>

        <div className="sidebar-header"> Starred Orgs </div>

      </div>
    )
}

export default Sidebar