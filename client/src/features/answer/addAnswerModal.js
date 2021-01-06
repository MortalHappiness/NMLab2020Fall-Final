import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { EditorState, convertFromRaw } from 'draft-js';
import RichTextDisplayer from '../utils/textDisplayer'
import RichTextEditor from '../utils/textEditor'

const useStyles = makeStyles((theme) => ({
  typography: {
    textAlign: "center",
    marginBottom: theme.spacing(1),
    color: "#9999"
  }
}));

const AddAnswerModal = (props) => {
  const {
    addAnswerDialogOpen,
    setAddAnswerDialogOpen,
    post,
    editorState,
    setEditorState,
    handleAddAnswer
  } = props;

  const classes = useStyles();
  const [displayerState, setDisplayerState] = useState(
    () => EditorState.createEmpty(),
  )

  const handleAddButtonClick = () => {
    handleAddAnswer();
    setAddAnswerDialogOpen(false);
  }

  useEffect(() => {
    if (post && post.content) {
      setDisplayerState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(post.content)))
      );
    }
  }, [post])

  return (
    <>
      {
        post ?
          <Dialog
            open={addAnswerDialogOpen}
            onClose={() => setAddAnswerDialogOpen(false)}
            scroll="body"
            fullWidth={true}
            maxWidth="lg"
          >
            <DialogTitle id="scroll-dialog-title">
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h1">
                    <strong>
                      {post.title} [{post.tokens} csb]
                    </strong>
                  </Typography>
                  <RichTextDisplayer displayerState={displayerState} />
                </CardContent>
              </Card>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="overline" display="block" className={classes.typography}>
                ---- Write your answer below ----
              </Typography>
              {editorState ?
                <RichTextEditor editorState={editorState} setEditorState={setEditorState} /> :
                <></>
              }
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAddAnswerDialogOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddButtonClick} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog> :
          <></>
      }
    </>

  )
}

export default AddAnswerModal;