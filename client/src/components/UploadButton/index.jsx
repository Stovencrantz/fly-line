import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  fishImageContainer: {
    width: "30%",
    height: "60%",
    border: "1px solid #ddd",
    borderRadius: "4px",  
    padding: "5px", 
  }
}));

export default function UploadButtons() {
  const classes = useStyles();
  const [fileLink, setFileLink] = useState("");
//   const input = document.querySelector('.contained-button-file');
//   input.addEventListener('change', console.log(input))
function extractFilename(path) {
    if (path.substr(0, 12) == "C:\\fakepath\\")
      return path.substr(12); // modern browser
    var x;
    x = path.lastIndexOf('/');
    if (x >= 0) // Unix-based path
      return path.substr(x+1);
    x = path.lastIndexOf('\\');
    if (x >= 0) // Windows-based path
      return path.substr(x+1);
    return path; // just the filename
  }

function getInputValue() {
    let input = document.querySelector('#contained-button-file').files;
    console.log(input)
    setFileLink(URL.createObjectURL(input[0]))
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
      <br/>
      <div >
        <img className={classes.fishImageContainer} src={fileLink ? fileLink : "https://via.placeholder.com/150"} alt="file from users device" />
      </div>
    </div>
  );
}