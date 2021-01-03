import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { selectPost, setPostList } from "./postSlice";
import { Web3Context } from "../../Web3";

import PostItem from "./postItem";

const PostList = () => {
  // Initialize
  const { init, postList } = useSelector(selectPost);
  const { accounts, contract } = useContext(Web3Context);
  const dispatch = useDispatch();
  useEffect(async () => {
    if (contract) {
      const fetchPostList = await contract.methods.getPosts().call();
      console.log(fetchPostList);
      dispatch(setPostList(fetchPostList));
    }
  }, [contract]);

  // Ask Queston
  const handleAddPost = async () => {
    try {
      const title = "This is a test post";
      const content = "Hello 2021 may be good!";
      const tokens = 120;
      const tags = ["travel", "programming"];
      const res = await contract.methods
        .addPost(title, content, tokens, tags)
        .send({ from: accounts[0], gas: 1000000 });
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
