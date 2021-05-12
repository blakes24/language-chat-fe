import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ChatIcon from "@material-ui/icons/Chat";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    textAlign: "left",
    margin: ".5rem",
  },
  bio: {
    fontSize: 14,
    marginTop: ".5rem",
  },
  avatar: {
    width: "65px",
    height: "65px",
    marginRight: "1rem",
  },
  top: {
    display: "flex",
    alignItems: "center",
  },
  items: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  details: {
    flexGrow: 1,
  },
  level: {
    width: "3rem",
  },
  langs: {
    display: "flex",
    flexWrap: "wrap",
  },
  langSpace: {
    marginRight: "1rem",
  },
  btn: {
    padding: ".5rem",
  },
});

function UserCard({ user }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.top}>
          <Avatar
            alt={user.name}
            src={user.imageUrl}
            className={classes.avatar}
            variant="rounded"
          />
          <div className={classes.details}>
            <div className={classes.items}>
              <Typography variant="h6" component="h2">
                {user.name}{" "}
              </Typography>
              <div>
                <IconButton
                  color="secondary"
                  aria-label="follow"
                  className={classes.btn}
                >
                  <PersonAddIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  aria-label="send a message"
                  className={classes.btn}
                >
                  <ChatIcon />
                </IconButton>
              </div>
            </div>

            <div className={classes.langs}>
              <div className={classes.langSpace}>
                {user.speaks[0].language}{" "}
                <LinearProgress
                  variant="determinate"
                  value={100}
                  className={classes.level}
                />
              </div>

              {user.learning.map((lang) => (
                <div key={lang.code}>
                  {lang.language}{" "}
                  <LinearProgress
                    variant="determinate"
                    value={(lang.level / 4) * 100}
                    className={classes.level}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Typography className={classes.bio} color="textSecondary">
          {user.bio}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserCard;
