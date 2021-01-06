import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { EditorState, convertToRaw } from 'draft-js';

import { selectPost, setPostList } from "./postSlice";
// import { Web3Context } from "../../Web3";
import { ContractContext } from "../../contractContext";


import PostItem from "./postItem";
import AddPostModal from "./addPostModal"

const PostList = () => {
  // Initialize
  const { postList } = useSelector(selectPost);
  const contractAPI = useContext(ContractContext);

  const [newPost, setNewPost] = useState({
    title: '',
    tokens: 0,
    tags: [],
    confirmed: false
  });
  const [addPostDialogOpen, setAddPostDialogOpen] = useState(false);
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [snackbarProp, setSnackbarProp] = useState({
    open: false,
    message: '',
    status: 'null'
  });

  // Ask Queston
  const handleAddPost = async () => {
    const payload = {
      title: newPost.title,
      content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      tokens: newPost.tokens,
      tags: newPost.tags,
    }
    console.log('new post payload', payload)
    try {
      const res = contractAPI.addPost(payload.title, payload.content, payload.tokens, payload.tags);
      console.log(res);
      setSnackbarProp({
        open: true,
        message: `New question added!`,
        status: 'success'
      })
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (newPost && newPost.confirmed) handleAddPost()
  }, [newPost])

  // useEffect(async () => {
  //   if (contractAPI) {
  //     const user = await contractAPI.getAccountInfo()
  //     console.log('user', user.tokens)
  //   }
  // }, [contractAPI])

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
          onClick={() => setAddPostDialogOpen(true)}
        >
          Ask Questions
        </Button>
      </div>
      {postList.map((post, idx) => (
        <PostItem {...post} key={idx} />
      ))}
      <AddPostModal
        addPostDialogOpen={addPostDialogOpen}
        setAddPostDialogOpen={setAddPostDialogOpen}
        editorState={editorState}
        setEditorState={setEditorState}
        setNewPost={setNewPost}
      />
      <Snackbar
        open={snackbarProp.open}
        autoHideDuration={2000}
        onClose={() => setSnackbarProp({ ...snackbarProp, open: false })}>
        <Alert severity={snackbarProp.status}>
          {snackbarProp.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PostList;
