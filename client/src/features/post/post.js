import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { timeFromNow } from "../../utils";

import { EditorState, convertFromRaw } from 'draft-js';
import RichTextDisplayer from "../utils/textDisplayer";

import { ContractContext } from "../../contractContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
  },
  answerBtn: {
    borderRadius: "30px",
  },
  avatar: {
    backgroundColor: "gray",
  },
}));

const Post = ({ title, content, author, tags, id, timestamp, tokens, setAddAnswerDialogOpen }) => {
  const classes = useStyles();
  const displayTime = timeFromNow(timestamp);
  const contractAPI = useContext(ContractContext);
  const [displayerState, setDisplayerState] = useState(
    () => EditorState.createEmpty(),
  )

  useEffect(() => {
    if (content) {
      setDisplayerState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      );
    }
  }, [content])

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            A
          </Avatar>
        }
        subheader={displayTime}
        title={author}
        titleTypographyProps={{ noWrap: true }}
        subheaderTypographyProps={{ noWrap: true }}
      />
      <CardContent>
        <Typography variant="h1">
          <strong>
            {title} [{tokens} csb]
          </strong>
        </Typography>
        <RichTextDisplayer displayerState={displayerState} />
      </CardContent>
      <CardActions>
        <Button
          className={classes.answerBtn}
          size="medium"
          color="secondary"
          variant="contained"
          onClick={() => setAddAnswerDialogOpen(true)}
        >
          + Answer
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
