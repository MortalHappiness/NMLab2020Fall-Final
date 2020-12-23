import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { selectPost, setPostList } from "./postSlice";

import PostItem from "./postItem";

const PostList = () => {
  const { init, postList } = useSelector(selectPost);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!init) dispatch(setPostList());
  }, []);
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h2" style={{ flexGrow: 1 }}>
          Questions
        </Typography>
        <Button
          // className={classes.answerBtn}
          size="medium"
          color="secondary"
          variant="outlined"
        >
          Ask Questions
        </Button>
      </div>
      {postList.map((post) => (
        <PostItem {...post} />
      ))}
    </div>
  );
};

export default PostList;
