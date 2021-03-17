import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import ProfilePage from "../../pages/ProfilePage";
import PasswordReset from "../PasswordReset";
import { auth, generateUserDocument } from "../../firebase";
import UserContext from "../../context/userContext";
import HeaderNav from "../HeaderNav";
import FooterNav from "../FooterNav";
import MapPage from "../../pages/MapPage";
import CreatePost from "../CreatePost"
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
              <Route exact path={["/", "/feed"]} component={ProfilePage} />
              <Route exact path ="/waters" component={MapPage} />
              <Route exact path ="/createpost" component={CreatePost} />
            </Switch>
            <FooterNav />
          </Container>
        ) : (
          <Switch>
            <Route exact path={["/", "/signin"]} component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/passwordreset" component={PasswordReset} />
          </Switch>
        )}
      </Router>
    </>
  );
}
