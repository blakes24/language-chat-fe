import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import {
  Link as RouterLink,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import Avatar from "@material-ui/core/Avatar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setLocalStorage } from "../../helpers/localStorage";
import { logoutUser } from "../../store/logout";
import NavDrawer from "./NavDrawer";
import { useStyles } from "./NavWrapperStyles";

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
    setLocalStorage("token", "");
    setMobileOpen(false);
    dispatch(logoutUser());
    history.push("/");
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeDrawer = () => {
    setMobileOpen(false);
  };

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
              {user ? (
                <>
                  <Link
                    component={RouterLink}
                    to="/profile"
                    color="inherit"
                    className={classes.link}
                  >
                    {user.name}
                  </Link>
                  <Avatar
                    alt={user.name}
                    src={user.imageUrl || "letter"}
                    className={classes.avatar}
                    component={RouterLink}
                    to="/profile"
                    aria-label="view profile"
                    role="link"
                  />
                </>
              ) : (
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
                <NavDrawer logout={logout} closeDrawer={closeDrawer} />
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
                <NavDrawer logout={logout} closeDrawer={closeDrawer} />
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
