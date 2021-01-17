import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import AnswerItem from "../answer/answerItem";

import { ContractContext } from "../../contractContext";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    marginTop: theme.spacing(2),
    // justifyContent: "center",
  },
  content: {
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const UserPage = () => {
  const classes = useStyles();
  const contractAPI = useContext(ContractContext);

  const [tokens, setTokens] = useState(0);
  const [postIds, setPostIds] = useState([]);
  const [issuedAnswerIds, setIssuedAnswerIds] = useState([]);
  const [totalUpVotes, setTotalUpVotes] = useState(0);
  const [upVotedAnswerIds, setUpVotedAnswerIds] = useState([]);
  const [totalDownVotes, setTotalDownVotes] = useState(0);
  const [downVotedAnswerIds, setDownVotedAnswerIds] = useState([]);

  const [posts, setPosts] = useState([]);
  const [answers, setAnswers] = useState([]);

  const { userid } = useParams();
  console.log(`userid: ${userid}`);
  useEffect(async () => {
    if (contractAPI) {
      const accountInfo = await contractAPI.getAccountInfo();
      console.log(accountInfo);
      setTokens(parseInt(accountInfo.tokens));
      setPostIds(accountInfo.postIds);
      setIssuedAnswerIds(accountInfo.issuedAnswerIds);
      setUpVotedAnswerIds(accountInfo.upVotedAnswerIds);
      setDownVotedAnswerIds(accountInfo.downVotedAnswerIds);
      setTotalDownVotes(parseInt(accountInfo.totalDownVotes));
      setTotalUpVotes(parseInt(accountInfo.totalUpVotes));

      const fetchPosts = await contractAPI.getPostsByIds(accountInfo.postIds);
      console.log(fetchPosts);
      setPosts(fetchPosts);
      const fetchAnswers = await contractAPI.getAnswersByIds(
        accountInfo.issuedAnswerIds
      );
      console.log(fetchAnswers);
      setAnswers(fetchAnswers);
    }
  }, [contractAPI]);
  return (
    <Container maxWidth="xl" className={classes.root}>
      <Typography variant="h2" noWrap>
        User {userid}
      </Typography>
      <Typography variant="h2">Tokens: {tokens}</Typography>
      <Typography variant="h2">Total Up Votes: {totalUpVotes}</Typography>
      <Typography variant="h2">Total Down Votes: {totalDownVotes}</Typography>
      <Typography variant="h2">IssuedPosts: </Typography>
      <List>
        <Divider />

        {postIds.map((id) => (
          <div>
            <ListItem button component={Link} to={`/post/${id}`}>
              <ListItemText>post {id}</ListItemText>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <Typography variant="h2">IssuedAnswers: </Typography>
      <List>
        {answers.map((answer, idx) => (
          <div key={idx}>
            <Button component={Link} to={`/post/${answer.parentPostId}`}>
              <Typography variant="h3">
                From Post {answer.parentPostId}
              </Typography>
            </Button>
            <div
              style={{
                border: "1px gray solid",
                margin: "8px",
              }}
            >
              <AnswerItem {...answer} />
            </div>
          </div>
        ))}
      </List>
    </Container>
  );
};

export default UserPage;
