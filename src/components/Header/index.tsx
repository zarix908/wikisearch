import { AppBar, Toolbar, Typography } from "@material-ui/core/";
import React from "react";
import styles from "./styles.css";
import { SearchRaw } from "../SearchRaw";

export function Header(props: { onSearch: (query: string) => void }) {
  return (
    <header>
      <AppBar position="fixed" color="default" className={styles.header}>
        <Toolbar>
          <Typography variant="h4" color="primary" className={styles.logo}>
            <strong>Wiki</strong>
          </Typography>
          <div className={styles.searchRawCont}>
            <SearchRaw onSearch={props.onSearch} />
          </div>
        </Toolbar>
      </AppBar>
    </header>
  );
}
