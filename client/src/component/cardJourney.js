import React, { useContext, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import Avatar from "../assets/imagenull.jpg"
import { AppContext } from "../context/AppContext";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import { Path } from "../config/api";
const CardJourney = ({...props}) => {
  const {id, title, description, image, createdAt} = props.journey;
  const router = useHistory();
  const [state, dispatch] = useContext(AppContext);

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
      console.log(id);
      router.push(`journey/${id}`);
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
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date=new Date(createdAt)
                        
  let desc = description.replace(/(<([^>]+)>)/gi, "").substring(0,120)+"...";
  return (
      <Row >
          <Col key={id} id={id} className="mb-4">
            <Card onClick={() => handlePushToDetail(id)}>
            <label className="block-check">
              <Card.Img
                src={Path+image}
                style={{ objectFit: "cover",height:"200px"}}
              />
                   <input 
                           type="checkbox"
                          id={id}
                         className="hidden-check"
                          onChange={props.onChange}
                         checked={props.checked}
                     />
                      <span className="checkmark"></span>
                  </label>
              
              <Card.Body>
                <h5>{title} </h5>
                <p style={{color:"#cecece",fontSize:14}}>
                 {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}, {props.journey.Users?.fullname}
                </p>
                <p> {desc} </p>
              </Card.Body>
            </Card>
          </Col>
          <LoginModal
        show={show}
        handleClose={handleClose}
        regis={handleShowRegis}
      />
      <RegisterModal
        show={showRegis}
        handleClose={handleCloseRegis}
        login={handleShow}
      />
        </Row>
     
  );
};

export default CardJourney;