import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Badge } from "@material-ui/core";
import { useStyles } from "./ChatAvatarStyles";

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
