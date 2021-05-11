import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthForm from "./AuthForm";
import { useHistory } from "react-router-dom";
import UserContext from "../helpers/UserContext";
import ChatApi from "../helpers/api";;

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
});

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { setToken } = useContext(UserContext);

  async function login(values) {
    let res = await ChatApi.getToken(values);
    setToken(res);
    history.push("/");
  }
  async function facebookLogin(user) {
    let res = await ChatApi.getToken({
      provider: "facebook",
      token: user._token.idToken,
    });
    setToken(res);
    history.push("/");
  }
  async function googleLogin(user) {
    let res = await ChatApi.getToken({
      provider: "google",
      token: user._token.idToken,
    });
    setToken(res);
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
