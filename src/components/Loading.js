import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "./LoadingStyles";

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
