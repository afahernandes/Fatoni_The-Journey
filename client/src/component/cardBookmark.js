import React, { useContext, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { Path } from "../config/api";
const CardBookmark = ({...props}) => {
  const {id, Journeys,Users} = props.bookmark;
 const idJourney=Journeys?.id;
  const router = useHistory();
  
  const handlePushToDetail = (idJourney) => {
      router.push(`journey/${idJourney}`);
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

  const date=new Date(Journeys.createdAt)
                        
  let desc = Journeys.description.replace(/(<([^>]+)>)/gi, "").substring(0,120)+"...";
  return (
      <Row >
          <Col key={id} id={id} className="mb-4">
            <Card onClick={() => handlePushToDetail(Journeys.id)}>
            <label className="block-check">
              <Card.Img
                src={Path+Journeys.image}
                style={{ objectFit: "cover",height:"200px"}}
              />
                   <input 
                           type="checkbox"
                          id={id}
                         className="hidden-check"
                         checked={props.checked}
                     />
                      <span className="checkmark"></span>
                  </label>
              
              <Card.Body>
                <h5>{Journeys.title} </h5>
                <p style={{color:"#cecece",fontSize:14}}>
                 {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}, {Users.fullname}
                </p>
                <p> {desc} </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
     
  );
};

export default CardBookmark;