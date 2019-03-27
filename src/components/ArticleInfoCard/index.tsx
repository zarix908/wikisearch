import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import styles from "./styles.css";
import { IArticleInfoAndCookies } from "./IArticleInfoAndCookies";

class ArticleInfoCard extends Component<IArticleInfoAndCookies> {
  private readonly link: string;

  public constructor(props: IArticleInfoAndCookies) {
    super(props);
    this.link = `http://en.wikipedia.org/wiki/${props.title.replace(
      /  */g,
      "_"
    )}`;
  }

  public render() {
    const isVisited: boolean =
      this.props.cookies.get(this.props.pageid) !== undefined;

    return (
      <Card className={styles.card} onClick={this.onClick}>
        <CardContent>
          <Grid container direction="row" className={styles.fullWidth}>
            <Grid item xs={11}>
              <Typography color="textPrimary" variant="h5" gutterBottom>
                {this.props.title}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography color="secondary" align="right">
                {isVisited ? "visited" : null}
              </Typography>
            </Grid>
          </Grid>
          <Typography gutterBottom>
            <a className={styles.link} href={this.link} target="_blank">
              {this.link}
            </a>
          </Typography>
          <div
            className={styles.snippet}
            dangerouslySetInnerHTML={{ __html: this.props.snippet }}
          />
          <Typography color="textSecondary" align="right">
            {new Date(this.props.timestamp).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  private onClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const pageId: number = this.props.pageid;
    if (typeof pageId === "number" && !isNaN(pageId)) {
      this.props.cookies.set(this.props.pageid, "visited");
    }

    if (!(event.target instanceof HTMLAnchorElement)) {
      window.open(this.link, "_blank");
    }
  };
}

export default ArticleInfoCard;
