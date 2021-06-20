import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    margin: 0,
    width: 200,
    padding: 0,
  },
  form: {
    width: "100%",
  },
  imgContainer: {
    width: 200,
    height: 200,
    border: "2px solid gray",
    marginBottom: ".2rem",
    position: "relative",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    marginRight: ".2rem",
    flexGrow: 1,
  },
  btnCancel: {
    marginLeft: ".2rem",
    flexGrow: 0.5,
  },
});
