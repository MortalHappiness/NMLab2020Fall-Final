import React from "react";
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

const Post = ({ title, text, author, tags, time, tokens }) => {
  const classes = useStyles();
  const displayTime = timeFromNow(time);
  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            A
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={author}
        subheader={displayTime}
      />
      {/* <Avatar>
          <FolderIcon />
        </Avatar> */}
      <CardContent>
        <Typography variant="h1">
          <strong>
            {title} [{tokens} cbs]
          </strong>
        </Typography>
        <Typography variant="body1">{text}</Typography>
      </CardContent>
      <CardActions>
        <Button
          className={classes.answerBtn}
          size="medium"
          color="secondary"
          variant="contained"
        >
          + Answer
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
