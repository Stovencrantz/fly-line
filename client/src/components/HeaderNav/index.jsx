import React, { useState, useEffect, useContext } from "react";
import {useHistory} from "react-router-dom";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
} from "@material-ui/core";
import {auth} from "../../firebase";
import MenuIcon from "@material-ui/icons/Menu";
import UserContext from "../../context/userContext";

export default function HeaderNav() {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
 
    appTitle: {
      flexGrow: 1,
      fontFamily: 'Condiment',
      fontSize: "3vmin"
    }
  }));
  const classes = useStyles();

  const { userContext, setUserContext } = useContext(UserContext);
  const [avatarImg, setAvatarImg] = useState("");
  const user = userContext.user;
  const history = useHistory();

  function handleSignOut() {
    auth.signOut()
    history.push("/");
  }

  useEffect(() => {
    console.log("Avatar data: ", user);

    setAvatarImg(user.photoURL);
  }, []);

  function avatarEx() {
    console.log("Avatar link: ", avatarImg);
  }

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography align="center" variant="h6" className={classes.appTitle}>
            FLY-LINE
          </Typography>
          <Button color="inherit" variant="contained" onClick={() => avatarEx()}>
            <Avatar
              alt="static image"
              src={
                avatarImg ||
                "https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png"
              }
            ></Avatar>
          </Button>
          <button
            className="w-full py-3 bg-red-600 mt-4 text-white"
            onClick={() => handleSignOut()}
          >
            Sign out
          </button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
