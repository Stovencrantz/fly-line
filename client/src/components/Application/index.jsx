import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import ProfilePage from "../../pages/ProfilePage";
import PasswordReset from "../PasswordReset";
import UserContext from "../../providers/UserProvider";

export default function Application() {

  const user = useContext(UserContext);
  console.log("User: ", user)
  return user ? (
    <ProfilePage />
  ) : (
    <Router>
      <Switch>
        <Route exact path={["/", "/signin"]} component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/passwordreset" component={PasswordReset} />
      </Switch>
    </Router>
  );
}
