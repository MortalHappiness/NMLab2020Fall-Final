import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Bar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

import { ContractContext } from "../contractContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flex: 1,
    cursor: "pointer",
  },
  offset: theme.mixins.toolbar,
}));

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function AppBar() {
  const classes = useStyles();
  const history = useHistory();
  const contractAPI = useContext(ContractContext);
  const handleClick = () => {
    history.push("/");
  };
  const handleSignUp = async () => {
    try {
      const res = await contractAPI.createAccount();
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  // user display
  const [isUser, setIsUser] = useState(false);
  const [userDisplay, setUserDisplay] = useState("Sign Up");
  useEffect(async () => {
    if (contractAPI) {
      try {
        const res = await contractAPI.getAccountInfo();
        console.log(res);
        setUserDisplay(res.userAddress);
        setIsUser(true);
      } catch (err) {
        console.error(err);
      }
    }
  }, [contractAPI]);

  return (
    <div className={classes.root}>
      <HideOnScroll>
        <Bar position="fixed" color="primary">
          <Toolbar style={{ minHeight: "56px" }}>
            {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
            <Typography
              variant="h1"
              className={classes.title}
              onClick={() => handleClick()}
            >
              知識+ D-App
            </Typography>
            {isUser ? (
              <Button color="inherit">{userDisplay}</Button>
            ) : (
              <Button color="inherit" onClick={handleSignUp}>
                {userDisplay}
              </Button>
            )}
          </Toolbar>
        </Bar>
      </HideOnScroll>
      <div className={classes.offset} />
    </div>
  );
}
