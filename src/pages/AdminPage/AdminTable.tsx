import "./AdminTable.css";
import SearchIcon from "./icons/SearchIcon";
import UpIcon from "./icons/UpIcon";
import {
  fetchUserData,
  fetchOrgData,
  deleteOrg,
  editOrgDescription,
  updateRoles,
} from "../../components/FirebaseConnection";

import "./AdminPage.css";
import { useState, useEffect } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../FirebaseConfig";
import { onSnapshot, collection } from "firebase/firestore";
import EditIcon from "./icons/EditIcon";
import ArchiveIcon from "./icons/ArchiveIcon";

interface AdminTableProps {
  view: string | undefined;
}

const AdminTable = ({ view }: AdminTableProps) => {
  const [orgs, setOrgs] = useState<
    { orgName: string; orgDescription: string; id: string }[]
  >([]);
  const [users, setUsers] = useState<
    { name: string; role: string; id: string }[]
  >([]);

  useEffect(() => {
    // Function to fetch initial organization data
    const fetchInitialOrgData = async () => {
      try {
        const data = await fetchOrgData();
        const newData = data.map((org) => ({
          orgName: org.orgName,
          orgDescription: org.orgDescription,
          id: org.id,
        }));
        setOrgs(newData);
      } catch (error) {
        console.error(error);
      }
    };

    // Function to fetch initial user data
    const fetchInitialUserData = async () => {
      try {
        const data = await fetchUserData();
        const newData = data.map((user) => ({
          name: user.lastName.concat(", ", user.firstName),
          role: user.role,
          id: user.id,
        }));
        setUsers(newData);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch initial data when component mounts
    fetchInitialOrgData();
    fetchInitialUserData();

    // Set up real-time listener for organizations
    const orgsListener = onSnapshot(
      collection(getFirestore(app), "organizations"),
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          orgName: doc.data().orgName,
          orgDescription: doc.data().orgDescription,
          id: doc.id,
        }));
        setOrgs(newData);
      }
    );

    // Set up real-time listener for users
    const usersListener = onSnapshot(
      collection(getFirestore(app), "users"),
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          name: doc.data().lastName.concat(", ", doc.data().firstName),
          role: doc.data().role,
          id: doc.id,
        }));
        setUsers(newData);
      }
    );

    // Clean up listeners when component unmounts
    return () => {
      orgsListener();
      usersListener();
    };
  }, []);

  return (
    <div className="container admin-table">
      <div className="row row-col-3 admin-table-row admin-row-header ">
        <div className="col-md-3 admin-row-start admin-row-start-header">
          Name
          <button className="a-toggle-button">
            <UpIcon />
          </button>
        </div>
        <div className="col-auto admin-row-mid ">
          {view === "organizations" ? "Description" : "Role"}
        </div>
        <div className="col-3 admin-row-end ">
          <div className="row admin-search ">
            <SearchIcon className="col-auto" />
            <input placeholder="Search from list" className="col" />
          </div>
        </div>
      </div>
      {view === "all-users" && (
        <>
          {users.map((user) => (
            <div className="row row-col-3 admin-table-row ">
              <div className="col-md-3 admin-row-start ">
                <input type="checkbox" />
                <div className="admin-table-name">{user.name}</div>
              </div>
              <div className="col-auto admin-row-mid admin-row-mid-body">
                {user.role}
              </div>
              <div className="col-3 admin-row-end">
                <select
                  className="btn"
                  onChange={(e) => {
                    const newRole = e.target.value;
                    updateRoles(user.id, newRole);
                  }}
                >
                  <option selected disabled value="">
                    Change Role
                  </option>
                  <option>User</option>
                  <option>Org Admin</option>
                  <option>Site Admin</option>
                </select>
              </div>
            </div>
          ))}
        </>
      )}
      {view === "organizations" && (
        <>
          {orgs.map((org) => (
            <div className="row row-col-3 admin-table-row ">
              <div className="col-md-3 admin-row-start ">
                <input type="checkbox" />
                <div className="admin-table-name">{org.orgName}</div>
              </div>
              <div className="col-auto admin-row-mid admin-row-mid-body">
                <div className="one-line">{org.orgDescription}</div>
                <button className="btn">
                  <EditIcon />
                </button>
              </div>
              <div className="col-3 admin-row-end">
                <button
                  className="btn"
                  onClick={() =>
                    deleteOrg(org.id, org.orgName, org.orgDescription)
                  }
                >
                  <ArchiveIcon />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AdminTable;
