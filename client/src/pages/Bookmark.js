import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CardJourney from "../component/cardJourney";
import { API } from "../config/api";
import { AppContext } from "../context/AppContext";

function Bookmark() {
  const [state, dispatch] = useContext(AppContext);
  const [bookmarks, setBookmarks] = useState([]);
  const isChecked = true;
  const fetchbookmarks = async () => {
    try {
      const response = await API("/userbookmark");
      setBookmarks(response.data.data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("ini bookmarks", bookmarks);

  useEffect(() => {
    fetchbookmarks();
  }, [state.bookmarks]);

  return (
    <div className="md-12">
      <h1 className="textHeader mb-5">Bookmark</h1>
      <Row>
        {bookmarks.map((bookmark) => (
          <Col md={3} key={bookmark.id}>
            <CardJourney journey={bookmark.Journeys} isChecked={isChecked} isMine={false} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Bookmark;
