import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import { EditorState, convertFromRaw } from "draft-js";

import { timeFromNow } from "../../utils";

import { ContractContext } from "../../contractContext";
import RichTextDisplayer from "../utils/textDisplayer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "block",
    border: "none",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
  avatar: {
    backgroundColor: "gray",
  },
  content: {
    display: "flex",
  },
  thumbUp: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbUpIcon: {
    fontSize: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.spacing(4),
    },
  },
  cardHeader: {
    padding: theme.spacing(1),
  },
}));

const AnswerItem = ({ id, content, author, timestamp, downVotes, upVotes }) => {
  const classes = useStyles();
  const contractAPI = useContext(ContractContext);
  const [upVoteCnt, setUpVoteCnt] = useState(parseInt(upVotes)); // votes type are string!
  const [downVoteCnt, setDownVoteCnt] = useState(parseInt(downVotes)); // votes type are string!
  const [snackbarProp, setSnackbarProp] = useState({
    open: false,
    message: "",
    status: "null",
  });

  const [displayerState, setDisplayerState] = useState(() =>
    EditorState.createEmpty()
  );

  const displayTime = timeFromNow(timestamp);
  const handleClickUpThumb = async () => {
    // Todo Revert, you have thumbed before
    try {
      await contractAPI.increaseUpVotes(id);
      setSnackbarProp({
        open: true,
        message: `UpVote Successfully!`,
        status: "success",
      });
      setUpVoteCnt(upVoteCnt + 1);
    } catch (err) {
      setSnackbarProp({
        open: true,
        message: `You shouldn't vote the same answer again !`,
        status: "error",
      });
    }
  };
  const handleClickDownThumb = async () => {
    // Todo Revert, you have thumbed before
    try {
      await contractAPI.increaseDownVotes(id);
      setSnackbarProp({
        open: true,
        message: `DownVote Successfully!`,
        status: "success",
      });
      setDownVoteCnt(downVoteCnt + 1);
    } catch (err) {
      setSnackbarProp({
        open: true,
        message: `You shouldn't vote the same answer again !`,
        status: "error",
      });
    }
  };

  useEffect(() => {
    if (content) {
      setDisplayerState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      );
    }
  }, [content]);

  return (
    <ListItem className={classes.root} component={Card} variant="outlined">
      <div className={classes.content}>
        <div className={classes.thumbUp}>
          <IconButton
            aria-label="This is a good answer"
            color="primary"
            onClick={handleClickUpThumb}
          >
            <ThumbUpIcon className={classes.thumbUpIcon} />
          </IconButton>
          <Typography variant="h3" color="primary">
            {upVoteCnt}
          </Typography>
          <IconButton
            aria-label="This is a bad answer"
            color="secondary"
            onClick={handleClickDownThumb}
          >
            <ThumbDownIcon className={classes.thumbUpIcon} />
          </IconButton>
          <Typography variant="h3" color="secondary">
            {downVoteCnt}
          </Typography>
        </div>
        <div style={{ width: "100%" }}>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                A
              </Avatar>
            }
            // action={
            //   <IconButton aria-label="This is a good answer">
            //     <ThumbUpIcon />
            //   </IconButton>
            // }
            title={author}
            subheader={displayTime}
          />
          <CardContent>
            <RichTextDisplayer displayerState={displayerState} />
          </CardContent>
        </div>
      </div>
      <Snackbar
        open={snackbarProp.open}
        autoHideDuration={2000}
        onClose={() => setSnackbarProp({ ...snackbarProp, open: false })}
      >
        <Alert severity={snackbarProp.status}>{snackbarProp.message}</Alert>
      </Snackbar>
    </ListItem>
  );
};

export default AnswerItem;
