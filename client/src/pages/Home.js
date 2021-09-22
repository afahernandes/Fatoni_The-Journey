import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import CardJourney from "../component/cardJourney";
import { API } from "../config/api";

function Home() {
  let [journeys, setJourneys] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredJourneys, setFilteredJourney] = useState([]);

 
  const fetchJourneys = async () => {
    try {
      const response = await API("/journeys");
      setJourneys(response.data.data.journeys);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchJourneys();
  }, []);

  useEffect(() => {
    setFilteredJourney(
      journeys.filter((journey) =>
      journey.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search,journeys]);
  return (
    <div>
      <h1 className="textHeader">Journey</h1>
      <div className="search-container" >
        <Form.Group  
            className="formInputSearch" controlId="search">
          <Form.Control
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            placeholder="Search"
          />
          <Button className="button1" style={{ width: "180", height:"90"}} type="submit">
          Search
        </Button>
        </Form.Group>
        
      </div>
      <Row>
        {filteredJourneys.map((journey) => (
          <Col md={3}>
            <CardJourney
              journey={journey}
              key={journey.id}
              checked={false}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
