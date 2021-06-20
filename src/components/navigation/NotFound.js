import Container from "@material-ui/core/Container";
import { useStyles } from "./NotFoundStyles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function NotFound() {
  const classes = useStyles();
  return (
    <Container maxWidth={false} className={classes.root}>
      <div>
        <img src="/404.jpg" alt="page not found" className={classes.image} />
        <Button
          variant="contained"
          component={Link}
          to="/"
          color="primary"
          className={classes.btn}
        >
          Go Home
        </Button>
      </div>
    </Container>
  );
}

export default NotFound;
