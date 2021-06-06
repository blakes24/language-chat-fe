import ImageUploader from "./ImageUploader";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Switch from "@material-ui/core/Switch";
import EditIcon from "@material-ui/icons/Edit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUser } from "../../store/usersSlice";
import EditUserModal from "./EditUserModal";
import EditLangModal from "./EditLangModal";
import DeleteUserModal from "./DeleteUserModal";


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
    maxWidth: 900,
    [theme.breakpoints.up("sm")]: {
      marginTop: "2rem",
    },
  },
  item1: {
    display: "flex",
    padding: "1rem",
    marginTop: "1rem",
    justifyContent: "center",
    order: 2,
    [theme.breakpoints.up("sm")]: {
      order: 1,
      marginTop: "2rem",
    },
  },
  item2: {
    display: "flex",
    padding: "1rem",
    marginTop: "1rem",
    justifyContent: "center",
    order: 1,
    [theme.breakpoints.up("sm")]: {
      order: 2,
      marginTop: "2rem",
    },
  },
  level: {
    width: "70%",
    marginTop: ".4rem",
    marginBottom: ".4rem",
  },
  switch: {
    marginLeft: ".5rem",
  },
  btn: {
    marginTop: "2rem",
  },
}));

function Profile() {
  const user = useSelector((state) => state.users.current);
  const classes = useStyles();
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [langType, setLangType] = useState("speaks");
  const dispatch = useDispatch();
  const [toastMsg, setToastMsg] = useState("");

  const handleSpeaksOpen = () => {
    setLangType("speaks");
    setLangOpen(true);
  };
  const handleLearningOpen = () => {
    setLangType("learning");
    setLangOpen(true);
  };
  const handleUserOpen = () => {
    setUserOpen(true);
  };
  const handleLangClose = () => {
    setLangOpen(false);
  };
  const handleUserClose = () => {
    setUserOpen(false);
  };
  const handleChange = () => {
    dispatch(updateCurrentUser({ active: !user.active, id: user.id }));
  };

  const handleToast = (msg) => {
    setToastOpen(true);
    setToastMsg(msg);
  };

  return (
    <Container className={classes.root}>
      {user && (
        <>
          <Typography
            align="center"
            variant="h3"
            component="h1"
            color="secondary"
          >
            {user.name}{" "}
            <FormControlLabel
              control={
                <Switch
                  checked={user.active}
                  onChange={handleChange}
                  name="active"
                  color="primary"
                />
              }
              label={user.active ? "active" : "away"}
              className={classes.switch}
            />
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} className={classes.item1}>
              <div>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  color="secondary"
                >
                  User Details{" "}
                  <IconButton
                    aria-label="edit user details"
                    color="secondary"
                    onClick={handleUserOpen}
                  >
                    <EditIcon />
                  </IconButton>
                </Typography>
                <Typography paragraph gutterBottom>
                  <b>Name: </b>
                  {user.name}
                </Typography>
                <Typography paragraph gutterBottom>
                  <b>Email: </b>
                  {user.email}
                </Typography>
                <Typography paragraph gutterBottom>
                  <b>About: </b>
                  {user.bio}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  color="secondary"
                  className={classes.root}
                >
                  Languages{" "}
                </Typography>
                <Typography>
                  <b>Native Language: </b>
                  {user.speaks[0].language}
                  <IconButton
                    aria-label="edit native language"
                    color="secondary"
                    onClick={handleSpeaksOpen}
                  >
                    <EditIcon />
                  </IconButton>
                </Typography>
                <Typography gutterBottom>
                  <b>Learning: </b>
                  {user.learning[0].language}
                  <IconButton
                    aria-label="edit learning language"
                    color="secondary"
                    onClick={handleLearningOpen}
                  >
                    <EditIcon />
                  </IconButton>
                </Typography>
                <div>
                  Level
                  <LinearProgress
                    variant="determinate"
                    value={(user.learning[0].level / 4) * 100}
                    className={classes.level}
                  />
                </div>
                <Button
                  color="primary"
                  onClick={() => setDeleteOpen(true)}
                  variant="contained"
                  className={classes.btn}
                >
                  Delete Account
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.item2}>
              <div>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  color="secondary"
                >
                  Profile Picture
                </Typography>
                <ImageUploader imageUrl={user.imageUrl} userId={user.id} />
              </div>
            </Grid>
          </Grid>
          <EditUserModal open={userOpen} handleClose={handleUserClose} />
          <EditLangModal
            open={langOpen}
            type={langType}
            handleClose={handleLangClose}
          />
          <DeleteUserModal
            open={deleteOpen}
            handleClose={() => setDeleteOpen(false)}
            handleToast={handleToast}
          />
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={toastOpen}
            autoHideDuration={5000}
            onClose={() => setToastOpen(false)}
            message={toastMsg}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setToastOpen(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />
        </>
      )}
    </Container>
  );
}

export default Profile;
