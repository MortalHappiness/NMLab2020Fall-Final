import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Toolbar from "@material-ui/core/Toolbar";

import Post from "../post/post";
import AnswerList from "../answer/answerList";

// import { selectPost, setPostList } from "../post/postSlice";
import { ContractContext } from "../../contractContext";

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
  const contractAPI = useContext(ContractContext);
  const { postid } = useParams();

  const [post, setPost] = useState(null);

  // Todo: Initialization (fetch post, get user info)
  // Initialize Post
  useEffect(async () => {
    if (contractAPI) {
      try {
        const res = await contractAPI.getPostsByIds([postid]);
        console.log(res);
        setPost({ ...res[0], id: postid });
      } catch (err) {
        console.error(err);
      }
    }
  }, [contractAPI]);

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
