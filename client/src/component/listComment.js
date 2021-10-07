import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import InitialsAvatar from "react-initials-avatar";
import "react-initials-avatar/lib/ReactInitialsAvatar.css";

const ListComment = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, key) => {
        return (
          <Row md={12}>
            <Col>
              <InitialsAvatar name={comment.Users.fullname} />
            </Col>
            <Col md={11}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5>{comment.Users.fullname}</h5>
                <p>{comment.createdAt}</p>
              </div>
              <p>{comment.comment}</p>
            </Col>
            <hr />
          </Row>
        );
      })}
    </div>
  );
};

export default ListComment;
