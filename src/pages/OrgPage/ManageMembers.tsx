import {
  fetchUserData,
  fetchOrgData,
  deleteOrg,
  addOrgData,
  editOrgDescription,
  updateRoles,
  fetchOrgMembers,
  fetchOrgApplicants,
  fetchOrgAspiringApplicants,
} from "../../components/FirebaseConnection";
import Navbar from "../../components/Navbar/Navbar";
import "./ManageMembers.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../FirebaseConfig";
import ManageMembersHeader from "./ManageMembersHeader";
import SearchIcon from "../AdminPage/icons/SearchIcon";
import UpIcon from "../AdminPage/icons/UpIcon";
import BinIcon from "./ManageMembersIcons/BinIcon";

export default function ManageMembers() {
  const views = [
    "Aspiring Applicants",
    "Official Applicants",
    "Official Members",
  ];
  const [org, setOrg] = useState({});
  const [apps, setApps] = useState([]);
  const [aspiringApps, setAspiringApps] = useState([]);
  const [members, setMembers] = useState([]);

  const params = useParams();

  useEffect(() => {
    setOrg({}); // Clear existing data before fetching new data
    fetchOrgData()
      .then((data) => {
        const newData = data.map((item) => ({ ...item, starred: false, id: item.id }));

        // Find the organization with the same ID as params
        const orgWithParamsId = newData.find(
          (org) => org.orgId === params.orgId
        );

        // Update state with the organization matching the ID
        if (orgWithParamsId) {
          setOrg(orgWithParamsId);
          fetchOrgMembers(orgWithParamsId.id).then((mems) => {
            mems.forEach((user) => console.log(`member: ${user}`))
            setMembers(mems);
          });
          fetchOrgApplicants(orgWithParamsId.id).then((applicants) => {
            applicants.forEach((user) => console.log(`app: ${user}`))
            setApps(applicants);
          });
          fetchOrgAspiringApplicants(orgWithParamsId.id).then((aspiringApplicants) => {
            aspiringApplicants.forEach((user) => console.log(`aspiring: ${user}`))
            setAspiringApps(aspiringApplicants);
          });
        } else {
          console.log("Organization not found with the given ID");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Dependency array including params.orgId to re-run the effect when params.orgId changes

  return (
    <div>
      <Navbar currentPage={"dashboard"}></Navbar>
      <ManageMembersHeader orgId={org.orgId} orgName={org.orgName} />
      <div className="container">
        <div className="row justify-content-between align-items-end">
          <div className="col-4 header-left">
            <div className="view-type">{params.view?.replace(/_/g, " ")}</div>
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
                    <Link
                      to={`/dashboard/${
                        org.orgId
                      }/manageMembers/${viewItem.replace(/ /g, "_")}`}
                      className="dropdown-item"
                    >
                      {viewItem}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col header-right">
            <div className="search-container">
              <SearchIcon />
              <input placeholder="Search from list" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col table-container">
            <div className="container ">
              <div className="row row-col-5 manage-table-row manage-row-header ">
                <div className="col-md-3 manage-row-start manage-row-start-header">
                  Name
                  <button className="a-toggle-button">
                    <UpIcon />
                  </button>
                </div>
                <div className="col-auto manage-row-mid ">Email Address</div>
                <div className="col-auto manage-row-mid ">
                  {params.view === "Official_Members" ? "Member" : "Interested"}{" "}
                  Since
                  <button className="a-toggle-button">
                    <UpIcon />
                  </button>
                </div>
                <div className="col-auto manage-row-mid ">Student Number</div>

                <div className="col-3 manage-row-end "></div>
              </div>

              <div className="row row-col-3 manage-table-row ">
                <div className="col-md-3 manage-row-start ">
                  <input type="checkbox" />
                  <div className="manage-table-name">testName</div>
                </div>
                <div className="col-auto manage-row-mid manage-row-mid-body">
                  testAddress
                </div>
                <div className="col-auto manage-row-mid ">testDate</div>
                <div className="col-auto manage-row-mid ">testStudentNo</div>
                <div className="col-3 manage-row-end">
                  <button className="a-toggle-button">
                    <BinIcon />
                  </button>
                  <button className="manage-row-end-button">CONFIRM</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {false && (
        <div className="no-permission">
          {" "}
          You have no permission to access this page
        </div>
      )}
    </div>
  );
}
