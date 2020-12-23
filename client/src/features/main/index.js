import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import PostList from "../post/postList";
import Ranking from "../user/ranking";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: theme.spacing(2),
    justifyContent: "center",
  },
  postList: {
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  ranking: {
    width: "20%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Main = () => {
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.root}>
        <div className={classes.postList}>
          <PostList />
        </div>
        {/* <div className={classes.ranking}>
          <Ranking />
        </div> */}
      </Container>
    </div>
  );
};

export default Main;
