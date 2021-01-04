import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import AnswerItem from "./answerItem";
import { selectAnswer, setAnswerList } from "./answerSlice";
import { ContractContext } from "../../contractContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  answerList: {
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: "4px",
    padding: 0,
  },
}));

const AnswerList = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const contractAPI = useContext(ContractContext);
  const { answerList } = useSelector(selectAnswer);
  useEffect(async () => {
    if (post) {
      const fetchAnswerList = await contractAPI.getAnswers(post.id);
      console.log(fetchAnswerList);
      dispatch(setAnswerList(fetchAnswerList));
    }
  }, [post]);
  return (
    <div>
      <Toolbar>
        <Typography variant="h2" color="initial">
          {answerList.length} answers
        </Typography>
      </Toolbar>
      <List className={classes.answerList}>
        {answerList.map((answer, idx) => (
          <div key={idx}>
            <AnswerItem {...answer} />
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default AnswerList;
