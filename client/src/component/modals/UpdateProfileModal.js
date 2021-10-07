import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Modal, Col, Row, Container, Image } from "react-bootstrap";
import { API, Path } from "../../config/api";
import Swal from "sweetalert2";
import attach from "../../assets/Vectorattach2.svg";
import imgProfile from "../../assets/profile.png";
import { useHistory } from "react-router";
import { AppContext } from "../../context/AppContext";

function UpdateProfile(props) {
  const history = useHistory();
  const [state, dispatch] = useContext(AppContext);
  const { handleClose, show } = props;
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    phone: "",
    address: "",
    image: "",
  });

  const getUser = async () => {
    try {
      const getProfile = await API.get("/profile");
      console.log("profiles", getProfile);
      setForm({
        ...form,
        fullname: getProfile.data.data.users.fullname,
        email: getProfile.data.data.users.email,
        phone: getProfile.data.data.users.phone,
        address: getProfile.data.data.users.address,
        image: getProfile.data.data.users.image,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("fullname", form.fullname);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("address", form.address);
      formData.set("image", preview);

      const response = await API.patch("/user", formData, config);
      console.log(response);
      let payload = response.data.user.users;
      payload.token = localStorage.token;
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(e) {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <center>
              <h2 className="my-3">
                <b>Update profile</b>
              </h2>
            </center>
            <Container>
              <Row>
                <Col xs={3} md={3}>
                  {preview && preview !== null ? (
                    <Image
                      src={URL.createObjectURL(preview)}
                      alt={preview}
                      width={"100%"}
                      height="200px"
                      className="mt-2"
                    />
                  ) : form.image ? (
                    <Image src={Path + form.image} alt={form.fullName} width={"100%"} height="200px" className="mt-2" />
                  ) : (
                    <Image src={imgProfile} alt={imgProfile} width={"100%"} height="200px" className="mt-2" />
                  )}
                  <Form.Group className="formGroup" controlId="ImageUpload">
                    <Form.Label
                      className=" formInput2 d-flex justify-content-between"
                      style={{ backgroundColor: "#4482C3" }}
                    >
                      <span style={{ color: "#fff" }}>Upload File</span>
                      <Form.Control
                        name="image"
                        onChange={(e) => {
                          setPreview(e.target.files[0]);
                          // setImage(e.target.files[0].name);
                        }}
                        type="file"
                        hidden
                      />
                      <Image src={attach} style={{ width: "14px" }} />
                    </Form.Label>
                  </Form.Group>
                </Col>
                <Col xs={4} md={4}>
                  <Form.Group className="formGroup" controlId="formBasicFullname">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      className="formInput"
                      onChange={(e) => handleChange(e)}
                      value={form.fullname}
                      type="text"
                      name="fullname"
                    />
                  </Form.Group>

                  <Form.Group className="formGroup" controlId="formBasicEmail">
                    <Form.Label className="fromLabel">Email</Form.Label>
                    <Form.Control
                      className="formInput"
                      onChange={(e) => handleChange(e)}
                      value={form.email}
                      type="email"
                      name="email"
                    />
                  </Form.Group>
                  <Form.Group className="formGroup" controlId="formBasicPhone">
                    <Form.Label className="fromLabel">Phone</Form.Label>
                    <Form.Control
                      className="formInput"
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="phone"
                      value={form.phone}
                    />
                  </Form.Group>
                </Col>
                <Col xs={5} md={5}>
                  <Form.Group className="formGroup" controlId="formBasicAddress">
                    <Form.Label className="fromLabel">Address</Form.Label>
                    <Form.Control
                      className="formInput py-3"
                      onChange={(e) => handleChange(e)}
                      as="textarea"
                      rows={4}
                      value={form.address}
                      name="address"
                    />
                  </Form.Group>
                  <Button className="button1  mt-4" style={{ width: "100%", fontWeight: "bold" }} type="submit">
                    Update Profile
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateProfile;
