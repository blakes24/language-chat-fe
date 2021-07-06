import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useFormik, FormikProvider } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateSpeaks, updateLearning } from "../../store/usersSlice";
import FormikSelect from "../FormikSelect";
import { DialogActions } from "@material-ui/core";
import { useStyles } from "./EditLangModalStyles";

const validate = (values) => {
  const errors = {};
  if (!values.speaks) {
    errors.speaks = "Required";
  }
  if (!values.learning) {
    errors.learning = "Required";
  }
  if (!values.level) {
    errors.level = "Required";
  }
  return errors;
};

export default function EditLangModal({ open, handleClose, type }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.users.current);

  const formik = useFormik({
    initialValues: {
      speaks: user.speaks[0].code,
      learning: user.learning[0].code,
      level: user.learning[0].level,
    },
    validate,
    onSubmit: async (values) => {
      try {
        if (type === "speaks") {
          let speaksData = { code: values.speaks, id: user.speaks[0].id };
          dispatch(updateSpeaks(speaksData));
        } else {
          let learningData = {
            code: values.learning,
            level: values.level,
            id: user.learning[0].id,
          };
          dispatch(updateLearning(learningData));
        }
        handleClose();
      } catch (err) {
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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Language</DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <form
            className={classes.root}
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            {type === "speaks" ? (
              <FormikSelect
                name="speaks"
                items={languages}
                label="I speak"
                instruction="Select a Language"
                className={classes.formControl}
                value={formik.values.speaks}
                required
              />
            ) : (
              <>
                <FormikSelect
                  name="learning"
                  items={languages}
                  label="I am learning"
                  instruction="Select a Language"
                  className={classes.formControl}
                  value={formik.values.learning}
                  required
                />
                <FormikSelect
                  name="level"
                  items={levels}
                  label="My level is"
                  instruction="Select a Level"
                  className={classes.formControl}
                  value={formik.values.level}
                  required
                />{" "}
              </>
            )}
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
              >
                Save Changes
              </Button>
              <Button
                variant="contained"
                onClick={handleClose}
                color="secondary"
                size="large"
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
}
