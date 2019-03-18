import Paper from "@material-ui/core/Paper";
import React from "react";
import "./styles.css";

export function ErrorSnackBar(props: { error: string }) {
  if (props.error === "") {
    return null;
  }

  return (
    <Paper className="snackBar" style={{ backgroundColor: "darkred" }}>
      Network error. Check your internet connection and try again. Reason:{" "}
      {props.error}.
    </Paper>
  );
}
