import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Carousel from "react-material-ui-carousel";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  carouselStyle: {
    margin: "10px auto 0px auto",
    // width: "40vw",
    width: "95%",
    maxWidth: "600px"
  },
  fishImageContainer: {
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "5px",
  },

}));

export default function UploadButtons(props) {
  const classes = useStyles();
  const [imageFiles, setImageFiles] = useState("")
  //   const input = document.querySelector('.contained-button-file');
  //   input.addEventListener('change', console.log(input))
  function extractFilename(path) {
    if (path.substr(0, 12) == "C:\\fakepath\\") return path.substr(12); // modern browser
    var x;
    x = path.lastIndexOf("/");
    if (x >= 0)
      // Unix-based path
      return path.substr(x + 1);
    x = path.lastIndexOf("\\");
    if (x >= 0)
      // Windows-based path
      return path.substr(x + 1);
    return path; // just the filename
  }

  function getInputValue() {
    let input = document.querySelector("#contained-button-file").files;
    let entries = Object.entries(input);
    let entriesArray = [];
    entries.forEach((entry) => {
      entriesArray.push(URL.createObjectURL(entry[1]));
    });
    setImageFiles(entriesArray);
    // set our prop passed in from parent component CreatePost to the value of our entries array. This will pass the image links from our UploadButton component back up to the parent.
    props.setImages(entriesArray);

  }

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={() => getInputValue()}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
          <PhotoCamera />
        </Button>
      </label>
      <br />
      {/* Conditional render statement, prior to the user selecting any images, render a placeholder image. Once the user selects images to upload, render those images into a carousel of defined dimensions */}
      {imageFiles ? (
        <Carousel 
        className={classes.carouselStyle}
        indicators={true}
        navButtonsAlwaysInvisible={true}
        autoPlay={false}
        navButtonsProps={{
          style: {
            backgroundColor: 'rgba(63, 81, 181, 0.5)'
          }
        }}
        indicatorIconButtonProps={{
          style: {
            color: 'rgba(63, 81, 181, 0.5)'
          }
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: 'rgba(63, 81, 181, 1)'
          }
        }}
        >
          {imageFiles.map((item, i) => {
            return (
              <img
                className={classes.fishImageContainer}
                src={item}
                alt="file from users device"
                key={i}
                item={item}
              />
            );
          })}
        </Carousel>
      ) : (
        <img
          src={"https://via.placeholder.com/150"}
          alt="file from users device"
        />
      )}
    </div>
  );
}
