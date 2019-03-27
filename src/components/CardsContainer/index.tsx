import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import ArticleInfoCard from "../ArticleInfoCard";
import styles from "./styles.css";
import { IArticleInfo } from "../../model/articleInfo";

function CardsContainer(props: { cookies: any; articlesInfo: IArticleInfo[] }) {
  if (props.articlesInfo.length === 0) {
    return (
      <Typography variant="h3" color="textSecondary">
        There were no results matching the query
      </Typography>
    );
  }

  return (
    <Grid container spacing={16}>
      {props.articlesInfo.map((articleInfo: IArticleInfo) => (
        <Grid item className={styles.fullWidth} key={articleInfo.title}>
          <ArticleInfoCard
            cookies={props.cookies}
            pageid={articleInfo.pageid}
            title={articleInfo.title}
            snippet={articleInfo.snippet}
            timestamp={articleInfo.timestamp}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default CardsContainer;
