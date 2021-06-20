import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    margin: "0 auto",
    height: "50vh",
    minHeight: "325px",
    padding: 0,
    marginBottom: "2rem",
    backgroundImage: "url('/world-lg.jpg')",
    backgroundColor: "#FFFFFF",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
  },
  main: {
    color: theme.palette.secondary.main,
    margin: "0 auto",
    padding: "0 2rem",
    height: "100%",
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
      alignItems: "center",
    },
    [theme.breakpoints.up("sm")]: {
      marginRight: "4rem",
    },
  },
  h1: {
    marginTop: "3rem",
    marginBottom: 0,
    fontSize: "2.5rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "1rem",
      marginBottom: 0,
      fontSize: "2rem",
    },
  },
  h2: {
    [theme.breakpoints.down("xs")]: {
      margin: 0,
      fontSize: "1.1rem",
    },
    marginTop: ".2rem",
  },
  button: {
    marginBottom: "1.2rem",
  },
}));
