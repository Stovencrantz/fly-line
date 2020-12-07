import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Link from "@material-ui/core/Link";
import FolderIcon from "@material-ui/icons/Folder";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MapIcon from "@material-ui/icons/Map";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";

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
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      edge="start"
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      {/* <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} /> */}
      <Link href="/profile">
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<DynamicFeedIcon />}
        />
      </Link>
      <Link href="/map">
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={<MapIcon />}
        />
      </Link>
      <BottomNavigationAction
        label="Folder"
        value="folder"
        icon={<FolderIcon />}
      />
    </BottomNavigation>
  );
}
