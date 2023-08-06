import React, { useState } from "react";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SocialButton from "./SocialButton";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import FacebookIcon from "@material-ui/icons/Facebook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../Loading";
import { useStyles } from "./AuthFormStyles";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid password (cannot contain spaces)";
  }
  if (values.passwordConfirm) {
    if (values.password !== values.passwordConfirm) {
      errors.passwordConfirm = "Passwords do not match";
    }
  }
  return errors;
};

function AuthForm({
  text,
  handleSubmit,
  handleGoogle,
  handleFacebook,
  handleFail,
  newUser,
}) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validate,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await handleSubmit(values);
      } catch (err) {
        setLoading(false);
        newUser
          ? (formik.errors.passwordConfirm = err)
          : (formik.errors.password = err);
      }
    },
  });

  const classes = useStyles();

  return (
    <>
      {loading && <Loading />}
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
          FormHelperTextProps={{ error: true }}
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
          FormHelperTextProps={{ error: true }}
          helperText={
            formik.errors.password &&
            formik.touched.password &&
            formik.errors.password
          }
        />
        {newUser && (
          <TextField
            id="passwordConfirm"
            name="passwordConfirm"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            style={{ margin: 8 }}
            size="small"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordConfirm}
            FormHelperTextProps={{ error: true }}
            helperText={
              formik.errors.passwordConfirm &&
              formik.touched.passwordConfirm &&
              formik.errors.passwordConfirm
            }
          />
        )}
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
          className={classes.facebook}
          provider="facebook"
          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          onLoginSuccess={handleFacebook}
          onLoginFailure={handleFail}
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
          onLoginFailure={handleFail}
        >
          <FontAwesomeIcon className={classes.icon} icon={faGoogle} />{" "}
          {`${text} with Google`}
        </SocialButton>
      </div>
    </>
  );
}

export default AuthForm;
