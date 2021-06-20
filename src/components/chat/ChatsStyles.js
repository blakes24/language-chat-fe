import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    margin: 0,
    height: "calc(100% - 56px)",
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px)",
    },
  },
  list: {
    width: 69,
    paddingBottom: 0,
    marginBottom: 0,
    overflowX: "hidden",
    overflowY: "scroll",
    borderRight: "1px solid lightGray",
    height: "100%",
    maxHeight: "calc(100vh - 56px)",
    flexFlow: "column",
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      width: "250px",
      maxHeight: "calc(100vh - 64px)",
    },
  },
  chat: {
    height: "100%",
    display: "flex",
    width: "100%",
  },
  title: {
    padding: ".5rem 0",
    marginLeft: ".5rem",
  },
  chatContainer: {
    padding: 0,
    margin: 0,
    width: "100%",
  },
  partner: {
    marginTop: ".5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "4rem",
  },
  empty: {
    marginTop: "1rem",
  },
}));
