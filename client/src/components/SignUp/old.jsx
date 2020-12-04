import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormGroup, Button, FormControl, Input, InputLabel } from "@material-ui/core";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <FormGroup>
        <FormControl fullWidth>
          <div>
            <InputLabel htmlFor="displayName" className="block">
              Display Name:
            </InputLabel>
            <Input
              type="text"
              className="my-1 p-1 mui "
              name="displayName"
              value={displayName}
              placeholder="E.g: Faruq"
              id="displayName"
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
          <div>
            <InputLabel htmlFor="userEmail" className="block">
              Email:
            </InputLabel>
            <Input
              type="email"
              className="my-1 p-1 w-full"
              name="userEmail"
              value={email}
              placeholder="E.g: faruq123@gmail.com"
              id="userEmail"
              onChange={(event) => onChangeHandler(event)}
            />
          </div>

          <div>
            <InputLabel htmlFor="userPassword" className="block">
              Password:
            </InputLabel>
            <Input
              type="password"
              className="mt-1 mb-3 p-1 w-full"
              name="userPassword"
              value={password}
              placeholder="Your Password"
              id="userPassword"
              onChange={(event) => onChangeHandler(event)}
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            className="MuiButton-fullWidth py-2 text-white"
            onClick={(event) => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </Button>
          </FormControl>

        </FormGroup>
        <p className="text-center my-3">or</p>
        <Button
          variant="contained"
          color="secondary"
          className="MuiButton-fullWidth py-2 text-white"
        >
          Sign In with Google
        </Button>
        <p className="text-center my-3">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
