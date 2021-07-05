import { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ChatIcon from "@material-ui/icons/Chat";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ChatApi from "../../helpers/api";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import { deletePartner } from "../../store/partnerSlice";
import { useStyles } from "./UserCardStyles";

function UserCard({ cardUser, partner }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.current);
  const [toastOpen, setToastOpen] = useState(false);
  const [message, setMessage] = useState("");
  const path =
    user.id < cardUser.id
      ? `/chats/${user.id}-${cardUser.id}`
      : `/chats/${cardUser.id}-${user.id}`;

  const handleClose = (event) => {
    setToastOpen(false);
  };

  const handleToastOpen = (msg) => {
    setMessage(msg);
    setToastOpen(true);
  };

  async function handleAddPartner() {
    try {
      await ChatApi.addPartner(user.id, { partnerId: cardUser.id });
      handleToastOpen("Partner Added!");
    } catch (err) {
      const msg = Array.isArray(err) ? err[0] : err.message;
      handleToastOpen(msg);
      console.error(err);
    }
  }

  function handleDeletePartner() {
    dispatch(deletePartner({ userId: user.id, partnerId: cardUser.id }));
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.top}>
          <Avatar
            alt={cardUser.name}
            src={cardUser.imageUrl || "letter"}
            className={classes.avatar}
            variant="rounded"
            component={Link}
            aria-label="chat"
            to={path}
            role="link"
          />
          <div className={classes.details}>
            <div className={classes.items}>
              <Typography variant="h6" component="h2">
                {cardUser.name}{" "}
              </Typography>
              <div>
                {partner ? (
                  <Tooltip title="Delete Partner" placement="top">
                    <IconButton
                      color="secondary"
                      aria-label="delete partner"
                      className={classes.btn}
                      onClick={handleDeletePartner}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Add Partner" placement="top">
                    <IconButton
                      color="secondary"
                      aria-label="add partner"
                      className={classes.btn}
                      onClick={handleAddPartner}
                    >
                      <PersonAddIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Chat" placement="top">
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
                </Tooltip>
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
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={toastOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Card>
  );
}

export default UserCard;
