import { useStyles } from "./FooterStyles";

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
