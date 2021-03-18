import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
// import Link from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import { Modal, Button, List, ListItem, ListItemIcon } from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MapIcon from "@material-ui/icons/Map";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import AddBoxIcon from "@material-ui/icons/AddBox";
import PostAddIcon from "@material-ui/icons/PostAdd";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import RadioIcon from "@material-ui/icons/Radio";

import "./style.css";

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
    title: {
      flexGrow: 1,
    },
    listItemButton: {
      marginBottom: '2em',
      borderRadius: '50px',

      backgroundColor: "slategrey",
      '&:hover': {
        backgroundColor: 'darkgrey'
      },
      padding: '.75rem',
    },
    listItemIcon: {
      height: '4rem', 
      width: '4rem', 
    }
  }));

  const classes = useStyles();
  const [value, setValue] = useState("feed");
  const [modal, setModal] = useState(false);
  const handleModalToggle = () => {
    setModal(!modal);
  };
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
        style={{ width: "100vw", height: "100vh" }}
      >
        {/* Bring up 3 buttons in modal, which each choice will have its own path redirect */}
        <div
          style={{
            position: "relative",
            width: "fit-content",
            left: "70%",
            top: "45%",
          }}
        >
          <List component="nav" className={classes.list}>
            {/* Create Story */}

            <ListItem button className={classes.listItemButton}>
              <ListItemIcon>
                <MenuBookIcon className={classes.listItemIcon} />
              </ListItemIcon>
            </ListItem>
            {/* Log Catch */}

            <ListItem button className={classes.listItemButton}>
              <ListItemIcon>
                <RadioIcon className={classes.listItemIcon} />
              </ListItemIcon>
            </ListItem>
            {/* Add Post */}

            <ListItem button className={classes.listItemButton}
              component={Link}
              label="createPost"
              value="createPost"
              to="/createpost"
              onClick={() => handleModalToggle()}
            >
              <ListItemIcon>
                <PostAddIcon className={classes.listItemIcon}/>
              </ListItemIcon>
            </ListItem>
          </List>
        </div>
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
