import {
  fetchUserData,
  fetchOrgData,
  deleteOrg,
  addOrgData,
  editOrgDescription,
  updateRoles,
} from "../../components/FirebaseConnection";
import Navbar from "../../components/Navbar/Navbar";
import "./AdminPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../FirebaseConfig";
import { onSnapshot, collection } from "firebase/firestore";
import AdminTable from "./AdminTable";
import SearchIcon from "./icons/SearchIcon";
import AdminHeader from "./AdminHeader";
import Plus from "./icons/Plus";
import AdminNavigation from "./AdminNavigation";
import EditIcon from "./icons/EditIcon";

export default function AdminPage() {
  const views = ["Users", "Organizations"];
  const [view, setView] = useState<string>("Users");
  const [top, setTop] = useState<boolean>(false);
  const [orgs, setOrgs] = useState<
    { orgName: string; orgDescription: string; id: string }[]
  >([]);
  const [users, setUsers] = useState<
    { name: string; role: string; id: string }[]
  >([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const { pageview } = useParams();
  console.log(pageview);

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

  const [isUserASiteAdmin, setIsUserASiteAdmin] = useState(false);
  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (auth.currentUser?.isAnonymous) {
          setIsUserASiteAdmin(false);
        } else {
          const uid = user.uid;
          console.log(uid);

          const db = getFirestore(app);
          getDoc(doc(db, "users", uid)).then((docSnap) => {
            if (docSnap.exists()) {
              setIsUserASiteAdmin(docSnap.data().role === "Site Admin");
            }
          });
        }
      } else {
        setIsUserASiteAdmin(false);
      }
    });
  }, [isUserASiteAdmin]);

  return (
    <div>
      <Navbar currentPage={"dashboard"}></Navbar>
      {isUserASiteAdmin && <AdminHeader />}

      <div className="container">
        <div className="row justify-content-between align-items-end">
          <div className="col-auto table-views">
            <AdminNavigation view={pageview} />
          </div>
          <div className="col-auto ">
            <button className="btn add-org">
              <Plus /> Add
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col table-container">
            <AdminTable view={pageview} />
          </div>
        </div>
      </div>

      {isUserASiteAdmin && (
        <>
          <div className="container ">
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
                  <SearchIcon />
                  <input placeholder="Search from list" />
                </div>

                {view == "Organizations" && (
                  <button
                    className="btn add-org"
                    onClick={() =>
                      addOrgData(
                        "test",
                        "test",
                        "test",
                        "test",
                        ["test"],
                        "test",
                        ["test"],
                        "test",
                        "test",
                        ["test"],
                        ["test"],
                        "test",
                        "test",
                        "test",
                        "test",
                        "test"
                      )
                    }
                  >
                    Add Organization
                  </button>
                )}
              </div>
            </div>

            <div className="row outer-table">
              <div className="table-container">
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
                            <td scope="col" className="table-col col-last">
                              <select
                                className="btn"
                                onChange={(e) => {
                                  const newRole = e.target.value;
                                  setRole(newRole);
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
                            {!edit && (
                              <td scope="col" className="table-col col-middle">
                                <div className="one-line">
                                  {org.orgDescription}
                                </div>
                                <button onClick={() => setEdit(!edit)}>
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
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                    />
                                  </svg>
                                </button>
                              </td>
                            )}
                            {edit && (
                              <td scope="col" className="table-col col-middle">
                                <div className="one-line">
                                  <input
                                    className="form-control bigger-text"
                                    placeholder="Add new description"
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                  />
                                </div>
                                <button
                                  onClick={() => {
                                    if (description !== "") {
                                      editOrgDescription(org.id, description);
                                    }
                                    setEdit(!edit);
                                  }}
                                >
                                  <EditIcon />
                                </button>
                              </td>
                            )}
                            <td scope="col" className="table-col col-last">
                              <button
                                onClick={() =>
                                  deleteOrg(
                                    org.id,
                                    org.orgName,
                                    org.orgDescription
                                  )
                                }
                              >
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
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  />
                                </svg>
                              </button>
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
        </>
      )}

      {!isUserASiteAdmin && (
        <div className="no-permission">
          {" "}
          You have no permission to access this page
        </div>
      )}
    </div>
  );
}
