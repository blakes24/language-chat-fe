import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Badge } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  small: {
    backgroundColor: theme.palette.primary.main,
  },
  large: {
    backgroundColor: theme.palette.primary.main,
    height: 55,
    width: 55,
  },
  badgeActive: {
    backgroundColor: theme.palette.success.main,
  },
  badgeAway: {
    backgroundColor: "#aeb5b8",
  },
}));

function ChatAvatar({ partner, size = "small" }) {
  const classes = useStyles();
  return (
    <>
      <Badge
        variant="dot"
        badgeContent=" "
        color="default"
        classes={
          partner.active
            ? { badge: classes.badgeActive }
            : { badge: classes.badgeAway }
        }
      >
        <Avatar
          alt={partner.name}
          src={partner.imageUrl || "letter"}
          className={size === "small" ? classes.small : classes.large}
        />
      </Badge>
    </>
  );
}

export default ChatAvatar;
