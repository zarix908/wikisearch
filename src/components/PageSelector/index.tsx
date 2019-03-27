import { Button, Grid } from "@material-ui/core/";
import React, { Component } from "react";
import PageSelectButton from "../PageSelectButton";
import styles from "./styles.css";

class PageSelector extends Component<{
  onSelect: (value: number) => void;
  elementsCount: number;
  page: number;
}> {
  public render() {
    const page = this.props.page;
    const elementsCount: number = this.props.elementsCount;
    const maxPageSize = 10;

    if (page < 0 || page > Math.ceil(elementsCount / maxPageSize)) {
      throw new RangeError("page should greater 0 and less maximum page");
    }

    const offset: number =
      elementsCount === 0
        ? 0
        : Math.floor((page - 1) / maxPageSize) * maxPageSize;

    const displayedPagesCount: number = Math.min(
      Math.ceil(elementsCount / maxPageSize) - offset,
      maxPageSize
    );

    const nextButtonDisabled =
      page === Math.ceil(elementsCount / 10) || elementsCount === 0;

    return (
      <div>
        <div className={styles.pages}>
          {this.range(offset, displayedPagesCount).map(n => (
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
              disabled={page === 0 || page === 1}
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
