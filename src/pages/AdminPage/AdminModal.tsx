import AdminModalAdd from "./AdminModalAdd";
import AdminModalAddUser from "./AdminModalAddUser";
import AdminModalEdit from "./AdminModalEdit";

interface modalProps {
  modalType: "Add" | "Edit";
  view?: string;
  orgId?: string;
  orgName?: string;
  orgDescription?: string;
}
const AdminModal = ({ modalType, view, orgId, orgName, orgDescription }: modalProps) => {
  return (
    <div
      className="modal fade"
      id={`staticBackdrop${modalType}${modalType === "Add" ? "" : orgId}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1
              className="modal-title fs-5"
              id="staticBackdropLabel"
            >{`${modalType} ${
              view === "organizations" ? "Organization" : "User"
            }`}</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          {modalType === "Edit" ? (
            <AdminModalEdit orgId={orgId} orgDescription={orgDescription} orgName={orgName}/>
          ) : (
            <AdminModalAdd />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
