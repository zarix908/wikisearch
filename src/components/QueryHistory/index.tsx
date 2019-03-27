import * as React from "react";
import "./styles.css";
import { ButtonBase, Typography } from "@material-ui/core";

function extractHistoryFromCookies(cookies: any): string[] {
  const queries: string[] = [];
  const count = parseInt(cookies.get("count"), 10);

  if (isNaN(count)) {
    return queries;
  }

  return queries;
}

export function QueryHistory(props: {
  cookies: any;
  onChange: (query: string) => void;
}) {
  return (
    <div className="paddingBoxHist">
      <div className="containerHist">
        <Typography variant="h6" color="textPrimary" align="center">
          History
        </Typography>
        {extractHistoryFromCookies(props.cookies).map(el => (
          <div className="comp" onClick={() => props.onChange(el)}>
            <ButtonBase className="fullWidth fullHeight hoverSelect">
              <div className="noTransform">{el}</div>
            </ButtonBase>
          </div>
        ))}
      </div>
    </div>
  );
}
