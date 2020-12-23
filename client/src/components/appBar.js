import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Bar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

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

export default function AppBar() {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <Bar position="fixed" color="primary">
        <Toolbar>
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
      <div className={classes.offset} />
    </div>
  );
}
