import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 2,
    color: "#fff",
  },
}));

export default function Loading({ solid }) {
  const classes = useStyles();
  return (
    <>
      {solid ? (
        <div className={classes.root}>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}
