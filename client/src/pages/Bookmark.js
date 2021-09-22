import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import CardBookmark from "../component/cardBookmark";
import { API } from "../config/api";

function Bookmark() {
  const [bookmarks, setBookmarks] = useState([]);

  const fetchbookmarks = async () => {
    try {
      const response = await API("/userbookmark");
      setBookmarks(response.data.data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchbookmarks();
  }, []);

  return (
    <div>
      <h1 className="textHeader">Bookmark</h1>
      <Row>
        {bookmarks.map((bookmark) => (
          <Col md={3}>
            <CardBookmark
              bookmark={bookmark}
              key={bookmark.id}
              checked={true}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Bookmark;
