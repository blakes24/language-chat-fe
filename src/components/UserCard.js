import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ChatIcon from "@material-ui/icons/Chat";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from "react-router-dom";
import UserContext from "../helpers/UserContext";
import { useContext } from "react";

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: theme.palette.primary.main,
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
}));

function UserCard({ cardUser }) {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const path =
    user.id < cardUser.id
      ? `/chats/${user.id}-${cardUser.id}`
      : `/chats/${cardUser.id}-${user.id}`;

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.top}>
          <Avatar
            alt={cardUser.name}
            src={cardUser.imageUrl || "letter"}
            className={classes.avatar}
            variant="rounded"
          />
          <div className={classes.details}>
            <div className={classes.items}>
              <Typography variant="h6" component="h2">
                {cardUser.name}{" "}
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
                  component={Link}
                  color="secondary"
                  aria-label="chat"
                  className={classes.btn}
                  to={path}
                  role="link"
                >
                  <ChatIcon />
                </IconButton>
              </div>
            </div>

            <div className={classes.langs}>
              <div className={classes.langSpace}>
                {cardUser.speaks[0].language}{" "}
                <LinearProgress
                  variant="determinate"
                  value={100}
                  className={classes.level}
                />
              </div>

              {cardUser.learning.map((lang) => (
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
          {cardUser.bio}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserCard;
