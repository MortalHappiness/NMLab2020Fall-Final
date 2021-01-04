import React, { useContext } from "react";
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

const Post = ({ title, content, author, tags, id, timestamp, tokens }) => {
  const classes = useStyles();
  const displayTime = timeFromNow(timestamp);
  const contractAPI = useContext(ContractContext);

  // Add Answer
  const handleAddAnswer = async () => {
    try {
      const content = "Hi, This is my answer heyyayay";
      console.log(id);
      const res = await contractAPI.addAnswer(id, content);
      console.log(res);
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
        <Typography variant="body1">{content}</Typography>
      </CardContent>
      <CardActions>
        <Button
          className={classes.answerBtn}
          size="medium"
          color="secondary"
          variant="contained"
          onClick={handleAddAnswer}
        >
          + Answer
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
