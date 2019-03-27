import { Grid, Typography } from "@material-ui/core/";
import React, { Component } from "react";
import CardsContainer from "../CardsContainer";
import PageSelector from "../PageSelector";
import SortingControl from "../SortingControl";
import "./styles.css";

import { ArticlesInfoSearcher } from "../../model/articlesInfoSearcher";
import "./styles.css";
import { IArticleInfo } from "../../model/articleInfo";
import { ISorting } from "../../model/sorting";
import { SortingOrder } from "../../model/sortingOrder";
import { SortingKey } from "../../model/sortingKey";
import { IArticlesInfoSearchResult } from "../../model/articlesInfoSearchResult";
import { ErrorSnackBar } from "../ErrorSnackBar";
import { Header } from "../Header";
import { QueryHistory } from "../QueryHistory";

export class SearchResult extends Component<
  { cookies: any; query: string },
  {
    articlesInfo: IArticleInfo[];
    isSearch: boolean;
    error: string;
    page: number;
  }
> {
  private sorting: ISorting = {
    sortingKey: SortingKey.Relevance,
    sortingOrder: SortingOrder.Ascending
  };

  private lastQuery: string = "";

  public constructor(props: { cookies: any; query: string }) {
    super(props);
    this.state = { articlesInfo: [], isSearch: true, error: "", page: 0 };
  }

  public render() {
    const offset = (this.state.page - 1) * 10;

    const cardsContainer = (
      <CardsContainer
        articlesInfo={this.state.articlesInfo.slice(offset, offset + 10)}
        cookies={this.props.cookies}
      />
    );

    const searchingLabel = (
      <Typography variant="h3" color="textSecondary" align="center">
        Searhing...
      </Typography>
    );

    return (
      <div className="fullHeight">
        <Header onSearch={this.onSearch} />
        <main className="main">
          <Grid container spacing={16} justify="flex-end">
            <Grid item md={6} xs={7}>
              {this.state.isSearch ? searchingLabel : cardsContainer}
            </Grid>
            <Grid item md={3} xs={5}>
              <SortingControl onChange={this.onSortingControlChange} />
              <QueryHistory cookies={this.props.cookies} onChange={e => e} />
            </Grid>
          </Grid>
        </main>
        <footer>
          <PageSelector
            onSelect={this.onPageSelect}
            page={this.state.page}
            elementsCount={this.state.articlesInfo.length}
          />
        </footer>
        <ErrorSnackBar error={this.state.error} />
      </div>
    );
  }

  public componentDidMount(): void {
    this.lastQuery = this.props.query;
    this.makeRequest();
  }

  private onPageSelect = (value: number): void => {
    this.setState({ page: value });
  };

  private onSearch = (query: string): void => {
    this.lastQuery = query;
    this.makeRequest();
  };

  private onSortingControlChange = (sorting: ISorting): void => {
    this.sorting = sorting;
    this.makeRequest();
  };

  private makeRequest = async () => {
    this.addQueryToHistory();

    this.setState({ articlesInfo: [], isSearch: true, error: "", page: 0 });

    const result:
      | IArticlesInfoSearchResult
      | string = await new ArticlesInfoSearcher().search(
      this.lastQuery,
      this.sorting
    );

    if (typeof result === "string") {
      this.setState({
        articlesInfo: [],
        isSearch: false,
        error: result,
        page: 0
      });
    } else {
      this.setState({
        articlesInfo: result.articlesInfo,
        error: "",
        isSearch: false,
        page: result.articlesInfo.length > 0 ? 1 : 0
      });
    }
  };

  private addQueryToHistory() {
    let count = (parseInt(this.props.cookies.get("count"), 10) + 1) % 10;

    if (isNaN(count)) {
      count = 0;
    }

    this.props.cookies.set(`lastQueries${count}`, this.lastQuery);
    this.props.cookies.set("count", count);
  }
}
