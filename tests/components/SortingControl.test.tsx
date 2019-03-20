import React, { Component } from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow, ShallowWrapper } from "enzyme";
import SortingControl from "../../src/components/SortingControl";
import { Select } from "@material-ui/core";
import { SortingKey } from "../../src/model/sortingKey";
import { SortingOrder } from "../../src/model/sortingOrder";
import RadioGroup from "@material-ui/core/RadioGroup";

configure({ adapter: new Adapter() });

describe("SortingControl component should", () => {
  let onChange: jest.Mock<any, any>;
  let sortingControl: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

  beforeEach(() => {
    onChange = jest.fn();
    sortingControl = shallow(<SortingControl onChange={onChange} />);
  });

  it("call onChange when change sorting key", () => {
    const select = sortingControl.find(Select);

    select.simulate("change", { target: { value: SortingKey.LastEdit } });

    expect(onChange).nthCalledWith(1, {
      sortingKey: SortingKey.LastEdit,
      sortingOrder: SortingOrder.Ascending
    });
  });

  it("call onChange when change sorting order", () => {
    const radioGroup = sortingControl.find(RadioGroup);

    radioGroup.simulate("change", {}, SortingOrder.Descending);

    expect(onChange).nthCalledWith(1, {
      sortingKey: SortingKey.Relevance,
      sortingOrder: SortingOrder.Descending
    });
  });
});
