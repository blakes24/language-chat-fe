import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  list: {
    margin: "1rem",
  },
  listItem: {
    marginTop: "1rem",
  },
}));
