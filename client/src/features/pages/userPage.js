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
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

  // Initial
  const [tokens, setTokens] = useState(0);
  const [postIds, setPostIds] = useState([]);
  const [issuedAnswerIds, setIssuedAnswerIds] = useState([]);
  const [totalUpVotes, setTotalUpVotes] = useState(0);
  const [upVotedAnswerIds, setUpVotedAnswerIds] = useState([]);
  const [totalDownVotes, setTotalDownVotes] = useState(0);
  const [downVotedAnswerIds, setDownVotedAnswerIds] = useState([]);

  const [posts, setPosts] = useState([]);
  const [answers, setAnswers] = useState([]);

  // Token2Ether
  const [token2ether, setToken2ether] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleToken2Ether = async () => {
    try {
      const res = await contractAPI.token2ether(parseInt(token2ether));
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  // ether2token
  const [ether, setEther] = useState(0);
  const [openEther, setOpenEther] = React.useState(false);

  const handleClickOpenEther = () => {
    setOpenEther(true);
  };
  const handleCloseEther = () => {
    setOpenEther(false);
  };
  const handleEther2Token = async () => {
    try {
      const res = await contractAPI.ether2token(parseInt(ether));
      init();
    } catch (err) {
      console.error(err);
    }
  };

  const init = async () => {
    if (contractAPI) {
      const accountInfo = await contractAPI.getAccountInfo();
      setTokens(parseInt(accountInfo.tokens));
      setPostIds(accountInfo.postIds);
      setIssuedAnswerIds(accountInfo.issuedAnswerIds);
      setUpVotedAnswerIds(accountInfo.upVotedAnswerIds);
      setDownVotedAnswerIds(accountInfo.downVotedAnswerIds);
      setTotalDownVotes(parseInt(accountInfo.totalDownVotes));
      setTotalUpVotes(parseInt(accountInfo.totalUpVotes));

      const fetchPosts = await contractAPI.getPostsByIds(accountInfo.postIds);
      setPosts(fetchPosts);
      const fetchAnswers = await contractAPI.getAnswersByIds(
        accountInfo.issuedAnswerIds
      );
      setAnswers(fetchAnswers);
    }
  };

  const { userid } = useParams();
  useEffect(async () => {
    init();
  }, [contractAPI]);
  return (
    <Container maxWidth="xl" className={classes.root}>
      <Typography variant="h2" noWrap>
        User {userid}
      </Typography>
      <div>
        <Typography variant="h2">Tokens: {tokens}</Typography>
        <Button variant="outlined" onClick={handleClickOpen}>
          Token to ether
        </Button>{" "}
        <Button variant="outlined" onClick={handleClickOpenEther}>
          Ether to token
        </Button>
      </div>
      <Typography variant="h2">Total Up Votes: {totalUpVotes}</Typography>
      <Typography variant="h2">Total Down Votes: {totalDownVotes}</Typography>
      <Typography variant="h2">IssuedPosts: </Typography>
      <List>
        <Divider />

        {postIds.map((id, idx) => (
          <div key={`post_${idx}`}>
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
          <div key={`answer_${idx}`}>
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Typography variant="h2">Token to Ether</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Please Enter Token amount</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="token"
            label="Token"
            type="number"
            fullWidth
            required
            value={token2ether}
            onChange={(e) => {
              setToken2ether(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleToken2Ether} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEther}
        onClose={handleCloseEther}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Typography variant="h2">Ether to Token</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter Ether amount (multiplied by{" "}
            {contractAPI ? contractAPI.TOKEN_VALUE : 0.000001})
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="token"
            label="Ether"
            type="number"
            fullWidth
            required
            value={ether}
            onChange={(e) => {
              setEther(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEther} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEther2Token} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserPage;
