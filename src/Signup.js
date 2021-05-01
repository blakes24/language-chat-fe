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
  function facebookSignup(user) {
    console.log(user);
  }
  function googleSignup(user) {
    console.log(user);
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <h1>Sign Up</h1>
      <AuthForm text="Sign Up" handleFacebook={facebookSignup} handleGoogle={googleSignup} handleSubmit={signup} />
    </Container>
  );
}

export default Signup;
