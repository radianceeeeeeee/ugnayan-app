import { useState } from "react";
import {
  editNameAdmin,
  editOrgAdminDetailsAdmin,
  editOrgDetailsAdmin,
} from "../../components/FirebaseConnection";
import "./AdminModalEdit.css";

interface orgDetails {
  id?: string;
  name?: string;
  view?: string;
  orgDescription?: string;
  orgEmail?: string;
}

interface updatedDetails {
  name?: string;
  orgDescription?: string;
  orgEmail?: string;
}
const AdminModalEdit = ({
  id,
  name,
  view,
  orgDescription,
  orgEmail,
}: orgDetails) => {
  const [updatedDetails, setUpdatedDetails] = useState<updatedDetails>({
    name: name,
    orgDescription: orgDescription,
    orgEmail: orgEmail,
  });
  console.log(updatedDetails);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const newValueInvalid = event.target.validity.patternMismatch;
    if (newValueInvalid) {
      return;
    }

    setUpdatedDetails({
      ...updatedDetails,
      [name]: value,
    });
  };

  const submissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof orgDescription === "string") {
      editOrgDetailsAdmin(
        id as string,
        updatedDetails.name as string,
        updatedDetails.orgDescription as string
      );
    } else if (view === "org-admins") {
      editOrgAdminDetailsAdmin(
        id as string,
        updatedDetails.name as string,
        updatedDetails.orgEmail as string
      );
    } else {
      editNameAdmin(id as string, updatedDetails.name as string);
    }
    (event.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={submissionHandler}>
      <div className="modal-body ">
        <input
          placeholder={`Enter New ${
            view === "org-admins" || view === "organizations"
              ? "Organization"
              : "User"
          } Name`}
          className="form-control admin-edit"
          name="name"
          pattern={
            view === "org-admins" || view === "organizations"
              ? ".*"
              : "^[a-zA-Z]+, [a-zA-Z]+$"
          }
          title="Please enter the name in the format: LastName, FirstName"
          onChange={inputChangeHandler}
        ></input>
        {(view === "org-admins" || view === "organizations") && (
          <input
            placeholder={`Enter New Organization ${
              typeof orgDescription === "string" ? "Description" : "Email"
            }`}
            className="form-control admin-edit"
            name={
              typeof orgDescription === "string" ? "orgDescription" : "orgEmail"
            }
            pattern={
              typeof orgDescription === "string" ? ".*"
                : ".+@.+$"
            }
            title="Please enter an email"
            onChange={inputChangeHandler}
          ></input>
        )}
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button type="submit" className="btn btn-primary">
          Confirm Edit
        </button>
      </div>
    </form>
  );
};

export default AdminModalEdit;
