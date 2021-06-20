import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
