import { FormControlLabel, Grid, Radio, RadioGroup } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import styles from "./styles.css";
import { ISorting } from "../../model/sorting";
import { SortingKey } from "../../model/sortingKey";
import { SortingOrder } from "../../model/sortingOrder";

class SortingControl extends Component<{
  onChange: (sorting: ISorting) => void;
}> {
  public state: ISorting = {
    sortingKey: SortingKey.Relevance,
    sortingOrder: SortingOrder.Ascending
  };

  public render() {
    const radioButtonsColor =
      this.state.sortingOrder === SortingOrder.Ascending
        ? "primary"
        : "secondary";

    const radioButtonDisabled: boolean =
      this.state.sortingKey === SortingKey.Relevance;

    return (
      <div className={styles.paddingBox}>
        <section className={styles.container}>
          <Typography variant="h6" color="textPrimary" align="center">
            Sorting
          </Typography>
          <Grid container direction="row" spacing={8}>
            <Grid item>
              <Select
                value={this.state.sortingKey}
                onChange={this.onSelectChange}
                inputProps={{
                  name: "sortingKey"
                }}
              >
                <MenuItem value={SortingKey.Relevance}>Relevance</MenuItem>
                <MenuItem value={SortingKey.IncomingLinks}>
                  Incoming links
                </MenuItem>
                <MenuItem value={SortingKey.LastEdit}>Last edit</MenuItem>
                <MenuItem value={SortingKey.CreateTimestamp}>
                  Creating time
                </MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <RadioGroup
                row
                name="sortingOrder"
                value={this.state.sortingOrder}
                onChange={this.onRadioGroupChange}
              >
                <FormControlLabel
                  value={SortingOrder.Ascending}
                  control={<Radio color={radioButtonsColor} />}
                  disabled={radioButtonDisabled}
                  label="ascending"
                />
                <FormControlLabel
                  value={SortingOrder.Descending}
                  control={<Radio color={radioButtonsColor} />}
                  disabled={radioButtonDisabled}
                  label="descending"
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </section>
      </div>
    );
  }

  private onSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const sortingKey: SortingKey = event.target.value as SortingKey;
    this.setState({ sortingKey });
    this.props.onChange({
      sortingKey,
      sortingOrder: this.state.sortingOrder
    });
  };

  private onRadioGroupChange = (
    event: React.ChangeEvent<{}>,
    value: string
  ): void => {
    const sortingOrder: SortingOrder = value as SortingOrder;
    this.setState({ sortingOrder });
    this.props.onChange({
      sortingKey: this.state.sortingKey,
      sortingOrder
    });
  };
}

export default SortingControl;
