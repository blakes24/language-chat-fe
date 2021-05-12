import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    left: "0",
    bottom: "0",
    minHeight: "60px",
    width: "100%",
    marginTop: "2rem",
    zIndex: 1201,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  link: {
    color: theme.palette.secondary.light,
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <div>
        <p>&#169; LangChat</p>
        <a className={classes.link} href="http://www.freepik.com">
          Graphics designed by stories/Freepik
        </a>
      </div>
    </footer>
  );
}

export default Footer;
