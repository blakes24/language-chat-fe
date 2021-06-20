import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
