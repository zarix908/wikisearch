import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Home } from "../Home";
import { SearchResult } from "../SearchResult";
import { Route, Switch } from "react-router";

class App extends Component<{ cookies?: any }> {
  public render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/search/:query"
          render={props => (
            <SearchResult
              cookies={this.props.cookies}
              query={props.match.params.query}
            />
          )}
        />
      </Switch>
    );
  }
}

export default withCookies(App);
