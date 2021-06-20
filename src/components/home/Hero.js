import Container from "@material-ui/core/Container";
import { useStyles } from "./HeroStyles";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";

function Hero() {
  const classes = useStyles();
  return (
    <Container maxWidth={false} className={classes.root}>
      <Container maxWidth={false} className={classes.main}>
        <div className={classes.title}>
          <div>
            <h1 className={classes.h1}>LangChat</h1>
            <h2 className={classes.h2}>Practice with native speakers.</h2>
          </div>
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
        </div>
      </Container>
    </Container>
  );
}

export default Hero;
