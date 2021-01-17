import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import { EditorState, convertFromRaw } from "draft-js";
import { timeFromNow } from "../../utils";

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
  chip: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  requestExpireBtn: {},
}));

const Post = ({
  title,
  content,
  author,
  tags,
  id,
  timestamp,
  tokens,
  setAddAnswerDialogOpen,
  isExpired,
}) => {
  const classes = useStyles();
  const displayTime = timeFromNow(timestamp);
  const contractAPI = useContext(ContractContext);
  const [expireTime, setExpireTime] = useState(180);
  const [displayerState, setDisplayerState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (content) {
      setDisplayerState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      );
    }
  }, [content]);

  useEffect(() => {
    if (contractAPI) {
      setExpireTime(parseInt(contractAPI.EXPIRE_TIME));
    }
  }, [contractAPI]);

  // request for expire
  const handleRequestExpire = async () => {
    try {
      const res = await contractAPI.requestForExpire(id);
    } catch (err) {
      console.error(err);
    }
  };

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
        <Box>
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
        </Box>
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
        {!isExpired && Date.now() / 1000 > parseInt(timestamp) + expireTime ? (
          <Button
            className={classes.requestExpireBtn}
            size="medium"
            color="secondary"
            variant="outlined"
            onClick={() => handleRequestExpire()}
          >
            Request for expired
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default Post;
