import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import maps from "../../assets/maps.svg";
import leaf from "../../assets/leaf.png";
import { API, setAuthToken } from "../../config/api";
import Swal from "sweetalert2";

function LoginModal(props) {
  const { handleClose, show, regis } = props;

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");

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
      console.log(response);
      setAuthToken(response.data.data.token);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });
      const getBookmarks = await API.get("/userbookmark");
      dispatch({
        type: "GET_BOOKMARK",
        payload: getBookmarks.data.data.bookmarks,
      });
      handleClose();
    } catch (error) {
      console.log({ error });
      setMessage("Username or password is invalid!");
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
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modalContainer"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <img src={maps} alt="maps" className="img-maps" />
      <img src={leaf} alt="leaf" className="img-leaf" />

      <Modal.Body className="md-2 px-3">
        <Form onSubmit={handleOnSubmit}>
          <center>
            <h2 className="my-5">
              <b>Login</b>
            </h2>
          </center>

          {showAlert && <Alert variant="danger">{message}</Alert>}

          <Form.Group className="formGroup" controlId="email">
            <Form.Label className="formLabelInput">
              <b>Email</b>
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
            <Form.Label className="formLabelInput">
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

          <Button className="button1 mt-3" style={{ width: "100%", fontWeight: "bold" }} type="submit">
            Login
          </Button>
          <Form.Label className="formLabelCenter mt-3">
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
