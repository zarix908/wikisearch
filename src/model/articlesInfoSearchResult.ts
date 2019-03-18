import { IArticleInfo } from "./articleInfo";

export interface IArticlesInfoSearchResult {
  totalCount: number;
  articlesInfo: IArticleInfo[];
}
