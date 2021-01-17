import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { ContractContext } from "../../contractContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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

  const { userid } = useParams();
  console.log(`userid: ${userid}`);
  return (
    <Container maxWidth="xl" className={classes.root}>
      <Typography variant="h1">This is UserPage</Typography>
    </Container>
  );
};

export default UserPage;
