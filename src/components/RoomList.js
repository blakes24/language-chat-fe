import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { NavLink } from "react-router-dom";
import { Badge } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingBottom: 0,
    paddingTop: 8,
  },
  item: {
    padding: "8px 10px",
  },
  avatar: {
    marginTop: ".2rem",
  },
  letter: {
    backgroundColor: theme.palette.primary.main,
  },
  badgeActive: {
    backgroundColor: theme.palette.success.main,
  },
  badgeAway: {
    backgroundColor: "#aeb5b8",
  },
}));

function RoomList({ rooms }) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemIcon className={classes.avatar}>
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
              <Badge
                variant="dot"
                badgeContent=" "
                color="default"
                classes={
                  room.partner.active
                    ? { badge: classes.badgeActive }
                    : { badge: classes.badgeAway }
                }
              >
                <Avatar
                  alt={room.partner.name}
                  src={room.partner.imageUrl || "letter"}
                  className={classes.letter}
                />
              </Badge>
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
