import { useHistory } from "react-router-dom";
import { Nav, Dropdown, Image, Navbar, Container, NavLink } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";

import logo from "../../assets/logo2.svg";
import imgprofile from "../../assets/profile.png";
import image1 from "../../assets/groupuser.svg";
import image2 from "../../assets/groupnewjourney.svg";
import image3 from "../../assets/groupbookmark.svg";
import image4 from "../../assets/grouplogout.svg";

import { API } from "../../config/api";
import { AppContext } from "../../context/AppContext";
function UserNav(props) {
  const router = useHistory();
  const [profile, setProfile] = useState({});
  const [state, dispatch] = useContext(AppContext);

  const goToProfile = () => router.push("/profile");
  const goToNewJourney = () => router.push("/newjourney");
  const gotoBookmark = () => router.push("/bookmark");
  const goToHome = () => router.push("/");

  useEffect(() => {
    const getUser = async () => {
      try {
        const getProfile = await API.get("/profile");
        setProfile(getProfile.data.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [state.user]);
  const path = "http://localhost:5000/uploads/";
  return (
    <>
      <Navbar
        style={{
          width: "100%",
          backgroundColor: "#F1F1F1",
          boxShadow: "0px 0px 0px 3px #ccc",
        }}
      >
        <Container>
          <Image src={logo} onClick={goToHome} alt="brand" />
          <Nav className="me-auto"></Nav>
          <Nav>
            <Dropdown as={Nav.Item} className="ml-3">
              <Dropdown.Toggle as={Nav.Link}>
                {profile.image ? (
                  <Image
                    src={path + profile.image}
                    alt="profile"
                    style={{
                      width: "50px",
                      height: "50px",
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
                      width: "50px",
                      height: "50px",
                      position: "relative",
                      transform: "translate(15px, -3px)",
                    }}
                  />
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu align="right" className="dropdown-menu">
                <Dropdown.Item onClick={goToProfile}>
                  <Image src={image1} alt="profile" className="img-icon mr-3" />
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={goToNewJourney}>
                  <Image src={image2} alt="profile" className="img-icon mr-3" />
                  New Journey
                </Dropdown.Item>
                <Dropdown.Item onClick={gotoBookmark}>
                  <Image src={image3} alt="profile" className="img-icon mr-3" />
                  Bookmark
                </Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item onClick={props.handleLogout}>
                  <Image src={image4} alt="logout" className="img-icon mr-3" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default UserNav;
