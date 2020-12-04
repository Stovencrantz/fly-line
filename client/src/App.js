import React from "react";
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
import Application from "./components/Application";
import UserProvider from "./providers/UserProvider";

export default function App() {
  return (
    <div>
      <UserProvider>
      <HeaderNav />
      <Container flex>
        {/* <Test /> */}
        <Application />
      </Container>
      <FooterNav />
      </UserProvider>
    </div>
  );
}
