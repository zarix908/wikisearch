import React, { Component } from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow, ShallowWrapper } from "enzyme";
import { Fab } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { SearchRaw } from "../../src/components/SearchRaw";

configure({ adapter: new Adapter() });

describe("Test SearchRaw component", () => {
  let onSearchMock: jest.Mock<any, any>;
  let searchRaw: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;
  // search button
  let fab: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

  beforeEach(() => {
    onSearchMock = jest.fn();
    searchRaw = shallow(<SearchRaw onSearch={onSearchMock} />);
    fab = searchRaw.find(Fab);
  });

  it("+++ call onSearch when click search button", () => {
    fab.simulate("click");

    expect(onSearchMock).toBeCalledTimes(1);
  });

  it("+++ call onSearch with search input value", () => {
    const textField = searchRaw.find(TextField); // search input
    const searchValue = "some value";

    textField.simulate("change", { target: { value: searchValue } });
    fab.simulate("click");

    expect(onSearchMock).lastCalledWith(searchValue);
  });
});
