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
import Navbar from "./components/Navbar";
import Test from "./components/Test";

export default function App() {
  return (
    <div>
      <Navbar />
      <Container flex>
        <Test />
      </Container>
    </div>
  );
}
