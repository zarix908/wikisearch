import { AppBar, Toolbar, Typography } from "@material-ui/core/";
import React from "react";
import "./styles.css";
import { SearchRaw } from "../SearchRaw";

export function Header(props: { onSearch: (query: string) => void }) {
  return (
    <header>
      <AppBar position="fixed" color="default" className="header">
        <Toolbar>
          <Typography variant="h4" color="primary" className="logoHeader">
            <strong>Wiki</strong>
          </Typography>
          <div className="searchRawCont">
            <SearchRaw onSearch={props.onSearch} />
          </div>
        </Toolbar>
      </AppBar>
    </header>
  );
}
