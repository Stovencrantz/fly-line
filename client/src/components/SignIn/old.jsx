import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div className="mt-8">
      <h1 className="mb-2 text-center font-bold">Sign In</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <form>
          <div className="form-group text-left">
            <label htmlFor="userEmail" className="block">
              Email:
            </label>
            <br />
            <input
              type="email"
              className="my-1 p-1 w-full"
              name="userEmail"
              value={email}
              placeholder="E.g: faruq123@gmail.com"
              id="userEmail"
              onChange={(event) => onChangeHandler(event)}
            />
            <br />
            <label htmlFor="userPassword" className="block">
              Password:
            </label>
            <br />
            <input
              type="password"
              className="mt-1 mb-3 p1 w-full"
              name="userPassword"
              value={password}
              placeholder="Your password"
              id="userPassword"
              onChange={(event) => onChangeHandler(event)}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              className="MuiButton-fullWidth py-2 border"
              onClick={(event) => {
                signInWithEmailAndPasswordHandler(event, email, password);
              }}
            >
              Sign in
            </Button>
          </div>
        </form>

        <p className="text-center my-3">or</p>
        <Button
          variant="contained"
          color="secondary"
          className="MuiButton-fullWidth py-2 border"
        >
          Sign in with Google
        </Button>
        <p className="text-center my-3">
          Don't have an account?{" "}
          <Link to="signUp" className="text-blue-500 hover:text-blue-600">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link
            to="passwordReset"
            className="text-blue-500 hover:text-blue-600"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
}
