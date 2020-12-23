import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Chip from "@material-ui/core/Chip";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { timeFromNow } from "../../utils";

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

const PostItem = ({ title, text, author, tags, time, id, tokens }) => {
  const classes = useStyles();
  const displayTime = timeFromNow(time);
  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea component={Link} to={`/post/${id}`}>
        <CardContent>
          <Typography variant="h2">
            {" "}
            <strong>
              {title} [{tokens} cbs]
            </strong>{" "}
          </Typography>
          <Typography variant="body1">{text}</Typography>
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
            />
          ))}
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default PostItem;
