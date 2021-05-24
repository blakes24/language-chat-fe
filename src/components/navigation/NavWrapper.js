import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import {
  Link as RouterLink,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChatIcon from "@material-ui/icons/Chat";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../store/usersSlice";
import { setLocalStorage } from "../../helpers/localStorage";

const useStyles = makeStyles((theme) => ({
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
  list: {
    margin: "1rem",
  },
  listItem: {
    marginTop: "1rem",
  },
}));

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function NavWrapper({ window, children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useSelector((state) => state.users.current);
  const dispatch = useDispatch();
  const history = useHistory();

  let match = useRouteMatch("/chats");

  function logout() {
    setMobileOpen(false);
    setLocalStorage("token", "");
    dispatch(setToken(""));
    history.push("/");
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeDrawer = () => {
    setMobileOpen(false);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List className={classes.list}>
        <ListItem
          button
          component={RouterLink}
          to="/"
          key={"home"}
          className={classes.listItem}
          onClick={closeDrawer}
        >
          <ListItemIcon>
            <HomeIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        <ListItem
          button
          component={RouterLink}
          to="/partners"
          key={"partners"}
          className={classes.listItem}
          onClick={closeDrawer}
        >
          <ListItemIcon>
            <PeopleIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary={"Partners"} />
        </ListItem>
        <ListItem
          button
          component={RouterLink}
          to="/chats"
          key={"chats"}
          className={classes.listItem}
          onClick={closeDrawer}
        >
          <ListItemIcon>
            <ChatIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary={"Chats"} />
        </ListItem>
        <ListItem
          button
          component={RouterLink}
          to="/profile"
          key={"profile"}
          className={classes.listItem}
          onClick={closeDrawer}
        >
          <ListItemIcon>
            <AccountCircleIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItem>
        <ListItem
          button
          key={"logout"}
          onClick={logout}
          className={classes.listItem}
        >
          <ListItemIcon>
            <ExitToAppIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary={"Log Out"} />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <HideOnScroll>
          <AppBar position="fixed" elevation={0} className={classes.appBar}>
            <Toolbar>
              {user && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              )}
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
              {!user && (
                <>
                  <Link
                    component={RouterLink}
                    to="/login"
                    color="inherit"
                    className={classes.link}
                  >
                    Log In
                  </Link>
                  <Link
                    component={RouterLink}
                    to="/signup"
                    color="inherit"
                    className={classes.link}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        {user && (
          <nav className={classes.drawer} aria-label="navigation">
            <Hidden mdUp>
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden smDown>
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
      {!match && <Footer />}
    </>
  );
}

export default NavWrapper;
