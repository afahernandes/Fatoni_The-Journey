import { useState } from "react";
import { Button, Container, Nav, Navbar, NavLink } from "react-bootstrap";
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
        <div className="containers">
          <img
            src={logo}
            onClick={() => router.push("/")}
            style={{ padding: "4px" }}
            alt="brand"
          />
          <div>
            <Button onClick={handleShow} className="button1">
              Login
            </Button>
            <Button onClick={handleShowRegis} className="button1">
              Register
            </Button>
          </div>
        </div>
      </div>
      <LoginModal
        show={show}
        handleClose={handleClose}
        regis={handleShowRegis}
        setData={props.setData}
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
