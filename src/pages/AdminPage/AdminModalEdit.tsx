import { useState } from "react";
import {
  editOrgAdminDetailsAdmin,
  editOrgDetailsAdmin,
} from "../../components/FirebaseConnection";
import "./AdminModalEdit.css";

interface orgDetails {
  orgId?: string;
  orgName?: string;
  orgDescription?: string;
  orgEmail?: string;
}

interface updatedDetails {
  orgName?: string;
  orgDescription?: string;
  orgEmail?: string;
}
const AdminModalEdit = ({
  orgId,
  orgName,
  orgDescription,
  orgEmail,
}: orgDetails) => {
  const [updatedDetails, setUpdatedDetails] = useState<updatedDetails>({
    orgName: orgName,
    orgDescription: orgDescription,
    orgEmail: orgEmail,
  });
  

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUpdatedDetails({
      ...updatedDetails,
      [name]: value,
    });
  };

  const submissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof orgDescription === "string") {
      editOrgDetailsAdmin(
        orgId as string,
        updatedDetails.orgName as string,
        updatedDetails.orgDescription as string
      );
    } else {
      editOrgAdminDetailsAdmin(
        orgId as string,
        updatedDetails.orgName as string,
        updatedDetails.orgEmail as string
      );
    }
    (event.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={submissionHandler}>
      <div className="modal-body ">
        <input
          placeholder="Enter New Organization Name"
          className="form-control admin-edit"
          name="orgName"
          onChange={inputChangeHandler}
        ></input>
        <input
          placeholder={`Enter New Organization ${
            typeof orgDescription === "string" ? "Description" : "Email"
          }`}
          className="form-control admin-edit"
          name={
            typeof orgDescription === "string" ? "orgDescription" : "orgEmail"
          }
          onChange={inputChangeHandler}
        ></input>
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
