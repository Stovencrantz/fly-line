import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HeaderNav from "./components/HeaderNav";
import FooterNav from "./components/FooterNav";
import Test from "./components/Test";
// import Application from "./components/Application";
import UserContext from "./context/userContext";
import { auth, generateUserDocument } from "./firebase";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ProfilePage from "./pages/ProfilePage";
import PasswordReset from "./components/PasswordReset";

export default function App() {
  const [userContext, setUserContext] = useState({ user: null });
  console.log("User context on mount: ", userContext)

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      console.log("UserAuth: ", userAuth);
      generateUserDocument(userAuth)
      .then((user) => {
        console.log("User data from auth: ", user);
        setUserContext({ user: user})
      })
    });
  }, []);

  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      <div className="App">
        <HeaderNav />
        <Container flex>
          {/* <Application /> */}
          {userContext.user  ? (
            <ProfilePage />
          ) : (
            <Router>
              <Switch>
                <Route exact path={["/", "/signin"]} component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route exact path="/passwordreset" component={PasswordReset} />
              </Switch>
            </Router>
          )}
        </Container>
        <FooterNav />
      </div>
    </UserContext.Provider>
  );
}
