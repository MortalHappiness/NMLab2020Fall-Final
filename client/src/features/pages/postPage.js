import React, { useState, useEffect, useContext, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { EditorState, convertToRaw } from 'draft-js';

import Post from "../post/post";
import AnswerList from "../answer/answerList";
import AddAnswerModal from '../answer/addAnswerModal';

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
  const [addAnswerDialogOpen, setAddAnswerDialogOpen] = useState(false);
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [snackbarProp, setSnackbarProp] = useState({
    open: false,
    message: '',
    status: 'null'
  });

  const handleAddAnswer = async () => {
    if (contractAPI && post) {
      try {
        const content = convertToRaw(editorState.getCurrentContent())
        console.log(post.id);
        const addRes = await contractAPI.addAnswer(post.id, JSON.stringify(content));
        console.log(addRes);
        setEditorState(EditorState.createEmpty())
        setSnackbarProp({
          open: true,
          message: `New answer added!`,
          status: 'success'
        })
        try {
          const getRes = await contractAPI.getPostsByIds([postid]);
          console.log(getRes);
          setPost({ ...getRes[0], id: postid });
        } catch (err) {
          console.error(err);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

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
    <>
      <Container maxWidth="xl" className={classes.root}>
        {post ? (
          <div className={classes.content}>
            <Post {...post} setAddAnswerDialogOpen={setAddAnswerDialogOpen} />
            <AnswerList post={post} />
          </div>
        ) : (
            "Fetching Post ..."
          )}
      </Container>

      <AddAnswerModal
        addAnswerDialogOpen={addAnswerDialogOpen}
        setAddAnswerDialogOpen={setAddAnswerDialogOpen}
        post={post}
        editorState={editorState}
        setEditorState={setEditorState}

        handleAddAnswer={handleAddAnswer}
      />
      <Snackbar
        open={snackbarProp.open}
        autoHideDuration={2000}
        onClose={() => setSnackbarProp({ ...snackbarProp, open: false })}>
        <Alert severity={snackbarProp.status}>
          {snackbarProp.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PostPage;
