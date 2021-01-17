import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";

import { ContractContext } from "../../contractContext";
import RichTextEditor from "../utils/textEditor";
import tagList from "../../constant/tagList";

const useStyles = makeStyles((theme) => ({
  typography: {
    textAlign: "center",
    marginBottom: theme.spacing(1),
    color: "#9999",
  },
  postTitle: {
    fontSize: "26px",
  },
  tokenTextFiled: {
    marginTop: theme.spacing(2),
    width: "20%",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  box: {
    border: "solid #c4c4c4 1px",
    borderRadius: "3px",
    padding: "10px",
  },
  none: {
    color: "#c4c4c4",
  },
}));

const AddPostModal = (props) => {
  const {
    addPostDialogOpen,
    setAddPostDialogOpen,
    editorState,
    setEditorState,
    setNewPost,
  } = props;

  const classes = useStyles();
  const contractAPI = useContext(ContractContext);
  const [title, setTitle] = useState("");
  const [token, setToken] = useState(0);
  const [userToken, setUserToken] = useState(0);
  const [chosedTagList, setChosedTagList] = useState([]);
  const [unchosedTagList, setUnchosedTagList] = useState(tagList);
  const [snackbarProp, setSnackbarProp] = useState({
    open: false,
    message: "",
    status: "null",
  });

  const handleAddButtonClick = () => {
    if (Number(token) < contractAPI.MIN_POST_CREATE_TOKEN_FEE) {
      setSnackbarProp({
        open: true,
        message: `The minimum amount of bounty is ${contractAPI.MIN_POST_CREATE_TOKEN_FEE}!`,
        status: "error",
      });
      return;
    }
    if (Number(token) > userToken) {
      setSnackbarProp({
        open: true,
        message: `Your tokens are not enough!`,
        status: "error",
      });
      return;
    }
    setNewPost({
      title,
      tokens: Number(token),
      tags: chosedTagList,
      confirmed: true,
    });
    setAddPostDialogOpen(false);
  };

  const handleAddTag = (tag) => {
    setChosedTagList([...chosedTagList, tag]);
    setUnchosedTagList(unchosedTagList.filter((_tag) => _tag !== tag));
  };

  const handleRemoveTag = (tag) => {
    setUnchosedTagList([...unchosedTagList, tag]);
    setChosedTagList(chosedTagList.filter((_tag) => _tag !== tag));
  };

  useEffect(async () => {
    if (contractAPI) {
      const user = await contractAPI.getAccountInfo();
      setUserToken(user.tokens);
    }
  }, [contractAPI]);

  return (
    <Dialog
      open={addPostDialogOpen}
      onClose={() => setAddPostDialogOpen(false)}
      scroll="paper"
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="scroll-dialog-title">
        <Typography variant="h1">Ask Question</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          value={title}
          variant="outlined"
          onChange={(e) => setTitle(e.currentTarget.value)}
          InputLabelProps={{ shrink: false }}
          inputProps={{ className: classes.postTitle }}
          placeholder="Enter your title here"
          fullWidth
        />
        <TextField
          className={classes.tokenTextFiled}
          size="small"
          value={token}
          onChange={(e) => setToken(e.currentTarget.value)}
          label="Bounty"
          inputProps={{
            type: "number",
            min: contractAPI ? contractAPI.MIN_POST_CREATE_TOKEN_FEE : 0,
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">csb</InputAdornment>,
          }}
          variant="outlined"
        />
        <Box mt={1} mb={1} className={classes.box}>
          <Typography>Tags</Typography>
          {chosedTagList.map((tag) => (
            <Chip
              className={classes.chip}
              variant="outlined"
              label={tag}
              onClick={() => handleRemoveTag(tag)}
              color="primary"
            />
          ))}
        </Box>
        <Typography
          variant="overline"
          display="block"
          className={classes.typography}
        >
          ---- Choose your tag from below ----
        </Typography>
        {unchosedTagList.map((tag) => (
          <Chip
            className={classes.chip}
            variant="outlined"
            label={tag}
            onClick={() => handleAddTag(tag)}
            color="primary"
          />
        ))}

        <Box mt={2}>
          <Typography
            variant="overline"
            display="block"
            className={classes.typography}
          >
            ---- Describe your question below ----
          </Typography>
        </Box>
        {editorState ? (
          <RichTextEditor
            editorState={editorState}
            setEditorState={setEditorState}
          />
        ) : (
          <></>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAddPostDialogOpen(false)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleAddButtonClick}
          color="primary"
          disabled={!title}
        >
          Ask
        </Button>
      </DialogActions>
      <Snackbar
        open={snackbarProp.open}
        autoHideDuration={2000}
        onClose={() => setSnackbarProp({ ...snackbarProp, open: false })}
      >
        <Alert severity={snackbarProp.status}>{snackbarProp.message}</Alert>
      </Snackbar>
    </Dialog>
  );
};

export default AddPostModal;
