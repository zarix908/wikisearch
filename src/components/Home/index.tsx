import Grid from "@material-ui/core/Grid";
import React from "react";
import "./styles.css";
import { SearchBar } from "../SearchBar";

export function Home({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <Grid container justify="center" alignItems="center" className="fullHeight">
      <SearchBar onSearch={onSearch} />
    </Grid>
  );
}
