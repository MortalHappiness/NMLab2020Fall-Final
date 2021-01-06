import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import PostList from "../post/postList";
import TagList from "../tagList";
import Ranking from "../../components/ranking";
import { setPostList } from "../post/postSlice";

import { ContractContext } from "../../contractContext";

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
    maxWidth: '60%',
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
  const dispatch = useDispatch();
  const contractAPI = useContext(ContractContext);
  const [postFilter, setPostFilter] = useState(null)

  // Initialize Post List
  useEffect(async () => {
    if (contractAPI) {
      const fetchPostList = await contractAPI.getPosts();
      dispatch(setPostList(fetchPostList));
    }
  }, [contractAPI]);

  return (
    <Container className={classes.root}>
      <div className={classes.tagList}>
        <TagList setPostFilter={setPostFilter} />
      </div>
      <div className={classes.postList}>
        <PostList postFilter={postFilter} />
      </div>
      <div className={classes.ranking}>
        <Ranking />
      </div>
    </Container>
  );
};

export default Main;
