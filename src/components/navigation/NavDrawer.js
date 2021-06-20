import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useStyles } from "./NavDrawerStyles";
import { Link as RouterLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChatIcon from "@material-ui/icons/Chat";

function NavDrawer({ closeDrawer, logout }) {
  const classes = useStyles();
  return (
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
}

export default NavDrawer;
