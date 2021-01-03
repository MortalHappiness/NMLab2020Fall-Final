import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import PostList from "../post/postList";
import TagList from "../tagList";
import Ranking from "../user/ranking";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: theme.spacing(2),
    justifyContent: "space-evenly",
  },
  tagList: {
    // width: "20%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  postList: {
    flexBasis: "800px",
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  ranking: {
    flexBasis: "180px",
    maxWidth: "240px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Main = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <div className={classes.tagList}>
        <TagList />
      </div>
      <div className={classes.postList}>
        <PostList />
      </div>
      <div className={classes.ranking}>
        <Ranking />
      </div>
    </Container>
  );
};

export default Main;