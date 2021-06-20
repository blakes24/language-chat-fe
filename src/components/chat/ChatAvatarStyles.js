import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  small: {
    backgroundColor: theme.palette.primary.main,
  },
  large: {
    backgroundColor: theme.palette.primary.main,
    height: 55,
    width: 55,
  },
  badgeActive: {
    backgroundColor: theme.palette.success.main,
  },
  badgeAway: {
    backgroundColor: "#aeb5b8",
  },
}));
