import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  link: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <div className={`${classes.root} Navbar`}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              underline="none"
            >
              LangChat
            </Link>
          </Typography>
          <Link
            component={RouterLink}
            to="/login"
            color="inherit"
            className={classes.link}
          >
            Log In
          </Link>
          <Link component={RouterLink} to="/signup" color="inherit">
            Sign Up
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
