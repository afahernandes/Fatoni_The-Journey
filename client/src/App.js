import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./component/navbars/Header";
import "./styles/styles.css";

import { Container, Row } from "react-bootstrap";

import PrivateRoute from "./component/routes/PrivateRoute";
import { API, setAuthToken } from "./config/api";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { AppContext } from "./context/AppContext";
import DetailJourney from "./pages/DetailJourney";
import Profile from "./pages/Profile";
import NewJourney from "./pages/NewJourney";
import Bookmark from "./pages/Bookmark";


// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}


function App() {
  const [state, dispatch] = useContext(AppContext);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, [state]);

  

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await API.get("/check-auth");
         if (response.status === 404) {
          return dispatch({
            type: "AUTH_ERROR",
          });
        }
        let payload = response.data.data.user;
        payload.token = localStorage.token;
  
        dispatch({
          type: "USER_SUCCESS",
          payload,
        });
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, []);

  return (
    <Router>
      <div style={{backgroundColor:"#E5E5E5"}}>
        <Header />
        <Container>
          <Row className="justify-content-md-center">
            <Switch>
              <Route path="/" exact component={Home} />
              <PrivateRoute path="/profile" exact component={Profile} />
              <PrivateRoute path="/newjourney" exact component={NewJourney} />
              <PrivateRoute path="/bookmark" exact component={Bookmark} />
              <PrivateRoute
                path="/journey/:id"
                exact
                component={DetailJourney}
              /> 
              <Route component={NotFound} />
            </Switch>
          </Row>
        </Container>
      </div>
    </Router>
  );
}
export default App;
