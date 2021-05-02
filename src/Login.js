import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthForm from "./AuthForm";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
});

function Login() {
  const classes = useStyles();
  const history = useHistory();

  function login(values) {
    console.log(values);
    history.push("/");
  }
  function facebookLogin(user) {
    console.log(user);
    history.push("/");
  }
  function googleLogin(user) {
    console.log(user);
    history.push("/");
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <h1>Log In</h1>
      <AuthForm
        text="Log In"
        handleFacebook={facebookLogin}
        handleGoogle={googleLogin}
        handleSubmit={login}
      />
    </Container>
  );
}

export default Login;
