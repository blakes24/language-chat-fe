import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100% - 72px)",
    margin: 0,
    padding: 0,
  },
  messages: {
    flexGrow: 1,
    padding: ".5rem 1rem",
    overflowY: "scroll",
    height: 0,
  },
  send: {
    display: "flex",
    padding: "1rem",
    backgroundColor: theme.palette.secondary.light,
    margin: 0,
    borderRight: "1px solid lightGray",
  },
  input: {
    flexGrow: 1,
    marginRight: "1rem",
    backgroundColor: "white",
    borderRadius: 5,
  },
  btn: {
    color: theme.palette.secondary.main,
  },
  error: {
    color: theme.palette.error.main,
  },
}));
