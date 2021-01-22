import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
// import Link from "@material-ui/core/Link";
import {Link} from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import FolderIcon from "@material-ui/icons/Folder";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MapIcon from "@material-ui/icons/Map";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import AddBoxIcon from '@material-ui/icons/AddBox';

import "./style.css"

export default function FooterNav() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: "rgb(63 81 181)",
      width: "100vw",
      position: "absolute",
      bottom: "0px",
      textAlign: "center",
    },

    // menuButton: {
    //   marginRight: theme.spacing(2),
    // },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();
  const [value, setValue] = useState("feed");
  const [modal, setModal] = useState(false);
  const handleModalToggle = () => {
    setModal(!modal);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
        <Modal
        open={modal}
        onClose={() => handleModalToggle()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        keepMounted
      >
          <p>Testing modal</p>
      </Modal>
    <BottomNavigation
      edge="start"
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
        <BottomNavigationAction
          component={Link}
          label="Feed"
          value="feed"
          icon={<DynamicFeedIcon />}
          to="/feed"
        />
      
        <BottomNavigationAction
          label="Post"
          value="post"
          icon={<AddBoxIcon />}
          onClick={handleModalToggle}
        />

        <BottomNavigationAction
          component={Link}
          label="Waters"
          value="waters"
          icon={<MapIcon />} 
          to="/waters"
          />
    </BottomNavigation>
    </div>
  );
}
