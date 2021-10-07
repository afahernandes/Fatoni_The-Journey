import React, { useContext, useState } from "react";
import { Card, Col, Row, Button, ButtonGroup } from "react-bootstrap";
import { useHistory } from "react-router";
import { AppContext } from "../context/AppContext";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import { API, Path } from "../config/api";
import draftToHtml from "draftjs-to-html";
const CardJourney = ({ journey, isChecked, isMine }) => {
  const router = useHistory();
  //get Props
  const { id, title, description, image, createdAt } = journey;
  console.log("Ini adalah Checkked", isChecked);

  //get Context
  const [state, dispatch] = useContext(AppContext);

  //login
  const [show, setShow] = useState(false);
  const [showRegis, setShowRegis] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowRegis = () => setShowRegis(true);
  const handleCloseRegis = () => setShowRegis(false);

  const handlePushToDetail = (id) => {
    if (!state.isLogin) {
      return handleShow();
    } else {
      router.push(`journey/${id}`);
    }
  };

  const addBookmark = async () => {
    try {
      const data = { idJourney: id };
      const response = await API.post("/bookmark", data);
      console.log(response);
      dispatch({
        type: "ADD_BOOKMARK",
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBookmark = async () => {
    try {
      const response = await API.delete(`/bookmark/${id}`);
      console.log(response);
      dispatch({
        type: "DELETE_BOOKMARK",
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJourney = async () => {
    try {
      const response = await API.delete(`/journey/${id}`);
      console.log(response);
      dispatch({
        type: "UPDATE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (!state.isLogin) {
      return handleShow();
    } else {
      isChecked ? deleteBookmark() : addBookmark();
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(createdAt);
  let descriptions = draftToHtml(JSON.parse(description));
  let desc = descriptions.replace(/(<([^>]+)>)/gi, "").substring(0, 120) + "...";

  return (
    <Row>
      <Col key={id}>
        {!isMine ? (
          <Card className="card-list">
            <label className="blockcheck">
              <input type="checkbox" checked={isChecked} onChange={handleChange} />
              <span className="checkmark"></span>
            </label>

            <Card.Img
              onClick={() => handlePushToDetail(id)}
              src={Path + image}
              style={{ objectFit: "cover", height: "200px" }}
            />
            <Card.Body onClick={() => handlePushToDetail(id)}>
              <h5 style={{ fontWeight: "bold" }}>{title}</h5>
              <p style={{ color: "#BFBFBF", fontSize: 14 }}>
                {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}, {journey.Users?.fullname}
              </p>
              <p style={{ color: "#6C6C6C" }}> {desc} </p>
            </Card.Body>
          </Card>
        ) : (
          <Card className="card-mine">
            <Card.Img
              onClick={() => handlePushToDetail(id)}
              src={Path + image}
              style={{ objectFit: "cover", height: "200px" }}
            />
            <Card.Body onClick={() => handlePushToDetail(id)}>
              <h5 style={{ fontWeight: "bold" }}>{title}</h5>
              <p style={{ color: "#BFBFBF", fontSize: 14 }}>
                {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}, {journey.Users?.fullname}
              </p>
              <p style={{ color: "#6C6C6C", marginBottom: "30px" }}> {desc} </p>
            </Card.Body>
            <ButtonGroup className="editbutton">
              <Button
                style={{ width: "100px", backgroundColor: "#2e86de" }}
                onClick={() => router.push(`updatejourney/${id}`)}
              >
                Update
              </Button>
              <Button style={{ width: "100px", backgroundColor: "#2e86de" }} onClick={deleteJourney}>
                Delete
              </Button>
            </ButtonGroup>
          </Card>
        )}
      </Col>
      <LoginModal show={show} handleClose={handleClose} regis={handleShowRegis} />
      <RegisterModal show={showRegis} handleClose={handleCloseRegis} login={handleShow} />
    </Row>
  );
};

export default CardJourney;
