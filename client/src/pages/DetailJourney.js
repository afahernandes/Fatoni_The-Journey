import { useEffect, useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { API, Path } from "../config/api";
import ListComment from "../component/listComment";

import draftToHtml from "draftjs-to-html";
import Button from "@restart/ui/esm/Button";
function DetailJourney() {
  const { id } = useParams();
  const [journeys, setJourneys] = useState([]);

  //create state for data comments
  const [comments, setComments] = useState([]);

  //create useState for comment
  const [comment, setComment] = useState("");

  const fetchComment = async () => {
    try {
      const response = await API("/comment/" + id);
      console.log(response);
      setComments(response.data.data.Comments);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchJourneys = async () => {
    try {
      const response = await API("/journey/" + id);
      setJourneys({
        ...response.data.data.journeys,
        description: draftToHtml(JSON.parse(response.data.data.journeys.description)),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJourneys();
    fetchComment();
  }, []);

  //add handle submit here
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { journeyId: id, comment };
      await API.post("/comment", data);
    } catch (error) {
      console.log(error);
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

  const date = new Date(journeys.createdAt);
  function createMarkup(e) {
    return { __html: e };
  }
  let desc = journeys.description;

  return (
    <Container className="px-5 mb-5">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3 className="textHeader">{journeys.title}</h3>
        <h5 className="textHeader">{journeys.Users?.fullname}</h5>
      </div>
      <p style={{ color: "blue" }}>
        {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
      </p>

      <center>
        <img
          src={Path + journeys.image}
          alt={"avatar"}
          style={{ width: "100%", height: "550px" }}
          className="img-product  my-3"
        />
      </center>
      <div dangerouslySetInnerHTML={createMarkup(desc)} />
      <br />

      {/* Create form comment Here */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <h5>Add a comment</h5>
          <Form.Control as="textarea" onChange={(e) => setComment(e.target.value)} rows={4} />
        </Form.Group>
        <div className="d-flex flex-row-reverse">
          <Button className="btn buttonComment" type="submit">
            Add Comment
          </Button>
        </div>
      </Form>

      {/* Create List Comment Here and send props */}
      <ListComment comments={comments} />
    </Container>
  );
}

export default DetailJourney;
