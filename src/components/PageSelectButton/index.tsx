import { IconButton, Typography } from "@material-ui/core/";
import React from "react";
import "./styles.css";

function PageSelectButton(props: {
  value: number;
  onClick: (value: number) => void;
  pressed: boolean;
}) {
  return (
    <IconButton onClick={() => props.onClick(props.value)}>
      <div className={`pageButton ${props.pressed ? "pressed" : null}`}>
        <Typography color="primary">
          <strong>{props.value}</strong>
        </Typography>
      </div>
    </IconButton>
  );
}

export default PageSelectButton;
