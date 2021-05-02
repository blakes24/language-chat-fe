import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthForm from "./AuthForm";
import SignupDetails from "./SignupDetails"

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
});

function Signup() {
  const [formPage, setFormPage] = useState(1);
  const [newUser, setNewUser] = useState({
    email: "",
    name: "",
    password: "",
    imageUrl: "",
  });
  
  const classes = useStyles();
  function signup(values) {
    console.log(values);
    setNewUser({ ...newUser, email: values.email, password: values.password });
    setFormPage(2);
  }
  function facebookSignup(user) {
    console.log(user);
    setNewUser({
      ...user,
      email: user._profile.email,
      name: user._profile.firstName,
      imageUrl: user._profile.profilePicURL,
    });
    setFormPage(2);
  }
  function googleSignup(user) {
    console.log(user);
    setNewUser({
      ...user,
      email: user._profile.email,
      name: user._profile.firstName,
      imageUrl: user._profile.profilePicURL,
    });
    setFormPage(2);
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <h1>Sign Up</h1>
      {formPage === 1 ? (
        <AuthForm
          text="Sign Up"
          handleFacebook={facebookSignup}
          handleGoogle={googleSignup}
          handleSubmit={signup}
        />
      ) : (
        <SignupDetails
          email={newUser.email}
          name={newUser.name}
          password={newUser.password}
          imageUrl={newUser.imageUrl}
        />
      )}
    </Container>
  );
}

export default Signup;
