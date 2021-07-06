import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { NavLink } from "react-router-dom";
import PeopleIcon from "@material-ui/icons/People";
import ChatAvatar from "./ChatAvatar";
import { useStyles } from "./RoomListStyles";

function RoomList({ rooms }) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <ListItem className={classes.top}>
        <ListItemIcon className={classes.icon}>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Chats" />
      </ListItem>
      <Divider component="li" />
      {rooms.map((room) => (
        <React.Fragment key={room.id}>
          <ListItem
            button
            component={NavLink}
            to={`/chats/${room.id}`}
            alignItems="flex-start"
            className={classes.item}
          >
            <ListItemAvatar className={classes.avatar}>
              <ChatAvatar partner={room.partner} />
            </ListItemAvatar>
            <ListItemText primary={room.partner.name} />
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}

export default RoomList;
