import { set } from "firebase/database";
import {
  fetchUserData,
  fetchOrgData,
} from "../../components/FirebaseConnection";
import Navbar from "../../components/Navbar/Navbar";
import "./AdminPage.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminPage() {
  const views = ["Users", "Organizations"];
  const [view, setView] = useState<string>("Users");
  const [top, setTop] = useState<boolean>(false);
  const [orgs, setOrgs] = useState<
    { orgName: string; orgDescription: string }[]
  >([]);
  const [users, setUsers] = useState<{ name: string; role: string }[]>([]);

  useEffect(() => {
    setOrgs([]);
    fetchOrgData()
      .then((data) => {
        const newData: { orgName: string; orgDescription: string }[] = [];
        for (const org of data) {
          newData.push({
            orgName: org.orgName,
            orgDescription: org.orgDescription,
          });
        }
        setOrgs(newData);
      })
      .catch((error) => {
        console.error(error);
      });
    fetchUserData().then((data) => {
      const newData: { name: string; role: string }[] = [];
      for (const user of data) {
        newData.push({
          name: user.lastName.concat(", ", user.firstName),
          role: user.role,
        });
      }
      setUsers(newData);
    });
  }, []);

  // console.log(orgs);
  // console.log(users);

  return (
    <div>
      <Navbar currentPage={"dashboard"}></Navbar>
      <div className="admin-title-container">
        <div className="admin-title">
          <div className="admin-title-text">Admin Dashboard</div>
          <Link to="/dashboard">
            <button className="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              Back to Main Dashboard
            </button>
          </Link>
        </div>
      </div>
      <div className="container body-shift">
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
                      onClick={(_) => {
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
                className="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>

              <input placeholder="Search from list" />
            </div>
            {view == "Organizations" && (
              <button className="btn add-org">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add Organization
              </button>
            )}
          </div>
        </div>

        <div className="row outer-table">
          <div className="table-container">
            <div className="table-top">
              <input type="checkbox" />
              <button className="btn remove-orgs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                Remove All
              </button>
            </div>
            <table className="table">
              <thead>
                <tr className="table-row">
                  <th scope="col" className="table-col">
                    Name
                    <button
                      onClick={(_) => {
                        setTop(!top);
                      }}
                    >
                      {!top && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="icon abs"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                          />
                        </svg>
                      )}
                      {top && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="icon abs"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                          />
                        </svg>
                      )}
                    </button>
                  </th>
                  {view == "Users" && (
                    <th scope="col" className="table-col col-middle">
                      Role
                    </th>
                  )}
                  {view == "Organizations" && (
                    <th scope="col" className="table-col col-middle">
                      Description
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {view == "Users" && (
                  <>
                    {users.map((user) => (
                      <tr className="table-row">
                        <th scope="row">
                          <input type="checkbox" />
                        </th>
                        <td scope="col" className="table-col ">
                          {user.name}
                        </td>
                        <td scope="col" className="table-col col-middle">
                          {user.role}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
                {view == "Organizations" && (
                  <>
                    {orgs.map((org) => (
                      <tr className="table-row">
                        <th scope="row">
                          <input type="checkbox" />
                        </th>
                        <td scope="col" className="table-col ">
                          {org.orgName}
                        </td>
                        <td scope="col" className="table-col col-middle">
                          {org.orgDescription}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
