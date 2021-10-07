import React, { useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { API } from "../../config/api";
import Swal from "sweetalert2";
import maps from "../../assets/maps.svg";
import leaf from "../../assets/leaf.png";

function RegisterModal(props) {
  const { handleClose, show, login } = props;

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  function toSwitch() {
    handleClose();
    login();
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(formData);
      const response = await API.post("/register", body, config);

      console.log(response);

      Swal.fire({
        text: "Success create account !",
        icon: "success",
        confirmButtonColor: "blue",
      }).then(handleClose);
    } catch (error) {
      const { response } = error;
      console.log({ error });
      response.data.message ? setMessage(response.data.message) : setMessage(response.data.error.message);
      setShowAlert(true);
    }
  };

  function handleChange(e) {
    e.preventDefault();
    setShowAlert(false);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modalContainer"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <img src={maps} alt="maps" className="img-maps" />
        <img src={leaf} alt="leaf" className="img-leaf" />

        <Modal.Body className="md-2 px-4">
          <Form onSubmit={handleOnSubmit}>
            <center>
              <h2 className="my-5">
                <b>Register</b>
              </h2>
            </center>

            {showAlert && <Alert variant="danger">{message}</Alert>}

            <Form.Group className="formGroup" controlId="formBasicFullname">
              <Form.Label className="fromLabel">
                <b>Full Name</b>
              </Form.Label>
              <Form.Control className="formInput" onChange={(e) => handleChange(e)} type="text" name="fullname" />
            </Form.Group>

            <Form.Group className="formGroup" controlId="formBasicEmail">
              <Form.Label className="fromLabel">
                <b>Email</b>
              </Form.Label>
              <Form.Control className="formInput" onChange={(e) => handleChange(e)} type="email" name="email" />
            </Form.Group>
            <Form.Group className="formGroup" controlId="formBasicPassword">
              <Form.Label className="fromLabel">
                <b>Password</b>
              </Form.Label>
              <Form.Control className="formInput" onChange={(e) => handleChange(e)} type="password" name="password" />
            </Form.Group>

            <Form.Group className="formGroup" controlId="formBasicPhone">
              <Form.Label className="fromLabel">
                <b>Phone</b>
              </Form.Label>
              <Form.Control className="formInput" onChange={(e) => handleChange(e)} type="number" name="phone" />
            </Form.Group>

            <Form.Group className="formGroup" controlId="formBasicAddress">
              <Form.Label className="fromLabel">
                <b>Address</b>
              </Form.Label>
              <Form.Control
                className="formInput"
                onChange={(e) => handleChange(e)}
                as="textarea"
                rows={3}
                name="address"
              />
            </Form.Group>

            <Button className="button1  mt-3" style={{ width: "100%", fontWeight: "bold" }} type="submit">
              Register
            </Button>

            <Form.Label className="formLabelCenter mt-3">
              Already have an account ?
              <Form.Label onClick={toSwitch}>
                <b>Click Here</b>
              </Form.Label>
            </Form.Label>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RegisterModal;
