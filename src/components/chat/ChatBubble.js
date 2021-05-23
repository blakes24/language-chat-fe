import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    margin: "1rem .5rem",
    display: "flex",
    alignItems: "flex-end",
  },
  body: {
    fontSize: 14,
    padding: "3px",
  },
  avatar: {
    width: "25px",
    height: "25px",
    marginRight: ".5rem",
    backgroundColor: theme.palette.primary.main,
  },
  msg: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: "10px 10px 10px 0px",
    padding: "0 1rem",
    marginBottom: ".2rem",
  },
}));

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
