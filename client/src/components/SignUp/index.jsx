import React, { useState } from "react";
import { Link } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {auth, signInWithGoogle, generateUserDocument} from "../../firebase";

export default function SignUp() {
    function Copyright() {
        return (
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
      
      const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(3),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));

  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  // const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      console.log("result of create user with email and password: ", result)
      console.log("Display namne: ", displayName)
      const user = auth.currentUser;
      user.updateProfile({
        displayName: displayName
      })
      .then(() => {
        generateUserDocument(result)
      })
      .catch(error => console.log(error))
    })
    .catch((error) => {
            // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    })


    setEmail("");
    setPassword("");
    setDisplayName("");
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
    console.log("Email: ", email);
    console.log("password: ", password);
    console.log("displayName: ", displayName);
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
              type="text"
                autoComplete="fname"
                name="displayName"
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="Display Name"
                autoFocus
                value={displayName}
                onChange={(event) => onChangeHandler(event)}
              />
            </Grid>

            {/* Email Form */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="email"
                required
                fullWidth
                id="userEmail"
                label="Email Address"
                placeholder="E.g: faruq123@gmail.com"
                name="userEmail"
                value={email}
                // autoComplete="email"
                onChange={(event) => onChangeHandler(event)}

              />
            </Grid>
            {/* Password form */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="userPassword"
                label="Password"
                type="password"
                id="userPassword"
                value={password}
                // autoComplete="current-password"
                onChange={(event) => onChangeHandler(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => {
                createUserWithEmailAndPasswordHandler(event, email, password);
              }}
          >
            Sign Up
          </Button>

          <p style={{textAlign: "center"}}>or</p>
        <Button
         fullWidth
          variant="contained"
          color="secondary"
          className="MuiButton-fullWidth py-2 text-white"
          onClick={() => signInWithGoogle()}
        >
          Sign In with Google
        </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}