import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PostFormMap from "../PostFormMap";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((Theme) => ({
  formLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%"
  },
  form: {
    width: "100%",
    height: "100%",
    textAlign: "center",
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
          <input type="file" id="file-selector multiple" />
        </div>
        <div>
          {" "}
          <Input type="file" />
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
            defaultValue="success"
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
