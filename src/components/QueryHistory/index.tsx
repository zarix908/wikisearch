import * as React from "react";
import styles from "./styles.css";
import { ButtonBase, Typography } from "@material-ui/core";

function extractHistoryFromCookies(cookies: any): Array<[string, string]> {
  const queries: Array<[string, string]> = [];
  const count = parseInt(cookies.get("count"), 10);

  if (isNaN(count)) {
    return queries;
  }

  for (let i: number = count; i > count - 10; i--) {
    const queryNumber = i >= 0 ? i : i + 10;
    const query = cookies.get(`lastQueries${queryNumber}`);

    if (query !== undefined) {
      const uuid = crypto.getRandomValues(new Uint32Array(4)).join("-");
      queries.push([query, uuid]);
    }
  }

  return queries;
}

export function QueryHistory(props: {
  cookies: any;
  onChange: (query: string) => void;
}) {
  const queriesHistory = extractHistoryFromCookies(props.cookies);

  if (queriesHistory.length === 0) {
    return null;
  }

  return (
    <div className={styles.paddingBoxHist}>
      <div className={styles.containerHist}>
        <Typography variant="h6" color="textPrimary" align="center">
          History
        </Typography>
        {queriesHistory.map(([el, i]) => (
          <div
            className={styles.comp}
            onClick={() => props.onChange(el)}
            key={i}
          >
            <ButtonBase className={styles.button}>
              <div className={styles.buttonContent}>{el}</div>
            </ButtonBase>
          </div>
        ))}
      </div>
    </div>
  );
}
