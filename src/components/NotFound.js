import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    padding: 0,
    height: "calc(100% - 24px)",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    marginTop: "1rem",
  },
  image: {
    width: "100%",
    maxWidth: "900px",
    display: "block",
    margin: "0 auto",
  },
}));

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
