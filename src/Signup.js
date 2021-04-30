import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthForm from "./AuthForm";

const useStyles = makeStyles({
  root: {
    textAlign: "center"
  }
})

function Signup() {
  const classes = useStyles();
  function signup(values) {
    console.log(values)
  }
  function facebookSignup() {
    console.log("facebook")
  }
  function googleSignup() {
    console.log("google")
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <h1>Sign Up</h1>
      <AuthForm text="Sign Up" handleFacebook={facebookSignup} handleGoogle={googleSignup} handleSubmit={signup} />
    </Container>
  );
}

export default Signup;
