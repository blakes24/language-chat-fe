import Container from "@material-ui/core/Container";
import { useStyles } from "./LandingPageStyles";
import Grid from "@material-ui/core/Grid";
import Hero from "./Hero";

function LandingPage() {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth={false} className={classes.root}>
        <Hero />
        <Grid container spacing={0}>
          <Grid item xs={12} sm={4} className={classes.grid}>
            <img src="/language.jpg" className={classes.img} alt="" />
            <h3>Improve your language skills the natural way.</h3>
          </Grid>
          <Grid item xs={12} sm={4} className={classes.grid}>
            <div>
              <img src="/chat.jpg" className={classes.img} alt="" />
              <h3>
                Easily find chat partners who speak the language you're
                learning.
              </h3>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} className={classes.grid}>
            <img src="/world-man.jpg" className={classes.img} alt="" />
            <h3>Connect with people from all over the world.</h3>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default LandingPage;
