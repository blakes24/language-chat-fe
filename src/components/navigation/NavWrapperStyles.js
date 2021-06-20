import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    paddingBottom: "env(safe-area-inset-bottom)",
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: 220,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 220,
    backgroundColor: theme.palette.secondary.light,
  },
  content: {
    flexGrow: 1,
    minHeight: "100vh",
  },
  link: {
    marginLeft: theme.spacing(2),
    fontSize: "1rem",
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    height: "30px",
    width: "30px",
    marginLeft: ".5rem",
    textDecoration: "none",
  },
}));
