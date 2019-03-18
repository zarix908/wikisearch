import { Button, Grid } from "@material-ui/core/";
import React, { Component } from "react";
import PageSelectButton from "../PageSelectButton";
import "./styles.css";

class PageSelector extends Component<{
  onSelect: (value: number) => void;
  elementsMaxCount: number;
  page: number;
}> {
  public render() {
    const page = this.props.page;
    const elementsMaxCount: number = this.props.elementsMaxCount;

    const offset: number = Math.floor((page - 1) / 10) * 10;
    const count: number = Math.min(
      Math.ceil(elementsMaxCount / 10) - offset,
      10
    );
    const nextButtonDisabled =
      page === Math.ceil(elementsMaxCount / 10) || elementsMaxCount === 0;

    return (
      <div>
        <div className="pages">
          {this.range(offset, count).map(n => (
            <PageSelectButton
              value={n}
              key={n}
              onClick={() => this.props.onSelect(n)}
              pressed={n === page}
            />
          ))}
        </div>
        <Grid container direction="row" justify="center">
          <Grid item>
            <Button
              color="secondary"
              onClick={() => this.props.onSelect(page - 1)}
              disabled={page === 1}
            >
              previous
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              onClick={() => this.props.onSelect(page + 1)}
              disabled={nextButtonDisabled}
            >
              next
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

  private range(start: number, count: number): number[] {
    if (count <= 0) {
      return [];
    }

    return Array.from(new Array(count), (x, i) => i + start + 1);
  }
}

export default PageSelector;
