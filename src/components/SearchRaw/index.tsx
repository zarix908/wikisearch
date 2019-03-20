import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import "./styles.css";

export class SearchRaw extends Component<{ onSearch: (str: string) => void }> {
  private query: string = "";

  constructor(props: { onSearch: (str: string) => void }) {
    super(props);
  }

  public render() {
    return (
      <Grid container direction="row" justify="space-between">
        <Grid item className="searchInput">
          <TextField
            variant="outlined"
            color="primary"
            onChange={e => (this.query = e.target.value)}
            placeholder="Search Wiki"
            type="search"
            autoFocus
            fullWidth
            autoComplete="javascript"
          />
        </Grid>
        <Grid item>
          <Fab
            color="primary"
            aria-label="Find"
            size="large"
            onClick={() => this.props.onSearch(this.query)}
          >
            <SearchIcon />
          </Fab>
        </Grid>
      </Grid>
    );
  }

  public componentDidMount(): void {
    document.addEventListener("keypress", this.handleKeyPress, false);
  }

  public componentWillUnmount(): void {
    document.removeEventListener("keypress", this.handleKeyPress);
  }

  private handleKeyPress = (e: KeyboardEvent): void => {
    if (e.code === "Enter") {
      this.props.onSearch(this.query);
    }
  };
}
