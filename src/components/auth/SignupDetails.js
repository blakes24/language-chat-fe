import { useFormik, FormikProvider } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormikSelect from "../FormikSelect";
import { useHistory } from "react-router-dom";
import ChatApi from "../../helpers/api";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/usersSlice";
import { setLocalStorage } from "../../helpers/localStorage";
import { useState } from "react";
import Loading from "../Loading";
import { useStyles } from "./SignupDetailsStyles";

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = "Required";
  }
  if (!values.bio.trim()) {
    errors.bio = "Required";
  }
  return errors;
};

function SignupDetails({
  email,
  name,
  password,
  imageUrl,
  socialProvider,
  socialId,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: email,
      name: name,
      password: password,
      imageUrl: imageUrl,
      socialProvider: socialProvider,
      socialId: socialId,
      bio: "",
      speaksLang: "",
      learnsLang: "",
      learnsLevel: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await ChatApi.register(values);
        dispatch(setToken(res));
        setLocalStorage("token", res);
        history.push("/");
        // if  (values.socialId) {
        //   history.push("/");
        // } else {
        //   history.push("/verify");
        // }
      } catch (err) {
        setLoading(false);
        formik.errors.name = err;
      }
    },
  });

  const languages = [
    { label: "Arabic", value: "ar" },
    { label: "Chinese", value: "zh" },
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Hindi", value: "hi" },
    { label: "Indonesian", value: "id" },
    { label: "Italian", value: "it" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Spanish", value: "es" },
  ];
  const levels = [
    { value: 1, label: "Beginner" },
    { value: 2, label: "Intermediate" },
    { value: 3, label: "Advanced" },
  ];
  const classes = useStyles();

  return (
    <>
    {loading && <Loading />}
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
          FormHelperTextProps={{ error: true }}
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
          FormHelperTextProps={{ error: true }}
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
    </>
  );
}

export default SignupDetails;
