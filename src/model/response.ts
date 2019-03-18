import { IArticleInfo } from "./articleInfo";

export interface IResponse {
  query: {
    search: IArticleInfo[];
    searchinfo: { totalhits: string };
  };
}
