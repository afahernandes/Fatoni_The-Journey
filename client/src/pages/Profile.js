import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button, Image } from "react-bootstrap";
import { useHistory } from "react-router";
import CardJourney from "../component/cardJourney";
import { API, Path } from "../config/api";
import imgprofile from "../assets/profile.png";

function Profile() {
  const router = useHistory();
  const [profile, setProfile] = useState({});
  const [journeys, setJourneys] = useState([]);
  const [wait, setWait] = useState(false);

  const getProfile = async () => {
    try {
      const getProfile = await API.get("/profile");
      const getJourneys = await API.get("/userjourney");
      console.log("profile",getJourneys)
      setProfile(getProfile.data.data.users);
      setJourneys(getJourneys.data.data.journeys);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

 

  return (
    <div>
      <h1 className="textHeader">Profile</h1>
      <div>
        <center>
        {profile.image ? (
            <Image
              src={Path+profile.image}
              alt="profile"
              style={{
                width: "150px",
                height: "150px",
                position: "relative",
                transform: "translate(15px, -3px)",
              }}
              className="img-avatar"
            />
          ) : (
            <Image
              src={imgprofile}
              alt="profile"
              className="img-avatar"
              style={{
                width: "150px",
                height: "150px",
                position: "relative",
                transform: "translate(15px, -3px)",
              }}
            />
          )}
           <h5>{profile.fullname}</h5>
           <p>{profile.email}</p>
           {/* <Button className="button1">
              Edit Profile 
            </Button> */}

        </center>
      </div>
      <Row style={{marginTop:"50px"}}>
        {journeys.map((journey) => (
          <Col md={3}>
            <CardJourney
              journey={journey}
              key={journey.id}
              checked={true}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Profile;
