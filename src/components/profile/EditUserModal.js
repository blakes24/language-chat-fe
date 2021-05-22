import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useFormik, FormikProvider } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUser } from "../../store/usersSlice";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
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

export default function EditUserModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.users.current);

  const formik = useFormik({
    initialValues: {
      email: user.email,
      name: user.name,
      bio: user.bio,
    },
    validate,
    onSubmit: async (values) => {
      try {
        dispatch(updateCurrentUser({ ...values, id: user.id }));
        handleClose();
      } catch (err) {
        formik.errors.name = err;
      }
    },
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
      <DialogContent>
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
                formik.errors.email &&
                formik.touched.email &&
                formik.errors.email
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              style={{ margin: 8 }}
            >
              Save Changes
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              color="secondary"
              size="large"
              style={{ margin: 8 }}
            >
              Cancel
            </Button>
          </form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
}
