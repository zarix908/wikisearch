import "cross-fetch";

import "babel-polyfill";
import { IArticleInfo } from "./articleInfo";
import { IArticlesInfoSearchResult } from "./articlesInfoSearchResult";
import { PromiseError } from "./promiseError";
import { IResponse } from "./response";
import { ISorting } from "./sorting";
import { SortingKey } from "./sortingKey";
import { WebError } from "./webError";

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
      .catch(this.error(WebError.NetworkFailure))
      .then(this.ifNotError(this.checkOkStatus))
      .catch(this.error(WebError.ResponseNotOk))
      .then(this.ifNotError((res: Response) => res.json()))
      .catch(this.error(WebError.ResponseNotJson))
      .then(this.ifNotError(this.extractArticlesInfo))
      .catch(this.error(WebError.ResponseJsonNotArticlesInfo));

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
