import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PostFormMap from "../PostFormMap";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import UploadButton from "../UploadButton";

const useStyles = makeStyles((Theme) => ({
  formLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2%",
    marginBottom: "200px",
    height: "100vh"
  },
  form: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    marginBottom: "5%"
  },
}));

export default function CreatePost() {
  const classes = useStyles();

  return (
    <div className={classes.formLayout}>
      <form className={classes.form}>
        <div>
          {/* Add fish species */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            label="Fish Species"
            placeholder="Largemouth Bass"
          />
        </div>

        <div>
          {" "}
          {/* Select photos of fish */}
            <UploadButton />
        </div>
        <div>
          {" "}
          {/* Fish Weight & Length */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            label="Fish Weight"
            placeholder="2 lbs"
          />
        </div>

        <div>
          {" "}
          {/* Gear / Bait */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            label="Fish Length"
            placeholder="15 inches"
          />
        </div>

        {/* Location on map */}
          <PostFormMap />

      </form>

    </div>
  );
}
