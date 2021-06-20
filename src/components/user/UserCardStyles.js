import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    textAlign: "left",
    margin: ".5rem",
  },
  bio: {
    fontSize: "1rem",
    marginTop: ".5rem",
    color: theme.palette.secondary.main,
  },
  avatar: {
    width: "65px",
    height: "65px",
    marginRight: "1rem",
    backgroundColor: theme.palette.primary.main,
    textDecoration: "none",
  },
  top: {
    display: "flex",
    alignItems: "center",
  },
  items: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  details: {
    flexGrow: 1,
  },
  level: {
    width: "3rem",
  },
  langs: {
    display: "flex",
    flexWrap: "wrap",
  },
  langSpace: {
    marginRight: "1rem",
  },
  btn: {
    padding: ".5rem",
  },
  tooltip: {
    margin: 0,
  },
}));
