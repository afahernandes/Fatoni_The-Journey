import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Form, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router";

import { API } from "../../config/api";
import Swal from "sweetalert2";

function LoginModal(props) {
  const { handleClose, show, regis } = props;
  const [state, dispatch] = useContext(AppContext);
  const router = useHistory();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function toSwitch() {
    handleClose();
    regis();
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify(formData);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await API.post("/login", body, config);
      // Notification
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });

      handleClose();
      window.location.reload();
    } catch (error) {
      Swal.fire({
        text: "Login Failed !",
        icon: "error",
        confirmButtonColor: "blue",
      });
      console.log(error);
    }
  };

  function handleChange(e) {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Body>
        <Form style={{ margin: "20px" }} onSubmit={handleOnSubmit}>
          <center>
            <h2>
              <b>Login</b>
            </h2>
          </center>

          <Form.Group className="formGroup" controlId="email">
            <Form.Label className="fromLabel">
              <b>Email address</b>
            </Form.Label>
            <Form.Control
              className="formInput"
              onChange={(e) => handleChange(e)}
              type="email"
              name="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="formGroup" controlId="password">
            <Form.Label className="fromLabel">
              <b>Password</b>
            </Form.Label>
            <Form.Control
              className="formInput"
              type="password"
              onChange={(e) => handleChange(e)}
              name="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button className="button1" style={{ width: "100%" }} type="submit">
            Submit
          </Button>
          <Form.Label className="formLabelCenter">
            Don't have an account ?
            <Form.Label onClick={toSwitch}>
              <b>Click Here</b>
            </Form.Label>
          </Form.Label>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
