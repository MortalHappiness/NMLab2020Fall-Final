import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { selectPost, setPostList } from "./postSlice";

import PostItem from "../../components/postItem";

const PostList = () => {
  const { postList } = useSelector(selectPost);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setPostList([
        {
          title: "Hello World Again",
          text: "Allo hahahhah",
          author: "0x098845913",
          answers: [2, 3],
          tags: ["Travel", "What"],
          time: "Wed Dec 23 2020 03:07:40 GMT+0800 (Taipei Standard Time)",
        },
        {
          title: "Hello World",
          text: "I want to know how to solve r3vE3rse, wishMachine ...",
          author: "0x03734301",
          answers: [0, 1],
          tags: ["Course", "Exam"],
          time: "Wed Dec 23 2020 02:24:03 GMT+0800 (Taipei Standard Time)",
        },
      ])
    );
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
