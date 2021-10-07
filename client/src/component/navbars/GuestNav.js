import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import RegisterModal from "../modals/RegisterModal";
import logo from "../../assets/logo.svg";
import LoginModal from "../modals/LoginModal";
import { useHistory } from "react-router";
function GuestNav(props) {
  const router = useHistory();
  const [show, setShow] = useState(false);
  const [showRegis, setShowRegis] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowRegis = () => setShowRegis(true);
  const handleCloseRegis = () => setShowRegis(false);

  return (
    <>
      <div className="nav-headers">
        <Container className="navbars">
          <img
            src={logo}
            onClick={() => router.push("/")}
            style={{ padding: "4px" }}
            alt="brand"
          />
          <div>
            <Button onClick={handleShow} className="button2">
              Login
            </Button>
            <Button onClick={handleShowRegis} className="button1">
              Register
            </Button>
          </div>
        </Container>
        <Container  >
          <h1 className="textH1 mt-5">The Journey </h1>
          <h1 className="textH1"> you never dreamed of.</h1>
          <p className=" textSubtittle mt-5">
            We made a tool so you can easily keep & share your travel memories.<br/>
            But there is a lot more
          </p>
        </Container>
      </div>
      <LoginModal
        show={show}
        handleClose={handleClose}
        regis={handleShowRegis}
      />
      <RegisterModal
        show={showRegis}
        handleClose={handleCloseRegis}
        login={handleShow}
      />
    </>
  );
}

export default GuestNav;
