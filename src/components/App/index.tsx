import React, { Component } from "react";
import { withCookies } from "react-cookie";
import "./styles.css";
import { Home } from "../Home";
import { SearchResult } from "../SearchResult";

class App extends Component<{ cookies?: any }> {
  public state: { query: string | null } = { query: null };

  public render() {
    return this.state.query === null ? (
      <Home onSearch={this.onSearch} />
    ) : (
      <SearchResult cookies={this.props.cookies} query={this.state.query} />
    );
  }

  private onSearch = (query: string): void => {
    this.setState({ query });
  };
}

export default withCookies(App);
