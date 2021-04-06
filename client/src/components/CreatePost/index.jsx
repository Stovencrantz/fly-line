import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PostFormMap from "../PostFormMap";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import UploadButton from "../UploadButton";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  formLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
    marginBottom: "200px",
    height: "100vh",
  },
  form: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    marginBottom: "5%",
  },
  formControl: {
    margin: theme.spacing(2),
    width: 120,
  },
}));

export default function CreatePost() {
  const classes = useStyles();
  const [images, setImages] = useState("");
  const [fishSpecies, setFishSpecies] = useState("");
  const [fishWeight, setFishWeight] = useState("");
  const [fishWeightUnit, setFishWeightUnit] = useState("");
  const [fishLength, setFishLength] = useState("");
  const [fishLengthUnit, setFishLengthUnit] = useState("");
  const [state, setState] = useState({
    age: "",
    name: "hai",
  });

  useEffect(() => {
    console.log("image file props from uploadButton: ", images);
    console.log("Fish species: ", fishSpecies);
    console.log("Fish weight: ", fishWeight, " ", fishWeightUnit);
    console.log("Fish length: ", fishLength, " ", fishLengthUnit);
  }, [images, fishSpecies, fishWeight, fishLength, fishWeightUnit, fishLengthUnit]);

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

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
            value={fishSpecies}
            onChange={(e) => setFishSpecies(e.target.value)}
          />
        </div>

        <div>
          {" "}
          {/* Select photos of fish */}
          <UploadButton setImages={(files) => setImages(files)} />
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
            value={fishWeight}
            onChange={(e) => setFishWeight(e.target.value)}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">Unit</InputLabel>
            <Select
              native
              label="Unit"
              value={fishWeightUnit}
              onChange={(e) => setFishWeightUnit(e.target.value)}
            >
              <option aria-label="None" value="" />
              <option value={"lb"}>Pounds</option>
              <option value={"g"}>Grams</option>
            </Select>
          </FormControl>
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
            value={fishLength}
            onChange={(e) => setFishLength(e.target.value)}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">Unit</InputLabel>
            <Select
              native
              label="Unit"
              value={fishLengthUnit}
              onChange={(e) => setFishLengthUnit(e.target.value)}
            >
              <option aria-label="None" value="" />
              <option value={"in"}>Inches</option>
              <option value={"cm"}>Centimeters</option>
            </Select>
          </FormControl>
        </div>

        {/* Location on map */}
        <PostFormMap />
      </form>
    </div>
  );
}
