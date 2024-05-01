import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { doTestCreateOrgWithEmailAndPassword } from "../../firebase/auth";

const AdminModalAdd = () => {
  const [error, setError] = useState({
    orgName: false,
    orgConnectedEmail: false,
    orgPassword: false,
  });
  const [showErrorText, setShowErrorText] = useState({
    orgName: false,
    orgConnectedEmail: false,
    orgPassword: false,
  });
  const [formData, setFormData] = useState({
    orgName: "",
    orgConnectedEmail: "",
    orgPassword: "",
  });

  async function handleSubmit(e: any) {
      e.preventDefault();
      const form = e.target;

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      await doTestCreateOrgWithEmailAndPassword(formData);
      alert("Organization is now authenticated")
  }

  const handleChange = (event: any) => {
    const value = event.target.value;
    const id = event.target.id;

    console.log(`ID: ${id}; Value: ${value}`)


    setFormData({
      ...formData,
      [id]: value,
    });
  };


  return (
    <>
      <div className="modal-body">
        <Form onSubmit={handleSubmit} id="org-form">
          <FloatingLabel
            controlId="orgConnectedEmail"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" onChange={handleChange}/>
          </FloatingLabel>

          <FloatingLabel
            controlId="orgPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control type="password" placeholder="Password" onChange={handleChange}/>
          </FloatingLabel>

          <FloatingLabel
            controlId="orgName"
            label="Organization Name"
            className="mb-3"
          >
            <Form.Control placeholder="Organization Name" onChange={handleChange}/>
          </FloatingLabel>
        </Form>
      </div>
      <div className="modal-footer">
        <Button className="btn btn-secondary" data-bs-dismiss="modal">Close</Button>
        <Button form="org-form" className="btn btn-primary" type="submit">Confirm</Button>
      </div>
    </>
  );
};

export default AdminModalAdd;
