import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import tagList from '../../constant/tagList'

// const tagList = [
//   "health",
//   "Business and Finance",
//   "Entertainment",
//   "Home",
//   "Family",
//   "Pets",
//   "Children",
//   "Government",
//   "Education",
//   "News",
//   "Travel",
//   "Vehicle",
//   "Electronic Product",
//   "Environment",
//   "Society",
//   "Science",
//   "Beauty",
//   "Art",
//   "Game",
//   "Sports",
//   "Computer",
//   "Food",
// ];

const useStyles = makeStyles((theme) => ({
  tag: {
    marginTop: theme.spacing(1.5),
    cursor: "pointer",
  },
}));

const TagList = (props) => {
  const classes = useStyles();
  const { setPostFilter } = props;
  return (
    <div>
      <Typography variant="h2" color="initial">
        Catagories
      </Typography>
      <Typography
        className={classes.tag}
        variant="body2"
        color="textSecondary"
        key='All'
        onClick={() => setPostFilter(null)}
      >
        All
      </Typography>
      {tagList.map((tag) => (
        <Typography
          className={classes.tag}
          variant="body2"
          color="textSecondary"
          key={tag}
          onClick={() => setPostFilter(tag)}
        >
          {tag}
        </Typography>
      ))}
    </div>
  );
};

export default TagList;
