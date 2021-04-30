import React from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

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
  container: {
    textAlign: "center",
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
}))

function Login() {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        // await login(values);
        history.push("/");
      } catch (err) {
        formik.errors.password = err;
      }
    },
  });

  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <h1>Log In</h1>
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
          InputProps={{ disableUnderline: true }}
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
          InputProps={{ disableUnderline: true }}
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
          Login
        </Button>
      </form>
      <h4 className={classes.divider}>OR</h4>
      <div className={classes.root}>
        <Button
          variant="contained"
          type="submit"
          // color="primary"
          fullWidth
          size="large"
          style={{ margin: 8 }}
          className={classes.google}
        >
          Login with Google
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          fullWidth
          size="large"
          style={{ margin: 8 }}
        >
          Login with Facebook
        </Button>
      </div>
    </Container>
  );
}

export default Login;
