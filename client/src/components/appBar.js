import React from "react";
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

  const handleClick = () => {
    history.push("/");
  };

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
            <Button color="inherit">UserId</Button>
          </Toolbar>
        </Bar>
      </HideOnScroll>
      <div className={classes.offset} />
    </div>
  );
}
