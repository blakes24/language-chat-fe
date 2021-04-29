import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hero from "./Hero";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 0,
    textAlign: "center",
    margin: "0 auto",
  },
  grid: {
    padding: "2rem",
    alignItems: "center",
  },
});

function LandingPage() {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth={false} className={classes.root}>
        <Hero />
        <Grid container spacing={0}>
          <Grid item xs={12} sm={4} className={classes.grid}>
            <img src="/phone.jpg" height="250px" alt="" />
            <h3>Connect with chat partners from all over the world.</h3>
          </Grid>
          <Grid item xs={12} sm={4} className={classes.grid}>
            <div>
              <img src="/flags.jpg" height="250px" alt="" />
              <h3>Find people who speak the language you want to practice.</h3>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} className={classes.grid}>
            <img src="/video-chat.jpg" height="250px" alt="" />
            <h3>Improve your laguage skills and meet great people.</h3>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default LandingPage;
