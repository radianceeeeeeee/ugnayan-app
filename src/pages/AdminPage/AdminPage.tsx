import Navbar from "../Navbar/Navbar";
import "./AdminPage.css";
import { useState } from "react";
export default function AdminPage() {
  const views = ["Users", "Organizations"];
  const [view, setView] = useState<string>("Users");

  return (
    <div>
      <Navbar currentPage={"dashboard"}></Navbar>
      <div className="container">
        <div className="row table-header">
          <div className="col-4 header-left">
            <div className="view-type">{view}</div>
            <div className="dropdown ">
              <button
                type="button"
                className="btn dropdown-toggle change-view"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
              ></button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {views.map((viewItem) => (
                  <li key={viewItem}>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setView(viewItem);
                      }}
                    >
                      {viewItem}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col header-right ">
            <div className="search-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="down-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>

              <input placeholder="Search from list" />
            </div>
          </div>
        </div>
        <div className="row "></div>
      </div>
    </div>
  );
}
