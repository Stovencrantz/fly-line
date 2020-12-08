import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import ProfilePage from "../../pages/ProfilePage";
import PasswordReset from "../PasswordReset";
import { auth, generateUserDocument } from "../../firebase";
import UserContext from "../../context/userContext";
import HeaderNav from "../../components/HeaderNav";
import FooterNav from "../../components/FooterNav";
import MapPage from "../../pages/MapPage";
import { Container } from "@material-ui/core";

export default function Application() {
  const { userContext, setUserContext } = useContext(UserContext);

  return (
    <>
      <Router>
        {userContext.user ? (
          <Container
            style={{
              minWidth: "100vw",
              minHeight: "100vh",
              paddingLeft: "0px",
              paddingRight: "0px",
            }}
          >
            <HeaderNav />
            <Switch>
              <Route path={["/", "/profile"]} component={ProfilePage} />
              <Route exact path ="/map" component={MapPage} />
            </Switch>
            <FooterNav />
          </Container>
        ) : (
          <Switch>
            <Route path={["/", "/signin"]} component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/passwordreset" component={PasswordReset} />
          </Switch>
        )}
      </Router>
    </>
  );
}
