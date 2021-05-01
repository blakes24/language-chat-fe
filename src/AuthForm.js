import React from "react";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SocialButton from "./SocialButton";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import FacebookIcon from "@material-ui/icons/Facebook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  divider: {
    display: "flex",
    flexDirection: "row",
    "&::before": {
      content: '""',
      flex: "1 1",
      borderBottom: "1px solid lightgray",
      margin: "auto",
    },
    "&::after": {
      content: '""',
      flex: "1 1",
      borderBottom: "1px solid lightgray",
      margin: "auto",
    },
  },
  google: {
    background: "#db4235",
    color: "white",
    "&:hover": {
      background: "#b04238",
    },
  },
  icon: {
    marginRight: "1rem",
  },
}));

function AuthForm({ text, handleSubmit, handleGoogle, handleFacebook }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        await handleSubmit(values);
      } catch (err) {
        formik.errors.password = err;
      }
    },
  });

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  const classes = useStyles();

  return (
    <>
      <form
        className={classes.root}
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          style={{ margin: 8 }}
          size="small"
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          helperText={
            formik.errors.email && formik.touched.email && formik.errors.email
          }
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          style={{ margin: 8 }}
          size="small"
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          helperText={
            formik.errors.password &&
            formik.touched.password &&
            formik.errors.password
          }
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          fullWidth
          size="large"
          style={{ margin: 8 }}
        >
          {text}
        </Button>
      </form>
      <h4 className={classes.divider}>OR</h4>
      <div className={classes.root}>
        <SocialButton
          color="secondary"
          provider="facebook"
          appId="299527098433094"
          onLoginSuccess={handleFacebook}
          onLoginFailure={handleSocialLoginFailure}
        >
          <FacebookIcon className={classes.icon} />
          {` ${text} with Facebook`}
        </SocialButton>
        <SocialButton
          color="secondary"
          className={classes.google}
          provider="google"
          appId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          onLoginSuccess={handleGoogle}
          onLoginFailure={handleSocialLoginFailure}
        >
          <FontAwesomeIcon className={classes.icon} icon={faGoogle} />{" "}
          {`${text} with Google`}
        </SocialButton>
      </div>
    </>
  );
}

export default AuthForm;
