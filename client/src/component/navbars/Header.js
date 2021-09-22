import React, { useContext } from "react";
import GuestNav from "./GuestNav";
import UserNav from "./UserNav";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function Header() {
  const router = useHistory();
  const [state, dispatch] = useContext(AppContext);

  function handleLogout() {
    dispatch({
      type: "LOGOUT",
    });
    router.push("/");
  }

  return (
    <>
      {state.isLogin ? <UserNav handleLogout={handleLogout} /> : <GuestNav />}
    </>
  );
}

export default Header;
