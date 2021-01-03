import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Toolbar from "@material-ui/core/Toolbar";
import { selectPost, setPostList } from "../post/postSlice";
import { selectAnswer, setAnswerList } from "../answer/answerSlice";

import Post from "../post/post";
import AnswerList from "../answer/answerList";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: theme.spacing(2),
    justifyContent: "center",
  },
  content: {
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const PostPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { postid } = useParams();
  const { postList } = useSelector(selectPost);
  const post = postList[postid] ? postList[postid] : null;
  // Todo: Initialization (fetch post, get user info)
  return (
    <Container maxWidth="xl" className={classes.root}>
      {post ? (
        <div className={classes.content}>
          <Post {...post} />
          <AnswerList post={post} />
        </div>
      ) : (
        "Fetching Post ..."
      )}
    </Container>
  );
};

export default PostPage;