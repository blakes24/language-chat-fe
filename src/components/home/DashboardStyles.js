import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    marginTop: "1.5rem",
    marginBottom: ".5rem",
  },
  formControl: {
    marginBottom: ".5rem",
    minWidth: 240,
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
  },
  err: {
    textAlign: "center",
  },
});
