import fetchMock from "fetch-mock";
import { ArticlesInfoSearcher } from "../../src/model/articlesInfoSearcher";
import { SortingKey } from "../../src/model/sortingKey";
import { SortingOrder } from "../../src/model/sortingOrder";
import { ISorting } from "../../src/model/sorting";
import { WebError } from "../../src/model/webError";

describe("ArticlesInfoSearcher should", () => {
  const defaultSorting: ISorting = {
    sortingKey: SortingKey.Relevance,
    sortingOrder: SortingOrder.Ascending
  };

  afterEach(() => {
    fetchMock.restore();
  });

  it("search articles", done => {
    const correctResponse = buildCorrectResponse();
    const correctAnswer = {
      totalCount: correctResponse.query.searchinfo.totalhits,
      articlesInfo: correctResponse.query.search
    };
    fetchMock.getOnce(buildUrl(), correctResponse);
    const articlesInfoSearcher = new ArticlesInfoSearcher();

    articlesInfoSearcher
      .search("query", defaultSorting)
      .then(data => expect(data).toEqual(correctAnswer))
      .then(() => done());
  });

  it("handle timeout", done => {
    const timeout = 4000;

    fetchMock.getOnce(
      buildUrl(),
      new Promise(resolve => {
        setTimeout(() => resolve("data"), timeout);
      })
    );
    const articlesInfoSearcher = new ArticlesInfoSearcher();

    articlesInfoSearcher
      .search("query", defaultSorting)
      .then(data => expect(data).toEqual(WebError.NetworkFailure))
      .then(() => done());
  });

  it("handle network failure", done => {
    testOnHandleResponse(
      Promise.reject("network failure"),
      WebError.NetworkFailure,
      done
    );
  });

  it("handle error when status code is not ok", done => {
    testOnHandleResponse(404, WebError.ResponseNotOk, done);
  });

  it("handle error when response is not json", done => {
    testOnHandleResponse("hello", WebError.ResponseNotJson, done);
  });

  it("handle error when response is not articles info json", done => {
    testOnHandleResponse(
      { invalid: "json" },
      WebError.ResponseJsonNotArticlesInfo,
      done
    );
  });

  function testOnHandleResponse(
    response: object | number | string,
    errorMessage: string,
    done: () => void
  ) {
    fetchMock.getOnce("*", response);
    const articlesInfoSearcher = new ArticlesInfoSearcher();

    articlesInfoSearcher
      .search("query", defaultSorting)
      .then(r => expect(r).toBe(errorMessage))
      .then(() => done());
  }

  function buildCorrectResponse() {
    const article = {
      ns: 0,
      title: "Winnie Madikizela-Mandela",
      pageid: 33683,
      size: 68864,
      wordcount: 6180,
      snippet: "snippet",
      timestamp: "2019-03-08T13:44:25Z"
    };

    return {
      query: {
        searchinfo: { totalhits: 2 },
        search: [article, article]
      }
    };
  }

  function buildUrl() {
    return (
      `https://en.wikipedia.org/w/api.php?action=query&` +
      `list=search&format=json&origin=*&srlimit=250&&srsearch=%22query%22`
    );
  }
});
