import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

const PostItem = ({ title, text, author, tags, time, id }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea component={Link} to={`/post/${id}`}>
        <CardContent>
          <Typography variant="h2">
            {" "}
            <strong>{title}</strong>{" "}
          </Typography>
          <Typography variant="body1">{text}</Typography>
          <Typography variant="body2" color="textSecondary">
            creator: {author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostItem;
