import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    textAlign: "center",
    margin: "0 auto",
    height: "50vh",
    padding: 0,
    marginBottom: "2rem",
    backgroundImage: "url('/home5.jpg')",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  filter: {
    height: "100%",
    background:
      "linear-gradient( #E64A1950 0%, #3F51B599 50%, #E64A1950 100% )",
    display: "flex",
    alignItems: "center",
  },
  main: {
    color: "white",
    textShadow: "-2px 2px 8px #171873",
    margin: "0 auto",
    padding: "0 2rem",
  },
  h1: {
    margin: 0,
    fontSize: "2.5rem",
  },
  button: {
    textShadow: "none",
  },
});

function Hero() {
  const classes = useStyles();
  return (
    <Container maxWidth={false} className={classes.root}>
      <Container maxWidth={false} className={classes.filter}>
        <Container maxWidth={false} className={classes.main}>
          <h1 className={classes.h1}>LangChat</h1>
          <h2>
            Here's some cool stuff about this app to make you want to sign up.
          </h2>
          <Button
            variant="contained"
            className={classes.button}
            color="secondary"
            size="large"
            component={RouterLink}
            to="/signup"
          >
            Sign Up
          </Button>
        </Container>
      </Container>
    </Container>
  );
}

export default Hero;
