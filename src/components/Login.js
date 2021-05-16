import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthForm from "./AuthForm";
import { useHistory } from "react-router-dom";
import UserContext from "../helpers/UserContext";
import ChatApi from "../helpers/api";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
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
  error: {
    color: theme.palette.error.main,
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { setToken } = useContext(UserContext);
  const [error, setError] = useState(null);

  function handleFail() {
    setError("Unable to verify account.");
  }

  async function login(values) {
    let res = await ChatApi.getToken(values);
    setToken(res);
    history.push("/");
  }
  async function facebookLogin(user) {
    setError(null);
    try {
      let res = await ChatApi.getToken({
        provider: "facebook",
        token: user._token.idToken,
      });
      setToken(res);
      history.push("/");
    } catch (err) {
      setError("Account not found.");
    }
  }
  async function googleLogin(user) {
    setError(null);
    try {
      let res = await ChatApi.getToken({
        provider: "google",
        token: user._token.idToken,
      });
      setToken(res);
      history.push("/");
    } catch (err) {
      setError("Account not found");
    }
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Card className={classes.card}>
        <h1>Log In</h1>
        <AuthForm
          text="Log In"
          handleFacebook={facebookLogin}
          handleGoogle={googleLogin}
          handleSubmit={login}
          handleFail={handleFail}
        />
        {error && <p className={classes.error}>{error}</p>}
      </Card>
    </Container>
  );
}

export default Login;
