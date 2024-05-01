import "./AdminTable.css";
import SearchIcon from "./icons/SearchIcon";
import UpIcon from "./icons/UpIcon";
import {
  fetchUserData,
  fetchOrgData,
  fetchOrgAccountData,
  deleteOrg,
  updateRoles,
} from "../../components/FirebaseConnection";

import "./AdminPage.css";
import { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { app } from "../../FirebaseConfig";
import { onSnapshot, collection } from "firebase/firestore";
import EditIcon from "./icons/EditIcon";
import ArchiveIcon from "./icons/ArchiveIcon";
import AdminModal from "./AdminModal";

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
  const [orgDetails, setOrgDetails] = useState<
  { orgName: string; orgEmail: string; }[]
>([]);
  const [filteredUsers, setFilteredUsers] = useState<
    { name: string; role: string; id: string }[]
  >([]);

  const [sortUserOrder, setSortUserOrder] = useState<'asc' | 'desc'>('asc');
  const [sortOrgOrder, setSortOrgOrder] = useState<'asc' | 'desc'>('asc');

  const handleSortByName = () => {

    if (view === 'organizations') {
      const sortedOrgs = [...orgs]; 
      sortedOrgs.sort((a, b) => {
        if (sortOrgOrder === 'asc') {
          return a.orgName.localeCompare(b.orgName); 
        } else {
          return b.orgName.localeCompare(a.orgName); 
        }
      });
      setOrgs(sortedOrgs); 
      setSortOrgOrder(sortOrgOrder === 'asc' ? 'desc' : 'asc'); 
    }
    else {
      const sortedUsers = [...filteredUsers]; 
      sortedUsers.sort((a, b) => {
        if (sortUserOrder === 'asc') {
          return a.name.localeCompare(b.name); 
        } else {
          return b.name.localeCompare(a.name); 
        }
      });
      setFilteredUsers(sortedUsers); 
      setSortUserOrder(sortUserOrder === 'asc' ? 'desc' : 'asc'); 
    }
  };

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

      // Function to fetch initial org-emails data
      const fetchInitialOrgAccountData = async () => {
        try {
          const data = await fetchOrgAccountData();
          const newData = data.map((org) => ({
            orgEmail: org.orgConnectedEmail,
            orgName: org.orgName,
            
          }));
          setOrgDetails(newData);
          console.log(orgDetails);
        } catch (error) {
          console.error(error);
        }
      };
  

    // Fetch initial data when component mounts
    fetchInitialOrgAccountData();
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

    const orgDetailsListener = onSnapshot(
      collection(getFirestore(app), "organizations-test"),
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          orgName: doc.data().orgName,
          orgEmail: doc.data().orgConnectedEmail,
        }));
        setOrgDetails(newData);
      }
    );

    // Clean up listeners when component unmounts
    return () => {
      orgsListener();
      usersListener();
      orgDetailsListener();
    };
  }, []);


  useEffect(() => {
    if (view === "students") {
      setFilteredUsers(users.filter(user => user.role === "User"));
    } else if (view === "org-admins") {
      setFilteredUsers(users.filter(user => user.role === "Org Admin"));
    } else if (view === "site-admins") {
      setFilteredUsers(users.filter(user => user.role === "Site Admin"));
    } else{
      setFilteredUsers(users);
    }
  }, [view, users]);

  
  return (
    <div className="container admin-table">
      <div className="row row-col-3 admin-table-row admin-row-header ">
        <div className="col-md-3 admin-row-start admin-row-start-header">
          Name
          <button className="a-toggle-button" onClick={handleSortByName}>
            <UpIcon />
          </button>
        </div>
        <div className="col-auto admin-row-mid ">
              {(() => {
              if (view === "organizations") {
                  return "Description";
              } else if (view === "org-admins") {
                  return "Email";
              } else {
                return "Role";
              }
          })()}
        </div>
        <div className="col-3 admin-row-end ">
          <div className="row admin-search ">
            <SearchIcon className="col-auto" />
            <input placeholder="Search from list" className="col" />
          </div>
        </div>
      </div>
      {view !== "organizations" && view !== "org-admins" && (
        <>
          {filteredUsers.map((user) => (
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

      {view === "org-admins" && (
        <>
          {orgDetails.map((orgDetails) => (
            <div className="row row-col-3 admin-table-row ">
              <div className="col-md-3 admin-row-start ">
                <input type="checkbox" />
                <div className="admin-table-name">{orgDetails.orgName}</div>
              </div>
              <div className="col-auto admin-row-mid admin-row-mid-body">
                {orgDetails.orgEmail}
              </div>
              {/* <div className="col-3 admin-row-end">
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
              </div> */}
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
                <div className="admin-row-mid-text">{org.orgDescription}</div>
                <button
                  type="button"
                  className="btn"
                  data-bs-toggle="modal"
                  data-bs-target={`#staticBackdropEdit${org.id}`}
                >
                  <EditIcon />
                </button>
              </div>
              <div className="col-3 admin-row-end">
                <button
                  className="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
          
                >
                  <ArchiveIcon />
                </button>

                <div className="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Are you sure you want to delete </h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                    {org.orgName}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-primary"  onClick={() => deleteOrg(org.id, org.orgName, org.orgDescription)} data-bs-dismiss="modal" >Confirm Delete</button>
                    </div>
                  </div>
                </div>
              </div>
              </div>

              
              <AdminModal
                modalType="Edit"
                view={view}
                orgId={org.id}
                orgName={org.orgName}
                orgDescription={org.orgDescription}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AdminTable;
