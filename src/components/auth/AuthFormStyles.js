import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  divider: {
    display: "flex",
    flexDirection: "row",
    "&::before": {
      content: '""',
      flex: "1 1",
      borderBottom: "1px solid lightgray",
      margin: "auto",
    },
    "&::after": {
      content: '""',
      flex: "1 1",
      borderBottom: "1px solid lightgray",
      margin: "auto",
    },
  },
  google: {
    backgroundColor: "#db4235",
    color: "white",
    "&:hover": {
      background: "#b04238",
    },
  },
  facebook: {
    backgroundColor: "#4267B2",
    color: "white",
    "&:hover": {
      background: "#35538f",
    },
  },
  icon: {
    marginRight: "1rem",
  },
}));
