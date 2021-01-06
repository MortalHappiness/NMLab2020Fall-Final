import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Chip from "@material-ui/core/Chip";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { timeFromNow } from "../../utils";

import { EditorState, convertFromRaw } from 'draft-js';
import RichTextDisplayer from "../utils/textDisplayer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  chip: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}));

const PostItem = ({ title, content, author, tags, timestamp, id, tokens }) => {
  const classes = useStyles();
  const displayTime = timeFromNow(timestamp);

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
      <CardActionArea component={Link} to={`/post/${id}`}>
        <CardContent>
          <Typography variant="h1">
            {" "}
            <strong>
              {title} [{tokens} csb]
            </strong>{" "}
          </Typography>
          <RichTextDisplayer displayerState={displayerState} />
          <Typography variant="body2" color="textSecondary" noWrap>
            creator: {author}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {displayTime}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {tags.map((tag) => (
            <Chip
              className={classes.chip}
              variant="outlined"
              color="primary"
              size="small"
              label={tag}
              key={tag}
            />
          ))}
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default PostItem;
