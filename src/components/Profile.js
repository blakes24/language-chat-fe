import ImageUploader from "./ImageUploader";
import {
  Container,
  Typography,
  Grid,
  makeStyles,
  LinearProgress,
  IconButton
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import EditIcon from "@material-ui/icons/Edit";
import UserContext from "../helpers/UserContext";
import { useContext, useState } from "react";

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
  const {  user  } = useContext(UserContext);
  const classes = useStyles();
  const [active, setActive] = useState(user.active);

  const handleChange = () => {
    setActive(!active);
  };

  return (
    <Container className={classes.root}>
      <Typography align="center" variant="h3" component="h1" color="secondary">
        {user.name}{" "}
        <FormControlLabel
          control={
            <Switch
              checked={active}
              onChange={handleChange}
              name="active"
              color="primary"
            />
          }
          label={active ? "active" : "away"}
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
              <IconButton aria-label="edit user details" color="secondary">
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
              <IconButton aria-label="edit languages" color="secondary">
                <EditIcon />
              </IconButton>
            </Typography>
            <Typography paragraph gutterBottom>
              <b>Native Language: </b>
              {user.speaks[0].language}
            </Typography>
            <Typography gutterBottom>
              <b>Learning: </b>
              {user.learning[0].language}
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
            <ImageUploader imageUrl={user.imageUrl} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
