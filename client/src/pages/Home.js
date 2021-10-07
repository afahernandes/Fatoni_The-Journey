import { useContext, useEffect, useState } from "react";
import { Col, Form, Row, Button, InputGroup } from "react-bootstrap";
import CardJourney from "../component/cardJourney";
import { API } from "../config/api";
import { AppContext } from "../context/AppContext";
function Home() {
  const [state, dispatch] = useContext(AppContext);
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
  }, [dispatch]);

  useEffect(() => {
    setFilteredJourney(journeys.filter((journey) => journey.title.toLowerCase().includes(search.toLowerCase())));
  }, [search, journeys]);

  return (
    <div>
      <h1 className="textHeader">Journey</h1>
      <div id="searchForm" className="mt-5 mb-5 mx-5">
        <InputGroup>
          <Form.Control
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            className="formInputSearch"
            placeholder="Search"
          />
          <Button className="button1" type="submit">
            Search
          </Button>
        </InputGroup>
      </div>
      <Row>
        {filteredJourneys.map((journey) => {
          let isChecked = false;
          let isMine = false;

          state.bookmarks.length > 0
            ? state.bookmarks.map((id) => {
                if (journey.id === id) {
                  isChecked = true;
                }
              })
            : (isChecked = false);

          if (journey.Users.id === state.user.id) {
            isMine = true;
          }

          return (
            <Col md={3} key={journey.id}>
              <CardJourney journey={journey} isChecked={isChecked} isMine={false} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Home;
