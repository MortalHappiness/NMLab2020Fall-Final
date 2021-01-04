import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { selectPost, setPostList } from "./postSlice";
// import { Web3Context } from "../../Web3";
import { ContractContext } from "../../contractContext";

import PostItem from "./postItem";

const PostList = () => {
  // Initialize
  const { postList } = useSelector(selectPost);
  const contractAPI = useContext(ContractContext);

  // Ask Queston
  const handleAddPost = async () => {
    try {
      const title = "This is a test post";
      const content = "Hello 2021 may be good!";
      const tokens = 120;
      const tags = ["travel", "programming"];
      const res = contractAPI.addPost(title, content, tokens, tags);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

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
          onClick={handleAddPost}
        >
          Ask Questions
        </Button>
      </div>
      {postList.map((post, idx) => (
        <PostItem {...post} key={idx} />
      ))}
    </div>
  );
};

export default PostList;
