import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import Bar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

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
  userName: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
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
  const [snackbarProp, setSnackbarProp] = useState({
    open: false,
    message: "",
    status: "null",
  });
  const contractAPI = useContext(ContractContext);
  const handleClick = () => {
    history.push("/");
  };
  const handleSignUp = async () => {
    try {
      const res = await contractAPI.createAccount();
      setSnackbarProp({
        open: true,
        message: `SignUp Successfully!`,
        status: "success",
      });
      window.location.reload(false);
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
              <Button
                color="inherit"
                component={Link}
                to={`/user/${userDisplay}`}
              >
                <Typography className={classes.userName} noWrap>
                  {userDisplay}
                </Typography>
              </Button>
            ) : (
              <Button color="inherit" onClick={handleSignUp}>
                {userDisplay}
              </Button>
            )}
          </Toolbar>
        </Bar>
      </HideOnScroll>
      <div className={classes.offset} />
      <Snackbar
        open={snackbarProp.open}
        autoHideDuration={2000}
        onClose={() => setSnackbarProp({ ...snackbarProp, open: false })}
      >
        <Alert severity={snackbarProp.status}>{snackbarProp.message}</Alert>
      </Snackbar>
    </div>
  );
}
