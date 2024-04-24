import { useState } from "react";
import { editOrgDetailsAdmin } from "../../components/FirebaseConnection";

interface orgDetails {
  orgId?: string;
  orgName?: string;
  orgDescription?: string;
}

interface updatedDetails {
  orgName?: string;
  orgDescription?: string;
}
const AdminModalEdit = ({ orgId, orgName, orgDescription }: orgDetails) => {
  const [updatedDetails, setUpdatedDetails] = useState<updatedDetails>({
    orgName: orgName,
    orgDescription: orgDescription,
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUpdatedDetails({
      ...updatedDetails,
      [name]: value,
    });
  };

  const submissionHandler = () => {
    editOrgDetailsAdmin(orgId as string, updatedDetails.orgName as string, updatedDetails.orgDescription as string);
  }

  return (
    <>
      <div className="modal-body ">
        <input         
          placeholder="Enter New Organization Name"
          className="form-control"
          name="orgName"
          onChange={inputChangeHandler}
        ></input>
        <input
          placeholder="Enter New Organization Description"
          className="form-control"
          name="orgDescription"
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
        <button type="button" className="btn btn-primary" onClick={submissionHandler}>
          Confirm Edit
        </button>
      </div>
    </>
  );
};

export default AdminModalEdit;
