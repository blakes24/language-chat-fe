import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthForm from "./AuthForm";
import SignupDetails from "./SignupDetails";
import ChatApi from "../../helpers/api";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    minHeight: "500px",
  },
  card: {
    padding: "1rem",
  },
});

function Signup() {
  const [formPage, setFormPage] = useState(1);
  const [newUser, setNewUser] = useState({
    email: "",
    name: "",
    password: "",
    imageUrl: "",
    socialProvider: "",
    socialId: "",
  });

  const classes = useStyles();
  function signup(values) {
    setNewUser({ ...newUser, email: values.email, password: values.password });
    setFormPage(2);
  }
  async function facebookSignup(user) {
    await ChatApi.validate({
      provider: "facebook",
      token: user._token.accessToken,
    });
    setNewUser({
      ...user,
      email: user._profile.email,
      name: user._profile.firstName,
      imageUrl: user._profile.profilePicURL,
      socialProvider: "facebook",
      socialId: user._profile.id,
    });
    setFormPage(2);
  }
  async function googleSignup(user) {
    await ChatApi.validate({
      provider: "google",
      token: user._token.idToken,
    });
    setNewUser({
      ...user,
      email: user._profile.email,
      name: user._profile.firstName,
      imageUrl: user._profile.profilePicURL,
      socialProvider: "google",
      socialId: user._profile.id,
    });
    setFormPage(2);
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Card className={classes.card}>
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
            socialProvider={newUser.socialProvider}
            socialId={newUser.socialId}
          />
        )}
      </Card>
    </Container>
  );
}

export default Signup;
