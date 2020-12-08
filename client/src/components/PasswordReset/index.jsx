import React, { useState } from "react";
import { Button, Link, Input, TextField, Typography, makeStyles, Container } from '@material-ui/core';
import {auth} from "../../firebase";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };
  const sendResetEmail = (event) => {
    event.preventDefault();
    console.log("Sending reset email to: ", email);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Email sent");
        setEmailHasBeenSent(true);
        setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
      })
      .catch((error) => {
        console.log(error)
        // setError("Error resetting password");
      })
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    appTitle: {
      fontFamily: 'Condiment',
      fontSize: "5vmin"
    },
    successMsg: {
      color: "green"
    }
  }));

const classes = useStyles();


  return (

    <Container component="main" maxWidth="xs">
    <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.appTitle}>
          FLY-LINE
        </Typography>
      <Typography component="h1" variant="h5" >
        Reset your Password
      </Typography>
      <div className="border border-blue-300 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        <form action="">
          {emailHasBeenSent && (
            <Typography className={classes.successMsg}>
              An email has been sent to you!
            </Typography>
          )}
          {error !== null && (
            <div className="py-3 bg-red-600 w-full text-white text-center mb-3">
              {error}
            </div>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userEmail"
            label="Email Address"
            name="userEmail"
            placeholder="E.g: faruq123@gmail.com"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => onChangeHandler(event)}
          />

          <Button variant="contained" 
          type="submit"
          fullWidth
          color="primary"
          className="py-3"
          onClick={(event) => sendResetEmail(event)}>
            Send me a reset link
          </Button>
        </form>
        <Link
          href="/"
        >
          <Typography align="center">
             &larr; back to sign in page

          </Typography>
        </Link>
      </div>
    </div>

    </Container>
  );
}
