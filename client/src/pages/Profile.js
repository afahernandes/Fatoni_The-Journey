import { useContext, useEffect, useState } from "react";
import { Col, Row, Image, Container } from "react-bootstrap";
import CardJourney from "../component/cardJourney";
import { API, Path } from "../config/api";
import imgprofile from "../assets/profile.png";
import Button from "@restart/ui/esm/Button";
import UpdateProfile from "../component/modals/UpdateProfileModal";
import { AppContext } from "../context/AppContext";
import { useHistory } from "react-router";

function Profile() {
  const history = useHistory();
  const [profile, setProfile] = useState({});
  const [state, dispatch] = useContext(AppContext);
  const [journeys, setJourneys] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getProfile = async () => {
    try {
      const getProfile = await API.get("/profile");
      const getJourneys = await API.get("/userjourney");
      console.log("profile", getJourneys);
      setProfile(getProfile.data.data.users);
      setJourneys(getJourneys.data.data.journeys);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [state.user]);

  useEffect(() => {
    getProfile();
  }, [state.update]);

  return (
    <Container>
      <h1 className="textHeader">Profile</h1>
      <Row>
        <center>
          {profile.image ? (
            <Image
              src={Path + profile.image}
              alt="profile"
              className="img-avatar"
              style={{
                width: "150px",
                height: "150px",
              }}
            />
          ) : (
            <Image
              src={imgprofile}
              alt="profile"
              className="img-avatar"
              style={{
                width: "150px",
                height: "150px",
              }}
            />
          )}
          <h4 className="mt-3">{profile.fullname}</h4>
          <p>{profile.email}</p>
          <Button className="btn button1" onClick={handleShow}>
            Edit Profile
          </Button>
        </center>
      </Row>
      <Row className="scroll-item2" style={{ marginTop: "50px" }}>
        {journeys.map((journey) => (
          <Col md={3} key={journey.id}>
            <CardJourney journey={journey} isChecked={false} isMine={true} />
          </Col>
        ))}
      </Row>
      <UpdateProfile size="lg" show={show} handleClose={handleClose} id="example-modal-sizes-title-lg" />
    </Container>
  );
}

export default Profile;
