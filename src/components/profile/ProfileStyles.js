import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
    maxWidth: 900,
    [theme.breakpoints.up("sm")]: {
      marginTop: "2rem",
    },
  },
  item1: {
    display: "flex",
    padding: "1rem",
    marginTop: "1rem",
    justifyContent: "center",
    order: 2,
    [theme.breakpoints.up("sm")]: {
      order: 1,
      marginTop: "2rem",
    },
  },
  item2: {
    display: "flex",
    padding: "1rem",
    marginTop: "1rem",
    justifyContent: "center",
    order: 1,
    [theme.breakpoints.up("sm")]: {
      order: 2,
      marginTop: "2rem",
    },
  },
  level: {
    width: "70%",
    marginTop: ".4rem",
    marginBottom: ".4rem",
  },
  switch: {
    marginLeft: ".5rem",
  },
  btn: {
    marginTop: "2rem",
  },
}));
