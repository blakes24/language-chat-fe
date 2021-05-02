import React from "react";
import { useFormik, FormikProvider } from "formik";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormikSelect from "./FormikSelect";
import { useHistory } from "react-router-dom";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.bio) {
    errors.bio = "Required";
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function SignupDetails({ email, name, password, imageUrl }) {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: email,
      name: name,
      password: password,
      imageUrl: imageUrl,
      bio: "",
      speaksLang: "",
      speaksLevel: "native",
      learnsLang: "",
      learnsLevel: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        console.log(values);
        history.push("/");
      } catch (err) {
        formik.errors.name = err;
      }
    },
  });
  const languages = [
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "english", label: "English" },
  ];
  const levels = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];
  const classes = useStyles();

  return (
    <FormikProvider value={formik}>
      <form
        className={classes.root}
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          style={{ margin: 8 }}
          size="small"
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          helperText={
            formik.errors.name && formik.touched.name && formik.errors.name
          }
        />
        <TextField
          id="bio"
          name="bio"
          label="About Me"
          multiline
          rows={4}
          variant="outlined"
          style={{ margin: 8 }}
          size="small"
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.bio}
          helperText={
            formik.errors.bio && formik.touched.bio && formik.errors.bio
          }
        />
        <FormikSelect
          name="speaksLang"
          items={languages}
          label="I speak"
          instruction="Select a Language"
          className={classes.formControl}
          value={formik.values.speaksLang}
          helperText="hi"
          required
        />
        <FormikSelect
          name="learnsLang"
          items={languages}
          label="I am learning"
          instruction="Select a Language"
          className={classes.formControl}
          value={formik.values.learnsLang}
          required
        />
        <FormikSelect
          name="learnsLevel"
          items={levels}
          label="My level is"
          instruction="Select a Level"
          className={classes.formControl}
          value={formik.values.learnsLevel}
          required
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          fullWidth
          size="large"
          style={{ margin: 8 }}
        >
          Create Account
        </Button>
      </form>
    </FormikProvider>
  );
}

export default SignupDetails;
