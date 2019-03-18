import fetch from "cross-fetch";

import "babel-polyfill";
import { IArticleInfo } from "./articleInfo";
import { IArticlesInfoSearchResult } from "./articlesInfoSearchResult";
import { PromiseError } from "./promiseError";
import { IResponse } from "./response";
import { ISorting } from "./sorting";
import { SortingKey } from "./sortingKey";

export class ArticlesInfoSearcher {
  public async search(
    query: string,
    sorting: ISorting
  ): Promise<IArticlesInfoSearchResult | string> {
    if (query.length === 0) {
      return { totalCount: 0, articlesInfo: [] };
    }

    const baseUrl = "https://en.wikipedia.org/w/api.php";
    const sortingParams: string = this.sortingToQueryParameters(sorting);
    const queryParameters = "action=query&list=search&format=json&origin=*";
    const url: string = encodeURI(
      `${baseUrl}?${queryParameters}` +
        `&srlimit=250&${sortingParams}&srsearch="${query}"`
    );

    const response: IArticlesInfoSearchResult | PromiseError = await fetch(url)
      .catch(this.error("failed request"))
      .then(this.ifNotError(this.checkOkStatus))
      .catch(this.error("status code error"))
      .then(this.ifNotError((res: Response) => res.json()))
      .catch(this.error("invalid response format"))
      .then(this.ifNotError(this.extractArticlesInfo))
      .catch(this.error("response json invalid format"));

    return response instanceof PromiseError ? response.message : response;
  }

  private sortingToQueryParameters(sorting: ISorting): string {
    if (sorting.sortingKey === SortingKey.Relevance) {
      return "";
    }

    return `srsort=${sorting.sortingKey}${sorting.sortingOrder}`;
  }

  private checkOkStatus(response: Response): Promise<Response> {
    if (response.status !== 200) {
      return Promise.reject();
    }

    return Promise.resolve(response);
  }

  private extractArticlesInfo(response: IResponse): IArticlesInfoSearchResult {
    const totalCount: number = Math.min(
      10 ** 4,
      parseInt(response.query.searchinfo.totalhits, 10)
    );
    const articlesInfo: IArticleInfo[] = response.query.search;

    return { totalCount, articlesInfo };
  }

  private error(message: string): () => PromiseError {
    return (): PromiseError => new PromiseError(message);
  }

  private ifNotError(callback: any) {
    return (result: any) => {
      if (result instanceof PromiseError) {
        return result;
      }

      return callback(result);
    };
  }
}
