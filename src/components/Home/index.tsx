import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import "./styles.css";
import { SearchBar } from "../SearchBar";
import { Redirect } from "react-router-dom";

export class Home extends Component {
  public state: { query: string | null } = { query: null };

  public render() {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className="fullHeight"
      >
        {this.state.query === null ? (
          <SearchBar onSearch={this.onSearch} />
        ) : (
          <Redirect to={`/search/'${this.state.query}'`} />
        )}
      </Grid>
    );
  }

  private onSearch = (query: string): void => {
    this.setState({ query });
  };
}
