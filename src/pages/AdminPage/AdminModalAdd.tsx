const AdminModalAdd = () => {
  return (
    <form>
      <div className="modal-body"></div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button type="button" className="btn btn-primary">
          Understood
        </button>
      </div>
    </form>
  );
};

export default AdminModalAdd;
