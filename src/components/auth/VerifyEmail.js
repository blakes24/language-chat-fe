import Container from "@material-ui/core/Container";
import { useStyles } from "./VerifyEmailStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useParams, useHistory, Link } from "react-router-dom";
import ChatApi from "../../helpers/api";
import { setToken } from "../../store/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLocalStorage } from "../../helpers/localStorage";
import { useState } from "react";
import Loading from "../Loading";

function VerifyEmail() {
  const classes = useStyles();
  const { code } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.users.current);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("Verification link is expired or invalid.");

  async function verify() {
    try {
      setLoading(true);
      let res = await ChatApi.verifyEmail(code);
      setLocalStorage("token", res);
      dispatch(setToken(res));
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setMsg(err[0]);
      setLoading(false);
      setFailed(true);
    }
  }
  async function resend() {
    try {
      setLoading(true);
      await ChatApi.resendEmail(user.id);
      setFailed(false);
      history.push("/verify");
    } catch (err) {
      setLoading(false);
      setMsg(err[0]);
    }
  }

  const successMsg = (
    <div className={classes.root}>
      <p>Your account has been verified.</p>
      <Link to="/">Start Chatting</Link>
    </div>
  );

  const failedMsg = (
    <div className={classes.root}>
      {loading && <Loading />}
      <p>{msg}</p>
      {user ? (
        <Button
          variant="contained"
          color="primary"
          onClick={resend}
          className={classes.btn}
        >
          Resend Link
        </Button>
      ) : (
        <p>
          <Link to="/login">Login</Link> to resend link.
        </p>
      )}
    </div>
  );

  if (failed) return failedMsg;
  if (success) return successMsg;

  return (
    <Container maxWidth="sm" className={classes.root}>
      {loading && <Loading />}
      <Typography gutterBottom variant="h5" component="h1" align="center">
        Welcome to LangChat
      </Typography>
      {code ? (
        <>
          <p>Click the button below to verify your account.</p>
          <Button
            variant="contained"
            color="primary"
            onClick={verify}
            className={classes.btn}
          >
            Verify
          </Button>
        </>
      ) : (
        <>
          <p>
            A verification link has been sent to <b>{user.email}</b>. Please
            follow the link in the email to verify your account.
          </p>
          <p>
            If you did not receive an email, click the button below to send a
            new verification link.
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={resend}
            className={classes.btn}
          >
            Resend Link
          </Button>
        </>
      )}
    </Container>
  );
}

export default VerifyEmail;
