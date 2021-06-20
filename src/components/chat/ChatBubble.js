import { useStyles } from "./ChatBubbleStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

function ChatBubble({ user, msg }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        alt={user.name}
        src={user.imageUrl || "letter"}
        className={classes.avatar}
      />

      <div className={classes.msg}>
        <Typography className={classes.body}>{msg.body}</Typography>
      </div>
    </div>
  );
}

export default ChatBubble;
