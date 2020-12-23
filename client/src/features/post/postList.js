import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { selectPost, setPostList } from "./postSlice";

import PostItem from "../../components/postItem";

const PostList = () => {
  const { init, postList } = useSelector(selectPost);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!init) dispatch(setPostList());
  }, []);
  return (
    <div>
      <Typography variant="h2">Problem List</Typography>
      {postList.map((post) => (
        <PostItem {...post} />
      ))}
    </div>
  );
};

export default PostList;
