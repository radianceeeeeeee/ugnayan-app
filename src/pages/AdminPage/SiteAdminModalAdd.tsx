import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { doCreateSiteAdminWithEmailAndPassword } from "../../firebase/auth";
import "./SiteAdminModalAdd.css"

const SiteAdminModalAdd = () => {
  const [formData, setFormData] = useState({
    adminName: "",
    adminEmail: "",
    adminPassword: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    await doCreateSiteAdminWithEmailAndPassword(formData);
    alert("Admin is now authenticated");
  }

  const handleChange = (event: any) => {
    const value = event.target.value;
    const id = event.target.id;

    console.log(`ID: ${id}; Value: ${value}`);

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
              controlId="adminName"
              label="Site Admin Name"
              className="mb-3"
            >
              <Form.Control
                placeholder="Admin Name"
                onChange={handleChange}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="adminEmail"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={handleChange}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="adminPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </FloatingLabel>
        </Form>
      </div>
      <div className="modal-footer">
        <Button className="btn btn-secondary" data-bs-dismiss="modal">
          Cancel
        </Button>
        <Button form="org-form" className="btn btn-primary" type="submit"  data-bs-dismiss="modal">
          Submit
        </Button>
      </div>
    </>
  );
};

export default SiteAdminModalAdd;
