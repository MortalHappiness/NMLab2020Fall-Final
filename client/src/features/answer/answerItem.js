import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Button from "@material-ui/core/Button";
import * as dayjs from "dayjs";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";

const relativeTime = require("dayjs/plugin/relativeTime");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "block",
    border: "none",
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
  },
}));

const AnswerItem = ({ text, author, time, votes, id }) => {
  const classes = useStyles();
  const [voteCnt, setVoteCnt] = useState(votes.length);

  dayjs.extend(relativeTime);
  const displayTime = dayjs(time).fromNow();
  const handleClickThumb = () => {
    setVoteCnt(voteCnt + 1);
  };
  return (
    <ListItem className={classes.root} component={Card} variant="outlined">
      {/* <h1>This is answer Item</h1> */}
      <div className={classes.content}>
        <div className={classes.thumbUp}>
          <IconButton
            aria-label="This is a good answer"
            color="primary"
            onClick={handleClickThumb}
          >
            <ThumbUpIcon className={classes.thumbUpIcon} />
          </IconButton>
          <Typography variant="h3" color="primary">
            {voteCnt}
          </Typography>
        </div>
        <div>
          <CardHeader
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
            <Typography variant="h2">{text}</Typography>
          </CardContent>
        </div>
      </div>
    </ListItem>
  );
};

export default AnswerItem;
