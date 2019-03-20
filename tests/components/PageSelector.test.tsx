import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import PageSelector from "../../src/components/PageSelector";
import PageSelectButton from "../../src/components/PageSelectButton";
import { Button } from "@material-ui/core/";

configure({ adapter: new Adapter() });

describe("PageSelector component should", () => {
  let onSelectMock: jest.Mock<any, any>;

  beforeEach(() => {
    onSelectMock = jest.fn();
  });

  function pageSelectorFactory(elementsCount: number, page: number) {
    return shallow(
      <PageSelector
        onSelect={onSelectMock}
        elementsCount={elementsCount}
        page={page}
      />
    );
  }

  it("call onSelect with number of clicked SelectPageButton", () => {
    const selectingPage = 7;
    const button = pageSelectorFactory(100, 1)
      .find(PageSelectButton)
      .at(selectingPage - 1);

    button.simulate("click");

    expect(onSelectMock).nthCalledWith(1, selectingPage);
  });

  it("call onSelect with decrement when click previous page button", () => {
    let currentPage = 5;
    const button = pageSelectorFactory(70, currentPage)
      .find(Button)
      .at(0); // previous page button

    button.simulate("click");

    expect(onSelectMock).nthCalledWith(1, --currentPage);
  });

  it("disable previous button when page is first", () => {
    const firstPage = 1;
    const button = pageSelectorFactory(70, firstPage)
      .find(Button)
      .at(0); // previous page button

    expect(button.props().disabled).toBeTruthy();
  });

  it("call onSelect with increment when click next page button", () => {
    let currentPage = 2;
    const button = pageSelectorFactory(40, currentPage)
      .find(Button)
      .at(1); // next page button

    button.simulate("click");

    expect(onSelectMock).nthCalledWith(1, ++currentPage);
  });

  it("disable next button when page is last", () => {
    const maxPage = 4;
    const button = pageSelectorFactory(36, maxPage)
      .find(Button)
      .at(1); // next page button

    button.simulate("click");

    expect(button.props().disabled).toBeTruthy();
  });

  it("throw RangeError when page more than maximum page", () => {
    const maxPage = 4;
    const renderPageSelector = () => pageSelectorFactory(36, maxPage + 1);
    expect(renderPageSelector).toThrowError(
      new RangeError("page should greater 0 and less maximum page")
    );
  });

  it("throw RangeError when page less than 0", () => {
    const renderPageSelector = () => pageSelectorFactory(36, -1);
    expect(renderPageSelector).toThrowError(
      new RangeError("page should greater 0 and less maximum page")
    );
  });
});
