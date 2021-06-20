import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    margin: "1rem .5rem",
    display: "flex",
    alignItems: "flex-end",
  },
  body: {
    fontSize: "1rem",
    padding: "3px",
  },
  avatar: {
    width: "30px",
    height: "30px",
    marginRight: ".5rem",
    backgroundColor: theme.palette.primary.main,
  },
  msg: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: "10px 10px 10px 0px",
    padding: "0 1rem",
    marginBottom: ".2rem",
  },
}));
