import ImageUploader from "./ImageUploader";
import {
  Container,
  Typography,
  Grid,
  makeStyles,
  LinearProgress,
  IconButton,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import EditIcon from "@material-ui/icons/Edit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUser } from "../../store/usersSlice";
import EditUserModal from "./EditUserModal";
import EditLangModal from "./EditLangModal";

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
}));

function Profile() {
  const user = useSelector((state) => state.users.current);
  const classes = useStyles();
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [langType, setLangType] = useState("speaks");
  const dispatch = useDispatch();

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

  return (
    <Container className={classes.root}>
      <Typography align="center" variant="h3" component="h1" color="secondary">
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
                aria-label="edit languages"
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
                aria-label="edit languages"
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
    </Container>
  );
}

export default Profile;
